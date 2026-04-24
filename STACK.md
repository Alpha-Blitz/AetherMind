# AetherMind — Stack & Decisions

## Tech stack

| Layer | Tool | Why |
|---|---|---|
| Mobile client | React Native + Expo | Single codebase iOS + Android. Expo SDK for push, haptics, storage. Native animations via Reanimated. |
| Distribution (MVP) | Expo Go | QR code install for Wizard of Oz beta. Zero build overhead. |
| Distribution (beta) | EAS Internal + TestFlight | Real push notifications. Full native build. Up to 10,000 iOS testers. |
| Distribution (launch) | App Store + Play Store | Same EAS binary — no rewrite. |
| Backend / API | Supabase Edge Functions | Serverless, no separate Express server. Postgres + auth + cron jobs in one. |
| Database | Supabase Postgres | Relational. Structured scoring data. Easy analytics queries. |
| Vector search | pgvector (Supabase built-in) | Semantic memory recall. No separate Pinecone needed. |
| Auth | Supabase Auth | Email + Google OAuth. Row-level security built in. |
| Background jobs | Supabase Cron | Nightly scoring recalc. Sunday weekly compression. |
| AI — primary | Claude Sonnet 4.6 | Best nuanced emotional writing. Long context. Rewrite + Alignment + Aether Core. |
| AI — lightweight | Claude Haiku 4.5 | Signal extraction, reflection scoring, free tier mirror. 3× cheaper than Sonnet. |
| Billing | RazorPay | Subscription management. India-first payment gateway. Requires custom EAS build (not Expo Go). |
| Push notifications | Expo Notifications | Morning + evening reminders in Aether's voice. Included in Expo SDK. |
| Analytics | PostHog (free tier) | Session events, funnel, paywall conversion. Self-hostable. |
| CI/CD | GitHub Actions + EAS | Triggers EAS builds on merge to main. |

---

## Key decisions and reasoning

### Why Expo Go for MVP distribution
- QR code in a WhatsApp message — users install in 60 seconds
- Zero build setup during validation phase
- OTA updates: push a change, testers see it immediately
- Limitation: push notifications restricted — acceptable during Wizard of Oz phase
- Upgrade path: EAS Internal Distribution when push notifications become critical

### Why React Native over Next.js + WebView
- Apple App Store guideline 4.2 explicitly rejects thin WebView wrappers
- Aether's animations (full-screen takeover, dark transitions, belief arc) require native rendering
- Target users (spiritually attuned, wellness-focused) feel the difference in the first 10 seconds
- Push notifications broken on iOS Safari PWA — core to daily habit loop
- React Native + Reanimated delivers 90% of native feel at 40% of full native effort

### Why React Native over Swift/Kotlin native
- Two codebases would double build time and required team size
- Right call at 50,000+ users with a funded team — wrong call now
- Same Expo binary ships to both stores with zero rework at launch

### Why Supabase over Firebase
- Native pgvector — no separate Pinecone subscription needed
- Relational schema better suited for belief scoring queries and analytics
- Edge Functions replace a separate Express/Node server
- Cron jobs replace a separate job scheduler (no Bull/Redis queue needed at MVP)
- SQL gives better insight into scoring trends than NoSQL
- Free tier: 500MB DB, 50K MAUs, 500K edge function calls — covers entire beta phase

