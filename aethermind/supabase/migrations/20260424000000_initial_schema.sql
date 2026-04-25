-- AetherMind initial schema
-- Run: supabase db push (or paste into Supabase SQL editor)

-- Enable pgvector for semantic search
CREATE EXTENSION IF NOT EXISTS vector;

-- ─── users ───────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS users (
  id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email       text UNIQUE NOT NULL,
  timezone    text NOT NULL DEFAULT 'UTC',
  archetype   text CHECK (archetype IN ('analytical', 'emotional', 'action')),
  is_premium  boolean NOT NULL DEFAULT false,
  created_at  timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE users ENABLE ROW LEVEL SECURITY;
CREATE POLICY "users: own row only" ON users
  USING (auth.uid() = id);

-- ─── identity_profiles ───────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS identity_profiles (
  id                 uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id            uuid NOT NULL UNIQUE REFERENCES users(id) ON DELETE CASCADE,
  origin_statement   text NOT NULL DEFAULT '',
  desired_self       text NOT NULL DEFAULT '',
  transition_type    text NOT NULL DEFAULT '',
  key_vocabulary     jsonb NOT NULL DEFAULT '[]',
  chapter            integer NOT NULL DEFAULT 1,
  updated_at         timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE identity_profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "identity_profiles: own row only" ON identity_profiles
  USING (auth.uid() = user_id);

-- ─── beliefs ─────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS beliefs (
  id                uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id           uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  old_belief        text NOT NULL,
  new_story         text NOT NULL,
  baseline_score    float NOT NULL DEFAULT 8.0 CHECK (baseline_score BETWEEN 0 AND 10),
  current_score     float NOT NULL DEFAULT 8.0 CHECK (current_score BETWEEN 0 AND 10),
  score_history     jsonb NOT NULL DEFAULT '[]',
  trigger_patterns  jsonb NOT NULL DEFAULT '[]',
  breakthrough_days jsonb NOT NULL DEFAULT '[]',
  status            text NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'resolved', 'surfaced')),
  resolved_at       timestamptz
);

ALTER TABLE beliefs ENABLE ROW LEVEL SECURITY;
CREATE POLICY "beliefs: own rows only" ON beliefs
  USING (auth.uid() = user_id);

-- ─── journal_entries ─────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS journal_entries (
  id                    uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id               uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  belief_id             uuid NOT NULL REFERENCES beliefs(id),
  raw_content           text NOT NULL,
  rewrite               text,
  insight               text,
  identity_tag          text,
  emotion_tags          jsonb NOT NULL DEFAULT '[]',
  intensity_rating      float CHECK (intensity_rating BETWEEN 0 AND 10),
  tone_score            float CHECK (tone_score BETWEEN -1 AND 1),
  truth_score           float CHECK (truth_score BETWEEN 0 AND 1),
  processing_direction  float CHECK (processing_direction BETWEEN -1 AND 1),
  is_compressed         boolean NOT NULL DEFAULT false,
  embedding             vector(1536),
  created_at            timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE journal_entries ENABLE ROW LEVEL SECURITY;
CREATE POLICY "journal_entries: own rows only" ON journal_entries
  USING (auth.uid() = user_id);

-- HNSW index for fast cosine similarity search (pgvector)
CREATE INDEX IF NOT EXISTS journal_entries_embedding_idx
  ON journal_entries USING hnsw (embedding vector_cosine_ops)
  WITH (m = 16, ef_construction = 64);

-- ─── weekly_summaries ────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS weekly_summaries (
  id            uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id       uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  summary_text  text NOT NULL,
  stats         jsonb NOT NULL DEFAULT '{}',
  breakthroughs jsonb NOT NULL DEFAULT '[]',
  patterns      jsonb NOT NULL DEFAULT '[]',
  week_number   integer NOT NULL,
  created_at    timestamptz NOT NULL DEFAULT now(),
  UNIQUE(user_id, week_number)
);

ALTER TABLE weekly_summaries ENABLE ROW LEVEL SECURITY;
CREATE POLICY "weekly_summaries: own rows only" ON weekly_summaries
  USING (auth.uid() = user_id);

-- ─── aether_events ───────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS aether_events (
  id               uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id          uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  trigger_type     text NOT NULL CHECK (trigger_type IN ('PATTERN_DETECTED', 'SPIKE_DETECTED', 'MILESTONE_REACHED')),
  message          text NOT NULL,
  score_at_trigger float,
  created_at       timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE aether_events ENABLE ROW LEVEL SECURITY;
CREATE POLICY "aether_events: own rows only" ON aether_events
  USING (auth.uid() = user_id);

-- ─── subscriptions ───────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS subscriptions (
  id                       uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id                  uuid NOT NULL UNIQUE REFERENCES users(id) ON DELETE CASCADE,
  razorpay_customer_id     text NOT NULL,
  razorpay_subscription_id text NOT NULL,
  status                   text NOT NULL CHECK (status IN ('active', 'trialing', 'past_due', 'canceled')),
  current_period_end       timestamptz NOT NULL
);

ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "subscriptions: own row only" ON subscriptions
  USING (auth.uid() = user_id);

-- ─── pg_cron jobs (run after enabling pg_cron extension in Supabase dashboard) ─
-- SELECT cron.schedule('nightly-scoring',  '0 0 * * *',   $$SELECT net.http_post(...)$$);
-- SELECT cron.schedule('sunday-mirror',    '0 22 * * 0',  $$SELECT net.http_post(...)$$);
-- SELECT cron.schedule('sunday-compress',  '0 23 * * 0',  $$SELECT net.http_post(...)$$);
