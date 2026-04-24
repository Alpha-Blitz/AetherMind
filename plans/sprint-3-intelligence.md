# Sprint 3 — Intelligence

**Timeline:** Week 5–6

**Depends on:** Sprint 2 (Memory Engine, daily loop, journal entries with AI fields)

---

## Goals

Activate the intelligence layer: real belief scoring, semantic search, Aether Core responses, and the home screen belief score display. By end of sprint, a user can watch their belief score move over time and receive their first Aether message.

---

## Deliverables

### Scoring Engine (full activation)
- [ ] EMA calculation after every evening reflection
  - `score_t = 0.7 × today_signal + 0.3 × score_{t-1}`
- [ ] Truth alignment score via Haiku 4.5 (compares claimed identity vs emotional tone of entry)
  - `truth_multiplier = 0.4 + 0.6 × alignment_score`
- [ ] Composite weighted score calculation:
  - Explicit intensity (35%) + Truth alignment (20%) + Language tone (25%) + New story match (15%) + Streak (5%)
- [ ] Streak tracker with nonlinear multiplier schedule
  - Day 3: +4%, Day 7: +10%, Day 14: +20%, Day 21: +35%
  - 30% decay on missed day
- [ ] Update `beliefs.current_score`, `beliefs.score_history`, `beliefs.trigger_patterns`

### Breakthrough Detection
- [ ] **Spike detection** — single-day drop >= 1.5 points → flag as `'Thursday shift'`
- [ ] **Trend detection** — 7-day regression slope <= -0.25 AND R² > 0.7 → flag as `'Quiet revolution'`
- [ ] Breakthrough flags stored in `weekly_summaries.breakthroughs`

### Belief Resolution Flow
- [ ] Monitor: `current_score <= 2.0` for 3 consecutive days
- [ ] On resolution:
  - Set `belief.status = 'resolved'`
  - Lock `new_story` into identity anchors
  - Enqueue `MILESTONE_REACHED` event for Aether Core
  - Increment `identity_profiles.chapter`
  - Prompt user to name next belief

### pgvector Setup
- [ ] Generate `vector(1536)` embedding on every journal entry save
  - Use `text-embedding-3-small` or equivalent via Supabase pgvector helper
- [ ] HNSW index on `journal_entries.embedding` for fast cosine similarity search
- [ ] Wire into Memory Engine's context assembly (top 3 similar entries)

### Aether Core
- [ ] Event queue consumer (Redis via Upstash)
- [ ] Trigger detection:
  - `PATTERN_DETECTED` — same trigger phrase 3+ times in 7 days (match against `beliefs.trigger_patterns`)
  - `SPIKE_DETECTED` — fired by Scoring Engine on breakthrough detection
  - `MILESTONE_REACHED` — fired by belief resolution or day 7/30 counter
- [ ] Sonnet 4.6 call with full assembled context
  - Hard constraint: 1–3 sentences, reflective tone, no advice
- [ ] Store to `aether_events`
- [ ] Push notification to client

### Weekly Summary Compression (activate)
- [ ] pg_cron job fires Sunday night
- [ ] 7 raw entries → 1 summary paragraph via Sonnet 4.6
- [ ] Set `journal_entries.compressed = true` for included entries
- [ ] Store to `weekly_summaries`

### Home Screen
- [ ] Belief score display with sparkline history
- [ ] Module state: today's alignment status, streak counter
- [ ] Aether idle in corner — animates on new `aether_events`

---

## Acceptance Criteria

1. Evening reflection updates `beliefs.current_score` via the scoring algorithm with correct EMA.
2. A manufactured spike entry (intensity 9 → 1) triggers `SPIKE_DETECTED` → Aether Core → push notification.
3. pgvector cosine similarity search returns semantically relevant past entries (manual spot check).
4. Weekly compression job fires and produces a `weekly_summaries` row with correct `week_number`.
5. Home screen displays live belief score and streak counter.
