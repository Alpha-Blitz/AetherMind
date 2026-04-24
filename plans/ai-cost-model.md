# AI Cost Architecture

> Model routing · prompt caching · batch strategy.

The cost architecture is driven by a single principle: **AI fires only at genuine transformation points.** Aether's rarity is both the product philosophy and the cost strategy — they are the same decision.

---

## Model Routing by Call Type

| Call type | Model | Frequency | Cached? | Est. cost/user/mo |
|-----------|-------|-----------|---------|-------------------|
| Signal extraction | Haiku 4.5 | 1× per entry | System prompt | $0.002 |
| Rewrite engine | Sonnet 4.6 | 1× per entry | System prompt | $0.008 |
| Alignment protocol | Sonnet 4.6 | 1× per day | Fully cached | $0.006 |
| Evening reflection | Haiku 4.5 | 1× per day | Partial | $0.003 |
| Aether core | Sonnet 4.6 | ~2× per week | Full context | $0.004 |
| Weekly summary (batch) | Sonnet 4.6 | 1× per week | Batch −50% | $0.003 |
| Weekly mirror (batch) | Sonnet 4.6 | 1× per week | Batch −50% | $0.005 |

**Total per active user/month: ~$0.031**

---

## Caching Strategy

- **System prompts** — cached across all users for Rewrite Engine and Alignment Engine since the structure is identical per user archetype.
- **User context** — assembled fresh per call but the static portion (profile + active beliefs) is eligible for prompt caching via the Anthropic API's cache control blocks.
- **Batch API** — Weekly summary compression and Weekly Mirror both run as Sunday batch jobs at Batch API pricing (50% discount vs synchronous).

---

## Unit Economics

| Scale | Active users (70% DAU) | Monthly AI cost | Revenue (30% paid @ $14.99) | AI as % revenue |
|-------|----------------------|-----------------|----------------------------|-----------------|
| 100 users | 70 DAU | ~$75 | ~$450 | ~17% |
| 1,000 users | 700 DAU | ~$750 | ~$4,500 | ~17% |
| 10,000 users | 7,000 DAU | ~$7,500 | ~$45,000 | ~17% |

**Cost scales with active users, not total users.** A user who signs up and never opens the app costs $0. AI cost as a percentage of revenue stays flat at ~17% regardless of scale — both grow linearly at the same rate.

Your biggest cost risk is high engagement, which is also your best revenue signal.

---

## Model IDs (Anthropic API)

| Model | ID |
|-------|----|
| Claude Sonnet 4.6 | `claude-sonnet-4-6` |
| Claude Haiku 4.5 | `claude-haiku-4-5-20251001` |

Use the Batch API for Mirror Engine and weekly compression jobs:
- `POST /v1/messages/batches` with `claude-sonnet-4-6`
- 50% cost reduction, results polled async (typically complete within 1 hour)
