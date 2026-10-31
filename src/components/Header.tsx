import React from 'react';
import { Search, RotateCcw, GitCompare, SlidersHorizontal, BookOpen } from 'lucide-react';
import type { ComputedCountry } from '../types';

interface HeaderProps {
  countryList: ComputedCountry[];
  searchQuery: string;
  onSearchChange: (q: string) => void;
  onSelectCountry: (iso3: string) => void;
  onResetWeights: () => void;
  onOpenCompare: () => void;
  selectedCountry: ComputedCountry | null;
  activeView: 'map' | 'biases';
  onToggleView: (view: 'map' | 'biases') => void;
}

export const Header: React.FC<HeaderProps> = ({
  countryList,
  searchQuery,
  onSearchChange,
  onSelectCountry,
  onResetWeights,
  onOpenCompare,
  activeView,
  onToggleView,
}) => {
  const topCountry = countryList.find(c => c.compositeScore != null);

  const searchResults = searchQuery.trim().length > 1
    ? countryList.filter(c => 
        c.hasData !== false && !c.isDependency && (
          c.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
          c.iso3.toLowerCase().includes(searchQuery.toLowerCase())
        )
      ).slice(0, 6)
    : [];

  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200 px-3 sm:px-4 py-2 transition-all shadow-xs">
      {/* Wraps on phones: title and buttons on one row, search full-width below. No overflow clipping, so the search dropdown can show. */}
      <div className="w-full flex flex-wrap sm:flex-nowrap items-center justify-start gap-x-2.5 gap-y-2 sm:gap-3">
        {/* Logo and Titles */}
        <div className="flex items-center gap-2.5 shrink-0">
          <img
            src={`${import.meta.env.BASE_URL}favicon.svg`}
            alt=""
            width={32}
            height={32}
            className="w-8 h-8 shrink-0 rounded-lg shadow-xs"
          />
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-sm sm:text-base font-bold tracking-tight text-slate-900 font-sans whitespace-nowrap">
                Where Lives Stand
              </h1>
            </div>
            <p className="text-[10.5px] text-slate-500 font-sans hidden 2xl:block leading-tight">
              User-weighted country index built from published indices
            </p>
          </div>
        </div>

        {/* Quick Rank #1 Pill */}
        {topCountry && (
          <button
            onClick={() => onSelectCountry(topCountry.iso3)}
            className="hidden xl:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-medium hover:bg-emerald-100 active:scale-[0.98] transition-all cursor-pointer shadow-2xs shrink-0 whitespace-nowrap"
            title="Click to view scorecard"
          >
            <span className="whitespace-nowrap text-emerald-900 font-medium text-[11px]">Current #1:</span>
            <span className="font-semibold whitespace-nowrap text-xs">{topCountry.flag} {topCountry.name}</span>
            <span className="bg-emerald-200/90 px-1.5 py-0.5 rounded text-[10.5px] font-mono tabular-nums font-bold whitespace-nowrap text-emerald-950">
              {topCountry.compositeScore}
            </span>
          </button>
        )}

        {/* Search Box */}
        <div className="relative order-last sm:order-none w-full sm:w-48 md:w-56 lg:w-60 shrink-0">
          <div className="absolute inset-y-0 start-0 ps-2.5 flex items-center pointer-events-none text-slate-400">
            <Search className="w-3.5 h-3.5" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search countries..."
            className="w-full ps-8 pl-8 pe-2.5 py-1.5 text-xs bg-slate-50 hover:bg-white focus:bg-white border border-slate-200 rounded-lg text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all font-sans"
          />
          {/* Search Dropdown with Concentric Nested Radii (Outer 12px, Padding 4px, Inner 8px) */}
          {searchResults.length > 0 && (
            <div className="absolute inset-x-0 sm:right-auto sm:w-80 top-full mt-1.5 bg-white border border-slate-200 rounded-xl p-1 shadow-xl overflow-hidden z-50 max-h-[min(380px,calc(100vh-80px))] overflow-y-auto">
              {searchResults.map(c => (
                <button
                  key={c.iso3}
                  onClick={() => {
                    onSelectCountry(c.iso3);
                    onSearchChange('');
                  }}
                  className="w-full text-start px-3 py-2 text-xs flex items-center justify-between hover:bg-teal-50/70 active:scale-[0.99] rounded-[8px] transition-all cursor-pointer"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-base">{c.flag}</span>
                    <span className="font-medium text-slate-800">{c.name}</span>
                    <span className="text-[10px] text-slate-400 font-mono">({c.iso3})</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-[11px] font-semibold text-teal-700 bg-teal-50 px-1.5 py-0.5 rounded font-mono tabular-nums">
                      Score: {c.compositeScore != null ? c.compositeScore : 'N/A'}
                    </span>
                    {c.rank != null && (
                      <span className="text-[11px] text-slate-500 font-mono tabular-nums">
                        #{c.rank}
                      </span>
                    )}
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Action Buttons Grouped on the Left */}
        <div className="flex items-center gap-1.5 shrink-0 ms-auto sm:ms-0">
          {/* Index Biases & Critique Button */}
          <button
            onClick={() => onToggleView(activeView === 'biases' ? 'map' : 'biases')}
            className={`min-h-[32px] flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold shadow-xs active:scale-[0.98] transition-all shrink-0 cursor-pointer ${
              activeView === 'biases'
                ? 'bg-amber-100 text-amber-900 border border-amber-300 ring-2 ring-amber-400/30'
                : 'bg-white hover:bg-amber-50 text-amber-900 border border-amber-200'
            }`}
            title="Read critical audit of index biases, Western-centricity, and real-world impacts"
          >
            <BookOpen className="w-3.5 h-3.5 text-amber-700" />
            <span className="hidden sm:inline whitespace-nowrap">Index Biases &amp; Critique</span>
          </button>

          {/* Compare Button */}
          <button
            onClick={onOpenCompare}
            className="min-h-[32px] flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-teal-700 hover:bg-teal-800 active:scale-[0.98] text-white text-xs font-medium shadow-xs transition-all shrink-0 cursor-pointer"
            title="Side-by-side comparison of 2 countries"
          >
            <GitCompare className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Compare</span>
          </button>

          {/* Reset Weights Button */}
          <button
            onClick={onResetWeights}
            className="min-h-[32px] flex items-center gap-1.5 px-2 py-1 rounded-lg border border-slate-200 hover:bg-slate-100 active:scale-[0.98] text-slate-600 text-xs font-medium transition-all shrink-0 cursor-pointer"
            title="Reset all weights to balanced 50%"
          >
            <RotateCcw className="w-3.5 h-3.5 text-slate-400" />
            <span className="hidden sm:inline">Reset</span>
          </button>
        </div>
      </div>
    </header>
  );
};
