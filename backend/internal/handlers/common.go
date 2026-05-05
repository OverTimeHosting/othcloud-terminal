package handlers

import (
	"context"
	"encoding/json"
	"net/http"
	"time"

	"github.com/othcloud/terminal-backend/internal/auth"
	"github.com/othcloud/terminal-backend/internal/db"
)

type Server struct {
	DB   *db.DB
	Auth auth.Config
}

func writeJSON(w http.ResponseWriter, status int, v any) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(status)
	_ = json.NewEncoder(w).Encode(v)
}

func writeError(w http.ResponseWriter, status int, msg string) {
	writeJSON(w, status, map[string]string{"error": msg})
}

func decodeJSON(r *http.Request, dst any) error {
	dec := json.NewDecoder(r.Body)
	dec.DisallowUnknownFields()
	return dec.Decode(dst)
}

func nowUTC() time.Time {
	return time.Now().UTC()
}

func reqCtx(r *http.Request) (context.Context, context.CancelFunc) {
	return context.WithTimeout(r.Context(), 10*time.Second)
}
