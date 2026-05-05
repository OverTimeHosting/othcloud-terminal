package handlers

import (
	"context"
	"errors"
	"net/http"
	"strconv"
	"strings"
	"time"

	"go.mongodb.org/mongo-driver/v2/bson"
	"go.mongodb.org/mongo-driver/v2/mongo"
	"go.mongodb.org/mongo-driver/v2/mongo/options"

	"github.com/othcloud/terminal-backend/internal/auth"
)

// ---------- DTOs (wire format) ----------

type taskDTO struct {
	ID               int64   `json:"id"`
	Title            string  `json:"title"`
	Description      string  `json:"description"`
	Status           string  `json:"status"`
	CreatorID        int64   `json:"creatorId"`
	CreatorUsername  string  `json:"creatorUsername"`
	AssigneeID       *int64  `json:"assigneeId,omitempty"`
	AssigneeUsername *string `json:"assigneeUsername,omitempty"`
	CreatedAt        string  `json:"createdAt"`
	UpdatedAt        string  `json:"updatedAt"`
}

type messageDTO struct {
	ID             int64  `json:"id"`
	TaskID         int64  `json:"taskId"`
	AuthorID       int64  `json:"authorId"`
	AuthorUsername string `json:"authorUsername"`
	Body           string `json:"body"`
	CreatedAt      string `json:"createdAt"`
}

type checklistItemDTO struct {
	ID            int64  `json:"id"`
	TaskID        int64  `json:"taskId"`
	Label         string `json:"label"`
	Done          bool   `json:"done"`
	CreatedBy     int64  `json:"createdBy"`
	CreatedByName string `json:"createdByName"`
	CreatedAt     string `json:"createdAt"`
}

type activityDTO struct {
	ID        int64  `json:"id"`
	TaskID    int64  `json:"taskId"`
	ActorID   int64  `json:"actorId"`
	ActorName string `json:"actorName"`
	Kind      string `json:"kind"`
	Detail    string `json:"detail"`
	CreatedAt string `json:"createdAt"`
}

// ---------- Mongo documents ----------

type taskDoc struct {
	ID               int64     `bson:"_id"`
	Title            string    `bson:"title"`
	Description      string    `bson:"description"`
	Status           string    `bson:"status"`
	CreatorID        int64     `bson:"creator_id"`
	CreatorUsername  string    `bson:"creator_username"`
	AssigneeID       *int64    `bson:"assignee_id,omitempty"`
	AssigneeUsername *string   `bson:"assignee_username,omitempty"`
	CreatedAt        time.Time `bson:"created_at"`
	UpdatedAt        time.Time `bson:"updated_at"`
}

type messageDoc struct {
	ID             int64     `bson:"_id"`
	TaskID         int64     `bson:"task_id"`
	AuthorID       int64     `bson:"author_id"`
	AuthorUsername string    `bson:"author_username"`
	Body           string    `bson:"body"`
	CreatedAt      time.Time `bson:"created_at"`
}

type checklistDoc struct {
	ID            int64     `bson:"_id"`
	TaskID        int64     `bson:"task_id"`
	Label         string    `bson:"label"`
	Done          bool      `bson:"done"`
	CreatedBy     int64     `bson:"created_by"`
	CreatedByName string    `bson:"created_by_name"`
	CreatedAt     time.Time `bson:"created_at"`
}

type activityDoc struct {
	ID        int64     `bson:"_id"`
	TaskID    int64     `bson:"task_id"`
	ActorID   int64     `bson:"actor_id"`
	ActorName string    `bson:"actor_name"`
	Kind      string    `bson:"kind"`
	Detail    string    `bson:"detail"`
	CreatedAt time.Time `bson:"created_at"`
}

// ---------- Inputs ----------

type createTaskInput struct {
	Title            string `json:"title"`
	Description      string `json:"description"`
	AssigneeUsername string `json:"assigneeUsername"`
}

type patchTaskInput struct {
	Title       *string `json:"title,omitempty"`
	Description *string `json:"description,omitempty"`
	Status      *string `json:"status,omitempty"`
}

type createMessageInput struct {
	Body string `json:"body"`
}

type createChecklistInput struct {
	Label string `json:"label"`
}

