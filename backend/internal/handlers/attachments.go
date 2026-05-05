package handlers

import (
	"errors"
	"fmt"
	"io"
	"net/http"
	"os"
	"path/filepath"
	"strings"

	"go.mongodb.org/mongo-driver/v2/bson"
	"go.mongodb.org/mongo-driver/v2/mongo"

	"github.com/othcloud/terminal-backend/internal/auth"
)

// 25 MiB cap. Tweak via UPLOAD_MAX_BYTES env var if needed.
const defaultMaxUpload int64 = 25 << 20

func allowedImageMime(m string) bool {
	switch strings.ToLower(m) {
	case "image/png", "image/jpeg", "image/gif", "image/webp", "image/svg+xml":
		return true
	}
	return false
}

// UploadDir is the directory where uploaded files are stored. Set by main.go
// before any handler runs.
var UploadDir = "./uploads"

// MaxUploadBytes is the max body size accepted by upload endpoints.
var MaxUploadBytes int64 = defaultMaxUpload

func ensureUploadDir() error {
	return os.MkdirAll(UploadDir, 0o755)
}

// PostMessageWithAttachment handles a multipart upload that creates an
// attachment file on disk + a chat message that references it. The text body
// is optional.
func (s *Server) PostMessageWithAttachment(w http.ResponseWriter, r *http.Request) {
	me, _ := auth.UserFrom(r.Context())
	id, ok := pathID(r, "id")
	ctx, cancel := reqCtx(r)
	defer cancel()
	if !ok || !s.canViewTask(ctx, me.ID, id) {
		writeError(w, http.StatusNotFound, "not found")
		return
	}

	r.Body = http.MaxBytesReader(w, r.Body, MaxUploadBytes)
	if err := r.ParseMultipartForm(MaxUploadBytes); err != nil {
		writeError(w, http.StatusBadRequest, "invalid multipart body: "+err.Error())
		return
	}

	body := strings.TrimSpace(r.FormValue("body"))

	file, header, err := r.FormFile("file")
	if err != nil {
		writeError(w, http.StatusBadRequest, "missing 'file' field")
		return
	}
	defer file.Close()

	mime := header.Header.Get("Content-Type")
	if mime == "" {
		mime = "application/octet-stream"
	}
	if !allowedImageMime(mime) {
		writeError(w, http.StatusUnsupportedMediaType, "only image uploads are accepted")
		return
	}

	if err := ensureUploadDir(); err != nil {
		writeError(w, http.StatusInternalServerError, "upload dir failed")
		return
	}

	attachID, err := s.DB.NextID(ctx, "task_attachments")
	if err != nil {
		writeError(w, http.StatusInternalServerError, "id alloc failed")
		return
	}

	dest := filepath.Join(UploadDir, fmt.Sprintf("%d", attachID))
	out, err := os.Create(dest)
	if err != nil {
		writeError(w, http.StatusInternalServerError, "cannot create file")
		return
	}
	written, err := io.Copy(out, file)
	closeErr := out.Close()
	if err != nil || closeErr != nil {
		_ = os.Remove(dest)
		writeError(w, http.StatusInternalServerError, "write failed")
		return
	}

	att := attachmentDoc{
		ID: attachID, TaskID: id, Mime: mime, OriginalName: header.Filename,
		Size: written, FilePath: dest, UploadedBy: me.ID, UploadedAt: nowUTC(),
	}
	if _, err := s.DB.TaskAttachments.InsertOne(ctx, att); err != nil {
		_ = os.Remove(dest)
		writeError(w, http.StatusInternalServerError, "db insert (attachment) failed")
		return
	}

	mid, err := s.DB.NextID(ctx, "task_messages")
	if err != nil {
		writeError(w, http.StatusInternalServerError, "id alloc failed")
		return
	}
	now := nowUTC()
	mime2 := mime
	name2 := header.Filename
	msg := messageDoc{
		ID: mid, TaskID: id, AuthorID: me.ID, AuthorUsername: me.Username,
		Body: body, CreatedAt: now,
		AttachmentID: &attachID, AttachmentMime: &mime2, AttachmentName: &name2,
	}
	if _, err := s.DB.TaskMessages.InsertOne(ctx, msg); err != nil {
		writeError(w, http.StatusInternalServerError, "db insert (message) failed")
		return
	}
	s.recordActivity(ctx, id, me.ID, me.Username, "attachment", header.Filename)
	_, _ = s.DB.Tasks.UpdateOne(ctx, bson.M{"_id": id}, bson.M{"$set": bson.M{"updated_at": now}})

	writeJSON(w, http.StatusCreated, messageDTO{
		ID: mid, TaskID: id, AuthorID: me.ID, AuthorUsername: me.Username,
		Body: body, CreatedAt: iso(now),
		AttachmentID: &attachID, AttachmentMime: &mime2, AttachmentName: &name2,
	})
}

// GetAttachment streams the bytes of a previously-uploaded file. Authorisation
// is enforced by RequireUser at the mux level; we additionally check that the
// caller can view the parent task before serving.
func (s *Server) GetAttachment(w http.ResponseWriter, r *http.Request) {
	me, _ := auth.UserFrom(r.Context())
	attachID, ok := pathID(r, "id")
	if !ok {
		writeError(w, http.StatusBadRequest, "bad id")
		return
	}
	ctx, cancel := reqCtx(r)
	defer cancel()

	var att attachmentDoc
	err := s.DB.TaskAttachments.FindOne(ctx, bson.M{"_id": attachID}).Decode(&att)
	if errors.Is(err, mongo.ErrNoDocuments) {
		writeError(w, http.StatusNotFound, "not found")
		return
	}
	if err != nil {
		writeError(w, http.StatusInternalServerError, "db lookup failed")
		return
	}
	if !s.canViewTask(ctx, me.ID, att.TaskID) {
		writeError(w, http.StatusNotFound, "not found")
		return
	}

	f, err := os.Open(att.FilePath)
	if err != nil {
		writeError(w, http.StatusGone, "file missing on disk")
		return
	}
	defer f.Close()

	w.Header().Set("Content-Type", att.Mime)
	w.Header().Set("Content-Length", fmt.Sprintf("%d", att.Size))
	w.Header().Set("Cache-Control", "private, max-age=3600")
	if att.OriginalName != "" {
		// Quote the filename so unusual characters don't break the header.
		w.Header().Set("Content-Disposition", fmt.Sprintf(`inline; filename=%q`, att.OriginalName))
	}
	_, _ = io.Copy(w, f)
}
