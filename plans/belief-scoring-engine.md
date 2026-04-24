# Belief Scoring Engine

> Five signals · EMA smoothing · dual breakthrough detection.

The scoring engine is what makes AetherMind measurably different from a journaling app. It runs as a nightly background job after each evening reflection.

---

## Signal Weights

| Signal | Weight | How measured | Notes |
|--------|--------|-------------|-------|
| Explicit intensity rating | **35%** | User taps: barely / somewhat / a lot / it took over | Primary — highest weight |
| Truth alignment score | **20%** | Haiku 4.5 compares claimed identity vs emotional tone | Applied as multiplier on all signals |
| Language tone (split) | **25%** | Self-criticism word count + processing direction | Split into two sub-signals |
| New story match | **15%** | Semantic similarity of entry to `new_story` text | Sonnet embedding similarity |
| Streak multiplier | **5%** | Nonlinear schedule (see below) | Decays 30% on missed day |

### Streak multiplier schedule

| Day | Bonus |
|-----|-------|
| Day 3 | +4% |
| Day 7 | +10% |
| Day 14 | +20% |
| Day 21 | +35% |

Misses a day → streak multiplier decays 30%.

---

## Scoring Algorithm

```
new_score = EMA(weighted_signals × truth_multiplier × streak_multiplier)

EMA:             score_t = 0.7 × today_signal + 0.3 × score_{t-1}

Truth multiplier: final = raw × (0.4 + 0.6 × alignment_score)
```

---

## Breakthrough Detection — Dual Mode

| Mode | Condition | Label stored as |
|------|-----------|----------------|
| **Spike detection** | Single-day drop >= 1.5 points | *'Thursday shift'* |
| **Trend detection** | 7-day regression slope <= -0.25 **and** R² > 0.7 | *'Quiet revolution'* |

Spike detection catches sudden shifts. Trend detection catches quiet, sustained progress that doesn't show a dramatic single-day change.

---

## Belief Resolution

Triggered when `current_score <= 2.0` for **3 consecutive days**.

On resolution:
1. Mark `belief.status = 'resolved'`
2. Lock `new_story` into `identity_anchors`
3. Generate shareable transformation card
4. Enqueue `MILESTONE_REACHED` event for Aether Core
5. Increment `chapter` counter on `identity_profiles`
6. Prompt user to name their next belief to work on