type patchChecklistInput struct {
	Done *bool `json:"done,omitempty"`
}

// ---------- Helpers ----------

func pathID(r *http.Request, name string) (int64, bool) {
	raw := r.PathValue(name)
	if raw == "" {
		return 0, false
	}
	id, err := strconv.ParseInt(raw, 10, 64)
	if err != nil {
		return 0, false
	}
	return id, true
}

func iso(t time.Time) string {
	return t.UTC().Format(time.RFC3339Nano)
}

func toTaskDTO(t taskDoc) taskDTO {
	dto := taskDTO{
		ID: t.ID, Title: t.Title, Description: t.Description, Status: t.Status,
		CreatorID: t.CreatorID, CreatorUsername: t.CreatorUsername,
		AssigneeID: t.AssigneeID, AssigneeUsername: t.AssigneeUsername,
		CreatedAt: iso(t.CreatedAt), UpdatedAt: iso(t.UpdatedAt),
	}
	return dto
}

func (s *Server) lookupUserID(ctx context.Context, username string) (int64, error) {
	var u struct {
		ID int64 `bson:"_id"`
	}
	err := s.DB.Users.FindOne(ctx, bson.M{"username": username}).Decode(&u)
	return u.ID, err
}

func (s *Server) recordActivity(ctx context.Context, taskID, actorID int64, actorName, kind, detail string) {
	id, err := s.DB.NextID(ctx, "task_activity")
	if err != nil {
		return
	}
	_, _ = s.DB.TaskActivity.InsertOne(ctx, activityDoc{
		ID: id, TaskID: taskID, ActorID: actorID, ActorName: actorName,
		Kind: kind, Detail: detail, CreatedAt: nowUTC(),
	})
}

func (s *Server) canViewTask(ctx context.Context, userID, taskID int64) bool {
	n, err := s.DB.Tasks.CountDocuments(ctx, bson.M{
		"_id": taskID,
		"$or": bson.A{
			bson.M{"creator_id": userID},
			bson.M{"assignee_id": userID},
		},
	})
	return err == nil && n > 0
}

func (s *Server) isCreator(ctx context.Context, userID, taskID int64) bool {
	n, err := s.DB.Tasks.CountDocuments(ctx, bson.M{"_id": taskID, "creator_id": userID})
	return err == nil && n > 0
}

func (s *Server) loadTask(ctx context.Context, id int64) (taskDoc, error) {
	var t taskDoc
	err := s.DB.Tasks.FindOne(ctx, bson.M{"_id": id}).Decode(&t)
	return t, err
}

// ---------- Tasks ----------

func (s *Server) ListTasks(w http.ResponseWriter, r *http.Request) {
	me, _ := auth.UserFrom(r.Context())
	ctx, cancel := reqCtx(r)
	defer cancel()

	cur, err := s.DB.Tasks.Find(ctx,
		bson.M{"$or": bson.A{
			bson.M{"creator_id": me.ID},
			bson.M{"assignee_id": me.ID},
		}},
		options.Find().SetSort(bson.D{{Key: "updated_at", Value: -1}}),
	)
	if err != nil {
		writeError(w, http.StatusInternalServerError, "db query failed")
		return
	}
	defer cur.Close(ctx)

	out := []taskDTO{}
	for cur.Next(ctx) {
		var t taskDoc
		if err := cur.Decode(&t); err != nil {
			writeError(w, http.StatusInternalServerError, "db decode failed")
			return
		}
		out = append(out, toTaskDTO(t))
	}
	writeJSON(w, http.StatusOK, out)
}

