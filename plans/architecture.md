# System Architecture

> Five layers — each with a single responsibility.

Each layer communicates only with its immediate neighbours. The client never talks directly to the database. The AI layer never triggers side effects independently.

## Layer Overview

| Layer | Technology | Responsibility |
|-------|-----------|----------------|
| **L1 Client** | React Native + Expo | iOS & Android from single codebase · offline-capable entry drafting · push notification handling · Stripe in-app purchase · Aether animation layer |
| **L2 API Gateway** | Supabase Edge Functions | JWT auth middleware · per-user rate limiting · request routing to service modules · webhook handling for Stripe events |
| **L3 Service Modules** | — | Identity Engine · Memory Engine · Rewrite Engine · Alignment Engine · Scoring Engine · Aether Core · Mirror Engine · Billing Module · Notifications Module |
| **L4 AI Layer** | Claude API | Sonnet 4.6 for rewrite, alignment, mirror · Haiku 4.5 for signal extraction · prompt caching on system prompts · Batch API for weekly jobs · context assembly pipeline |
| **L5 Data Layer** | Supabase Postgres + Redis | Postgres (users, beliefs, entries, summaries, events) · pgvector for semantic embeddings · Redis for session cache and job queues |

## Key Architectural Rule

> No module reaches past its immediate boundary. The Identity Engine reads only identity tables. The AI layer receives pre-assembled context objects — it never issues database queries directly. This is what makes each module independently testable and replaceable.

## Data Flow — Journal Entry Submission

```
1. Submit entry
        ↓
2. Auth check
        ↓
3. Context assembly
      ┌──────────────────┐
4A. Rewrite (Sonnet)   4B. Signals (Haiku)   ← parallel
      └──────────────────┘
              ↓ merge (Promise.all)
5. Persist DB
        ↓
6. Score update
        ↓
7. Aether trigger?
```

**Step 3 — Context assembly:**
- User profile + active belief (always, cached)
- Last 5 raw journal entries (rolling window)
- Top 3 semantically similar entries (pgvector cosine similarity)

Running 4A and 4B in parallel reduces latency by ~40% vs sequential execution.

## Scalability Path

| Scale | Architecture change |
|-------|-------------------|
| 0–1K users | Single Supabase project handles all traffic. No additional infrastructure needed. |
| 1K–10K users | Enable Supabase connection pooling (PgBouncer). Add Redis caching layer for hot reads. Monitor pgvector index performance. |
| 10K–100K users | Horizontal scaling via Supabase Pro. Separate read replica for analytics queries. Consider dedicated vector DB if pgvector hits limits. |
| 100K+ users | Evaluate multi-region Supabase deployment. Shard by user cohort. Dedicated AI cost monitoring with per-user unit economics tracking. |
