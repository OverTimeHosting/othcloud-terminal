package db

import (
	"context"
	"fmt"
	"time"

	"go.mongodb.org/mongo-driver/v2/bson"
	"go.mongodb.org/mongo-driver/v2/mongo"
	"go.mongodb.org/mongo-driver/v2/mongo/options"
)

type DB struct {
	Client        *mongo.Client
	Database      *mongo.Database
	Counters      *mongo.Collection
	Users         *mongo.Collection
	Tasks         *mongo.Collection
	TaskMessages  *mongo.Collection
	TaskChecklist *mongo.Collection
	TaskActivity  *mongo.Collection
}

func Open(ctx context.Context, uri, dbName string) (*DB, error) {
	connectCtx, cancel := context.WithTimeout(ctx, 15*time.Second)
	defer cancel()

	client, err := mongo.Connect(options.Client().ApplyURI(uri))
	if err != nil {
		return nil, fmt.Errorf("mongo connect: %w", err)
	}
	if err := client.Ping(connectCtx, nil); err != nil {
		return nil, fmt.Errorf("mongo ping: %w", err)
	}

	d := client.Database(dbName)
	db := &DB{
		Client:        client,
		Database:      d,
		Counters:      d.Collection("counters"),
		Users:         d.Collection("users"),
		Tasks:         d.Collection("tasks"),
		TaskMessages:  d.Collection("task_messages"),
		TaskChecklist: d.Collection("task_checklist"),
		TaskActivity:  d.Collection("task_activity"),
	}
	if err := db.ensureIndexes(connectCtx); err != nil {
		return nil, fmt.Errorf("ensure indexes: %w", err)
	}
	return db, nil
}

func (d *DB) Close(ctx context.Context) error {
	return d.Client.Disconnect(ctx)
}

func (d *DB) ensureIndexes(ctx context.Context) error {
	if _, err := d.Users.Indexes().CreateOne(ctx, mongo.IndexModel{
		Keys:    bson.D{{Key: "username", Value: 1}},
		Options: options.Index().SetUnique(true),
	}); err != nil {
		return err
	}
	if _, err := d.Tasks.Indexes().CreateMany(ctx, []mongo.IndexModel{
		{Keys: bson.D{{Key: "creator_id", Value: 1}}},
		{Keys: bson.D{{Key: "assignee_id", Value: 1}}},
		{Keys: bson.D{{Key: "updated_at", Value: -1}}},
	}); err != nil {
		return err
	}
	if _, err := d.TaskMessages.Indexes().CreateOne(ctx, mongo.IndexModel{
		Keys: bson.D{{Key: "task_id", Value: 1}, {Key: "_id", Value: 1}},
	}); err != nil {
		return err
	}
	if _, err := d.TaskChecklist.Indexes().CreateOne(ctx, mongo.IndexModel{
		Keys: bson.D{{Key: "task_id", Value: 1}, {Key: "_id", Value: 1}},
	}); err != nil {
		return err
	}
	if _, err := d.TaskActivity.Indexes().CreateOne(ctx, mongo.IndexModel{
		Keys: bson.D{{Key: "task_id", Value: 1}, {Key: "_id", Value: -1}},
	}); err != nil {
		return err
	}
	return nil
}

// NextID returns the next sequential ID for the given counter key. We use this
// so the API contract keeps numeric IDs (frontend treats IDs as numbers).
func (d *DB) NextID(ctx context.Context, key string) (int64, error) {
	var result struct {
		Seq int64 `bson:"seq"`
	}
	err := d.Counters.FindOneAndUpdate(ctx,
		bson.M{"_id": key},
		bson.M{"$inc": bson.M{"seq": int64(1)}},
		options.FindOneAndUpdate().SetUpsert(true).SetReturnDocument(options.After),
	).Decode(&result)
	if err != nil {
		return 0, err
	}
	return result.Seq, nil
}