func (s *Server) CreateTask(w http.ResponseWriter, r *http.Request) {
	me, _ := auth.UserFrom(r.Context())
	var in createTaskInput
	if err := decodeJSON(r, &in); err != nil {
		writeError(w, http.StatusBadRequest, "invalid body")
		return
	}
	in.Title = strings.TrimSpace(in.Title)
	if in.Title == "" {
		writeError(w, http.StatusBadRequest, "title required")
		return
	}

	ctx, cancel := reqCtx(r)
	defer cancel()

	var assigneeID *int64
	var assigneeName *string
	if in.AssigneeUsername = strings.TrimSpace(in.AssigneeUsername); in.AssigneeUsername != "" {
		id, err := s.lookupUserID(ctx, in.AssigneeUsername)
		if errors.Is(err, mongo.ErrNoDocuments) {
			writeError(w, http.StatusBadRequest, "assignee user not found")
			return
		}
		if err != nil {
			writeError(w, http.StatusInternalServerError, "lookup failed")
			return
		}
		assigneeID = &id
		assigneeName = &in.AssigneeUsername
	}

	id, err := s.DB.NextID(ctx, "tasks")
	if err != nil {
		writeError(w, http.StatusInternalServerError, "id alloc failed")
		return
	}
	now := nowUTC()
	doc := taskDoc{
		ID: id, Title: in.Title, Description: in.Description, Status: "open",
		CreatorID: me.ID, CreatorUsername: me.Username,
		AssigneeID: assigneeID, AssigneeUsername: assigneeName,
		CreatedAt: now, UpdatedAt: now,
	}
	if _, err := s.DB.Tasks.InsertOne(ctx, doc); err != nil {
		writeError(w, http.StatusInternalServerError, "db insert failed")
		return
	}
	s.recordActivity(ctx, id, me.ID, me.Username, "created", in.Title)
	if assigneeName != nil {
		s.recordActivity(ctx, id, me.ID, me.Username, "assigned", *assigneeName)
	}
	writeJSON(w, http.StatusCreated, toTaskDTO(doc))
}

func (s *Server) GetTask(w http.ResponseWriter, r *http.Request) {
	me, _ := auth.UserFrom(r.Context())
	id, ok := pathID(r, "id")
	if !ok {
		writeError(w, http.StatusBadRequest, "bad id")
		return
	}
	ctx, cancel := reqCtx(r)
	defer cancel()
	if !s.canViewTask(ctx, me.ID, id) {
		writeError(w, http.StatusNotFound, "not found")
		return
	}
	t, err := s.loadTask(ctx, id)
	if err != nil {
		writeError(w, http.StatusNotFound, "not found")
		return
	}
	writeJSON(w, http.StatusOK, toTaskDTO(t))
}

func (s *Server) PatchTask(w http.ResponseWriter, r *http.Request) {
	me, _ := auth.UserFrom(r.Context())
	id, ok := pathID(r, "id")
	if !ok {
		writeError(w, http.StatusBadRequest, "bad id")
		return
	}
	ctx, cancel := reqCtx(r)
	defer cancel()
	if !s.canViewTask(ctx, me.ID, id) {
		writeError(w, http.StatusNotFound, "not found")
		return
	}
	var in patchTaskInput
	if err := decodeJSON(r, &in); err != nil {
		writeError(w, http.StatusBadRequest, "invalid body")
		return
	}

	set := bson.M{}
	if in.Title != nil {
		set["title"] = *in.Title
		s.recordActivity(ctx, id, me.ID, me.Username, "renamed", *in.Title)
	}
	if in.Description != nil {
		set["description"] = *in.Description
		s.recordActivity(ctx, id, me.ID, me.Username, "edited-description", "")
	}
	if in.Status != nil {
		set["status"] = *in.Status
		s.recordActivity(ctx, id, me.ID, me.Username, "status", *in.Status)
	}
	if len(set) > 0 {
		set["updated_at"] = nowUTC()
		if _, err := s.DB.Tasks.UpdateOne(ctx, bson.M{"_id": id}, bson.M{"$set": set}); err != nil {
			writeError(w, http.StatusInternalServerError, "db update failed")
			return
		}
	}
	t, err := s.loadTask(ctx, id)
	if err != nil {
		writeError(w, http.StatusNotFound, "not found")
		return
	}
	writeJSON(w, http.StatusOK, toTaskDTO(t))
}

// ---------- Messages ----------

