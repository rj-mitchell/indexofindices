import React, { useState, useMemo, useRef, useEffect } from 'react';
import { 
  X, 
  GitCompare, 
  Trophy, 
  ArrowRight, 
  ShieldAlert, 
  Landmark, 
  TrendingUp, 
  HeartPulse, 
  Scale, 
  Cpu, 
  SunMedium, 
  Leaf, 
  CheckCircle, 
  HelpCircle,
  Search,
  ChevronDown,
  ArrowLeftRight,
  Check
} from 'lucide-react';
import type { ComputedCountry, IndicatorMeta, MacroCategory, MacroCategoryConfig } from '../types';

interface CountryComparisonModalProps {
  countryList: ComputedCountry[];
  computedCountries: Record<string, ComputedCountry>;
  initialCountryA: string | null;
  initialCountryB: string | null;
  categories: MacroCategoryConfig[];
  indicators: IndicatorMeta[];
  isOpen: boolean;
  onClose: () => void;
  getScoreColor: (score: number | null | undefined) => string;
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

/**
 * Relative Head-to-Head Win Bar:
 * Diverges from the 50% meridian towards the winner to the extent of their score lead.
 * If Country A wins, the bar extends left towards Country A.
 * If Country B wins, the bar extends right towards Country B.
 */
interface RelativeWinBarProps {
  scoreA: number | null | undefined;
  scoreB: number | null | undefined;
  countryA: ComputedCountry;
  countryB: ComputedCountry;
  heightClass?: string;
  categoryColor?: string;
  showLabels?: boolean;
}

const RelativeWinBar: React.FC<RelativeWinBarProps> = ({
  scoreA,
  scoreB,
  countryA,
  countryB,
  heightClass = 'h-2.5',
  categoryColor,
  showLabels = false
}) => {
  const hasA = scoreA != null && !isNaN(scoreA);
  const hasB = scoreB != null && !isNaN(scoreB);

  if (!hasA && !hasB) {
    return (
      <div className={`relative w-full ${heightClass} bg-slate-100 rounded-full overflow-hidden border border-slate-200/60 flex items-center justify-center`}>
        <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-slate-300 -translate-x-1/2" />
        <span className="text-[9px] text-slate-400 font-mono">No data</span>
      </div>
    );
  }

  const valA = hasA ? scoreA : 0;
  const valB = hasB ? scoreB : 0;
  const delta = Math.round((valA - valB) * 10) / 10;
  const absDelta = Math.abs(delta);

  // Standard scale: 50 points difference = 100% of half-width deflection.
  // Dynamically scales if difference exceeds 50 so bars never overflow.
  const scaleMax = Math.max(50, absDelta);
  const halfWidthPct = Math.min(100, (absDelta / scaleMax) * 100);
  const barWidth = Math.max(absDelta > 0 ? 3 : 0, halfWidthPct * 0.5);

  const aWins = hasA && (!hasB || delta > 0);
  const bWins = hasB && (!hasA || delta < 0);
  const isTied = hasA && hasB && delta === 0;

  return (
    <div className="w-full flex flex-col gap-1">
      <div className={`relative w-full ${heightClass} bg-slate-100 rounded-full overflow-hidden border border-slate-200/80 shadow-inner`}>
        {/* Reference markers at 25% and 75% */}
        <div className="absolute left-1/4 top-0 bottom-0 w-px bg-slate-200/70 z-0" />
        <div className="absolute left-3/4 top-0 bottom-0 w-px bg-slate-200/70 z-0" />

        {/* Centre meridian line (Tie / 0 baseline) */}
        <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-slate-400/90 z-20 -translate-x-1/2" />

        {/* Winner Bar extending to Country A (Left) */}
        {aWins && (
          <div
            className="absolute top-0 bottom-0 right-1/2 rounded-l-full transition-all duration-300 ease-out shadow-xs"
            style={{
              width: `${barWidth.toFixed(1)}%`,
              backgroundColor: categoryColor || '#0d9488',
              backgroundImage: 'linear-gradient(to left, rgba(255,255,255,0.2), transparent)'
            }}
          />
        )}

        {/* Winner Bar extending to Country B (Right) */}
        {bWins && (
          <div
            className="absolute top-0 bottom-0 left-1/2 rounded-r-full transition-all duration-300 ease-out shadow-xs"
            style={{
              width: `${barWidth.toFixed(1)}%`,
              backgroundColor: categoryColor || '#6366f1',
              backgroundImage: 'linear-gradient(to right, rgba(255,255,255,0.2), transparent)'
            }}
          />
        )}

        {/* Tie indicator */}
        {isTied && (
          <div className="absolute left-1/2 top-0 bottom-0 w-2 bg-amber-400 rounded-full z-10 -translate-x-1/2" />
        )}
      </div>

      {showLabels && (
        <div className="flex items-center justify-between text-[10px] text-slate-400 font-mono px-0.5 leading-none">
          <span className={aWins ? 'font-bold text-teal-700' : 'text-slate-400'}>
            {aWins ? `◀ +${delta} ${countryA.iso3}` : `${countryA.iso3}`}
          </span>
          <span className="text-[9px] text-slate-300">TIE</span>
          <span className={bWins ? 'font-bold text-indigo-700' : 'text-slate-400'}>
            {bWins ? `${countryB.iso3} +${absDelta} ▶` : `${countryB.iso3}`}
          </span>
        </div>
      )}
    </div>
  );
};

interface CountrySearchComboboxProps {
  label: string;
  theme: 'teal' | 'indigo';
  selectedCountry: ComputedCountry;
  onSelect: (iso3: string) => void;
  countryList: ComputedCountry[];
  otherCountryIso: string;
  isOpen: boolean;
  onToggleOpen: () => void;
  onClose: () => void;
}

const CountrySearchCombobox: React.FC<CountrySearchComboboxProps> = ({
  label,
  theme,
  selectedCountry,
  onSelect,
  countryList,
  otherCountryIso,
  isOpen,
  onToggleOpen,
  onClose,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'alpha' | 'rank'>('alpha');
  const containerRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Close on click outside
  useEffect(() => {
    if (!isOpen) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        onClose();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, onClose]);

  // Focus search input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 50);
    } else {
      setSearchQuery('');
    }
  }, [isOpen]);

  // Filter & Sort countries - Alphabetical (A to Z) by default!
  const filteredAndSortedCountries = useMemo(() => {
    let list = countryList.filter(c => c.hasData !== false && !c.isDependency);
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter(c => 
        c.name.toLowerCase().includes(q) || 
        c.iso3.toLowerCase().includes(q) ||
        (c.region && c.region.toLowerCase().includes(q))
      );
    }
    return list.sort((a, b) => {
      if (sortBy === 'alpha') {
        return a.name.localeCompare(b.name);
      }
      return (a.rank ?? 999) - (b.rank ?? 999);
    });
  }, [countryList, searchQuery, sortBy]);

  const isTeal = theme === 'teal';
  const borderColor = isTeal ? 'border-teal-200' : 'border-indigo-200';
  const activeDotColor = isTeal ? 'bg-teal-600' : 'bg-indigo-600';
  const labelColor = isTeal ? 'text-teal-800' : 'text-indigo-800';
  const scoreTextColor = isTeal ? 'text-teal-700' : 'text-indigo-700';
  const ringFocusColor = isTeal ? 'focus:ring-teal-500/20' : 'focus:ring-indigo-500/20';
  const highlightBg = isTeal ? 'bg-teal-50 text-teal-900 border-teal-200' : 'bg-indigo-50 text-indigo-900 border-indigo-200';
  const badgeColor = isTeal ? 'bg-teal-50 text-teal-700 border-teal-200' : 'bg-indigo-50 text-indigo-700 border-indigo-200';

  return (
    <div ref={containerRef} className={`relative bg-white p-4 rounded-xl border ${borderColor} shadow-xs flex flex-col justify-between`}>
      {/* Card Header */}
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-1.5">
          <span className={`w-2.5 h-2.5 rounded-full ${activeDotColor}`} />
          <label className={`text-[10px] font-bold uppercase ${labelColor} tracking-wider`}>
            {label}
          </label>
        </div>
        <span className="text-xs font-mono tabular-nums font-semibold text-slate-500">
          {selectedCountry.rank != null ? `Rank #${selectedCountry.rank}` : 'Unranked'}
        </span>
      </div>

      {/* Trigger Button with Concentric Inner Radius (Outer 12px, Inner 8px) */}
      <button
        type="button"
        onClick={onToggleOpen}
        className={`w-full text-start p-2.5 rounded-[8px] border border-slate-200 bg-slate-50/70 hover:bg-white hover:border-slate-300 active:scale-[0.99] transition-all flex items-center justify-between gap-2.5 group cursor-pointer focus:outline-none focus:ring-2 ${ringFocusColor}`}
      >
        <div className="flex items-center gap-2.5 min-w-0">
          <span className="text-2xl leading-none shrink-0">{selectedCountry.flag}</span>
          <div className="min-w-0">
            <div className="text-sm font-bold text-slate-900 truncate group-hover:text-teal-800 transition-colors">
              {selectedCountry.name}
            </div>
            <div className="text-[11px] text-slate-400 font-mono flex items-center gap-1">
              <span>{selectedCountry.region}</span>
              <span>•</span>
              <span className="font-semibold text-slate-500">{selectedCountry.iso3}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <span className={`px-2 py-0.5 rounded text-xs font-mono tabular-nums font-bold border ${badgeColor}`}>
            {selectedCountry.compositeScore != null ? selectedCountry.compositeScore : 'N/A'}
          </span>
          <div className="p-1 rounded-md text-slate-400 group-hover:text-slate-600 group-hover:bg-slate-100 transition-colors flex items-center gap-0.5">
            <Search className="w-3.5 h-3.5" />
            <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
          </div>
        </div>
      </button>

      {/* Active Score Summary */}
      <div className="flex items-center justify-between pt-2 mt-3 border-t border-slate-100">
        <span className="text-xs text-slate-500">Active Score:</span>
        <span className={`text-lg font-extrabold ${scoreTextColor} font-mono tabular-nums`}>
          {selectedCountry.compositeScore != null ? selectedCountry.compositeScore : 'N/A'}
        </span>
      </div>

      {/* Dropdown Popover with Concentric Radii (Outer 12px, Inner 8px) */}
      {isOpen && (
        <div className="absolute top-full inset-inline-0 mt-2 z-50 bg-white rounded-xl shadow-2xl border border-slate-200 p-2.5 flex flex-col gap-2 animate-fadeIn font-sans max-h-[min(420px,calc(85vh-160px))]">
          {/* Search Box */}
          <div className="relative">
            <div className="absolute inset-y-0 start-0 ps-2.5 flex items-center pointer-events-none text-slate-400">
              <Search className="w-4 h-4" />
            </div>
            <input
              ref={searchInputRef}
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Escape') {
                  onClose();
                } else if (e.key === 'Enter' && filteredAndSortedCountries.length > 0) {
                  onSelect(filteredAndSortedCountries[0].iso3);
                  onClose();
                }
              }}
              placeholder="Search countries by name or ISO..."
              className="w-full ps-8 pe-7 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-[8px] text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all font-sans"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute inset-y-0 end-0 pe-2.5 flex items-center text-slate-400 hover:text-slate-600 active:scale-90"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Sort & Count Controls */}
          <div className="flex items-center justify-between px-1 text-[11px] border-b border-slate-100 pb-1.5">
            <div className="flex items-center gap-1">
              <span className="text-slate-400 text-[10px] uppercase font-bold mr-0.5">Sort:</span>
              <button
                type="button"
                onClick={() => setSortBy('alpha')}
                className={`px-2 py-0.5 rounded-[6px] text-[11px] font-semibold active:scale-95 transition-all cursor-pointer ${
                  sortBy === 'alpha'
                    ? 'bg-teal-600 text-white shadow-2xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                A–Z Alphabetical
              </button>
              <button
                type="button"
                onClick={() => setSortBy('rank')}
                className={`px-2 py-0.5 rounded-[6px] text-[11px] font-semibold active:scale-95 transition-all cursor-pointer ${
                  sortBy === 'rank'
                    ? 'bg-teal-600 text-white shadow-2xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                By Rank
              </button>
            </div>

            <span className="text-[10px] text-slate-400 font-mono tabular-nums">
              {filteredAndSortedCountries.length} countries
            </span>
          </div>

          {/* Country Option List with Concentric Radii (Outer 12px, Inner 8px) */}
          <div className="max-h-[min(240px,calc(85vh-260px))] overflow-y-auto divide-y divide-slate-100 rounded-[8px] border border-slate-100">
            {filteredAndSortedCountries.length > 0 ? (
              filteredAndSortedCountries.map((c) => {
                const isSelected = c.iso3 === selectedCountry.iso3;
                const isOther = c.iso3 === otherCountryIso;

                return (
                  <button
                    key={c.iso3}
                    type="button"
                    onClick={() => {
                      onSelect(c.iso3);
                      onClose();
                    }}
                    className={`w-full px-3 py-2 text-start text-xs flex items-center justify-between active:scale-[0.99] transition-all cursor-pointer ${
                      isSelected
                        ? `${highlightBg} font-bold`
                        : 'hover:bg-slate-50 text-slate-700'
                    }`}
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      <span className="text-base shrink-0">{c.flag}</span>
                      <span className="truncate">{c.name}</span>
                      <span className="text-[10px] text-slate-400 font-mono shrink-0">({c.iso3})</span>
                      {isOther && (
                        <span className="text-[9px] px-1 py-0.5 rounded bg-slate-200 text-slate-600 font-medium shrink-0">
                          {isTeal ? 'In Right' : 'In Left'}
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-2 shrink-0 ms-2">
                      <span className="text-[11px] font-mono tabular-nums font-semibold text-slate-600 bg-slate-100 px-1.5 py-0.5 rounded">
                        {c.compositeScore != null ? c.compositeScore : 'N/A'}
                      </span>
                      {c.rank != null && (
                        <span className="text-[10px] text-slate-400 font-mono tabular-nums w-9 text-end">
                          #{c.rank}
                        </span>
                      )}
                      {isSelected && (
                        <Check className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                      )}
                    </div>
                  </button>
                );
              })
            ) : (
              <div className="p-4 text-center text-xs text-slate-400">
                <p>No countries matching "{searchQuery}"</p>
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="mt-1 text-teal-600 hover:underline font-semibold cursor-pointer active:scale-95"
                >
                  Clear search
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export const CountryComparisonModal: React.FC<CountryComparisonModalProps> = ({
  countryList,
  computedCountries,
  initialCountryA,
  initialCountryB,
  categories,
  indicators,
  isOpen,
  onClose,
  getScoreColor
}) => {
  const [isoA, setIsoA] = useState<string>(initialCountryA || countryList[0]?.iso3 || 'ESP');
  const [isoB, setIsoB] = useState<string>(
    initialCountryB || 
    (countryList.find(c => c.iso3 !== (initialCountryA || countryList[0]?.iso3))?.iso3 || 'NOR')
  );
  const [openCombobox, setOpenCombobox] = useState<'A' | 'B' | null>(null);

  useEffect(() => {
    if (isOpen) {
      if (initialCountryA) setIsoA(initialCountryA);
      if (initialCountryB && initialCountryB !== initialCountryA) {
        setIsoB(initialCountryB);
      }
      setOpenCombobox(null);
    }
  }, [isOpen, initialCountryA, initialCountryB]);

  const handleSwap = () => {
    const temp = isoA;
    setIsoA(isoB);
    setIsoB(temp);
  };

  if (!isOpen) return null;

  const countryA = computedCountries[isoA] || countryList[0];
  const countryB = computedCountries[isoB] || countryList[1];

  if (!countryA || !countryB) return null;

  const scoreAVal = countryA.compositeScore;
  const scoreBVal = countryB.compositeScore;
  const hasBoth = scoreAVal != null && scoreBVal != null;
  const diffComposite = hasBoth ? Math.round((scoreAVal - scoreBVal) * 10) / 10 : 0;
  const winner = hasBoth 
    ? (diffComposite > 0 ? countryA : diffComposite < 0 ? countryB : null)
    : (scoreAVal != null ? countryA : scoreBVal != null ? countryB : null);

  // Count wins across sub-indicators
  let winsA = 0;
  let winsB = 0;
  let ties = 0;

  for (const ind of indicators) {
    const sA = countryA.indicators[ind.id]?.score;
    const sB = countryB.indicators[ind.id]?.score;
    if (sA != null && sB != null) {
      if (sA > sB) winsA++;
      else if (sB > sA) winsB++;
      else ties++;
    } else if (sA != null) {
      winsA++;
    } else if (sB != null) {
      winsB++;
    } else {
      ties++;
    }
  }

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 overflow-y-auto animate-fadeIn select-none font-sans">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden">
        {/* Modal Header */}
        <div className="p-4 sm:p-5 border-b border-slate-200 bg-slate-50/80 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-teal-600 text-white flex items-center justify-center shadow-xs">
              <GitCompare className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-slate-900">
                Country Head-to-Head Comparison
              </h2>
              <p className="text-xs text-slate-500">
                Direct benchmark comparison with relative win-margin bars across all {categories.length} macro dimensions and {indicators.length} underlying indices
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="min-w-[40px] min-h-[40px] flex items-center justify-center text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-200 active:scale-95 transition-all cursor-pointer"
            title="Close comparison"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Country Selector Header Cards */}
        <div className="relative p-4 sm:p-6 bg-slate-100/70 border-b border-slate-200">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Country A Combobox */}
            <CountrySearchCombobox
              label="Country A (Left)"
              theme="teal"
              selectedCountry={countryA}
              onSelect={setIsoA}
              countryList={countryList}
              otherCountryIso={isoB}
              isOpen={openCombobox === 'A'}
              onToggleOpen={() => setOpenCombobox(openCombobox === 'A' ? null : 'A')}
              onClose={() => setOpenCombobox(null)}
            />

            {/* Country B Combobox */}
            <CountrySearchCombobox
              label="Country B (Right)"
              theme="indigo"
              selectedCountry={countryB}
              onSelect={setIsoB}
              countryList={countryList}
              otherCountryIso={isoA}
              isOpen={openCombobox === 'B'}
              onToggleOpen={() => setOpenCombobox(openCombobox === 'B' ? null : 'B')}
              onClose={() => setOpenCombobox(null)}
            />
          </div>

          {/* Quick Swap Button with Accessible Touch Target & Tactile Feedback */}
          <div className="hidden md:flex absolute start-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
            <button
              type="button"
              onClick={handleSwap}
              className="min-w-[44px] min-h-[44px] flex items-center justify-center rounded-full bg-white border border-slate-200 shadow-md hover:bg-slate-50 hover:border-slate-300 text-slate-600 hover:text-slate-900 active:scale-95 transition-all cursor-pointer"
              title="Swap countries (Left ⇄ Right)"
            >
              <ArrowLeftRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Winner Banner & Overall Relative Head-to-Head Bar with Tabular Numerics */}
        <div className="px-6 py-3.5 bg-slate-50/90 border-b border-slate-200 text-xs flex flex-col gap-2 font-sans">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center gap-2">
              <Trophy className="w-4 h-4 text-amber-500 shrink-0" />
              <span className="font-semibold text-slate-900">
                {winner ? (
                  <>
                    <span className="font-bold text-slate-900">{winner.name}</span> leads overall by{' '}
                    <span className={`font-mono tabular-nums font-bold ${winner.iso3 === countryA.iso3 ? 'text-teal-700' : 'text-indigo-700'}`}>
                      +{Math.abs(diffComposite)} pts
                    </span>{' '}
                    under current user weights.
                  </>
                ) : hasBoth ? (
                  'Both countries are tied in overall score under current weights.'
                ) : (
                  'One or both selected territories lack index benchmarks.'
                )}
              </span>
            </div>

            <div className="text-[11px] font-mono tabular-nums font-medium text-slate-600">
              Wins: <span className="text-teal-700 font-bold">{countryA.name} ({winsA})</span> • <span className="text-indigo-700 font-bold">{countryB.name} ({winsB})</span> • Tied ({ties})
            </div>
          </div>

          {/* Overall Composite Relative Bar */}
          {hasBoth && (
            <div className="pt-1">
              <RelativeWinBar
                scoreA={scoreAVal}
                scoreB={scoreBVal}
                countryA={countryA}
                countryB={countryB}
                heightClass="h-3"
                showLabels={true}
              />
            </div>
          )}
        </div>

        {/* Modal Scrollable Body with Overflow Clip Protection */}
        <div className="flex-1 overflow-y-auto overflow-x-clip p-4 sm:p-6 space-y-6">
          {/* Macro Dimensions Comparison */}
          <section className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                Macro Dimensions Comparison
              </h3>
              <span className="text-[11px] text-slate-400 font-mono">
                Bars diverge toward winner (50% centre = tie)
              </span>
            </div>

            <div className="space-y-2.5">
              {categories.map((cat) => {
                const IconComponent = CATEGORY_ICONS[cat.id] || HelpCircle;
                const rawA = countryA.dimensions[cat.id];
                const rawB = countryB.dimensions[cat.id];
                const hasA = rawA != null && !isNaN(rawA);
                const hasB = rawB != null && !isNaN(rawB);
                const scoreA = hasA ? rawA : 0;
                const scoreB = hasB ? rawB : 0;
                const delta = Math.round((scoreA - scoreB) * 10) / 10;
                const aWins = hasA && (!hasB || scoreA > scoreB);
                const bWins = hasB && (!hasA || scoreB > scoreA);
                const rankA = countryA.dimensionRanks?.[cat.id]?.rank;
                const rankB = countryB.dimensionRanks?.[cat.id]?.rank;

                return (
                  <div key={cat.id} className="p-3.5 bg-white border border-slate-200 rounded-xl text-xs shadow-xs space-y-2.5">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div 
                          className="w-5 h-5 rounded flex items-center justify-center text-white shadow-xs"
                          style={{ backgroundColor: cat.color }}
                        >
                          <IconComponent className="w-3 h-3" />
                        </div>
                        <span className="font-bold text-slate-800 font-sans">{cat.name}</span>
                      </div>

                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-1">
                          <span className={`font-mono tabular-nums font-bold text-sm ${aWins ? 'text-teal-700 font-extrabold' : 'text-slate-600'}`}>
                            {hasA ? rawA : 'N/A'}
                          </span>
                          {rankA != null && (
                            <span className="text-[10px] font-mono tabular-nums text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded border border-slate-200">
                              #{rankA}
                            </span>
                          )}
                        </div>
                        <span className="text-[10px] text-slate-300 font-mono">vs</span>
                        <div className="flex items-center gap-1">
                          <span className={`font-mono tabular-nums font-bold text-sm ${bWins ? 'text-indigo-700 font-extrabold' : 'text-slate-600'}`}>
                            {hasB ? rawB : 'N/A'}
                          </span>
                          {rankB != null && (
                            <span className="text-[10px] font-mono tabular-nums text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded border border-slate-200">
                              #{rankB}
                            </span>
                          )}
                        </div>
                        <span className={`text-[10px] font-mono tabular-nums px-2 py-0.5 rounded-full font-bold ${
                          hasA && hasB && delta > 0 
                            ? 'bg-teal-50 text-teal-800 border border-teal-200' 
                            : hasA && hasB && delta < 0 
                            ? 'bg-indigo-50 text-indigo-800 border border-indigo-200' 
                            : 'bg-slate-100 text-slate-500'
                        }`}>
                          {hasA && hasB 
                            ? (delta > 0 ? `◀ +${delta} ${countryA.iso3}` : delta < 0 ? `${countryB.iso3} +${Math.abs(delta)} ▶` : 'Tied')
                            : hasA ? `${countryA.iso3} only` : hasB ? `${countryB.iso3} only` : 'No data'}
                        </span>
                      </div>
                    </div>

                    {/* Relative Win Bar */}
                    <div className="pt-0.5">
                      <RelativeWinBar
                        scoreA={rawA}
                        scoreB={rawB}
                        countryA={countryA}
                        countryB={countryB}
                        heightClass="h-3"
                        categoryColor={cat.color}
                        showLabels={true}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Granular Sub-Indices Scorecard */}
          <section className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                Granular {indicators.length} Indices Head-to-Head
              </h3>
              <span className="text-[11px] text-slate-400 font-mono">
                Relative win extent per indicator
              </span>
            </div>

            <div className="border border-slate-200 rounded-xl overflow-hidden bg-white shadow-xs">
              <div className="grid grid-cols-12 bg-slate-50 p-2.5 text-[10px] font-bold text-slate-500 uppercase tracking-wider border-b border-slate-200">
                <div className="col-span-4">Index &amp; Source</div>
                <div className="col-span-2 text-center text-teal-800 flex items-center justify-center gap-1">
                  <span>{countryA.flag}</span>
                  <span className="font-bold">{countryA.name}</span>
                </div>
                <div className="col-span-4 text-center">Relative Win Extent</div>
                <div className="col-span-2 text-center text-indigo-800 flex items-center justify-center gap-1">
                  <span>{countryB.flag}</span>
                  <span className="font-bold">{countryB.name}</span>
                </div>
              </div>

              <div className="divide-y divide-slate-100 text-xs">
                {indicators.map((ind) => {
                  const dataA = countryA.indicators[ind.id];
                  const dataB = countryB.indicators[ind.id];
                  const hasA = dataA && dataA.score != null;
                  const hasB = dataB && dataB.score != null;
                  const valA = hasA ? dataA.score : null;
                  const valB = hasB ? dataB.score : null;
                  const aLeads = valA != null && (valB == null || valA > valB);
                  const bLeads = valB != null && (valA == null || valB > valA);

                  return (
                    <div key={ind.id} className="grid grid-cols-12 p-2.5 items-center hover:bg-slate-50/70 transition-colors">
                      <div className="col-span-4 pe-2">
                        <div className="font-semibold text-slate-800 text-[11px] leading-tight">
                          {ind.name}
                        </div>
                        <div className="text-[10px] text-slate-400">
                          {ind.source}
                        </div>
                      </div>

                      <div className="col-span-2 text-center">
                        <div className="flex items-center justify-center gap-1">
                          <span className={`font-mono tabular-nums font-bold text-xs ${aLeads ? 'text-teal-700 font-extrabold' : 'text-slate-700'}`}>
                            {hasA ? valA : 'N/A'}
                          </span>
                          {dataA?.rank != null && (
                            <span className="text-[9px] font-mono tabular-nums font-bold px-1 rounded bg-slate-100 text-slate-600 border border-slate-200">
                              #{dataA.rank}
                            </span>
                          )}
                        </div>
                        <span className="text-[10px] text-slate-400 block font-mono tabular-nums truncate" title={dataA?.formatted}>
                          {dataA?.formatted || 'No benchmark'}
                        </span>
                      </div>

                      <div className="col-span-4 px-2">
                        <RelativeWinBar
                          scoreA={valA}
                          scoreB={valB}
                          countryA={countryA}
                          countryB={countryB}
                          heightClass="h-2"
                          showLabels={true}
                        />
                      </div>

                      <div className="col-span-2 text-center">
                        <div className="flex items-center justify-center gap-1">
                          <span className={`font-mono tabular-nums font-bold text-xs ${bLeads ? 'text-indigo-700 font-extrabold' : 'text-slate-700'}`}>
                            {hasB ? valB : 'N/A'}
                          </span>
                          {dataB?.rank != null && (
                            <span className="text-[9px] font-mono tabular-nums font-bold px-1 rounded bg-slate-100 text-slate-600 border border-slate-200">
                              #{dataB.rank}
                            </span>
                          )}
                        </div>
                        <span className="text-[10px] text-slate-400 block font-mono tabular-nums truncate" title={dataB?.formatted}>
                          {dataB?.formatted || 'No benchmark'}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};
