# AetherMind — Architecture Specification

## System overview — five layers

```
┌─────────────────────────────────────────────────┐
│  L1  CLIENT LAYER                               │
│  React Native + Expo · iOS + Android · Expo Go  │
└───────────────────┬─────────────────────────────┘
                    │
┌───────────────────▼─────────────────────────────┐
│  L2  API GATEWAY                                │
│  Supabase Edge Functions · auth middleware      │
│  rate limiting · request routing                │
└───────────────────┬─────────────────────────────┘
                    │
┌───────────────────▼─────────────────────────────┐
│  L3  SERVICE MODULES                            │
│  Identity · Rewrite · Alignment · Memory        │
│  Aether Core · Scoring · Mirror · Billing       │
│  Notifications                                  │
└───────────────────┬─────────────────────────────┘
                    │
┌───────────────────▼─────────────────────────────┐
│  L4  AI LAYER                                   │
│  Claude Sonnet 4.6 · Claude Haiku 4.5           │
│  Prompt caching · Batch API · Context assembly  │
└───────────────────┬─────────────────────────────┘
                    │
┌───────────────────▼─────────────────────────────┐
│  L5  DATA LAYER                                 │
│  Postgres (entries, beliefs, users)             │
│  pgvector (embeddings) · Redis (sessions)       │
└─────────────────────────────────────────────────┘
```

---

## Service modules

### Identity Engine
- Owns: `identity_profiles` table
- Writes only on: initial onboarding + belief resolution ceremonies
- All other modules read from it, never write
- Exposes: `getIdentityContext(userId)` → profile + active beliefs + chapter

### Rewrite Engine
- Receives: assembled context + raw entry
- Returns: `rewrite` + `insight` + `identity_tag`
- Model: Claude Sonnet 4.6 with cached system prompt
- Output cap: 200 tokens
- Stateless — purely functional

### Alignment Engine
- Runs: once daily per active user (8am user local time or on morning check-in)
- Receives: identity context + last 3 days scoring data
- Returns: exactly 3 actions + 1 mindset frame + 1 reflection question
- Model: Claude Sonnet 4.6

### Scoring Engine
- Runs: nightly background job after evening reflection
- Five signals (with weights):
  - Explicit intensity rating: 35%
  - Truth alignment score: 20%
  - Language tone (split): 15% claimed / 10% processing
  - New story usage / semantic match: 15%
  - Emotional direction: 10%
  - Streak multiplier: nonlinear bonus (day 3 +4%, day 7 +10%, day 14 +20%, day 21 +35%)
- Algorithm: EMA — `new_score = 0.7 × today_signal + 0.3 × previous_score`
- Breakthrough spike: single-day drop ≥1.5
- Breakthrough trend: regression slope ≤−0.25, R²>0.7 over 7 days
- Resolved: score ≤2.0 for 3 consecutive days → ceremony trigger

### Truth Detection Layer
- Cross-checks: claimed identity vs emotional tone vs behavioural consistency
- States: Authentic (score × 1.0) · Processing (score × 1.0 + bonus) · Performative (score × 0.4)
- Authentic: Aether affirms — "This feels real."
- Processing: Aether witnesses — "This struggle is the work."
- Performative: Aether gently names it — "I notice you said X. What do you really feel?"

### Memory Engine
- Context assembly (every AI call):
  1. User profile (always)
  2. Active beliefs + score history (always)
  3. Last 5 raw entries (rolling window)
  4. Top 3 semantically similar past entries (pgvector cosine search)
- Weekly compression: Sunday midnight batch job
  - 7 raw entries → 1 compressed summary paragraph
  - Older than 7 days: summaries only, never raw
- At Day 60: context = profile + active beliefs + 8 weekly summaries + last 5 raw + 3 semantic recalls

### Aether Core
- Event-driven — never polls
- Trigger types: `PATTERN_DETECTED` · `SPIKE_DETECTED` · `MILESTONE_REACHED`
- Pattern: same trigger 3+ times in 7 days
- Spike: breakthrough event from Scoring Engine
- Milestone: day 7, day 30, belief resolved
- Model: Claude Sonnet 4.6 — strict output: 1–3 sentences, reflective, no advice
- Response stored in `aether_events`, pushed as notification

### Mirror Engine
- Runs: Sunday night batch (Anthropic Batch API — 50% cost discount)
- Premium users: full mirror — patterns, breakthrough quotes, language stats, next belief
- Free users: truncated via Haiku 4.5

---

## Database schema

