// EMA: score_t = 0.7 × today_signal + 0.3 × score_{t-1}
const EMA_ALPHA = 0.7;

export function applyEMA(todaySignal: number, previousScore: number): number {
  return EMA_ALPHA * todaySignal + (1 - EMA_ALPHA) * previousScore;
}

// Weighted composite of 5 signals into a single today_signal value.
// All inputs are 0–10 scale. truth_multiplier and streak_multiplier applied post-weight.
export interface ScoringInputs {
  intensityRating: number;    // 35% — explicit user tap
  toneScore: number;          // 25% — language tone (-1..+1 normalised to 0–10)
  newStoryMatch: number;      // 15% — semantic similarity 0–1 normalised to 0–10
  truthScore: number;         // 20% — used as multiplier: 0.4 + 0.6 × truthScore
  streakDay: number;          // streak length → nonlinear multiplier
  previousScore: number;
}

const WEIGHTS = {
  intensity: 0.35,
  tone: 0.25,
  newStory: 0.15,
};

const STREAK_BONUSES: [number, number][] = [
  [21, 0.35],
  [14, 0.20],
  [7,  0.10],
  [3,  0.04],
  [0,  0.00],
];

export function computeStreakMultiplier(streakDay: number): number {
  for (const [threshold, bonus] of STREAK_BONUSES) {
    if (streakDay >= threshold) return 1 + bonus;
  }
  return 1;
}

export function computeNewScore(inputs: ScoringInputs): number {
  const { intensityRating, toneScore, newStoryMatch, truthScore, streakDay, previousScore } = inputs;

  const toneNormalised = ((toneScore + 1) / 2) * 10; // -1..+1 → 0..10

  const rawWeighted =
    intensityRating * WEIGHTS.intensity +
    toneNormalised  * WEIGHTS.tone +
    newStoryMatch   * WEIGHTS.newStory;

  const truthMultiplier = 0.4 + 0.6 * truthScore;
  const streakMultiplier = computeStreakMultiplier(streakDay);

  const todaySignal = rawWeighted * truthMultiplier * streakMultiplier;
  return applyEMA(todaySignal, previousScore);
}
