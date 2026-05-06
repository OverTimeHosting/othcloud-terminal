package handlers

import (
	"context"
	"errors"
	"net/http"
	"time"

	"go.mongodb.org/mongo-driver/v2/bson"
	"go.mongodb.org/mongo-driver/v2/mongo"
	"go.mongodb.org/mongo-driver/v2/mongo/options"

	"github.com/othcloud/terminal-backend/internal/auth"
)

// ---------- DTOs / docs ----------

type timeEntryDTO struct {
	ID           int64  `json:"id"`
	TaskID       int64  `json:"taskId"`
	UserID       int64  `json:"userId"`
	UserUsername string `json:"userUsername"`
	StartAt      string `json:"startAt"`
	EndAt        string `json:"endAt,omitempty"`
	DurationSec  int64  `json:"durationSec"`
	Running      bool   `json:"running"`
}

type taskTimeSummaryDTO struct {
	TotalSec      int64           `json:"totalSec"`
	Running       *timeEntryDTO   `json:"running,omitempty"`
	Entries       []timeEntryDTO  `json:"entries"`
}

type activeTimerDTO struct {
	TaskID    int64  `json:"taskId"`
	TaskTitle string `json:"taskTitle"`
	StartAt   string `json:"startAt"`
	EntryID   int64  `json:"entryId"`
}

type timeEntryDoc struct {
	ID           int64      `bson:"_id"`
	TaskID       int64      `bson:"task_id"`
	UserID       int64      `bson:"user_id"`
	UserUsername string     `bson:"user_username"`
	StartAt      time.Time  `bson:"start_at"`
	EndAt        *time.Time `bson:"end_at,omitempty"`
	DurationSec  int64      `bson:"duration_sec"`
}

func toEntryDTO(d timeEntryDoc) timeEntryDTO {
	dto := timeEntryDTO{
		ID: d.ID, TaskID: d.TaskID, UserID: d.UserID, UserUsername: d.UserUsername,
		StartAt: iso(d.StartAt), DurationSec: d.DurationSec,
	}
	if d.EndAt != nil {
		dto.EndAt = iso(*d.EndAt)
	} else {
		dto.Running = true
	}
	return dto
}

// ---------- Handlers ----------

// StartTaskTimer starts a timer on the given task for the current user. If the
// user has any other running entry (on this or another task), it is closed
// first so the user only ever has one active timer at a time.
func (s *Server) StartTaskTimer(w http.ResponseWriter, r *http.Request) {
	me, _ := auth.UserFrom(r.Context())
	id, ok := pathID(r, "id")
	ctx, cancel := reqCtx(r)
	defer cancel()
	if !ok || !s.canViewTask(ctx, me.ID, id) {
		writeError(w, http.StatusNotFound, "not found")
		return
	}

	// Close any existing running entry for this user.
	if err := s.closeRunningEntry(ctx, me.ID); err != nil {
		writeError(w, http.StatusInternalServerError, "failed to stop existing timer")
		return
	}

	entryID, err := s.DB.NextID(ctx, "task_time_entries")
	if err != nil {
		writeError(w, http.StatusInternalServerError, "id alloc failed")
		return
	}
	doc := timeEntryDoc{
		ID: entryID, TaskID: id, UserID: me.ID, UserUsername: me.Username,
		StartAt: nowUTC(),
	}
	if _, err := s.DB.TaskTimeEntries.InsertOne(ctx, doc); err != nil {
		writeError(w, http.StatusInternalServerError, "db insert failed")
		return
	}
	s.recordActivity(ctx, id, me.ID, me.Username, "timer-start", "")
	writeJSON(w, http.StatusCreated, toEntryDTO(doc))
}

// StopTaskTimer stops the user's running entry on the given task (if any).
func (s *Server) StopTaskTimer(w http.ResponseWriter, r *http.Request) {
	me, _ := auth.UserFrom(r.Context())
	id, ok := pathID(r, "id")
	ctx, cancel := reqCtx(r)
	defer cancel()
	if !ok || !s.canViewTask(ctx, me.ID, id) {
		writeError(w, http.StatusNotFound, "not found")
		return
	}

	stopped, err := s.stopRunningEntryForTask(ctx, me.ID, id)
	if err != nil {
		writeError(w, http.StatusInternalServerError, "failed to stop timer")
		return
	}
	if stopped == nil {
		writeError(w, http.StatusNotFound, "no running timer for this task")
		return
	}
	s.recordActivity(ctx, id, me.ID, me.Username, "timer-stop", "")
	writeJSON(w, http.StatusOK, toEntryDTO(*stopped))
}