```sql
-- Core user record
users (
  id uuid PK,
  email text,
  timezone text,
  archetype text,         -- analytical | emotional | action-oriented
  is_premium boolean,
  created_at timestamp
)

-- Permanent identity foundation
identity_profiles (
  id uuid PK,
  user_id uuid FK → users,
  origin_statement text,  -- Day 1 answer
  desired_self text,
  transition_type text,
  key_vocabulary text,    -- user's specific language patterns
  chapter int DEFAULT 1,
  updated_at timestamp
)

-- Living belief objects
beliefs (
  id uuid PK,
  user_id uuid FK → users,
  old_belief text,
  new_story text,
  baseline_score float,   -- intensity on Day 1 (0–10)
  current_score float,    -- latest EMA result
  score_history jsonb,    -- array of daily scores
  trigger_patterns jsonb, -- ["monday morning", "before presenting"]
  breakthrough_days jsonb,
  status text,            -- active | resolved | surfaced
  resolved_at timestamp
)

-- Daily journal entries (raw + structured signals)
journal_entries (
  id uuid PK,
  user_id uuid FK → users,
  belief_id uuid FK → beliefs,
  raw_content text,
  rewrite text,           -- Rewrite Engine output
  insight text,
  identity_tag text,
  emotion_tags jsonb,
  intensity_rating float, -- explicit user rating
  tone_score float,
  truth_score float,      -- Truth Detection Layer output
  processing_direction float, -- -1=stuck, 0=exploring, +1=integrating
  is_compressed boolean DEFAULT false,
  embedding vector(1536), -- pgvector
  created_at timestamp
)

-- AI-compressed weekly summaries
weekly_summaries (
  id uuid PK,
  user_id uuid FK → users,
  summary_text text,
  stats jsonb,
  breakthroughs jsonb,
  patterns jsonb,
  week_number int,
  created_at timestamp
)

-- Aether appearance events
aether_events (
  id uuid PK,
  user_id uuid FK → users,
  trigger_type text,      -- PATTERN_DETECTED | SPIKE_DETECTED | MILESTONE_REACHED
  message text,           -- 1–3 sentences
  score_at_trigger float,
  created_at timestamp
)

-- Stripe subscription state
subscriptions (
  id uuid PK,
  user_id uuid FK → users,
  stripe_customer_id text,
  stripe_subscription_id text,
  status text,            -- active | trialing | past_due | cancelled
  current_period_end timestamp
)
```

---

## AI call map — when and how often

| Engine | Model | Trigger | Frequency | Output cap |
|---|---|---|---|---|
| Signal extraction | Haiku 4.5 | Every entry submission | 1–2×/day | 150 tokens |
| Rewrite Engine | Sonnet 4.6 | Every entry submission | 1–2×/day | 200 tokens |
| Alignment Protocol | Sonnet 4.6 | Morning / daily | 1×/day | 300 tokens |
| Evening reflection response | Haiku 4.5 | Evening reflection | 1×/day | 200 tokens |
| Aether Core | Sonnet 4.6 | Trigger events only | ~2×/week avg | 80 tokens |
| Weekly compression | Sonnet 4.6 | Sunday midnight batch | 1×/week | 600 tokens |
| Weekly mirror (premium) | Sonnet 4.6 | Sunday night batch | 1×/week | 800 tokens |
| Weekly mirror (free) | Haiku 4.5 | Sunday night batch | 1×/week | 400 tokens |

### Cost principles
- AI called only at transformation points — never on navigation or UI events
- System prompt cached across all calls for same user (60% input cost savings)
- Weekly mirror + compression run as Batch API jobs (50% discount)
- Free tier: limited rewrites/day, no Aether Core, no deep mirror
- Context window: summaries replace raw entries after 7 days — always lean

---

## Entry submission data flow

```
User submits journal entry
        │
        ▼
Auth + rate limit check
        │
        ▼
Context assembly
(profile + beliefs + recent entries + semantic recall)
        │
      ┌─┴─────────────────────┐
      ▼                       ▼
Rewrite Engine           Signal extraction
(Sonnet 4.6)             (Haiku 4.5)
parallel calls
      └─────────┬─────────────┘
                ▼
        Persist to database
        (journal_entries + embedding)
                │
                ▼
        Scoring Engine update
        (EMA + Truth Detection + breakthrough check)
                │
                ▼
        Aether trigger check
        (fires if pattern/spike/milestone)
```

Key: Rewrite Engine and Signal Extraction run in parallel via `Promise.all()`.  
Reduces latency by ~40% on every entry submission.

---

## Context assembly — what goes into every AI call

```javascript
// Assembled before every LLM call for a given user
const context = {
  // Always included
  userProfile: {
    originStatement,
    desiredSelf,
    transitionType,
    keyVocabulary,
    chapter
  },
  // Always included
  activeBelief: {
    oldBelief,
    newStory,
    currentScore,
    scoreHistory,     // last 30 days
    triggerPatterns,
    breakthroughDays
  },
  // Rolling window — last 5 raw entries
  recentEntries: entries.slice(-5),
  // Semantic recall — top 3 most similar to today's entry
  semanticRecall: await vectorSearch(todayEmbedding, topK=3),
  // Weekly summaries for entries older than 7 days
  weeklySummaries: summaries  // compressed, never raw
}
```
