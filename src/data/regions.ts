import type { ComputedCountry, CountryData } from '../types';
import { getNormalizedSmoothColor } from '../utils/colorScale';

export type RegionId = 
  | 'global' 
  | 'europe' 
  | 'middle_east' 
  | 'north_america' 
  | 'south_america' 
  | 'asia' 
  | 'africa' 
  | 'oceania';

export interface RegionDefinition {
  id: RegionId;
  name: string;
  shortName: string;
  icon: string;
  center: [number, number];
  zoom: number;
}

export const REGIONS: RegionDefinition[] = [
  { id: 'global', name: 'Global', shortName: 'World', icon: '🌐', center: [0, 0], zoom: 1 },
  { id: 'europe', name: 'Europe', shortName: 'Europe', icon: '🏰', center: [16, 52], zoom: 3.2 },
  { id: 'middle_east', name: 'Middle East', shortName: 'Mid East', icon: '🌴', center: [44, 28], zoom: 3.6 },
  { id: 'north_america', name: 'North America', shortName: 'N. America', icon: '🌲', center: [-98, 42], zoom: 2.1 },
  { id: 'south_america', name: 'South America', shortName: 'S. America', icon: '🦜', center: [-60, -22], zoom: 2.1 },
  { id: 'asia', name: 'Asia', shortName: 'Asia', icon: '🪷', center: [95, 26], zoom: 2.0 },
  { id: 'africa', name: 'Africa', shortName: 'Africa', icon: '🐘', center: [20, 2], zoom: 2.0 },
  { id: 'oceania', name: 'Oceania', shortName: 'Oceania', icon: '🌊', center: [142, -26], zoom: 2.5 },
];

export const MIDDLE_EAST_ISOS = new Set([
  'SAU', 'ARE', 'QAT', 'KWT', 'BHR', 'OMN', 'YEM', 
  'ISR', 'PSE', 'JOR', 'LBN', 'SYR', 'IRQ', 'IRN', 
  'TUR', 'CYP', 'CYN', 'EGY'
]);

export function isCountryInRegion(country: { iso3: string; region: string }, regionId: RegionId): boolean {
  if (regionId === 'global') return true;
  const iso = country.iso3;
  if (regionId === 'middle_east') {
    return MIDDLE_EAST_ISOS.has(iso);
  }
  if (regionId === 'europe') {
    return country.region === 'Europe' || iso === 'CYP' || iso === 'CYN' || iso === 'TUR';
  }
  if (regionId === 'north_america') {
    return country.region === 'North America' || country.region === 'Americas';
  }
  if (regionId === 'south_america') {
    return country.region === 'South America';
  }
  if (regionId === 'asia') {
    return country.region === 'Asia' && !MIDDLE_EAST_ISOS.has(iso);
  }
  if (regionId === 'africa') {
    return country.region === 'Africa';
  }
  if (regionId === 'oceania') {
    return country.region === 'Oceania';
  }
  return false;
}

export interface RegionalScaleInfo {
  minScore: number;
  maxScore: number;
  thresholds: [number, number, number, number];
  getColor: (score: number | null | undefined) => string;
}

export function computeRegionalScale(
  countriesInRegion: ComputedCountry[],
  relativise: boolean,
  globalGetColor: (score: number | null | undefined) => string
): RegionalScaleInfo {
  if (!relativise || countriesInRegion.length === 0) {
    return {
      minScore: 0,
      maxScore: 100,
      thresholds: [35, 50, 65, 80],
      getColor: globalGetColor
    };
  }

  const scores = countriesInRegion
    .map(c => c.compositeScore)
    .filter((s): s is number => s !== undefined && s !== null && !isNaN(s));

  if (scores.length === 0) {
    return {
      minScore: 0,
      maxScore: 100,
      thresholds: [35, 50, 65, 80],
      getColor: globalGetColor
    };
  }

  const minScore = Math.min(...scores);
  const maxScore = Math.max(...scores);
  const delta = maxScore - minScore;

  if (delta < 2) {
    return {
      minScore,
      maxScore,
      thresholds: [minScore, minScore, minScore, minScore],
      getColor: (s) => (s == null || isNaN(s) ? '#cbd5e1' : '#16a34a')
    };
  }

  // 5 quintile thresholds relative to regional distribution
  const t1 = Math.round((minScore + delta * 0.20) * 10) / 10;
  const t2 = Math.round((minScore + delta * 0.40) * 10) / 10;
  const t3 = Math.round((minScore + delta * 0.60) * 10) / 10;
  const t4 = Math.round((minScore + delta * 0.80) * 10) / 10;

  const getColor = (score: number | null | undefined) => {
    if (score === undefined || score === null || isNaN(score)) return '#cbd5e1';
    const normalized = Math.max(0, Math.min(1, (score - minScore) / delta));
    return getNormalizedSmoothColor(normalized);
  };

  return {
    minScore,
    maxScore,
    thresholds: [t1, t2, t3, t4],
    getColor
  };
}
