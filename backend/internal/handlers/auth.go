package handlers

import (
	"errors"
	"net/http"
	"strings"
	"time"

	"go.mongodb.org/mongo-driver/v2/bson"
	"go.mongodb.org/mongo-driver/v2/mongo"

	"github.com/othcloud/terminal-backend/internal/auth"
)

type credentials struct {
	Username string `json:"username"`
	Password string `json:"password"`
}

type userDTO struct {
	ID       int64  `json:"id"`
	Username string `json:"username"`
}

type authResponse struct {
	Token string  `json:"token"`
	User  userDTO `json:"user"`
}

type userDoc struct {
	ID           int64     `bson:"_id"`
	Username     string    `bson:"username"`
	PasswordHash string    `bson:"password_hash"`
	CreatedAt    time.Time `bson:"created_at"`
}

func (s *Server) Register(w http.ResponseWriter, r *http.Request) {
	var c credentials
	if err := decodeJSON(r, &c); err != nil {
		writeError(w, http.StatusBadRequest, "invalid body")
		return
	}
	c.Username = strings.TrimSpace(c.Username)
	if len(c.Username) < 3 || len(c.Password) < 6 {
		writeError(w, http.StatusBadRequest, "username must be >= 3 chars and password >= 6")
		return
	}

	hash, err := auth.HashPassword(c.Password)
	if err != nil {
		writeError(w, http.StatusInternalServerError, "hash failed")
		return
	}

	ctx, cancel := reqCtx(r)
	defer cancel()

	id, err := s.DB.NextID(ctx, "users")
	if err != nil {
		writeError(w, http.StatusInternalServerError, "id alloc failed")
		return
	}

	doc := userDoc{ID: id, Username: c.Username, PasswordHash: hash, CreatedAt: nowUTC()}
	if _, err := s.DB.Users.InsertOne(ctx, doc); err != nil {
		if mongo.IsDuplicateKeyError(err) {
			writeError(w, http.StatusConflict, "username already taken")
			return
		}
		writeError(w, http.StatusInternalServerError, "db insert failed")
		return
	}

	tok, _, err := auth.IssueToken(s.Auth, id, c.Username)
	if err != nil {
		writeError(w, http.StatusInternalServerError, "token signing failed")
		return
	}
	writeJSON(w, http.StatusCreated, authResponse{Token: tok, User: userDTO{ID: id, Username: c.Username}})
}

func (s *Server) Login(w http.ResponseWriter, r *http.Request) {
	var c credentials
	if err := decodeJSON(r, &c); err != nil {
		writeError(w, http.StatusBadRequest, "invalid body")
		return
	}
	c.Username = strings.TrimSpace(c.Username)

	ctx, cancel := reqCtx(r)
	defer cancel()

	var u userDoc
	err := s.DB.Users.FindOne(ctx, bson.M{"username": c.Username}).Decode(&u)
	if errors.Is(err, mongo.ErrNoDocuments) || (err == nil && !auth.CheckPassword(u.PasswordHash, c.Password)) {
		writeError(w, http.StatusUnauthorized, "invalid credentials")
		return
	}
	if err != nil {
		writeError(w, http.StatusInternalServerError, "db query failed")
		return
	}

	tok, _, err := auth.IssueToken(s.Auth, u.ID, u.Username)
	if err != nil {
		writeError(w, http.StatusInternalServerError, "token signing failed")
		return
	}
	writeJSON(w, http.StatusOK, authResponse{Token: tok, User: userDTO{ID: u.ID, Username: u.Username}})
}

func (s *Server) Me(w http.ResponseWriter, r *http.Request) {
	u, ok := auth.UserFrom(r.Context())
	if !ok {
		writeError(w, http.StatusUnauthorized, "no session")
		return
	}
	writeJSON(w, http.StatusOK, userDTO{ID: u.ID, Username: u.Username})
}
