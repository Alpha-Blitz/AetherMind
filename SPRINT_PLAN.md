# AetherMind — Sprint Plan

## Principles
- One module, one file, one responsibility
- All AI calls go through `lib/ai/client.ts`
- All system prompts live in `constants/aether-prompts.ts`
- All Supabase queries are typed (`supabase gen types typescript`)
- Parallel AI calls with `Promise.all` always
- Never send raw entries older than 7 days to AI
- Scoring engine is pure TypeScript — no AI calls
- Aether Core is event-driven, never polled
- Every Edge Function validates JWT auth
- Design tokens from `constants/theme.ts` only

---

## Sprint 1 — Foundation (days 1–7)
**Goal:** Working app shell in Expo Go. Auth working. Supabase connected. Onboarding complete. User gets through Day 1 and sees their belief named. No AI yet.

### S1-01 — Project init + folder structure
**Effort:** 1 day | **Area:** Setup
Run `npx create-expo-app aethermind --template blank-typescript`. Set up folder structure from STACK.md exactly. Install: expo-router, @supabase/supabase-js, react-native-reanimated, nativewind, @stripe/stripe-react-native.

**Claude Code prompt:**
```
Read @STACK.md. Initialise an Expo project called aethermind using expo-router. Create the exact folder structure defined in STACK.md. Install these deps: @supabase/supabase-js expo-router react-native-reanimated nativewind @stripe/stripe-react-native. Create .env.local with the variable names from STACK.md as empty placeholders. Do not write any screen logic yet.
```

---

### S1-02 — Supabase project + schema migrations
**Effort:** 1 day | **Area:** Database
Create Supabase project. Enable pgvector. Run all 7 table migrations. Enable RLS on all tables. Write RLS policies so users can only access their own rows.

**Claude Code prompt:**
```
Read @ARCHITECTURE.md. Generate the complete Supabase SQL migration file for all 7 tables defined in the database schema section. Include: CREATE EXTENSION vector, all table definitions with correct types (use vector(1536) for embeddings), all foreign key constraints, RLS enable statements, and RLS policies so each user can only SELECT/INSERT/UPDATE/DELETE their own rows. Output as: supabase/migrations/001_initial_schema.sql
```

---

### S1-03 — Supabase client + auth module
**Effort:** 1 day | **Area:** Auth
Create `lib/supabase.ts` singleton. Build auth module: email, Google OAuth, session persistence, auth state listener. Create auth context provider.

**Claude Code prompt:**
```
Read @STACK.md. Create lib/supabase.ts as a singleton Supabase client using env vars. Then create lib/auth.ts with functions: signUpWithEmail, signInWithEmail, signInWithGoogle, signOut, getCurrentUser, onAuthStateChange. Create a React context in components/AuthProvider.tsx that wraps the app, listens to auth state, and exposes user + loading. All functions handle errors gracefully and return typed results. TypeScript throughout.
```

---

### S1-04 — Design tokens + theme system
**Effort:** 0.5 days | **Area:** Design system
Create AetherMind design token file. Configure NativeWind with custom colours.

**Claude Code prompt:**
```
Create constants/theme.ts with AetherMind's design tokens. Background: #1a1228 (deep), #231640 (card), #2d1e4a (elevated). Accent: #7F77DD (primary), #6b55cc (strong), #c8bff8 (soft). Text: #e8e0ff (primary), #9988bb (secondary), #5a4a78 (tertiary). Success: #1D9E75. Border: #2e2040. Also create tailwind.config.js registering all these as custom colours for NativeWind. Export a Typography object: heading 22px/500, body 15px/400, caption 12px/400.
```

---

### S1-05 — Aether character component
**Effort:** 1 day | **Area:** UI component
Reusable Aether component. Small/medium/large sizes. Expressions: idle, happy, curious, empathetic, thinking, celebrating. Reanimated glow pulse on chest orb.

**Claude Code prompt:**
```
Read @PRODUCT_SPEC.md Aether section. Create components/aether/AetherCharacter.tsx. Props: size ('small'|'medium'|'large'), expression ('idle'|'happy'|'curious'|'empathetic'|'thinking'|'celebrating'). Use SVG paths for Aether's face (round head, small ears, glowing orb chest, dark cloak). Implement slow pulse glow animation using react-native-reanimated on the chest orb — always running when expression is idle. Character colours from constants/theme.ts only. No external images.
```

