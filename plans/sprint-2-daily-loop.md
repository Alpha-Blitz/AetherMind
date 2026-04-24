# Sprint 2 — Daily Loop

**Timeline:** Week 3–4

**Depends on:** Sprint 1 (Supabase schema, Identity Engine, basic journal entry)

---

## Goals

Deliver the full daily ritual loop: morning alignment → journal entry with AI rewrite → evening reflection. By end of sprint, a user has a complete day cycle with real Claude API responses.

---

## Deliverables

### Memory Engine
- [ ] Context assembly pipeline
  - Fetch user profile + active belief (cached)
  - Fetch last 5 raw `journal_entries` (rolling window query)
  - pgvector cosine similarity search — top 3 similar past entries
  - Assemble into a single `context` object passed to all AI calls
- [ ] Weekly Sunday compression job scaffold (Supabase pg_cron)
  - 7 raw entries → 1 summary paragraph via Sonnet 4.6 (stubbed this sprint, active in Sprint 3)

### Rewrite Engine
- [ ] Sonnet 4.6 call with cached system prompt
- [ ] Returns: `{ rewrite, insight, identity_tag }`
- [ ] Output capped at 200 tokens
- [ ] Integrated into journal entry submission flow

### Signal Extraction (Haiku 4.5)
- [ ] Parallel call alongside Rewrite Engine (Promise.all)
- [ ] Extracts: `emotion_tags`, `tone_score`, `truth_score`, `processing_direction`
- [ ] Persisted to `journal_entries` row

### Full Entry Submission Flow
- [ ] Auth check → context assembly → parallel AI calls → persist DB
- [ ] UI shows rewrite immediately after submission
- [ ] Insight string displayed below rewrite

### Alignment Engine
- [ ] Sonnet 4.6 call with fully cached system prompt (identical structure per user)
- [ ] Returns: 3 actions + 1 mindset frame + 1 reflection question
- [ ] Triggered at morning check-in OR via 8am local-time pg_cron job (uses `users.timezone`)

### Evening Reflection UI
- [ ] Intensity tagger: barely / somewhat / a lot / it took over
- [ ] Stores `intensity_rating` on `journal_entries`
- [ ] Triggers Scoring Engine background job (stubbed this sprint, active in Sprint 3)

### Push Notifications
- [ ] Expo Notifications setup
- [ ] Morning reminder (8am local time)
- [ ] Evening reflection prompt (8pm local time)
- [ ] Notification permission request in onboarding

---

## Acceptance Criteria

1. Journal entry submission calls Rewrite (Sonnet) and Signals (Haiku) in parallel and merges results before persisting.
2. Rewrite and insight are displayed on the entry screen after submission.
3. Alignment protocol generates 3 actions + 1 mindset frame + 1 reflection question from real Claude API call.
4. Push notifications fire at correct local time based on `users.timezone`.
5. All AI calls use prompt caching on system prompts (verify via Anthropic API usage dashboard — cache hit rate > 0).
