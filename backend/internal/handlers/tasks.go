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
	ID               int64          `json:"id"`
	Title            string         `json:"title"`
	Description      string         `json:"description"`
	Status           string         `json:"status"`
	CreatorID        int64          `json:"creatorId"`
	CreatorUsername  string         `json:"creatorUsername"`
	AssigneeID       *int64         `json:"assigneeId,omitempty"`
	AssigneeUsername *string        `json:"assigneeUsername,omitempty"`
	ServiceID        *int64         `json:"serviceId,omitempty"`
	Commits          []commitDTO    `json:"commits"`
	Source           *taskSourceDTO `json:"source,omitempty"`
	CreatedAt        string         `json:"createdAt"`
	UpdatedAt        string         `json:"updatedAt"`
}

type taskSourceDTO struct {
	FilePath  string `json:"filePath"`
	LineStart int    `json:"lineStart"`
	LineEnd   int    `json:"lineEnd"`
	Snippet   string `json:"snippet,omitempty"`
}

type commitDTO struct {
	ID           int64  `json:"id"`
	SHA          string `json:"sha"`
	URL          string `json:"url"`
	RepoFullName string `json:"repoFullName,omitempty"`
	Message      string `json:"message,omitempty"`
	LinkedBy     int64  `json:"linkedBy"`
	LinkedByName string `json:"linkedByName"`
	LinkedAt     string `json:"linkedAt"`
}

type addCommitInput struct {
	URL          string `json:"url"`
	SHA          string `json:"sha"`
	RepoFullName string `json:"repoFullName"`
	Message      string `json:"message"`
}

type messageDTO struct {
	ID             int64   `json:"id"`
	TaskID         int64   `json:"taskId"`
	AuthorID       int64   `json:"authorId"`
	AuthorUsername string  `json:"authorUsername"`
	Body           string  `json:"body"`
	CreatedAt      string  `json:"createdAt"`
	AttachmentID   *int64  `json:"attachmentId,omitempty"`
	AttachmentMime *string `json:"attachmentMime,omitempty"`
	AttachmentName *string `json:"attachmentName,omitempty"`
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
	ID               int64           `bson:"_id"`
	Title            string          `bson:"title"`
	Description      string          `bson:"description"`
	Status           string          `bson:"status"`
	CreatorID        int64           `bson:"creator_id"`
	CreatorUsername  string          `bson:"creator_username"`
	AssigneeID       *int64          `bson:"assignee_id,omitempty"`
	AssigneeUsername *string         `bson:"assignee_username,omitempty"`
	ServiceID        *int64          `bson:"service_id,omitempty"`
	Commits          []commitDoc     `bson:"commits,omitempty"`
	Source           *taskSourceDoc  `bson:"source,omitempty"`
	CreatedAt        time.Time       `bson:"created_at"`
	UpdatedAt        time.Time       `bson:"updated_at"`
}

type taskSourceDoc struct {
	FilePath  string `bson:"file_path"`
	LineStart int    `bson:"line_start"`
	LineEnd   int    `bson:"line_end"`
	Snippet   string `bson:"snippet,omitempty"`
}

type commitDoc struct {
	ID             int64     `bson:"id"`
	SHA            string    `bson:"sha"`
	URL            string    `bson:"url"`
	RepoFullName   string    `bson:"repo_full_name,omitempty"`
	Message        string    `bson:"message,omitempty"`
	LinkedBy       int64     `bson:"linked_by"`
	LinkedByName   string    `bson:"linked_by_name"`
	LinkedAt       time.Time `bson:"linked_at"`
}

type messageDoc struct {
	ID             int64     `bson:"_id"`
	TaskID         int64     `bson:"task_id"`
	AuthorID       int64     `bson:"author_id"`
	AuthorUsername string    `bson:"author_username"`
	Body           string    `bson:"body"`
	CreatedAt      time.Time `bson:"created_at"`
	AttachmentID   *int64    `bson:"attachment_id,omitempty"`
	AttachmentMime *string   `bson:"attachment_mime,omitempty"`
	AttachmentName *string   `bson:"attachment_name,omitempty"`
}

