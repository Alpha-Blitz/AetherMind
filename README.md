# AetherMind — Rewrite Yourself.

> An AI-powered identity transformation system. Not a journaling app, not a habit tracker. A system that rewires identity through measurable belief change.

## Core Transformation Arc

```
Identity → Awareness → Rewriting → Alignment → Evolution
```

## Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React Native + Expo (iOS & Android) |
| Backend | Supabase (Postgres + Auth + Edge Functions + Cron) |
| AI | Claude Sonnet 4.6 (generation) · Claude Haiku 4.5 (extraction) |
| Vector Search | pgvector (built into Supabase) |
| Cache / Queue | Redis via Upstash |
| Payments | Stripe |
| Monitoring | Sentry + PostHog |

## Version

**v0.2** — MVP Blueprint

## Plans

| File | Description |
|------|-------------|
| [plans/architecture.md](plans/architecture.md) | System architecture — 5-layer overview + design principles |
| [plans/service-modules.md](plans/service-modules.md) | All 7 service modules with inputs, outputs, AI model |
| [plans/database-schema.md](plans/database-schema.md) | Full Postgres schema — 7 tables + pgvector |
| [plans/belief-scoring-engine.md](plans/belief-scoring-engine.md) | Signal weights, EMA algorithm, breakthrough detection |
| [plans/ai-cost-model.md](plans/ai-cost-model.md) | Model routing, prompt caching strategy, unit economics |
| [plans/sprint-1-foundation.md](plans/sprint-1-foundation.md) | Week 1–2: Supabase setup, onboarding, Identity Engine |
| [plans/sprint-2-daily-loop.md](plans/sprint-2-daily-loop.md) | Week 3–4: Memory Engine, Rewrite Engine, Alignment Engine |
| [plans/sprint-3-intelligence.md](plans/sprint-3-intelligence.md) | Week 5–6: Scoring Engine, pgvector, Aether Core |
| [plans/sprint-4-monetisation.md](plans/sprint-4-monetisation.md) | Week 7–8: Stripe, freemium gating, Mirror Engine |

## Design Principles

- **Modularity** — Each service module has a single responsibility and communicates only through defined interfaces.
- **Scalability** — Each layer scales independently. AI calls are event-triggered, not polling-based.
- **Cost efficiency** — Haiku for extraction, Sonnet for generation, Batch API for weekly processes.
- **Privacy first** — All journal data encrypted at rest (AES-256) and in transit (TLS 1.3). Never used for model training.
- **Rarity as design** — Aether fires only at triggers: pattern, spike, milestone. Silence is the default.