func (s *Server) ListMessages(w http.ResponseWriter, r *http.Request) {
	me, _ := auth.UserFrom(r.Context())
	id, ok := pathID(r, "id")
	ctx, cancel := reqCtx(r)
	defer cancel()
	if !ok || !s.canViewTask(ctx, me.ID, id) {
		writeError(w, http.StatusNotFound, "not found")
		return
	}
	cur, err := s.DB.TaskMessages.Find(ctx,
		bson.M{"task_id": id},
		options.Find().SetSort(bson.D{{Key: "_id", Value: 1}}),
	)
	if err != nil {
		writeError(w, http.StatusInternalServerError, "db query failed")
		return
	}
	defer cur.Close(ctx)

	out := []messageDTO{}
	for cur.Next(ctx) {
		var m messageDoc
		if err := cur.Decode(&m); err != nil {
			writeError(w, http.StatusInternalServerError, "db decode failed")
			return
		}
		out = append(out, messageDTO{
			ID: m.ID, TaskID: m.TaskID, AuthorID: m.AuthorID, AuthorUsername: m.AuthorUsername,
			Body: m.Body, CreatedAt: iso(m.CreatedAt),
		})
	}
	writeJSON(w, http.StatusOK, out)
}

func (s *Server) PostMessage(w http.ResponseWriter, r *http.Request) {
	me, _ := auth.UserFrom(r.Context())
	id, ok := pathID(r, "id")
	ctx, cancel := reqCtx(r)
	defer cancel()
	if !ok || !s.canViewTask(ctx, me.ID, id) {
		writeError(w, http.StatusNotFound, "not found")
		return
	}
	var in createMessageInput
	if err := decodeJSON(r, &in); err != nil {
		writeError(w, http.StatusBadRequest, "invalid body")
		return
	}
	in.Body = strings.TrimSpace(in.Body)
	if in.Body == "" {
		writeError(w, http.StatusBadRequest, "body required")
		return
	}

	mid, err := s.DB.NextID(ctx, "task_messages")
	if err != nil {
		writeError(w, http.StatusInternalServerError, "id alloc failed")
		return
	}
	now := nowUTC()
	doc := messageDoc{
		ID: mid, TaskID: id, AuthorID: me.ID, AuthorUsername: me.Username,
		Body: in.Body, CreatedAt: now,
	}
	if _, err := s.DB.TaskMessages.InsertOne(ctx, doc); err != nil {
		writeError(w, http.StatusInternalServerError, "db insert failed")
		return
	}
	s.recordActivity(ctx, id, me.ID, me.Username, "message", "")
	_, _ = s.DB.Tasks.UpdateOne(ctx, bson.M{"_id": id}, bson.M{"$set": bson.M{"updated_at": now}})
	writeJSON(w, http.StatusCreated, messageDTO{
		ID: mid, TaskID: id, AuthorID: me.ID, AuthorUsername: me.Username,
		Body: in.Body, CreatedAt: iso(now),
	})
}

// ---------- Checklist ----------

func (s *Server) ListChecklist(w http.ResponseWriter, r *http.Request) {
	me, _ := auth.UserFrom(r.Context())
	id, ok := pathID(r, "id")
	ctx, cancel := reqCtx(r)
	defer cancel()
	if !ok || !s.canViewTask(ctx, me.ID, id) {
		writeError(w, http.StatusNotFound, "not found")
		return
	}
	cur, err := s.DB.TaskChecklist.Find(ctx,
		bson.M{"task_id": id},
		options.Find().SetSort(bson.D{{Key: "_id", Value: 1}}),
	)
	if err != nil {
		writeError(w, http.StatusInternalServerError, "db query failed")
		return
	}
	defer cur.Close(ctx)

	out := []checklistItemDTO{}
	for cur.Next(ctx) {
		var c checklistDoc
		if err := cur.Decode(&c); err != nil {
			writeError(w, http.StatusInternalServerError, "db decode failed")
			return
		}
		out = append(out, checklistItemDTO{
			ID: c.ID, TaskID: c.TaskID, Label: c.Label, Done: c.Done,
			CreatedBy: c.CreatedBy, CreatedByName: c.CreatedByName, CreatedAt: iso(c.CreatedAt),
		})
	}
	writeJSON(w, http.StatusOK, out)
}