type attachmentDoc struct {
	ID           int64     `bson:"_id"`
	TaskID       int64     `bson:"task_id"`
	Mime         string    `bson:"mime"`
	OriginalName string    `bson:"original_name"`
	Size         int64     `bson:"size"`
	FilePath     string    `bson:"file_path"`
	UploadedBy   int64     `bson:"uploaded_by"`
	UploadedAt   time.Time `bson:"uploaded_at"`
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
	Title            string         `json:"title"`
	Description      string         `json:"description"`
	AssigneeUsername string         `json:"assigneeUsername"`
	ServiceID        *int64         `json:"serviceId,omitempty"`
	Source           *taskSourceDTO `json:"source,omitempty"`
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
	commits := make([]commitDTO, 0, len(t.Commits))
	for _, c := range t.Commits {
		commits = append(commits, commitDTO{
			ID: c.ID, SHA: c.SHA, URL: c.URL, RepoFullName: c.RepoFullName, Message: c.Message,
			LinkedBy: c.LinkedBy, LinkedByName: c.LinkedByName, LinkedAt: iso(c.LinkedAt),
		})
	}
	var source *taskSourceDTO
	if t.Source != nil {
		source = &taskSourceDTO{
			FilePath: t.Source.FilePath, LineStart: t.Source.LineStart,
			LineEnd: t.Source.LineEnd, Snippet: t.Source.Snippet,
		}
	}
	dto := taskDTO{
		ID: t.ID, Title: t.Title, Description: t.Description, Status: t.Status,
		CreatorID: t.CreatorID, CreatorUsername: t.CreatorUsername,
		AssigneeID: t.AssigneeID, AssigneeUsername: t.AssigneeUsername,
		ServiceID: t.ServiceID,
		Commits: commits,
		Source: source,
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

	filter := bson.M{"$or": bson.A{
		bson.M{"creator_id": me.ID},
		bson.M{"assignee_id": me.ID},
	}}
	if raw := r.URL.Query().Get("serviceId"); raw != "" {
		if sid, err := strconv.ParseInt(raw, 10, 64); err == nil {
			filter["service_id"] = sid
		}
	} else {
		// Without a serviceId filter, the global tasks list should only
		// show tasks that aren't tied to a service — service-scoped tasks
		// are reachable from their service detail page.
		filter["service_id"] = bson.M{"$exists": false}
	}

	cur, err := s.DB.Tasks.Find(ctx, filter,
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
	var src *taskSourceDoc
	if in.Source != nil && in.Source.FilePath != "" {
		src = &taskSourceDoc{
			FilePath: in.Source.FilePath, LineStart: in.Source.LineStart,
			LineEnd: in.Source.LineEnd, Snippet: in.Source.Snippet,
		}
	}
	now := nowUTC()
	doc := taskDoc{
		ID: id, Title: in.Title, Description: in.Description, Status: "open",
		CreatorID: me.ID, CreatorUsername: me.Username,
		AssigneeID: assigneeID, AssigneeUsername: assigneeName,
		ServiceID: in.ServiceID,
		Source: src,
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
			AttachmentID: m.AttachmentID, AttachmentMime: m.AttachmentMime, AttachmentName: m.AttachmentName,
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

// ---------- Commits ----------

func (s *Server) AddCommit(w http.ResponseWriter, r *http.Request) {
	me, _ := auth.UserFrom(r.Context())
	id, ok := pathID(r, "id")
	ctx, cancel := reqCtx(r)
	defer cancel()
	if !ok || !s.canViewTask(ctx, me.ID, id) {
		writeError(w, http.StatusNotFound, "not found")
		return
	}
	var in addCommitInput
	if err := decodeJSON(r, &in); err != nil {
		writeError(w, http.StatusBadRequest, "invalid body")
		return
	}
	in.URL = strings.TrimSpace(in.URL)
	in.SHA = strings.TrimSpace(in.SHA)
	if in.URL == "" || in.SHA == "" {
		writeError(w, http.StatusBadRequest, "url and sha required")
		return
	}
	cid, err := s.DB.NextID(ctx, "task_commits")
	if err != nil {
		writeError(w, http.StatusInternalServerError, "id alloc failed")
		return
	}
	now := nowUTC()
	c := commitDoc{
		ID: cid, SHA: in.SHA, URL: in.URL, RepoFullName: in.RepoFullName, Message: in.Message,
		LinkedBy: me.ID, LinkedByName: me.Username, LinkedAt: now,
	}
	res, err := s.DB.Tasks.UpdateOne(ctx, bson.M{"_id": id},
		bson.M{"$push": bson.M{"commits": c}, "$set": bson.M{"updated_at": now}},
	)
	if err != nil {
		writeError(w, http.StatusInternalServerError, "db update failed")
		return
	}
	if res.MatchedCount == 0 {
		writeError(w, http.StatusNotFound, "task not found")
		return
	}
	s.recordActivity(ctx, id, me.ID, me.Username, "commit-link", in.SHA)
	writeJSON(w, http.StatusCreated, commitDTO{
		ID: c.ID, SHA: c.SHA, URL: c.URL, RepoFullName: c.RepoFullName, Message: c.Message,
		LinkedBy: c.LinkedBy, LinkedByName: c.LinkedByName, LinkedAt: iso(c.LinkedAt),
	})
}

func (s *Server) RemoveCommit(w http.ResponseWriter, r *http.Request) {
	me, _ := auth.UserFrom(r.Context())
	id, ok := pathID(r, "id")
	ctx, cancel := reqCtx(r)
	defer cancel()
	if !ok || !s.canViewTask(ctx, me.ID, id) {
		writeError(w, http.StatusNotFound, "not found")
		return
	}
	commitID, ok := pathID(r, "commitId")
	if !ok {
		writeError(w, http.StatusBadRequest, "bad commit id")
		return
	}
	res, err := s.DB.Tasks.UpdateOne(ctx, bson.M{"_id": id},
		bson.M{"$pull": bson.M{"commits": bson.M{"id": commitID}}, "$set": bson.M{"updated_at": nowUTC()}},
	)
	if err != nil {
		writeError(w, http.StatusInternalServerError, "db update failed")
		return
	}
	if res.MatchedCount == 0 {
		writeError(w, http.StatusNotFound, "task not found")
		return
	}
	s.recordActivity(ctx, id, me.ID, me.Username, "commit-unlink", "")
	w.WriteHeader(http.StatusNoContent)
}
