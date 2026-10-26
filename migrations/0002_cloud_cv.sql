CREATE TABLE IF NOT EXISTS cloud_cvs (
  sync_code TEXT PRIMARY KEY,
  doc JSONB NOT NULL,
  title TEXT NOT NULL DEFAULT 'Mon CV',
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_cloud_cvs_updated_at ON cloud_cvs(updated_at DESC);
