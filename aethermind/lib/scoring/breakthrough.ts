export type BreakthroughType = 'thursday_shift' | 'quiet_revolution' | null;

// Spike detection: single-day drop >= 1.5 points → "Thursday shift"
export function detectSpike(previousScore: number, newScore: number): boolean {
  return previousScore - newScore >= 1.5;
}

// Trend detection: 7-day linear regression slope <= -0.25 AND R² > 0.7 → "Quiet revolution"
export function detectTrend(scoreHistory: number[]): boolean {
  if (scoreHistory.length < 7) return false;
  const window = scoreHistory.slice(-7);
  const { slope, r2 } = linearRegression(window);
  return slope <= -0.25 && r2 > 0.7;
}

export function classifyBreakthrough(previousScore: number, newScore: number, scoreHistory: number[]): BreakthroughType {
  if (detectSpike(previousScore, newScore)) return 'thursday_shift';
  if (detectTrend(scoreHistory)) return 'quiet_revolution';
  return null;
}

// Belief is resolved when score <= 2.0 for 3 consecutive days
export function isBeliefResolved(scoreHistory: number[]): boolean {
  if (scoreHistory.length < 3) return false;
  return scoreHistory.slice(-3).every((s) => s <= 2.0);
}

function linearRegression(values: number[]): { slope: number; r2: number } {
  const n = values.length;
  const xs = Array.from({ length: n }, (_, i) => i);
  const meanX = xs.reduce((a, b) => a + b, 0) / n;
  const meanY = values.reduce((a, b) => a + b, 0) / n;

  const ssXY = xs.reduce((sum, x, i) => sum + (x - meanX) * (values[i] - meanY), 0);
  const ssXX = xs.reduce((sum, x) => sum + (x - meanX) ** 2, 0);
  const ssYY = values.reduce((sum, y) => sum + (y - meanY) ** 2, 0);

  const slope = ssXX === 0 ? 0 : ssXY / ssXX;
  const r2 = ssYY === 0 ? 1 : (ssXY ** 2) / (ssXX * ssYY);

  return { slope, r2 };
}
