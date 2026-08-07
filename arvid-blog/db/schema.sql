-- Schema for the Arvid blog (Turso / libSQL).
-- Apply with:  turso db shell <db-name> < db/schema.sql

-- Replaces the Firestore `blog-data` collection.
-- `id` stays TEXT so existing Firestore document ids survive the migration.
CREATE TABLE IF NOT EXISTS blog_posts (
  id           TEXT PRIMARY KEY,
  title        TEXT NOT NULL DEFAULT '',
  category     TEXT NOT NULL DEFAULT '',
  description  TEXT NOT NULL DEFAULT '',
  example_link TEXT NOT NULL DEFAULT '',
  posted_by    TEXT NOT NULL DEFAULT '',
  created_at   TEXT
);

CREATE INDEX IF NOT EXISTS idx_blog_posts_created_at ON blog_posts (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_blog_posts_category ON blog_posts (category);

-- Replaces the Firestore `html` collection.
-- These documents had no meaningful id, so this table uses a surrogate key
-- plus an explicit sort_order to keep a stable display order.
CREATE TABLE IF NOT EXISTS html_notes (
  id          INTEGER PRIMARY KEY AUTOINCREMENT,
  type        TEXT NOT NULL DEFAULT '',
  title       TEXT NOT NULL DEFAULT '',
  sub_title   TEXT NOT NULL DEFAULT '',
  description TEXT NOT NULL DEFAULT '',
  example     TEXT NOT NULL DEFAULT '',
  sort_order  INTEGER NOT NULL DEFAULT 0
);

CREATE INDEX IF NOT EXISTS idx_html_notes_sort_order ON html_notes (sort_order);
