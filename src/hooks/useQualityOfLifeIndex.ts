import { useState, useMemo, useCallback } from 'react';
import type { MacroCategory, ComputedCountry, StandoutFact, MacroCategoryConfig, IndicatorMeta, CountryData } from '../types';
import rawCountries from '../data/countries.json';
import rawIndicators from '../data/indicators.json';
import rawCategories from '../data/categories.json';

const categories = rawCategories as unknown as MacroCategoryConfig[];
const indicators = rawIndicators as unknown as IndicatorMeta[];
const countries = rawCountries as unknown as Record<string, CountryData>;

const DEFAULT_MACRO_WEIGHTS: Record<MacroCategory, number> = {
  safety: 50,
  governance: 50,
  rights: 50,
  economy: 50,
  health: 50,
  infrastructure: 50,
  climate: 50,
  environment: 50
};

import { RegionId, REGIONS, isCountryInRegion, computeRegionalScale, RegionalScaleInfo } from '../data/regions';
import { getSmoothScoreColor } from '../utils/colorScale';

export function useQualityOfLifeIndex() {
  const [macroWeights, setMacroWeights] = useState<Record<MacroCategory, number>>(DEFAULT_MACRO_WEIGHTS);
  const [subWeights, setSubWeights] = useState<Record<string, number>>(() => {
    const init: Record<string, number> = {};
    for (const ind of indicators) {
      init[ind.id] = 50;
    }
    return init;
  });
  const [useSubWeights, setUseSubWeights] = useState<boolean>(false);
  const [activeRegion, setActiveRegion] = useState<RegionId>('global');
  const [relativiseColors, setRelativiseColors] = useState<boolean>(true);
  const [selectedCountryIso, setSelectedCountryIso] = useState<string | null>(null);
  const [compareCountryIso, setCompareCountryIso] = useState<string | null>(null);
  const [isCompareOpen, setIsCompareOpen] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');

  const setMacroWeight = useCallback((category: MacroCategory, value: number) => {
    setMacroWeights(prev => ({
      ...prev,
      [category]: Math.max(0, Math.min(100, value))
    }));
  }, []);

  const setAllMacroWeights = useCallback((weights: Record<MacroCategory, number>) => {
    setMacroWeights(weights);
  }, []);

  const setSubWeight = useCallback((indicatorId: string, value: number) => {
    setSubWeights(prev => ({
      ...prev,
      [indicatorId]: Math.max(0, Math.min(100, value))
    }));
  }, []);

  const resetWeights = useCallback(() => {
    setMacroWeights(DEFAULT_MACRO_WEIGHTS);
    const resetSubs: Record<string, number> = {};
    for (const ind of indicators) {
      resetSubs[ind.id] = 50;
    }
    setSubWeights(resetSubs);
    setUseSubWeights(false);
  }, []);

  // Compute composite scores for all countries
  const { computedCountries, countryList } = useMemo(() => {
    const computedRecord: Record<string, ComputedCountry> = {};
    const list: ComputedCountry[] = [];

    // Check sum of weights
    const totalMacroWeight = Object.values(macroWeights).reduce((a, b) => a + b, 0);
    const macroCats = Object.keys(DEFAULT_MACRO_WEIGHTS) as MacroCategory[];

    // Group indicators by category
    const catIndicatorsMap: Record<MacroCategory, IndicatorMeta[]> = {
      safety: [],
      governance: [],
      economy: [],
      health: [],
      rights: [],
      infrastructure: [],
      climate: [],
      environment: []
    };
    for (const ind of indicators) {
      const cat = ind.category as MacroCategory;
      if (catIndicatorsMap[cat]) {
        catIndicatorsMap[cat].push(ind);
      }
    }

    for (const [iso3, country] of Object.entries(countries)) {
      if (country.hasData === false) {
        const computed: ComputedCountry = {
          ...country,
          dimensions: {
            safety: null,
            governance: null,
            economy: null,
            health: null,
            rights: null,
            infrastructure: null,
            climate: null,
            environment: null
          },
          compositeScore: null,
          rank: null,
          percentile: null,
          activeStrengths: [],
          activeWeaknesses: []
        };
        computedRecord[iso3] = computed;
        list.push(computed);
        continue;
      }

      // Compute dynamic dimension scores
      const dynamicDimensions = { ...country.dimensions };

      if (useSubWeights) {
        for (const cat of macroCats) {
          const catInds = catIndicatorsMap[cat];
          if (!catInds || catInds.length === 0) continue;

          // Check if subweights in this category differ or deviate from uniform
          const firstW = subWeights[catInds[0].id] ?? 50;
          const isUniform = catInds.every(ind => (subWeights[ind.id] ?? 50) === firstW);

          if (!isUniform) {
            let catWeightedSum = 0;
            let catTotalSubWeight = 0;
            for (const ind of catInds) {
              const sw = subWeights[ind.id] ?? 50;
              const indVal = country.indicators[ind.id];
              if (indVal && indVal.score != null) {
                catWeightedSum += indVal.score * sw;
                catTotalSubWeight += sw;
              }
            }
            if (catTotalSubWeight > 0) {
              dynamicDimensions[cat] = Math.round((catWeightedSum / catTotalSubWeight) * 10) / 10;
            }
          }
        }
      }

      // Compute overall composite score from macro categories
      // Supports graceful partial coverage where only some dimensions are present
      let compositeScore: number | null = null;
      let weightedSum = 0;
      let effectiveTotalWeight = 0;

      for (const cat of macroCats) {
        const catScore = dynamicDimensions[cat];
        if (catScore != null && !isNaN(catScore)) {
          const w = (totalMacroWeight === 0) ? 50 : (macroWeights[cat] ?? 50);
          weightedSum += catScore * w;
          effectiveTotalWeight += w;
        }
      }

      if (effectiveTotalWeight > 0) {
        compositeScore = Math.round((weightedSum / effectiveTotalWeight) * 10) / 10;
      }

      // Determine active dynamic strengths & weaknesses under current user weights using RANKS
      const indicatorEntries = Object.entries(country.indicators || {})
        .filter(([_, val]) => val && val.score != null)
        .map(([id, val]) => {
          const indMeta = indicators.find(i => i.id === id);
          const catWeight = macroWeights[indMeta?.category as MacroCategory] ?? 50;
          const subW = useSubWeights ? (subWeights[id] ?? 50) : 50;
          const priority = (catWeight / 50) * (subW / 50);
          return {
            id,
            name: indMeta?.name || id,
            shortName: indMeta?.shortName || id,
            score: val.score,
            rank: val.rank,
            total: val.total || 0,
            formatted: val.formatted,
            priority
          };
        });

      // Filter high-priority indicators
      const activeIndicators = indicatorEntries.filter(i => i.priority > 0.2);
      
      // Best global ranks (lowest rank number = 1st, 2nd, etc. -> true overperformance)
      const sortedByRankAsc = [...activeIndicators].sort((a, b) => (a.rank ?? 999) - (b.rank ?? 999));
      // Worst global ranks (highest rank number = 230th, 180th, etc. -> true underperformance)
      const sortedByRankDesc = [...activeIndicators].sort((a, b) => (b.rank ?? 0) - (a.rank ?? 0));

      const activeStrengths: StandoutFact[] = sortedByRankAsc.slice(0, 2).map(item => ({
        indicatorId: item.id,
        indicatorName: item.shortName,
        score: item.score,
        rank: item.rank,
        totalCountries: item.total,
        badgeText: item.rank ? `Rank #${item.rank} globally` : `${item.score}/100`,
        explanation: item.rank 
          ? `Ranks #${item.rank} of ${item.total} globally in ${item.shortName} (${item.formatted}).`
          : `Strong performance in ${item.shortName} (${item.formatted}).`
      }));

      const activeWeaknesses: StandoutFact[] = sortedByRankDesc.slice(0, 2).map(item => ({
        indicatorId: item.id,
        indicatorName: item.shortName,
        score: item.score,
        rank: item.rank,
        totalCountries: item.total,
        badgeText: item.rank ? `Rank #${item.rank} globally` : `${item.score}/100`,
        explanation: item.rank 
          ? `Ranks #${item.rank} of ${item.total} globally in ${item.shortName} (${item.formatted}).`
          : `Lagging performance in ${item.shortName} (${item.formatted}).`
      }));

      const computed: ComputedCountry = {
        ...country,
        dimensions: dynamicDimensions,
        compositeScore,
        rank: null,
        percentile: null,
        activeStrengths: activeStrengths.length > 0 ? activeStrengths : (country.standoutStrengths || []),
        activeWeaknesses: activeWeaknesses.length > 0 ? activeWeaknesses : (country.standoutWeaknesses || [])
      };

      computedRecord[iso3] = computed;
      list.push(computed);
    }

    // Separate scored countries from unranked/no-data countries (excluding non-sovereign dependencies)
    const scoredList = list.filter((item): item is ComputedCountry & { compositeScore: number } => 
      item.compositeScore !== null && item.hasData !== false && !item.isDependency
    );
    const unscoredList = list.filter(item => 
      (item.compositeScore === null || item.hasData === false) && !item.isDependency
    );

    // Sort scored countries descending to assign global ranks
    scoredList.sort((a, b) => b.compositeScore - a.compositeScore);

    const totalScoredCount = scoredList.length;
    scoredList.forEach((item, index) => {
      const rank = index + 1;
      const percentile = Math.round(((totalScoredCount - index) / totalScoredCount) * 100);
      item.rank = rank;
      item.percentile = percentile;
      computedRecord[item.iso3].rank = rank;
      computedRecord[item.iso3].percentile = percentile;
    });

    unscoredList.forEach(item => {
      item.rank = null;
      item.percentile = null;
      computedRecord[item.iso3].rank = null;
      computedRecord[item.iso3].percentile = null;
    });

    // Compute dimension ranks across all scored countries
    const dimensionRanksRecord: Record<MacroCategory, Record<string, { rank: number; total: number; percentile: number }>> = {
      safety: {}, governance: {}, economy: {}, health: {}, rights: {}, infrastructure: {}, climate: {}, environment: {}
    };

    for (const cat of macroCats) {
      const catList = scoredList
        .filter(c => c.dimensions[cat] != null)
        .map(c => ({ iso3: c.iso3, score: c.dimensions[cat] as number }));
      catList.sort((a, b) => b.score - a.score);
      const totalCat = catList.length;
      catList.forEach((c, idx) => {
        let rank = idx + 1;
        if (idx > 0 && catList[idx - 1].score === c.score) {
          rank = dimensionRanksRecord[cat][catList[idx - 1].iso3].rank;
        }
        const percentile = Math.round(((totalCat - rank) / totalCat) * 100);
        dimensionRanksRecord[cat][c.iso3] = { rank, total: totalCat, percentile };
      });
    }

    // Attach dimensionRanks to each computed country
    scoredList.forEach(item => {
      const countryDimRanks: Record<MacroCategory, { rank: number; total: number; percentile: number }> = {} as any;
      for (const cat of macroCats) {
        if (dimensionRanksRecord[cat][item.iso3]) {
          countryDimRanks[cat] = dimensionRanksRecord[cat][item.iso3];
        }
      }
      item.dimensionRanks = countryDimRanks;
      computedRecord[item.iso3].dimensionRanks = countryDimRanks;
    });

    const fullSortedList = [...scoredList, ...unscoredList];

    return { computedCountries: computedRecord, countryList: fullSortedList };
  }, [macroWeights, subWeights, useSubWeights]);

  const getScoreColor = useCallback((score: number | null | undefined) => {
    return getSmoothScoreColor(score);
  }, []);

  // Filter country list by active region
  const countriesInRegion = useMemo(() => {
    return countryList.filter(c => isCountryInRegion(c, activeRegion));
  }, [countryList, activeRegion]);

  // Compute regional relative color scale
  const regionalScale = useMemo(() => {
    return computeRegionalScale(
      countriesInRegion.filter(c => c.hasData !== false && c.compositeScore !== null),
      activeRegion !== 'global' && relativiseColors,
      getScoreColor
    );
  }, [countriesInRegion, activeRegion, relativiseColors, getScoreColor]);

  // Compute regional ranks
  const regionalRanks = useMemo(() => {
    const map: Record<string, { rank: number | null; total: number }> = {};
    const scored = countriesInRegion.filter(c => c.hasData !== false && c.compositeScore !== null);
    scored.sort((a, b) => (b.compositeScore ?? 0) - (a.compositeScore ?? 0));
    scored.forEach((c, idx) => {
      map[c.iso3] = { rank: idx + 1, total: scored.length };
    });
    countriesInRegion.forEach(c => {
      if (!map[c.iso3]) {
        map[c.iso3] = { rank: null, total: scored.length };
      }
    });
    return map;
  }, [countriesInRegion]);

  return {
    categories,
    indicators,
    macroWeights,
    subWeights,
    useSubWeights,
    activeRegion,
    setActiveRegion,
    relativiseColors,
    setRelativiseColors,
    countriesInRegion,
    regionalScale,
    regionalRanks,
    computedCountries,
    countryList,
    selectedCountryIso,
    compareCountryIso,
    isCompareOpen,
    searchQuery,
    setMacroWeight,
    setAllMacroWeights,
    setSubWeight,
    setUseSubWeights,
    resetWeights,
    setSelectedCountryIso,
    setCompareCountryIso,
    setIsCompareOpen,
    setSearchQuery,
    getScoreColor
  };
}
