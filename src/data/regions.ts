// The regions the map can zoom to, and which countries each takes in.

export type RegionId =
  | 'global'
  | 'europe'
  | 'middle-east'
  | 'north-america'
  | 'south-america'
  | 'asia'
  | 'africa'
  | 'oceania';

export interface RegionDefinition {
  id: RegionId;
  name: string;
  /** Map centre [longitude, latitude] and zoom for the Equal Earth projection. */
  center: [number, number];
  zoom: number;
}

export const REGIONS: RegionDefinition[] = [
  { id: 'global', name: 'World', center: [10, 7.5], zoom: 1 },
  { id: 'europe', name: 'Europe', center: [14, 52], zoom: 4 },
  { id: 'middle-east', name: 'Middle East', center: [44, 28], zoom: 4 },
  { id: 'north-america', name: 'North America', center: [-90, 38], zoom: 2.2 },
  { id: 'south-america', name: 'South America', center: [-62, -20], zoom: 2.4 },
  { id: 'asia', name: 'Asia', center: [95, 26], zoom: 2.2 },
  { id: 'africa', name: 'Africa', center: [18, 2], zoom: 2.3 },
  { id: 'oceania', name: 'Oceania', center: [150, -22], zoom: 2.8 },
];

export const regionById = (id: string): RegionDefinition | undefined => REGIONS.find(r => r.id === id);

export const MIDDLE_EAST_ISOS = new Set([
  'SAU', 'ARE', 'QAT', 'KWT', 'BHR', 'OMN', 'YEM',
  'ISR', 'PSE', 'JOR', 'LBN', 'SYR', 'IRQ', 'IRN',
  'TUR', 'CYP', 'CYN', 'EGY',
]);

export function isCountryInRegion(country: { iso3: string; region: string }, regionId: RegionId): boolean {
  const iso = country.iso3;
  switch (regionId) {
    case 'global':
      return true;
    case 'middle-east':
      return MIDDLE_EAST_ISOS.has(iso);
    case 'europe':
      return country.region === 'Europe' || iso === 'CYP' || iso === 'CYN' || iso === 'TUR';
    case 'north-america':
      return country.region === 'North America' || country.region === 'Americas';
    case 'south-america':
      return country.region === 'South America';
    case 'asia':
      return country.region === 'Asia' && !MIDDLE_EAST_ISOS.has(iso);
    case 'africa':
      return country.region === 'Africa';
    case 'oceania':
      return country.region === 'Oceania';
  }
}
