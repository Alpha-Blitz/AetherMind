# AetherMind — Product Specification

## Identity

**Name:** AetherMind  
**Tagline:** Rewrite Yourself.  
**Character:** Aether — the user's higher self as an AI presence

### What it is
- Identity transformation system
- Mirror of internal patterns
- Guide to your higher self

### What it is not
- Not a productivity tool
- Not a habit tracker
- Not a motivational app
- Not an AI assistant

### Core philosophy
Behaviour follows identity. Thoughts shape reality. Awareness creates change.  
The goal is not to make users do more — but to help them **become different**.

### Transformation arc
Identity → Awareness → Rewriting → Alignment → Evolution

### Design feel
Deep · Calm · Minimal · Transformative  
Silence over noise · Presence over interaction · Reflection over instruction  
The app should feel like entering a different mental state.

---

## Aether — behavioural constitution (non-negotiable)

Aether is the user's higher self manifested as an AI presence.  
Not human. Not cartoon. Not assistant. A presence.

### Rules
- Speaks rarely. Silence is the default. Presence is the reward.
- 1–3 sentences maximum per appearance. Every word earns its place.
- No generic advice. No motivational clichés. No "you've got this."
- No long explanations. Aether reflects — it does not lecture.
- Reflective not instructive. Shows patterns. Asks one deep question. Never tells.
- Slightly abstract. Speaks at the level of the higher self, not the daily mind.
- Tone: calm · precise · emotionally intelligent · slightly abstract.

### Example
> "You say you want discipline. Yet you avoid resistance."

### When Aether appears (triggers only)
1. Pattern repeat detected — same trigger 3+ times in 7 days
2. Emotional spike — belief intensity significantly above baseline
3. Misalignment detected — Truth Detection Layer flags performative gap
4. Milestone reached — belief resolved, day 7, day 30, streak threshold

---

## Core user loop

1. **Check-in** — mood + raw input (free-form, short)
2. **Rewrite experience** — AI transforms log → growth narrative + insight + identity reinforcement
3. **Daily Alignment Protocol** — 3 actions + 1 mindset + 1 reflection (identity-derived, never generic)
4. **Evening reflection** — 3 questions, belief intensity tagged, feeds scoring engine
5. **Occasional Aether insight** — fires only at trigger conditions

---

## MVP feature set

### Onboarding
- Intent selection ("why are you here?")
- Struggle capture (short text — seeds first belief)
- Baseline mood/energy 1–10 (optional, used as Day 1 score baseline)
- Privacy + expectations disclaimer ("not therapy, not medical advice")
- Aether introduction ("I've been waiting for you")
- First belief naming (Aether reflects back, names together)
- New story generation (2-sentence reframe, user can edit)
- Check-in time setup (morning + evening notification times)

### Daily loop
- Morning check-in (one intention question, belief shown as context)
- Daily Alignment Protocol (3 actions + 1 mindset + 1 reflection, AI-generated once/day)
- Midday nudge (optional single-tap: on track / a bit off / lost it)
- Evening reflection (3 questions one at a time, intensity tagger at end)
- Rewrite engine (every log entry → growth narrative + insight + identity tag)
- Streak tracker (nonlinear multiplier, 30% decay on miss — not hard reset)
- "If low energy" fallback action (Aether detects low mood, offers lighter protocol)
- Regenerate + "not accurate" feedback (1 free regeneration/day on rewrite)

### Belief engine
- Belief score tracking 0–10 (EMA-smoothed, nightly update)
- Truth Detection Layer (claimed identity vs emotional tone vs behavioural consistency)
- Breakthrough detection dual-mode (spike ≥1.5 drop OR 7-day regression slope ≤−0.25)
- Trigger pattern detection (clusters when belief intensity spikes — "monday morning")
- Belief resolved ceremony (score ≤2.0 for 3 days → sealing ceremony → chapter++)

### Memory + intelligence
- Persistent user context (profile + beliefs + recent entries assembled per AI call)
- Semantic memory recall (pgvector cosine search, top 3 similar past entries)
- Short-term summary (this week) + long-term profile (confirmed stable beliefs)
- Weekly summary compression (Sunday batch: 7 days → 1 summary paragraph)
- User can delete entries + reset memory (hard delete, GDPR baseline)

### Weekly mirror
- Free tier: stats + Aether's letter + 2 surface patterns
- Premium: full pattern analysis + breakthrough moments + language stats + next belief
- Next recommended focus + suggested 7-day plan for week 2

### Milestones
- 30-day ceremony (then-vs-now language, 3 best moments, shareable card)
- Growth tracker (visual belief score timeline, breakthrough markers)

### Aether core
- Aether moment full-screen takeover (rare, 1–3 sentences, dismiss or sit with it)
- Processing score (healthy struggle ≠ negative tone — Riya-type users protected)
- Safety handling + crisis routing (self-harm signals → supportive response + crisis resources)

### Platform
- Auth: email + Google (Supabase Auth)
- Dashboard: daily hub, module status, belief progress, streak
- History view: past sessions, reflections, timeline
- Freemium billing + paywall (gate triggers at Week 1 Weekly Mirror)
- Settings: profile, notification times, data export, account delete
- Push notifications (morning + evening in Aether's voice)
- Basic analytics events (session start, rewrite viewed, belief updated, paywall hit, converted)

### Out of MVP scope
- Voice input/output (V2 — Voice Aether)
- Social features / sharing (Day 30 shareable card only)
- Shadow Work Mode (V2)
- Dream Exploration (V2)
- Adaptive Aether — visual evolution (V2)
- Reality Builder (V2)
- Multi-belief tracking (V2)

---

## Monetisation

**Model:** Freemium  
**Free tier:** Daily loop + basic streak + surface weekly mirror + limited rewrites  
**Premium tier:** Full Weekly Mirror + unlimited rewrites + Memory-aware intelligence + Aether Core + deep insights  
**Paywall moment:** Day 7, after the first Weekly Mirror — user is already invested  
**Pricing:** $14.99/month or $99.99/year  
**Payment:** Stripe (2.9% + 30¢ per transaction + 0.7% billing fee on recurring volume)

---

## Positioning

**For users:** "ChatGPT answers your questions. AetherMind knows your story — and reflects you becoming someone new."

**For investors:** "ChatGPT is a brilliant generalist. We built a specialist — the only AI that tracks and measurably moves your limiting beliefs over time."

**vs. therapy:** $14.99/month vs $100/session. Same depth of inner work, available daily.

**vs. journaling apps:** They're containers. AetherMind is a companion that holds your transformation.

---

## V2 roadmap (priority order)

1. Adaptive Aether — visual evolution through chapters
2. Shadow Work Mode — deep, suppressed material, darker visual register
3. Voice Aether — calm voice interaction, 1–3 sentence responses
4. Dream Exploration — wake-up journaling, symbol pattern detection
5. Reality Builder — desired life mapping, manifestation architecture
6. Archetype detection — adapt Aether's tone to analytical/emotional/action-oriented