// GetTaskTime returns the totals + entries + currently-running entry (if any)
// for a task. Accessible to anyone who can view the task.
func (s *Server) GetTaskTime(w http.ResponseWriter, r *http.Request) {
	me, _ := auth.UserFrom(r.Context())
	id, ok := pathID(r, "id")
	ctx, cancel := reqCtx(r)
	defer cancel()
	if !ok || !s.canViewTask(ctx, me.ID, id) {
		writeError(w, http.StatusNotFound, "not found")
		return
	}

	cur, err := s.DB.TaskTimeEntries.Find(ctx,
		bson.M{"task_id": id},
		options.Find().SetSort(bson.D{{Key: "_id", Value: -1}}),
	)
	if err != nil {
		writeError(w, http.StatusInternalServerError, "db query failed")
		return
	}
	defer cur.Close(ctx)

	out := taskTimeSummaryDTO{Entries: []timeEntryDTO{}}
	for cur.Next(ctx) {
		var d timeEntryDoc
		if err := cur.Decode(&d); err != nil {
			writeError(w, http.StatusInternalServerError, "db decode failed")
			return
		}
		dto := toEntryDTO(d)
		if d.EndAt == nil && d.UserID == me.ID {
			r := dto
			out.Running = &r
			out.TotalSec += int64(time.Since(d.StartAt).Seconds())
		} else {
			out.TotalSec += d.DurationSec
		}
		out.Entries = append(out.Entries, dto)
	}
	writeJSON(w, http.StatusOK, out)
}

// GetActiveTimer returns the user's currently running timer (across all
// tasks), or 404 if none.
func (s *Server) GetActiveTimer(w http.ResponseWriter, r *http.Request) {
	me, _ := auth.UserFrom(r.Context())
	ctx, cancel := reqCtx(r)
	defer cancel()

	var d timeEntryDoc
	err := s.DB.TaskTimeEntries.FindOne(ctx,
		bson.M{"user_id": me.ID, "end_at": nil},
	).Decode(&d)
	if errors.Is(err, mongo.ErrNoDocuments) {
		writeError(w, http.StatusNotFound, "no active timer")
		return
	}
	if err != nil {
		writeError(w, http.StatusInternalServerError, "db query failed")
		return
	}

	var taskTitle string
	var taskRow struct {
		Title string `bson:"title"`
	}
	if err := s.DB.Tasks.FindOne(ctx, bson.M{"_id": d.TaskID}).Decode(&taskRow); err == nil {
		taskTitle = taskRow.Title
	}
	writeJSON(w, http.StatusOK, activeTimerDTO{
		TaskID: d.TaskID, TaskTitle: taskTitle, StartAt: iso(d.StartAt), EntryID: d.ID,
	})
}

// ---------- helpers ----------

func (s *Server) closeRunningEntry(ctx context.Context, userID int64) error {
	var d timeEntryDoc
	err := s.DB.TaskTimeEntries.FindOne(ctx, bson.M{"user_id": userID, "end_at": nil}).Decode(&d)
	if errors.Is(err, mongo.ErrNoDocuments) {
		return nil
	}
	if err != nil {
		return err
	}
	end := nowUTC()
	dur := int64(end.Sub(d.StartAt).Seconds())
	_, err = s.DB.TaskTimeEntries.UpdateOne(ctx, bson.M{"_id": d.ID},
		bson.M{"$set": bson.M{"end_at": end, "duration_sec": dur}},
	)
	return err
}

func (s *Server) stopRunningEntryForTask(ctx context.Context, userID, taskID int64) (*timeEntryDoc, error) {
	var d timeEntryDoc
	err := s.DB.TaskTimeEntries.FindOne(ctx, bson.M{"user_id": userID, "task_id": taskID, "end_at": nil}).Decode(&d)
	if errors.Is(err, mongo.ErrNoDocuments) {
		return nil, nil
	}
	if err != nil {
		return nil, err
	}
	end := nowUTC()
	dur := int64(end.Sub(d.StartAt).Seconds())
	if _, err := s.DB.TaskTimeEntries.UpdateOne(ctx, bson.M{"_id": d.ID},
		bson.M{"$set": bson.M{"end_at": end, "duration_sec": dur}},
	); err != nil {
		return nil, err
	}
	d.EndAt = &end
	d.DurationSec = dur
	return &d, nil
}
