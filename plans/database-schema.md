# Database Schema

> Seven tables — Postgres via Supabase + pgvector extension.

All tables live in Supabase Postgres. The pgvector extension is enabled on `journal_entries.embedding`, enabling cosine similarity search without a separate vector database. Redis (Upstash) handles session cache and the background job queue.

---

## `users`

| Column | Type | Notes |
|--------|------|-------|
| `id` | uuid PK | Auto-generated |
| `email` | text unique | Auth identifier |
| `timezone` | text | For local-time job scheduling |
| `archetype` | text | `analytical` / `emotional` / `action` |
| `is_premium` | boolean | Subscription state cache |
| `created_at` | timestamptz | Account creation |

---

## `identity_profiles`

One-to-one with `users`. Written only at onboarding and belief resolution ceremonies.

| Column | Type | Notes |
|--------|------|-------|
| `id` | uuid PK | |
| `user_id` | uuid FK → users | One-to-one |
| `origin_statement` | text | Day 1 answer |
| `desired_self` | text | Who they're becoming |
| `transition_type` | text | Identity shift type |
| `key_vocabulary` | jsonb | User's own words |
| `chapter` | integer | Current belief chapter |

---

## `beliefs`

| Column | Type | Notes |
|--------|------|-------|
| `id` | uuid PK | |
| `user_id` | uuid FK → users | |
| `old_belief` | text | Original limiting belief |
| `new_story` | text | Rewritten identity statement |
| `baseline_score` | float | Day 1 intensity (0–10) |
| `current_score` | float | Latest EMA value |
| `score_history` | jsonb | Array of daily scores |
| `trigger_patterns` | jsonb | Detected situational triggers |
| `status` | text | `active` / `resolved` / `surfaced` |

---

## `journal_entries`

| Column | Type | Notes |
|--------|------|-------|
| `id` | uuid PK | |
| `user_id` | uuid FK → users | |
| `belief_id` | uuid FK → beliefs | Active belief at write time |
| `raw_content` | text | User's unmodified input |
| `rewrite` | text | Rewrite Engine output |
| `insight` | text | Pattern observation |
| `emotion_tags` | jsonb | Extracted emotion array |
| `intensity_rating` | float | Explicit user rating (0–10) |
| `tone_score` | float | Language tone -1 to +1 |
| `truth_score` | float | Claim vs emotion alignment |
| `processing_direction` | float | Stuck (-1) to integrating (+1) |
| `embedding` | vector(1536) | pgvector — cosine similarity search |
| `compressed` | boolean | `true` when replaced by weekly summary |

---

## `weekly_summaries`

| Column | Type | Notes |
|--------|------|-------|
| `id` | uuid PK | |
| `user_id` | uuid FK → users | |
| `summary_text` | text | Compressed narrative |
| `stats` | jsonb | Days, streak, score change |
| `breakthroughs` | jsonb | Flagged breakthrough entries |
| `patterns` | jsonb | Detected language patterns |
| `week_number` | integer | Relative to user start date |

---

## `aether_events`

| Column | Type | Notes |
|--------|------|-------|
| `id` | uuid PK | |
| `user_id` | uuid FK → users | |
| `trigger_type` | text | `PATTERN` / `SPIKE` / `MILESTONE` |
| `message` | text | Aether's 1–3 sentence response |
| `score_at_trigger` | float | Belief score when triggered |
| `created_at` | timestamptz | |

---

## `subscriptions`

| Column | Type | Notes |
|--------|------|-------|
| `id` | uuid PK | |
| `user_id` | uuid FK → users | |
| `stripe_customer_id` | text | Stripe customer reference |
| `status` | text | `active` / `trialing` / `canceled` |
| `current_period_end` | timestamptz | Next billing date |

---

## Notes

- **RLS** — Row-level security enforced on all tables. Users can only access their own rows at the database level.
- **pgvector** — Enable via `CREATE EXTENSION IF NOT EXISTS vector;` in Supabase SQL editor.
- **Redis** — Session cache + Aether Core job queue via Upstash. Not a primary store — data lives in Postgres.
- **Encryption** — All data encrypted at rest (AES-256) and in transit (TLS 1.3).
