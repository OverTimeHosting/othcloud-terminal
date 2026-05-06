package handlers

import (
	"errors"
	"net/http"
	"strings"
	"time"

	"go.mongodb.org/mongo-driver/v2/bson"
	"go.mongodb.org/mongo-driver/v2/mongo"
	"go.mongodb.org/mongo-driver/v2/mongo/options"

	"github.com/othcloud/terminal-backend/internal/auth"
)

// ---------- DTOs ----------

type repoLinkDTO struct {
	ID       int64  `json:"id"`
	Name     string `json:"name"`
	URL      string `json:"url"`
	Provider string `json:"provider"`
}

type serviceDTO struct {
	ID              int64         `json:"id"`
	Title           string        `json:"title"`
	Description     string        `json:"description"`
	Repos           []repoLinkDTO `json:"repos"`
	CreatorID       int64         `json:"creatorId"`
	CreatorUsername string        `json:"creatorUsername"`
	CreatedAt       string        `json:"createdAt"`
	UpdatedAt       string        `json:"updatedAt"`
}

// ---------- Mongo docs ----------

type serviceDoc struct {
	ID              int64        `bson:"_id"`
	Title           string       `bson:"title"`
	Description     string       `bson:"description"`
	Repos           []repoLinkDB `bson:"repos"`
	CreatorID       int64        `bson:"creator_id"`
	CreatorUsername string       `bson:"creator_username"`
	CreatedAt       time.Time    `bson:"created_at"`
	UpdatedAt       time.Time    `bson:"updated_at"`
}

type repoLinkDB struct {
	ID       int64  `bson:"id"`
	Name     string `bson:"name"`
	URL      string `bson:"url"`
	Provider string `bson:"provider"`
}

// ---------- Inputs ----------

type createServiceInput struct {
	Title       string `json:"title"`
	Description string `json:"description"`
}

type patchServiceInput struct {
	Title       *string `json:"title,omitempty"`
	Description *string `json:"description,omitempty"`
}

type addRepoInput struct {
	Name     string `json:"name"`
	URL      string `json:"url"`
	Provider string `json:"provider"`
}

// ---------- Helpers ----------

func toServiceDTO(s serviceDoc) serviceDTO {
	repos := make([]repoLinkDTO, 0, len(s.Repos))
	for _, r := range s.Repos {
		repos = append(repos, repoLinkDTO{ID: r.ID, Name: r.Name, URL: r.URL, Provider: r.Provider})
	}
	return serviceDTO{
		ID: s.ID, Title: s.Title, Description: s.Description, Repos: repos,
		CreatorID: s.CreatorID, CreatorUsername: s.CreatorUsername,
		CreatedAt: iso(s.CreatedAt), UpdatedAt: iso(s.UpdatedAt),
	}
}

// ---------- Handlers ----------

func (s *Server) ListServices(w http.ResponseWriter, r *http.Request) {
	ctx, cancel := reqCtx(r)
	defer cancel()
	cur, err := s.DB.Services.Find(ctx, bson.M{},
		options.Find().SetSort(bson.D{{Key: "updated_at", Value: -1}}),
	)
	if err != nil {
		writeError(w, http.StatusInternalServerError, "db query failed")
		return
	}
	defer cur.Close(ctx)

	out := []serviceDTO{}
	for cur.Next(ctx) {
		var doc serviceDoc
		if err := cur.Decode(&doc); err != nil {
			writeError(w, http.StatusInternalServerError, "db decode failed")
			return
		}
		out = append(out, toServiceDTO(doc))
	}
	writeJSON(w, http.StatusOK, out)
}

func (s *Server) CreateService(w http.ResponseWriter, r *http.Request) {
	me, _ := auth.UserFrom(r.Context())
	var in createServiceInput
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
	id, err := s.DB.NextID(ctx, "services")
	if err != nil {
		writeError(w, http.StatusInternalServerError, "id alloc failed")
		return
	}
	now := nowUTC()
	doc := serviceDoc{
		ID: id, Title: in.Title, Description: in.Description, Repos: []repoLinkDB{},
		CreatorID: me.ID, CreatorUsername: me.Username, CreatedAt: now, UpdatedAt: now,
	}
	if _, err := s.DB.Services.InsertOne(ctx, doc); err != nil {
		writeError(w, http.StatusInternalServerError, "db insert failed")
		return
	}
	writeJSON(w, http.StatusCreated, toServiceDTO(doc))
}

