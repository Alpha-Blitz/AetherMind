# Service Modules

> Seven modules — each with defined inputs, outputs, and a single AI model (or none).

## Module Summary

| Module | Inputs | Outputs | AI Model |
|--------|--------|---------|----------|
| Identity Engine | User onboarding answers, belief text, chapter events | `identity_context` object for all downstream modules | None — rule-based |
| Memory Engine | Recent entries, weekly summaries, pgvector index | Assembled context window (profile + beliefs + entries) | None — retrieval only |
| Rewrite Engine | Raw log entry + assembled context | `rewrite` text, `insight` string, `identity_tag` | Sonnet 4.6 |
| Alignment Engine | Identity context + 3-day score trend | 3 actions, 1 mindset frame, 1 reflection question | Sonnet 4.6 |
| Scoring Engine | Evening reflection signals (5 inputs) | Updated belief score, EMA, breakthrough flag | Haiku 4.5 (truth score) |
| Aether Core | Trigger event + full assembled context | 1–3 sentence reflection, stored in `aether_events` | Sonnet 4.6 |
| Mirror Engine | Week's entries + scoring stats + belief history | Weekly mirror text, pattern analysis, breakthrough list | Sonnet 4.6 (batch) |

---

## Identity Engine

Owns `identity_profiles` and `beliefs` tables.

- Writes **only** on two occasions: initial onboarding and belief resolution ceremonies.
- All other modules read from it but never write to it.
- Exposes a single function: `getIdentityContext(userId)` returning `profile`, `active_beliefs`, and `chapter` as a structured object.

---

## Memory Engine

The most critical performance component. Assembles context on every AI call by combining:

1. User profile (always, cached)
2. Active beliefs with score history (always)
3. Last 5 raw entries (rolling window)
4. Top 3 semantically similar entries via pgvector cosine similarity search

**Weekly compression job** — runs Sunday: 7 raw entries → 1 summary paragraph via Sonnet 4.6. After 7 days, only summaries are included in context.

---

## Rewrite Engine

- Receives assembled context and raw entry.
- Returns three fields:
  - `rewrite` — growth-narrative transformation of the raw entry
  - `insight` — one-sentence pattern observation
  - `identity_tag` — which aspect of the new story this entry touches
- Calls Sonnet 4.6 with cached system prompt.
- Output capped at 200 tokens.
- No state — purely functional.

---

## Alignment Engine

- Runs once daily per active user at morning check-in or via 8am local-time scheduled job.
- Receives: identity context + last 3 days of scoring data.
- Returns **exactly**: 3 actions + 1 mindset frame + 1 reflection question.
- System prompt is cached across all users since the structure is identical.

---

## Scoring Engine

Runs as a background job after every evening reflection. Takes 5 signals:

| Signal | Weight | How measured |
|--------|--------|-------------|
| Explicit intensity rating | 35% | User taps: barely / somewhat / a lot / it took over |
| Truth alignment score | 20% | Haiku 4.5 compares claimed identity vs emotional tone |
| Language tone (split) | 25% | Self-criticism word count + processing direction |
| New story match | 15% | Semantic similarity of entry to new story text |
| Streak multiplier | 5% | Nonlinear: day 3 +4%, day 7 +10%, day 14 +20%, day 21 +35% |

Applies EMA smoothing. Checks for:
- **Spike breakthrough** — single-day drop >= 1.5
- **Trend breakthrough** — 7-day regression slope <= -0.25, R² > 0.7

If `score <= 2.0` for 3 consecutive days → mark belief `resolved` → enqueue ceremony event.

---

## Aether Core

Event-driven — **never polls**. Three trigger types:

| Trigger | Condition |
|---------|-----------|
| `PATTERN_DETECTED` | Same trigger 3+ times in 7 days |
| `SPIKE_DETECTED` | Breakthrough flagged by Scoring Engine |
| `MILESTONE_REACHED` | Day 7, Day 30, or belief resolved |

- Assembles full context and calls Sonnet 4.6.
- Hard output constraint: **1–3 sentences**, reflective tone, no advice.
- Stored in `aether_events`, pushed to client via push notification.

---

## Mirror Engine

- Runs **Sunday night** as Batch API call for all premium users.
- Receives: week's entries + summary stats from Scoring Engine + belief history.
- Produces full **Weekly Mirror** output:
  - Aether's letter
  - Pattern analysis
  - Self-criticism language stats
  - Breakthrough moments
  - Next week's focus suggestion
- Free users receive truncated version via Haiku 4.5.
