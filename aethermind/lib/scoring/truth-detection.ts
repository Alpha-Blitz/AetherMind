// Truth Detection Layer — cross-checks claimed identity vs emotional tone vs behavioural consistency.
// truth_score is produced by Haiku 4.5 signal extraction (0–1).
// This module interprets that score and determines Aether's response posture.

export type TruthState = 'authentic' | 'processing' | 'performative';

export interface TruthInterpretation {
  state: TruthState;
  multiplier: number;
  aetherPosture: string;
}

// truth_score thresholds from the architecture spec:
// Authentic (>= 0.7): Aether affirms — "This feels real."
// Processing (>= 0.35): Aether witnesses — "This struggle is the work."
// Performative (< 0.35): Aether gently names it — "I notice you said X. What do you really feel?"
export function interpretTruthScore(truthScore: number): TruthInterpretation {
  if (truthScore >= 0.7) {
    return {
      state: 'authentic',
      multiplier: 1.0,
      aetherPosture: 'affirm',
    };
  }

  if (truthScore >= 0.35) {
    return {
      state: 'processing',
      multiplier: 1.0,
      aetherPosture: 'witness',
    };
  }

  return {
    state: 'performative',
    multiplier: 0.4,
    aetherPosture: 'name',
  };
}

// Applied in the Scoring Engine before EMA:
// final_signal = raw_signal × (0.4 + 0.6 × truth_score)
export function applyTruthMultiplier(rawSignal: number, truthScore: number): number {
  return rawSignal * (0.4 + 0.6 * truthScore);
}