func (s *Server) GetService(w http.ResponseWriter, r *http.Request) {
	id, ok := pathID(r, "id")
	if !ok {
		writeError(w, http.StatusBadRequest, "bad id")
		return
	}
	ctx, cancel := reqCtx(r)
	defer cancel()
	var doc serviceDoc
	err := s.DB.Services.FindOne(ctx, bson.M{"_id": id}).Decode(&doc)
	if errors.Is(err, mongo.ErrNoDocuments) {
		writeError(w, http.StatusNotFound, "not found")
		return
	}
	if err != nil {
		writeError(w, http.StatusInternalServerError, "db lookup failed")
		return
	}
	writeJSON(w, http.StatusOK, toServiceDTO(doc))
}

func (s *Server) PatchService(w http.ResponseWriter, r *http.Request) {
	id, ok := pathID(r, "id")
	if !ok {
		writeError(w, http.StatusBadRequest, "bad id")
		return
	}
	var in patchServiceInput
	if err := decodeJSON(r, &in); err != nil {
		writeError(w, http.StatusBadRequest, "invalid body")
		return
	}
	ctx, cancel := reqCtx(r)
	defer cancel()
	set := bson.M{}
	if in.Title != nil {
		set["title"] = *in.Title
	}
	if in.Description != nil {
		set["description"] = *in.Description
	}
	if len(set) == 0 {
		s.GetService(w, r)
		return
	}
	set["updated_at"] = nowUTC()
	res, err := s.DB.Services.UpdateOne(ctx, bson.M{"_id": id}, bson.M{"$set": set})
	if err != nil {
		writeError(w, http.StatusInternalServerError, "db update failed")
		return
	}
	if res.MatchedCount == 0 {
		writeError(w, http.StatusNotFound, "not found")
		return
	}
	s.GetService(w, r)
}

func (s *Server) AddServiceRepo(w http.ResponseWriter, r *http.Request) {
	id, ok := pathID(r, "id")
	if !ok {
		writeError(w, http.StatusBadRequest, "bad id")
		return
	}
	var in addRepoInput
	if err := decodeJSON(r, &in); err != nil {
		writeError(w, http.StatusBadRequest, "invalid body")
		return
	}
	in.Name = strings.TrimSpace(in.Name)
	in.URL = strings.TrimSpace(in.URL)
	if in.URL == "" {
		writeError(w, http.StatusBadRequest, "url required")
		return
	}
	if in.Name == "" {
		in.Name = in.URL
	}
	if in.Provider == "" {
		in.Provider = "github"
	}
	ctx, cancel := reqCtx(r)
	defer cancel()
	repoID, err := s.DB.NextID(ctx, "service_repos")
	if err != nil {
		writeError(w, http.StatusInternalServerError, "id alloc failed")
		return
	}
	repo := repoLinkDB{ID: repoID, Name: in.Name, URL: in.URL, Provider: in.Provider}
	res, err := s.DB.Services.UpdateOne(ctx,
		bson.M{"_id": id},
		bson.M{"$push": bson.M{"repos": repo}, "$set": bson.M{"updated_at": nowUTC()}},
	)
	if err != nil {
		writeError(w, http.StatusInternalServerError, "db update failed")
		return
	}
	if res.MatchedCount == 0 {
		writeError(w, http.StatusNotFound, "service not found")
		return
	}
	writeJSON(w, http.StatusCreated, repoLinkDTO{ID: repo.ID, Name: repo.Name, URL: repo.URL, Provider: repo.Provider})
}

func (s *Server) RemoveServiceRepo(w http.ResponseWriter, r *http.Request) {
	id, ok := pathID(r, "id")
	if !ok {
		writeError(w, http.StatusBadRequest, "bad id")
		return
	}
	repoID, ok := pathID(r, "repoId")
	if !ok {
		writeError(w, http.StatusBadRequest, "bad repo id")
		return
	}
	ctx, cancel := reqCtx(r)
	defer cancel()
	res, err := s.DB.Services.UpdateOne(ctx,
		bson.M{"_id": id},
		bson.M{"$pull": bson.M{"repos": bson.M{"id": repoID}}, "$set": bson.M{"updated_at": nowUTC()}},
	)
	if err != nil {
		writeError(w, http.StatusInternalServerError, "db update failed")
		return
	}
	if res.MatchedCount == 0 {
		writeError(w, http.StatusNotFound, "service not found")
		return
	}
	w.WriteHeader(http.StatusNoContent)
}