### Why Claude over GPT-4
- Superior nuanced emotional and reflective writing
- Better at 1–3 sentence responses that feel precise and earned (critical for Aether's voice)
- Prompt caching available — 60% savings on repeated system prompts
- Batch API — 50% discount on async weekly jobs

---

## Cost model

### At 100 users (70% DAU = 70 active daily)

| Service | Monthly cost | Notes |
|---|---|---|
| Supabase | $0 | Free tier — well within limits |
| Expo EAS | $0 | Free builds sufficient |
| Claude API | ~$65 | 70 DAU × 30d + weekly jobs |
| Stripe | ~$17 | 30 paid × $14.99 × ~3.6% effective rate |
| PostHog | $0 | Free tier: 1M events/month |
| GitHub | $0–4 | Free for public repos |
| **Total** | **~$82–105/mo** | |

Revenue (30% conversion × $14.99) = **$450/mo**  
AI cost as % of revenue: **~19%** — acceptable at validation stage

### At 1,000 users (70% DAU = 700 active daily)

| Service | Monthly cost | Notes |
|---|---|---|
| Supabase | $25–75 | Pro plan, ~$35 real-world |
| Expo EAS | $19–199 | Starter → Production |
| Claude API | ~$650 | 700 DAU × 30d + weekly jobs |
| Stripe | ~$170 | 300 paid × $14.99 × ~3.6% |
| PostHog | $0 | Still within free tier |
| GitHub | $4 | Teams plan |
| **Total** | **~$870–1,100/mo** | |

Revenue (30% conversion × $14.99) = **$4,497/mo**  
AI cost as % of revenue: **~20%** — healthy SaaS territory (industry standard: under 25%)

### Claude API pricing (current)
- Sonnet 4.6: $3.00/M input tokens, $15.00/M output tokens
- Haiku 4.5: $1.00/M input tokens, $5.00/M output tokens
- Prompt cache hits: 10% of input price
- Batch API: 50% discount on all calls

---

## Cost optimisations in place

1. **Prompt caching** — system prompt + user profile cached per user. ~50-60% input savings.
2. **Model routing** — Haiku for extraction/scoring (cheap, repetitive). Sonnet for rewrites/Aether (quality matters).
3. **Batch API** — weekly mirror and compression run as Sunday batch jobs. 50% discount.
4. **Free tier AI limits** — free users get no Rewrite Engine and no Aether Core. ~65% cost reduction on free users.
5. **Context compression** — raw entries older than 7 days replaced by weekly summaries. Context stays lean at scale.
6. **Event-driven Aether** — Aether Core only fires at triggers (~2×/week average). Most expensive model, rarest call.

---

## Distribution phases

### Phase 1 — Wizard of Oz validation (5–15 users)
- Tool: Expo Go
- Method: QR code or `exp://` link via WhatsApp/email
- Cost: $0
- Push notifications: not available (acceptable at this phase)

### Phase 2 — Private beta (15–200 users)
- Tool: EAS Internal Distribution
- Android: share `.apk` link directly, user enables "install from unknown sources"
- iOS: Apple TestFlight (requires $99/yr Apple Developer account)
- TestFlight capacity: up to 10,000 external testers
- Push notifications: fully functional
- Cost: $99/yr Apple Developer + EAS free tier builds

### Phase 3 — Public launch
- Tool: App Store + Google Play Store
- Same EAS binary — zero rewrite
- App Store review: 1–3 days
- Play Store review: few hours
- Cost: $99/yr Apple (already paying) + $25 one-time Google Play

---

## Environment variables needed

```
# Supabase
SUPABASE_URL=
SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

# Anthropic
ANTHROPIC_API_KEY=

# RazorPay
RAZORPAY_KEY_SECRET=
RAZORPAY_WEBHOOK_SECRET=

# Expo (public — safe to bundle in client)
EXPO_PUBLIC_SUPABASE_URL=
EXPO_PUBLIC_SUPABASE_ANON_KEY=
EXPO_PUBLIC_RAZORPAY_KEY_ID=
```

---

## Folder structure (recommended)

```
aethermind/
├── app/                    # Expo Router screens
│   ├── (auth)/             # Login, signup
│   ├── (onboarding)/       # Onboarding wizard
│   ├── (tabs)/             # Main tab navigation
│   │   ├── home.tsx        # Daily dashboard
│   │   ├── reflect.tsx     # Reflection screen
│   │   ├── journey.tsx     # Growth tracker
│   │   └── profile.tsx     # Settings
│   └── modals/             # Aether moment, mirror, ceremony
├── components/
│   ├── aether/             # Aether character + expressions
│   ├── beliefs/            # Belief card, score arc, progress
│   ├── reflection/         # Question flow, intensity tagger
│   └── ui/                 # Shared design system components
├── lib/
│   ├── supabase.ts         # Supabase client
│   ├── ai/                 # Claude API calls per engine
│   │   ├── rewrite.ts
│   │   ├── alignment.ts
│   │   ├── signals.ts
│   │   └── aether-core.ts
│   └── scoring/            # Belief scoring logic
│       ├── ema.ts
│       ├── truth-detection.ts
│       └── breakthrough.ts
├── supabase/
│   ├── functions/          # Edge Functions
│   │   ├── entry-submit/
│   │   ├── daily-alignment/
│   │   └── weekly-mirror/
│   └── migrations/         # SQL schema migrations
├── constants/
│   └── aether-prompts.ts   # All system prompts in one place
├── PRODUCT_SPEC.md
├── ARCHITECTURE.md
└── STACK.md
```
