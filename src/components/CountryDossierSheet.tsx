import React, { useState } from 'react';
import { 
  X, 
  GitCompare, 
  ArrowUpRight, 
  ArrowDownRight, 
  ShieldAlert, 
  Landmark, 
  TrendingUp, 
  HeartPulse, 
  Scale, 
  Cpu, 
  SunMedium, 
  Leaf, 
  ExternalLink,
  ChevronRight,
  Info,
  BookOpen
} from 'lucide-react';
import type { ComputedCountry, IndicatorMeta, MacroCategory, MacroCategoryConfig } from '../types';

interface CountryDossierSheetProps {
  country: ComputedCountry | null;
  categories: MacroCategoryConfig[];
  indicators: IndicatorMeta[];
  onClose: () => void;
  onOpenCompareWith: (iso3: string) => void;
  getScoreColor: (score: number | null | undefined) => string;
  onOpenBiases?: () => void;
}

const CATEGORY_ICONS: Record<MacroCategory, React.ComponentType<{ className?: string }>> = {
  safety: ShieldAlert,
  governance: Landmark,
  economy: TrendingUp,
  health: HeartPulse,
  rights: Scale,
  infrastructure: Cpu,
  climate: SunMedium,
  environment: Leaf
};

export const CountryDossierSheet: React.FC<CountryDossierSheetProps> = ({
  country,
  categories,
  indicators,
  onClose,
  onOpenCompareWith,
  getScoreColor,
  onOpenBiases
}) => {
  const [filterTier, setFilterTier] = useState<number | 'all'>('all');

  if (!country) return null;

  const filteredIndicators = indicators.filter(ind => {
    if (filterTier === 'all') return true;
    return ind.tier === filterTier;
  });

  return (
    <div className="fixed inset-y-0 end-0 z-50 w-full sm:w-[480px] lg:w-[540px] bg-white shadow-2xl border-s border-slate-200 flex flex-col h-full animate-slideIn select-none font-sans">
      {/* Dossier Header */}
      <div className="p-5 border-b border-slate-200 bg-slate-50/80 flex items-start justify-between">
        <div className="flex items-center gap-3">
          <span className="text-3xl leading-none">{country.flag}</span>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-bold text-slate-900 leading-tight">
                {country.name}
              </h2>
              <span className="text-xs font-mono px-1.5 py-0.5 rounded bg-slate-200/70 text-slate-700">
                {country.iso3}
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              {country.region} • {country.percentile != null ? `Top ${100 - country.percentile}% Globally` : 'Unranked Territory'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Composite Score Pill with Tabular Numerics */}
          <div className="text-end">
            {country.compositeScore != null ? (
              <>
                <div className="text-2xl font-extrabold text-teal-800 font-mono tabular-nums leading-none">
                  {country.compositeScore}
                </div>
                <div className="text-[10px] font-bold text-slate-500 font-mono tabular-nums uppercase tracking-wider">
                  Rank #{country.rank}
                </div>
              </>
            ) : (
              <>
                <span className="inline-block px-2 py-0.5 rounded text-xs font-bold bg-slate-200 text-slate-700">
                  No Data
                </span>
                <div className="text-[10px] font-mono tabular-nums text-slate-400 mt-0.5">
                  Unranked
                </div>
              </>
            )}
          </div>

          {/* 44px Accessible Touch Target Close Button */}
          <button
            onClick={onClose}
            className="min-w-[40px] min-h-[40px] flex items-center justify-center text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-200/60 active:scale-95 transition-all ms-2 cursor-pointer"
            title="Close dossier"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Action Bar */}
      <div className="px-5 py-2.5 bg-white border-b border-slate-100 flex items-center justify-between">
        <span className="text-xs text-slate-500">
          {country.compositeScore != null ? 'Ranked under your active category dials' : (country.rawFacts.note || 'Not covered by enough indices to rank')}
        </span>
        {country.hasData !== false && (
          <button
            onClick={() => onOpenCompareWith(country.iso3)}
            className="min-h-[36px] shrink-0 whitespace-nowrap flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-teal-50 border border-teal-200 hover:bg-teal-100 text-teal-800 active:scale-95 text-xs font-medium transition-all cursor-pointer"
          >
            <GitCompare className="w-3.5 h-3.5" />
            <span>Compare</span>
          </button>
        )}
      </div>

      {/* Dossier Body with Overflow Clip Protection */}
      <div className="flex-1 overflow-y-auto overflow-x-clip p-5 space-y-6">
        {/* Standout Strengths & Deficits */}
        <section className="space-y-3">
          <div className="grid grid-cols-1 gap-2.5">
            {/* Strengths */}
            {country.standoutStrengths.map((str, idx) => (
              <div 
                key={`str-${idx}`} 
                className="p-3 bg-emerald-50/60 border border-emerald-200 rounded-xl text-xs flex items-start gap-2.5"
              >
                <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
                  <ArrowUpRight className="w-4 h-4" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-emerald-950 text-xs">
                      {str.indicatorName}
                    </span>
                    <span className="font-mono font-bold text-emerald-700 text-xs bg-emerald-100/70 px-1.5 py-0.2 rounded">
                      {str.badgeText}
                    </span>
                  </div>
                  <p className="text-[11px] text-emerald-900/80 mt-1 leading-snug">
                    {str.explanation}
                  </p>
                </div>
              </div>
            ))}

            {/* Weaknesses */}
            {country.standoutWeaknesses.map((wk, idx) => (
              <div 
                key={`wk-${idx}`} 
                className="p-3 bg-rose-50/60 border border-rose-200 rounded-xl text-xs flex items-start gap-2.5"
              >
                <div className="w-6 h-6 rounded-full bg-rose-100 text-rose-700 flex items-center justify-center shrink-0 mt-0.5">
                  <ArrowDownRight className="w-4 h-4" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-rose-950 text-xs">
                      {wk.indicatorName}
                    </span>
                    <span className="font-mono font-bold text-rose-700 text-xs bg-rose-100/70 px-1.5 py-0.2 rounded">
                      {wk.badgeText}
                    </span>
                  </div>
                  <p className="text-[11px] text-rose-900/80 mt-1 leading-snug">
                    {wk.explanation}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Section 3: Macro Categories Breakdown */}
        <section className="space-y-3">
          <div className="space-y-2.5 bg-white border border-slate-200 rounded-xl p-3.5 shadow-xs">
            {categories.map((cat) => {
              const IconComp = CATEGORY_ICONS[cat.id] || Info;
              const rawVal = country.dimensions[cat.id];
              const hasScore = rawVal != null && !isNaN(rawVal);
              const score = hasScore ? rawVal : 0;
              const barColor = hasScore ? getScoreColor(rawVal) : '#cbd5e1';

              return (
                <div key={cat.id} className="text-xs">
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-1.5">
                      <IconComp className="w-3.5 h-3.5 text-slate-500" />
                      <span className="font-medium text-slate-700">{cat.name}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      {country.dimensionRanks?.[cat.id]?.rank != null && (
                        <span className="text-[10px] font-mono tabular-nums font-bold px-1.5 py-0.5 rounded bg-slate-100 text-slate-600 border border-slate-200">
                          Rank #{country.dimensionRanks[cat.id].rank}
                        </span>
                      )}
                      <span className="font-mono tabular-nums font-semibold text-slate-800">
                        {hasScore ? rawVal : 'N/A'}
                      </span>
                    </div>
                  </div>
                  <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div 
                      className="h-full rounded-full transition-all duration-300"
                      style={{ width: `${hasScore ? score : 0}%`, backgroundColor: barColor }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Section 4: Granular Sub-Indicators Table */}
        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
              All {indicators.length} Underlying Indices
            </h3>
            
            {/* Filter by Tier */}
            <select
              value={filterTier}
              onChange={(e) => setFilterTier(e.target.value === 'all' ? 'all' : parseInt(e.target.value, 10))}
              className="text-[10px] px-2 py-1 bg-slate-100 border border-slate-200 rounded-[6px] text-slate-700 focus:outline-none cursor-pointer"
            >
              <option value="all">All Tiers ({indicators.length})</option>
              <option value="1">Tier 1: Empirical ({indicators.filter(i => i.tier === 1).length})</option>
              <option value="2">Tier 2: Normative ({indicators.filter(i => i.tier === 2).length})</option>
              <option value="3">Tier 3: Expert / Survey ({indicators.filter(i => i.tier === 3).length})</option>
              <option value="4">Tier 4: Derived ({indicators.filter(i => i.tier === 4).length})</option>
            </select>
          </div>

          <div className="border border-slate-200 rounded-xl overflow-hidden bg-white shadow-xs">
            <div className="divide-y divide-slate-100">
              {filteredIndicators.map((ind) => {
                const item = country.indicators[ind.id];
                const hasScore = item && item.score != null;
                const score = hasScore ? item.score : null;
                const formatted = item?.formatted ?? 'No benchmark';

                return (
                  <div key={ind.id} className="p-3 hover:bg-slate-50/70 transition-colors text-xs space-y-1">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <div className="font-semibold text-slate-800 leading-tight">
                          {ind.name}
                        </div>
                        <div className="text-[10px] text-slate-400 mt-0.5">
                          {ind.sourceUrl ? (
                            <a href={ind.sourceUrl} target="_blank" rel="noopener noreferrer" className="underline decoration-slate-300 hover:text-teal-700">{ind.source}</a>
                          ) : ind.source} • <span className="font-mono tabular-nums">{ind.tierLabel}</span>
                        </div>
                      </div>

                      <div className="text-end shrink-0">
                        <div className="flex items-center justify-end gap-1.5">
                          {item?.rank != null && (
                            <span className="text-[10px] font-mono tabular-nums font-bold px-1.5 py-0.5 rounded bg-teal-50 text-teal-800 border border-teal-200">
                              Rank #{item.rank}
                            </span>
                          )}
                          <div className="font-mono tabular-nums font-bold text-slate-800">
                            {hasScore ? `${score} ` : 'N/A '}<span className="text-[10px] text-slate-400 font-normal">/ 100</span>
                          </div>
                        </div>
                        <div className="text-[11px] text-slate-500 font-mono tabular-nums">
                          {formatted}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Section 5: Key Measured Facts */}
        {country.rawFacts.keyFacts && country.rawFacts.keyFacts.length > 0 && (
          <section className="space-y-2">
            <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
              Key Measured Facts
            </h3>
            <div className="grid grid-cols-2 gap-2 text-xs">
              {country.rawFacts.keyFacts.map((fact) => (
                <div key={fact.label} className="p-2.5 bg-slate-50 rounded-[8px] border border-slate-200">
                  <span className="text-[10px] text-slate-400 block">{fact.label}</span>
                  <span className="font-mono tabular-nums font-bold text-slate-800">{fact.value}</span>
                </div>
              ))}
            </div>
            <p className="text-[10px] text-slate-400 leading-snug">
              Climate figures are 1970–2000 WorldClim normals averaged over the country's cities, weighted by population.
              {country.coverage && <> Covered by {country.coverage} indices.</>}
            </p>
          </section>
        )}

        {/* Index Biases Callout */}
        <div className="p-3 bg-amber-50/80 border border-amber-200/90 rounded-xl flex items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-amber-700 shrink-0" />
            <span className="text-amber-950 text-[11px] leading-tight">
              Curious about Western biases, halo effects, or limitations of these indices?
            </span>
          </div>
          {onOpenBiases && (
            <button
              onClick={() => {
                onClose();
                onOpenBiases();
              }}
              className="px-2.5 py-1 rounded bg-amber-200 hover:bg-amber-300 text-amber-900 font-semibold text-[11px] whitespace-nowrap transition-colors cursor-pointer shadow-2xs"
            >
              Read Audit →
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