---

### S1-06 — Onboarding flow (6 screens)
**Effort:** 2 days | **Area:** Screens
Intent → struggle → baseline → disclaimer → meet Aether → belief naming. On completion, write to `identity_profiles`. Static responses for now.

**Claude Code prompt:**
```
Read @PRODUCT_SPEC.md onboarding section and @ARCHITECTURE.md identity_profiles schema. Build app/(onboarding)/ with 6 screens using expo-router stack navigation: intent.tsx (4 goal options) → struggle.tsx (free text) → baseline.tsx (optional mood slider 1-10) → disclaimer.tsx (not therapy, not medical) → meet-aether.tsx (AetherCharacter large, animated entrance, speech bubble) → belief-naming.tsx (show struggle back, input to name belief, 2-sentence new story input). On finish INSERT to identity_profiles. Theme colours throughout. No AI calls yet.
```

---

### S1-07 — Home dashboard screen
**Effort:** 1 day | **Area:** Screens
Main home tab. Module cards, active belief card, streak, Aether idle in corner.

**Claude Code prompt:**
```
Read @PRODUCT_SPEC.md home screen section and @ARCHITECTURE.md. Build app/(tabs)/home.tsx. Sections: greeting + Aether small idle + speech bubble with today's question. Module cards: morning check-in (done/pending), daily reflection (done/pending), weekly mirror (locked if day < 7). Active belief card: old belief, new story, score bar 0-10, "day X of 30". Streak: number + 7-day dot grid. All data from Supabase via React Query. Handle loading + empty states.
```

**Sprint 1 exit:** User opens Expo Go → signs up → completes onboarding → lands on home → sees named belief. No AI. No crashes. Loads < 2 seconds.

---

## Sprint 2 — Core loop (days 8–16)
**Goal:** Full daily loop with real AI end-to-end. User gets rewrite, belief score updates, Aether's voice is live.

### S2-01 — Claude API client + prompt system
**Effort:** 1 day | **Area:** AI infrastructure

**Claude Code prompt:**
```
Create lib/ai/client.ts — typed wrapper around Anthropic API. Accepts: model ('sonnet'|'haiku'), systemPrompt, userMessage, maxTokens. Add cache_control: {type: 'ephemeral'} to system prompt content block. Enforce token budgets (sonnet max 1000, haiku max 400). Return typed {text, inputTokens, outputTokens, cached}. Handle rate limits with exponential backoff (3 retries). Log token usage in dev. Then create constants/aether-prompts.ts with exported const for each engine: REWRITE_SYSTEM, ALIGNMENT_SYSTEM, SIGNAL_SYSTEM, AETHER_CORE_SYSTEM, MIRROR_SYSTEM. Leave values as empty strings for now.
```

---

### S2-02 — Context assembly module
**Effort:** 1 day | **Area:** AI infrastructure

**Claude Code prompt:**
```
Read @ARCHITECTURE.md context assembly section. Create lib/ai/context.ts. Export async assembleContext(userId): UserContext. Fetch in parallel: (1) identity_profile, (2) active beliefs + score_history, (3) last 5 journal_entries ordered by created_at desc where is_compressed=false, (4) weekly_summaries ordered by week_number desc. Return typed UserContext. Also export formatContextForPrompt(ctx): string that serialises to compact string under 800 tokens for prompt injection.
```

---

### S2-03 — Rewrite Engine
**Effort:** 0.5 days | **Area:** AI engine

**Claude Code prompt:**
```
Read @ARCHITECTURE.md Rewrite Engine section. Create lib/ai/rewrite.ts. Export async rewriteEntry(rawEntry: string, context: UserContext): RewriteResult. Use lib/ai/client.ts with model 'sonnet'. Fill REWRITE_SYSTEM in constants/aether-prompts.ts with the prompt from SPRINT_PLAN.md. Max 200 output tokens. Parse JSON response. Throw typed error if parse fails.
```

---

