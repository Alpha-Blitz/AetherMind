# Sprint 1 — Foundation

**Timeline:** Week 1–2

---

## Goals

Stand up the full project scaffold and deliver a working onboarding flow with identity capture. By end of sprint, a user can install the app, meet Aether, name their first belief, and have it persisted to the database.

---

## Deliverables

### Infrastructure
- [ ] Supabase project setup
  - Schema migration: all 7 tables with correct column types and constraints
  - Auth: email/password + anonymous session fallback
  - Row-level security (RLS) policies on all tables
  - pgvector extension enabled (`CREATE EXTENSION IF NOT EXISTS vector`)
- [ ] Supabase Edge Functions scaffold with JWT middleware

### Frontend (React Native + Expo)
- [ ] Expo project init with navigation structure
  - Stack navigator: Onboarding → Home → Journal → Reflect
  - Tab navigator: Home / Journal / Alignment / Evolution
- [ ] Aether animation layer (Lottie or Reanimated)
  - Idle, Speaking, Celebrating, Listening states
  - Size variants: Small (corner) / Medium / Large (full screen)

### Onboarding Flow
- [ ] Screen 1 — Aether intro: first-person meeting, "Hey! I'm Aether."
- [ ] Screen 2 — Origin question: "What's one thing you tell yourself that holds you back?"
- [ ] Screen 3 — Belief naming: user writes their `old_belief` and `new_story`
- [ ] Screen 4 — Desired self: "Who are you becoming?"
- [ ] Persist to `identity_profiles` and `beliefs` on completion

### Identity Engine
- [ ] `getIdentityContext(userId)` — returns `{ profile, active_beliefs, chapter }` as structured object
- [ ] Used by all downstream modules — this is the single source of truth for identity state

### Basic Journal Entry
- [ ] Simple text entry form (no AI yet — raw save to `journal_entries`)
- [ ] Confirms data round-trip: client → Edge Function → Postgres → client

---

## Acceptance Criteria

1. New user completes onboarding and their `identity_profiles` and `beliefs` rows are created.
2. `getIdentityContext()` returns the correct structured object for a given user.
3. Journal entry persists to Postgres with correct `user_id` and `belief_id`.
4. RLS verified: user A cannot read user B's data.
