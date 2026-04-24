# Sprint 4 — Monetisation

**Timeline:** Week 7–8

**Depends on:** Sprint 3 (full intelligence layer, Aether Core, scoring)

---

## Goals

Deliver a working freemium subscription system, gate premium features, and complete the transformation arc with the belief resolution ceremony and shareable card. By end of sprint, AetherMind is ready for TestFlight / internal beta.

---

## Pricing

| Tier | Price | Features |
|------|-------|---------|
| Free | $0 | Daily journal + rewrite · Alignment protocol · Basic Aether messages · Truncated Weekly Mirror (Haiku) |
| Premium | $14.99/mo | Everything free + Full Weekly Mirror (Sonnet) · Belief resolution ceremony · Shareable transformation card · Semantic memory (pgvector) |

---

## Deliverables

### Stripe Integration
- [ ] Stripe account setup with product + price IDs
- [ ] Stripe SDK in React Native (react-native-stripe-sdk or Expo)
- [ ] Subscription creation flow: Free → Premium upgrade screen
- [ ] In-app purchase UI (paywall modal)
- [ ] Webhook handler in Supabase Edge Function:
  - `customer.subscription.created` → set `users.is_premium = true`, insert `subscriptions` row
  - `customer.subscription.deleted` → set `users.is_premium = false`
  - `invoice.payment_failed` → push notification + grace period logic
- [ ] **Webhook signature verification** on all Stripe events (never trust client-side)

### Freemium Feature Gating
- [ ] Feature flag utility: `isPremium(userId)` — reads `users.is_premium` (server-side only)
- [ ] Gate on server side at Edge Function layer, not client-side
- [ ] Gated features:
  - Full Weekly Mirror (Sonnet 4.6) — free tier gets Haiku truncated version
  - Semantic memory context assembly (pgvector top-3 retrieval)
  - Belief resolution ceremony full flow
  - Shareable transformation card

### Weekly Mirror Engine (Premium — activate Batch API)
- [ ] pg_cron job fires Sunday night after weekly compression
- [ ] Batch API call for all `is_premium = true` users
  - Single batch request: one request per premium user
  - Poll for completion (typically < 1 hour)
- [ ] Full Mirror output:
  - Aether's letter (1–3 paragraphs)
  - Pattern analysis (recurring language/triggers)
  - Self-criticism language stats (count, examples)
  - Breakthrough moments (from `weekly_summaries.breakthroughs`)
  - Next week's focus suggestion
- [ ] Free user flow: Haiku 4.5 truncated version (no batch, synchronous)

### Belief Resolution Ceremony
- [ ] Full-screen ceremony animation when belief resolves
- [ ] Aether speaks: MILESTONE_REACHED message displayed large
- [ ] New story locked in — displayed as "what you've become"
- [ ] Chapter counter increments visibly
- [ ] User prompted to name next belief

### Shareable Transformation Card
- [ ] Generated on belief resolution
- [ ] Contains: old belief → new story · days worked · breakthrough moments count
- [ ] Exportable as image (react-native-view-shot or similar)
- [ ] Native share sheet integration

### 30-Day Milestone Screen
- [ ] Triggered at day 30 → `MILESTONE_REACHED` event
- [ ] Full-screen Aether celebration with streak stats
- [ ] Progress summary: beliefs worked, score delta from baseline, total entries

---

## Acceptance Criteria

1. User subscribes via Stripe → `users.is_premium` updates via webhook (not from client state).
2. Free user cannot access Weekly Mirror full version — receives Haiku truncated version.
3. Batch API Mirror job runs Sunday and produces `weekly_summaries` rows for all premium users.
4. Belief resolution ceremony triggers correctly when `current_score <= 2.0` for 3 consecutive days.
5. Shareable transformation card exports as a clean image via native share sheet.
6. All Stripe webhook events are verified with signature before processing.