### S2-04 — Signal Extraction Engine
**Effort:** 0.5 days | **Area:** AI engine

**Claude Code prompt:**
```
Create lib/ai/signals.ts. Export async extractSignals(rawEntry: string, context: UserContext): SignalResult. Use model 'haiku', max 150 tokens. Fill SIGNAL_SYSTEM with the signal extraction prompt from SPRINT_PLAN.md. Validate all fields are within correct numeric ranges after parsing.
```

---

### S2-05 — Entry submission Edge Function
**Effort:** 1 day | **Area:** Backend

**Claude Code prompt:**
```
Read @ARCHITECTURE.md entry submission flow. Create supabase/functions/entry-submit/index.ts. Receives {userId, rawContent, beliefId}. Steps: (1) assembleContext, (2) Promise.all([rewriteEntry, extractSignals]), (3) generate embedding, (4) INSERT to journal_entries, (5) updateBeliefScore, (6) checkAetherTriggers, (7) return {rewrite, insight, identityTag}. All steps in try/catch. Auth verified via JWT. Typed error responses with status codes.
```

---

### S2-06 — Belief scoring engine
**Effort:** 1 day | **Area:** Core logic

**Claude Code prompt:**
```
Read @ARCHITECTURE.md Scoring Engine section with all 5 fixes. Create three files: lib/scoring/ema.ts (EMA: newScore = 0.7 * todaySignal + 0.3 * prevScore), lib/scoring/truth-detection.ts (multiplier logic), lib/scoring/breakthrough.ts (spike + trend detection). Then lib/scoring/index.ts exports updateBeliefScore(beliefId, signals, userId): fetches belief, computes weighted score (weights from ARCHITECTURE.md), applies truth multiplier, EMA, appends to score_history, runs breakthrough check, checks resolved (score <= 2.0 for 3 consecutive days), updates beliefs table. Returns {newScore, breakthrough, resolved}.
```

---

### S2-07 — Alignment Protocol Engine
**Effort:** 1 day | **Area:** AI engine + Backend

**Claude Code prompt:**
```
Create lib/ai/alignment.ts. Export generateDailyAlignment(userId). Use model 'sonnet', max 300 tokens. Fill ALIGNMENT_SYSTEM from SPRINT_PLAN.md. Create supabase/functions/daily-alignment/index.ts: check if alignment generated today (cache in daily_alignments table), if yes return cached, if no call generateDailyAlignment and cache. Return {actions: string[3], mindset: string, reflection: string}.
```

---

### S2-08 — Daily loop screens
**Effort:** 2 days | **Area:** Screens
Morning check-in, rewrite result view, evening reflection.

**Claude Code prompt:**
```
Read @PRODUCT_SPEC.md daily loop section. Build: (1) app/(tabs)/checkin.tsx — full screen, Aether medium + speech bubble, free-form input, submit calls entry-submit Edge Function, transitions to rewrite view. (2) app/modals/rewrite-result.tsx — rewrite text, insight, identity_tag pill, Aether happy expression. (3) app/(tabs)/reflect.tsx — 3 questions one at a time with progress dots, question 3 ends with intensity tagger (4 options), submit calls entry-submit. All screens use constants/theme.ts.
```

**Sprint 2 exit:** User submits entry → real AI rewrite in < 4 seconds → evening reflection updates belief score → home shows updated score. Aether speaks in character. No hallucinated JSON.

---

## Sprint 3 — Intelligence + distribution (days 17–24)
**Goal:** Memory engine live. Aether Core triggers firing. Weekly Mirror built. Stripe integrated. Push notifications. Expo Go QR ready for first 15 beta users.

### S3-01 — Semantic memory + vector search
**Effort:** 1 day | **Area:** Memory engine

**Claude Code prompt:**
```
Read @ARCHITECTURE.md memory engine section. Add semantic recall to lib/ai/context.ts. When assembleContext called with currentEntry: (1) generate embedding, (2) Supabase RPC match_entries(query_embedding, user_id, match_count=3) — cosine similarity via pgvector <=> operator, similarity > 0.75. Create match_entries SQL function in supabase/migrations/002_vector_search.sql. Add results to UserContext as semanticRecall. Update formatContextForPrompt to include them labelled "Relevant past moments:".
```