func (s *Server) AddChecklistItem(w http.ResponseWriter, r *http.Request) {
	me, _ := auth.UserFrom(r.Context())
	id, ok := pathID(r, "id")
	ctx, cancel := reqCtx(r)
	defer cancel()
	if !ok || !s.canViewTask(ctx, me.ID, id) {
		writeError(w, http.StatusNotFound, "not found")
		return
	}
	if !s.isCreator(ctx, me.ID, id) {
		writeError(w, http.StatusForbidden, "only the task creator can add checklist items")
		return
	}
	var in createChecklistInput
	if err := decodeJSON(r, &in); err != nil {
		writeError(w, http.StatusBadRequest, "invalid body")
		return
	}
	in.Label = strings.TrimSpace(in.Label)
	if in.Label == "" {
		writeError(w, http.StatusBadRequest, "label required")
		return
	}
	cid, err := s.DB.NextID(ctx, "task_checklist")
	if err != nil {
		writeError(w, http.StatusInternalServerError, "id alloc failed")
		return
	}
	now := nowUTC()
	doc := checklistDoc{
		ID: cid, TaskID: id, Label: in.Label, Done: false,
		CreatedBy: me.ID, CreatedByName: me.Username, CreatedAt: now,
	}
	if _, err := s.DB.TaskChecklist.InsertOne(ctx, doc); err != nil {
		writeError(w, http.StatusInternalServerError, "db insert failed")
		return
	}
	s.recordActivity(ctx, id, me.ID, me.Username, "checklist-add", in.Label)
	writeJSON(w, http.StatusCreated, checklistItemDTO{
		ID: cid, TaskID: id, Label: in.Label, Done: false,
		CreatedBy: me.ID, CreatedByName: me.Username, CreatedAt: iso(now),
	})
}

func (s *Server) PatchChecklistItem(w http.ResponseWriter, r *http.Request) {
	me, _ := auth.UserFrom(r.Context())
	id, ok := pathID(r, "id")
	ctx, cancel := reqCtx(r)
	defer cancel()
	if !ok || !s.canViewTask(ctx, me.ID, id) {
		writeError(w, http.StatusNotFound, "not found")
		return
	}
	itemID, ok := pathID(r, "itemId")
	if !ok {
		writeError(w, http.StatusBadRequest, "bad item id")
		return
	}
	var in patchChecklistInput
	if err := decodeJSON(r, &in); err != nil {
		writeError(w, http.StatusBadRequest, "invalid body")
		return
	}
	if in.Done == nil {
		writeError(w, http.StatusBadRequest, "done required")
		return
	}
	res, err := s.DB.TaskChecklist.UpdateOne(ctx,
		bson.M{"_id": itemID, "task_id": id},
		bson.M{"$set": bson.M{"done": *in.Done}},
	)
	if err != nil {
		writeError(w, http.StatusInternalServerError, "db update failed")
		return
	}
	if res.MatchedCount == 0 {
		writeError(w, http.StatusNotFound, "checklist item not found")
		return
	}
	kind := "checklist-uncheck"
	if *in.Done {
		kind = "checklist-check"
	}
	s.recordActivity(ctx, id, me.ID, me.Username, kind, "")
	w.WriteHeader(http.StatusNoContent)
}

// ---------- Activity ----------

func (s *Server) ListActivity(w http.ResponseWriter, r *http.Request) {
	me, _ := auth.UserFrom(r.Context())
	id, ok := pathID(r, "id")
	ctx, cancel := reqCtx(r)
	defer cancel()
	if !ok || !s.canViewTask(ctx, me.ID, id) {
		writeError(w, http.StatusNotFound, "not found")
		return
	}
	cur, err := s.DB.TaskActivity.Find(ctx,
		bson.M{"task_id": id},
		options.Find().SetSort(bson.D{{Key: "_id", Value: -1}}).SetLimit(200),
	)
	if err != nil {
		writeError(w, http.StatusInternalServerError, "db query failed")
		return
	}
	defer cur.Close(ctx)

	out := []activityDTO{}
	for cur.Next(ctx) {
		var a activityDoc
		if err := cur.Decode(&a); err != nil {
			writeError(w, http.StatusInternalServerError, "db decode failed")
			return
		}
		out = append(out, activityDTO{
			ID: a.ID, TaskID: a.TaskID, ActorID: a.ActorID, ActorName: a.ActorName,
			Kind: a.Kind, Detail: a.Detail, CreatedAt: iso(a.CreatedAt),
		})
	}
	writeJSON(w, http.StatusOK, out)
}
