CREATE TABLE monitor_import_jobs (
  server_id uuid PRIMARY KEY REFERENCES listed_servers(id) ON DELETE CASCADE,
  attempts integer NOT NULL DEFAULT 0 CHECK (attempts >= 0),
  next_attempt_at timestamptz NOT NULL DEFAULT now(),
  imported_at timestamptz,
  last_error text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX monitor_import_jobs_pending ON monitor_import_jobs (next_attempt_at)
WHERE imported_at IS NULL;

INSERT INTO monitor_import_jobs (server_id)
SELECT id FROM listed_servers
ON CONFLICT (server_id) DO NOTHING;