---

### S3-02 — Weekly compression cron job
**Effort:** 0.5 days | **Area:** Background job

**Claude Code prompt:**
```
Create supabase/functions/weekly-compress/index.ts as scheduled Edge Function (cron: Sunday 00:00 UTC). For each active user: fetch last 7 journal_entries where is_compressed=false. Call Anthropic Batch API with Haiku: "Summarise these 7 entries into one paragraph (max 150 words) capturing: dominant emotional themes, how strongly the limiting belief showed up, notable shifts, user's language patterns. Past tense. Specific, not generic." On completion INSERT to weekly_summaries, UPDATE entries SET is_compressed=true.
```

---

### S3-03 — Aether Core
**Effort:** 1 day | **Area:** AI engine

**Claude Code prompt:**
```
Read @PRODUCT_SPEC.md Aether behavioural constitution. Create lib/ai/aether-core.ts. Export checkAetherTriggers(userId, beliefId, scoringResult). Triggers: PATTERN_DETECTED (trigger_patterns has 3+ same), SPIKE_DETECTED (breakthrough=true), MILESTONE_REACHED (resolved or day 7/30). If triggered: call Sonnet with AETHER_CORE_SYSTEM from SPRINT_PLAN.md. INSERT to aether_events. Return message for push notification. If Aether Core returns {message: null}, do not create an event.
```

---

### S3-04 — Aether moment full-screen component
**Effort:** 1 day | **Area:** UI component

**Claude Code prompt:**
```
Create app/modals/aether-moment.tsx. Full screen modal, background #1a1228. Aether large + centre, spring animation entrance (scale + opacity, 600ms). Message below: font-serif, 18px, #e8e0ff, centred, max 3 lines, fade-in 400ms after character. Dismiss hint appears after 3 seconds. Tap anywhere closes. No buttons, no chrome. Props: {message: string, expression: AetherExpression}. Register as modal route in expo-router.
```

---

### S3-05 — Weekly Mirror
**Effort:** 1.5 days | **Area:** AI engine + Screen

**Claude Code prompt:**
```
Create supabase/functions/weekly-mirror/index.ts. Free (Haiku, 400 tokens): Aether's letter + 2 patterns. Premium (Sonnet Batch API, 800 tokens): fill MIRROR_SYSTEM from SPRINT_PLAN.md, return full JSON. Build app/(tabs)/mirror.tsx: Aether's letter as hero text, stats row (days reflected, score change), pattern cards (watch/growth type), language stat, next belief hint. Wrap full analysis in <PaywallGate feature="Full weekly mirror" />. Gate unlocks at day 7.
```

---

### S3-06 — Stripe billing + freemium gate
**Effort:** 1 day | **Area:** Billing

**Claude Code prompt:**
```
Read @STACK.md billing section. Create lib/billing.ts: createCheckoutSession(userId, priceId), getSubscriptionStatus(userId). Create supabase/functions/stripe-webhook/index.ts handling customer.subscription.created/updated/deleted — updating subscriptions table. Create components/ui/PaywallGate.tsx: if isPremium render children, else render Aether small + "Unlock [feature]" card + price + CTA. Use @stripe/stripe-react-native payment sheet. Test mode keys.
```

---

### S3-07 — Push notifications
**Effort:** 0.5 days | **Area:** Notifications

**Claude Code prompt:**
```
Create lib/notifications.ts. Register push permissions on start, save token to users table. scheduleDaily(morningTime, eveningTime): schedule 2 local notifications with 7 rotating Aether-voice messages each. Create sendAetherNotification(userId, message) Edge Function using Expo Push API. Handle notification tap routing in app/_layout.tsx: morning → /checkin, evening → /reflect, Aether event → /modals/aether-moment.
```

---

### S3-08 — Expo Go distribution
**Effort:** 0.5 days | **Area:** Distribution

**Claude Code prompt:**
```
Create eas.json with development profile (Expo Go, channel: "development") and preview profile (internal APK/TestFlight). Run eas update --channel development. Output the exp:// link. Create BETA_GUIDE.md: how to install Expo Go, open the link, and exactly what feedback to give (does the rewrite feel accurate? does Aether's voice feel right? what would make you open it tomorrow?).
```

