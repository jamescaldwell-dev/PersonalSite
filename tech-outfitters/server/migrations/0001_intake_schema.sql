-- Intake workflow schema. All free-text fields nullable; only clients.first_name/last_name/email are enforced NOT NULL.
CREATE TABLE clients (
  id TEXT PRIMARY KEY,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now')),
  status TEXT NOT NULL DEFAULT 'intake' CHECK (status IN ('intake', 'design', 'development', 'deployment', 'support')),
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  company TEXT,
  phone TEXT,
  address TEXT,
  business_type TEXT
);

CREATE TABLE intake_submissions (
  id TEXT PRIMARY KEY,
  client_id TEXT NOT NULL REFERENCES clients(id) ON DELETE CASCADE,
  current_step INTEGER NOT NULL DEFAULT 1,
  status TEXT NOT NULL DEFAULT 'in_progress' CHECK (status IN ('in_progress', 'submitted')),
  has_current_website INTEGER,
  current_website_url TEXT,
  current_website_likes TEXT,
  current_website_dislikes TEXT,
  has_design_in_mind INTEGER,
  features_needed TEXT,
  existing_domain TEXT,
  has_no_domain INTEGER NOT NULL DEFAULT 0,
  preferred_tech_stack TEXT,
  has_brand_guidelines INTEGER,
  submitted_at TEXT
);

CREATE INDEX idx_intake_submissions_client_id ON intake_submissions(client_id);

-- Dynamic comparison-site list, capped at 3 rows per submission (enforced in the Worker).
CREATE TABLE comparison_sites (
  id TEXT PRIMARY KEY,
  submission_id TEXT NOT NULL REFERENCES intake_submissions(id) ON DELETE CASCADE,
  url TEXT NOT NULL,
  likes_notes TEXT,
  sort_order INTEGER NOT NULL DEFAULT 0
);

CREATE INDEX idx_comparison_sites_submission_id ON comparison_sites(submission_id);

CREATE TABLE client_files (
  id TEXT PRIMARY KEY,
  client_id TEXT NOT NULL REFERENCES clients(id) ON DELETE CASCADE,
  submission_id TEXT REFERENCES intake_submissions(id) ON DELETE SET NULL,
  file_type TEXT NOT NULL CHECK (file_type IN ('design_reference', 'brand_guidelines')),
  r2_key TEXT NOT NULL,
  original_filename TEXT NOT NULL,
  size_bytes INTEGER NOT NULL,
  uploaded_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE INDEX idx_client_files_client_id ON client_files(client_id);
