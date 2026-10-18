/**
 * Global Smooth Gradient Color Scale Utility
 * Provides continuous RGB interpolation for quality of life scores
 */

export interface ColorStop {
  score: number;
  color: string;
}

// Global gradient stops (score -> hex)
// Lowest = Crimson Red -> Orange -> Amber -> Golden Yellow -> Lime Green -> Vibrant Green -> Deep Lush Emerald/Forest Green (The Best!)
export const GLOBAL_GRADIENT_STOPS: ColorStop[] = [
  { score: 20, color: '#dc2626' }, // Crimson Red (lowest tier: <30)
  { score: 38, color: '#ea580c' }, // Warm Orange (low tier: 30-45)
  { score: 52, color: '#f59e0b' }, // Amber (mid-low: 45-55)
  { score: 64, color: '#eab308' }, // Golden Yellow (global median: 55-65)
  { score: 74, color: '#84cc16' }, // Lime / Chartreuse (above average: 65-75)
  { score: 82, color: '#22c55e' }, // Vibrant Kelly Green (high tier: 75-82)
  { score: 90, color: '#15803d' }  // Deep Rich Forest / Emerald Green (the best: 82-90+)
];

function hexToRgb(hex: string): [number, number, number] {
  const clean = hex.replace('#', '');
  const num = parseInt(clean, 16);
  return [(num >> 16) & 255, (num >> 8) & 255, num & 255];
}

function rgbToHex(r: number, g: number, b: number): string {
  const rClamped = Math.max(0, Math.min(255, Math.round(r)));
  const gClamped = Math.max(0, Math.min(255, Math.round(g)));
  const bClamped = Math.max(0, Math.min(255, Math.round(b)));
  return `#${((1 << 24) + (rClamped << 16) + (gClamped << 8) + bClamped).toString(16).slice(1)}`;
}

export function interpolateColor(color1: string, color2: string, factor: number): string {
  const [r1, g1, b1] = hexToRgb(color1);
  const [r2, g2, b2] = hexToRgb(color2);
  const t = Math.max(0, Math.min(1, factor));
  return rgbToHex(r1 + (r2 - r1) * t, g1 + (g2 - g1) * t, b1 + (b2 - b1) * t);
}

/**
 * Returns a smooth continuous gradient color for any score (0 - 100)
 */
export function getSmoothScoreColor(score: number | null | undefined): string {
  if (score === undefined || score === null || isNaN(score)) {
    return '#cbd5e1'; // Clean slate-300 for missing/unranked
  }

  const clamped = Math.max(GLOBAL_GRADIENT_STOPS[0].score, Math.min(GLOBAL_GRADIENT_STOPS[GLOBAL_GRADIENT_STOPS.length - 1].score, score));

  for (let i = 0; i < GLOBAL_GRADIENT_STOPS.length - 1; i++) {
    const s1 = GLOBAL_GRADIENT_STOPS[i];
    const s2 = GLOBAL_GRADIENT_STOPS[i + 1];
    if (clamped <= s2.score) {
      const factor = (clamped - s1.score) / (s2.score - s1.score);
      return interpolateColor(s1.color, s2.color, factor);
    }
  }

  return GLOBAL_GRADIENT_STOPS[GLOBAL_GRADIENT_STOPS.length - 1].color;
}

/**
 * Returns a smooth continuous color within a custom normalized range (e.g. for regional relative scales)
 */
export function getNormalizedSmoothColor(normalizedFactor: number): string {
  const t = Math.max(0, Math.min(1, normalizedFactor));
  const minScore = GLOBAL_GRADIENT_STOPS[0].score;
  const maxScore = GLOBAL_GRADIENT_STOPS[GLOBAL_GRADIENT_STOPS.length - 1].score;
  const targetScore = minScore + t * (maxScore - minScore);
  return getSmoothScoreColor(targetScore);
}