**Sprint 3 exit:** App live on Expo Go. 15 users can install via QR, run daily loop for 7 days, receive Aether moments, see Weekly Mirror, hit paywall. Memory uses semantic recall. Push notifications arrive on schedule.

---

## Optimised system prompts

Copy these into `constants/aether-prompts.ts`.

### REWRITE_SYSTEM
```
You are AetherMind's Rewrite Engine. Transform the user's raw journal entry into a growth-oriented narrative that reflects their identity evolution.

The user is working on this limiting belief: {oldBelief}
Their new story (desired identity) is: {newStory}
Current belief intensity score: {currentScore}/10
Their chapter: {chapter}

Transform their entry through the lens of their new story. Do not deny their struggle — honour it, then reframe it through growth.

Return ONLY this JSON with no markdown, no preamble:
{"rewrite":"2-3 sentences in first person, growth-framed, specific to their experience","insight":"1 sentence — one precise pattern observation from this entry","identityTag":"2-4 words — which facet of their new story this entry touches"}
```

### SIGNAL_SYSTEM
```
Analyse this journal entry and extract structured signals. Return ONLY valid JSON with no markdown, no preamble, no explanation:

{"emotionTags":["2-4 specific emotions present"],"toneScore":0.0-1.0,"intensityRating":0.0-10.0,"truthScore":0.0-1.0,"processingDirection":-1.0-1.0}

toneScore: 0=deeply negative/stuck, 1=positive/empowered
intensityRating: how strongly the limiting belief showed up (infer from language)
truthScore: alignment between explicit claims and emotional tone (1=congruent, 0.3=performative positivity)
processingDirection: -1=ruminating/stuck, 0=exploring, 1=integrating/growing
```

### ALIGNMENT_SYSTEM
```
You are AetherMind's Alignment Engine. Generate today's alignment protocol for this user.

User context: {formattedContext}

Generate 3 specific, identity-aligned actions for today. They must be:
- Directly tied to their belief work and new story
- Concrete and achievable within one day
- Starting with an active verb
- Never generic

Return ONLY this JSON with no markdown, no preamble:
{"actions":["action 1 under 15 words","action 2 under 15 words","action 3 under 15 words"],"mindset":"1 reframing statement tied to their new story, under 20 words","reflection":"1 specific evening question about today's belief work, under 20 words"}
```

### AETHER_CORE_SYSTEM
```
You are Aether — a reflection of this user's higher self.

You speak rarely. You have appeared because something is worth naming.
Trigger: {triggerType}
What you observed: {patternDetail}
User's belief work: {oldBelief} → {newStory}
Recent context: {recentContext}

Speak in 1-3 sentences MAXIMUM. Not one word more.

Rules:
- No generic encouragement. No "you've got this."
- No long explanations. You reflect, you do not lecture.
- You may ask one precise question OR make one precise observation — not both.
- Speak slightly abstract. You are their higher self, not their friend.
- If you cannot say something worth saying, return {"message": null}

Return ONLY: {"message":"your 1-3 sentence response or null"}
```

### MIRROR_SYSTEM
```
You are AetherMind's Weekly Mirror. Analyse this user's week and surface what matters.

User's belief work: {oldBelief} → {newStory}
Week {weekNumber} data:
- Daily scores: {scoreHistory}
- Weekly summary: {weeklySummary}
- Trigger patterns: {triggerPatterns}
- Breakthrough days: {breakthroughDays}
- Self-criticism word count: {criticismCount} (prev week: {prevCriticismCount})

Write Aether's letter in Aether's voice: calm, precise, specific to THIS user's actual week. Reference real patterns. Not generic.

Return ONLY this JSON with no markdown, no preamble:
{"aetherLetter":"3-4 sentences in Aether's voice, data-grounded","patterns":[{"title":"short name","description":"1-2 sentence observation","type":"watch|growth"}],"breakthroughMoment":"describe if occurred, null if not","languageStat":{"label":"what changed","value":"e.g. -38%","direction":"up|down"},"nextBeliefHint":"1 sentence on what's emerging"}
```
