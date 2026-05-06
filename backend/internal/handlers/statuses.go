package handlers

import (
	"net/http"
	"strings"

	"go.mongodb.org/mongo-driver/v2/bson"
	"go.mongodb.org/mongo-driver/v2/mongo/options"
)

type statusDTO struct {
	Key   string `json:"key"`
	Label string `json:"label"`
	Order int    `json:"order"`
}

type statusDoc struct {
	Key   string `bson:"_id"`
	Label string `bson:"label"`
	Order int    `bson:"order"`
}

type addStatusInput struct {
	Key   string `json:"key"`
	Label string `json:"label"`
	Order int    `json:"order"`
}

func (s *Server) ListStatuses(w http.ResponseWriter, r *http.Request) {
	ctx, cancel := reqCtx(r)
	defer cancel()
	cur, err := s.DB.Statuses.Find(ctx, bson.M{}, options.Find().SetSort(bson.D{{Key: "order", Value: 1}}))
	if err != nil {
		writeError(w, http.StatusInternalServerError, "db query failed")
		return
	}
	defer cur.Close(ctx)

	out := []statusDTO{}
	for cur.Next(ctx) {
		var d statusDoc
		if err := cur.Decode(&d); err != nil {
			writeError(w, http.StatusInternalServerError, "db decode failed")
			return
		}
		out = append(out, statusDTO{Key: d.Key, Label: d.Label, Order: d.Order})
	}
	writeJSON(w, http.StatusOK, out)
}

func (s *Server) AddStatus(w http.ResponseWriter, r *http.Request) {
	var in addStatusInput
	if err := decodeJSON(r, &in); err != nil {
		writeError(w, http.StatusBadRequest, "invalid body")
		return
	}
	in.Key = strings.TrimSpace(strings.ToLower(in.Key))
	in.Label = strings.TrimSpace(in.Label)
	if in.Key == "" || in.Label == "" {
		writeError(w, http.StatusBadRequest, "key and label required")
		return
	}
	// Keys must be safe for use as ids and CSS class names.
	for _, c := range in.Key {
		if !((c >= 'a' && c <= 'z') || (c >= '0' && c <= '9') || c == '_' || c == '-') {
			writeError(w, http.StatusBadRequest, "key may only contain a-z, 0-9, _ or -")
			return
		}
	}
	ctx, cancel := reqCtx(r)
	defer cancel()
	doc := statusDoc{Key: in.Key, Label: in.Label, Order: in.Order}
	res, err := s.DB.Statuses.UpdateOne(ctx,
		bson.M{"_id": in.Key},
		bson.M{"$set": bson.M{"label": doc.Label, "order": doc.Order}},
		options.UpdateOne().SetUpsert(true),
	)
	if err != nil {
		writeError(w, http.StatusInternalServerError, "db upsert failed")
		return
	}
	status := http.StatusOK
	if res.UpsertedCount > 0 {
		status = http.StatusCreated
	}
	writeJSON(w, status, statusDTO{Key: doc.Key, Label: doc.Label, Order: doc.Order})
}

func (s *Server) DeleteStatus(w http.ResponseWriter, r *http.Request) {
	key := r.PathValue("key")
	if key == "" {
		writeError(w, http.StatusBadRequest, "key required")
		return
	}
	if key == "open" {
		writeError(w, http.StatusBadRequest, "the default 'open' status cannot be deleted")
		return
	}
	ctx, cancel := reqCtx(r)
	defer cancel()
	if _, err := s.DB.Statuses.DeleteOne(ctx, bson.M{"_id": key}); err != nil {
		writeError(w, http.StatusInternalServerError, "db delete failed")
		return
	}
	// Migrate any tasks that were using this status back to "open" so they
	// don't fall off the kanban board entirely.
	if _, err := s.DB.Tasks.UpdateMany(ctx,
		bson.M{"status": key},
		bson.M{"$set": bson.M{"status": "open", "updated_at": nowUTC()}},
	); err != nil {
		writeError(w, http.StatusInternalServerError, "task migration failed")
		return
	}
	w.WriteHeader(http.StatusNoContent)
}
