export type MacroCategory = 
  | 'safety'
  | 'governance'
  | 'rights'
  | 'economy'
  | 'health'
  | 'infrastructure'
  | 'climate';

export type SpectrumTier = 1 | 2 | 3 | 4;

export interface IndicatorMeta {
  id: string;
  name: string;
  shortName: string;
  category: MacroCategory;
  source: string;
  unit: string;
  description: string;
  tier: SpectrumTier;
  tierLabel: string;
  inverted: boolean;
}

export interface IndicatorScore {
  raw: number;
  formatted: string;
  score: number; // 0 - 100 normalized
  rank?: number;
  total?: number;
}

export interface StandoutFact {
  indicatorId: string;
  indicatorName: string;
  score: number;
  rank?: number;
  totalCountries?: number;
  badgeText: string;
  explanation: string;
}

export interface CountryData {
  iso3: string;
  numeric: string;
  name: string;
  region: string;
  flag: string;
  hasData?: boolean;
  isDependency?: boolean;
  parentIso?: string;
  parentName?: string;
  dimensions: Record<MacroCategory, number | null>; // Base 0 - 100 macro scores (or null if no data)
  indicators: Record<string, IndicatorScore>;
  divergenceStory: string;
  standoutStrengths: StandoutFact[];
  standoutWeaknesses: StandoutFact[];
  rawFacts: {
    note?: string;
    homicidePer100k?: number | string;
    trafficDeathsPer100k?: number | string;
    healthyLifeYears?: number | string;
    airQualityPM25?: number | string;
    broadbandMbps?: number | string;
    avgTempCelsius?: number | string;
    annualSunnyHours?: number | string;
    annualRainfallMm?: number | string;
    rainyDaysPerYr?: number | string;
    relativeHumidity?: number | string;
    gdpPerCapitaPpp?: string;
    pressFreedomScore?: number | string;
    religiousFreedomScore?: number | string;
    lgbtqScore?: number | string;
    womenPeaceSecurity?: number | string;
    giniCoefficient?: number | string;
    naturalDisasterRisk?: number | string;
    workerRightsRating?: number | string;
    academicFreedomScore?: number | string;
    transitAccessPct?: number | string;
    childWelfareScore?: number | string;
    climateResilience?: number | string;
    daysAbove30C?: number | string;
    daysBelow0C?: number | string;
  };
}

export interface MacroCategoryConfig {
  id: MacroCategory;
  name: string;
  description: string;
  iconName: string;
  color: string;
  indicators: string[]; // List of indicator IDs belonging to this category
}

export interface UserWeights {
  macro: Record<MacroCategory, number>; // 0 - 100
  sub: Record<string, number>; // 0 - 100 (optional fine-tuning)
  useSubWeights: boolean;
  spectrumFilter: 'all' | 'empirical_only' | 'normative' | 'expert';
}

export interface ComputedCountry extends CountryData {
  compositeScore: number | null;
  rank: number | null;
  percentile: number | null;
  activeStrengths: StandoutFact[];
  activeWeaknesses: StandoutFact[];
  indicatorRanks?: Record<string, { rank: number; total: number; percentile: number }>;
  dimensionRanks?: Record<MacroCategory, { rank: number; total: number; percentile: number }>;
}
