import React, { useRef, useState, useLayoutEffect, useEffect } from 'react';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';
import type { ComputedCountry } from '../types';

interface CountryHoverCardProps {
  country: ComputedCountry;
  position: { x: number; y: number };
  regionalRank?: { rank: number | null; total: number };
  activeRegionName?: string;
}

export const CountryHoverCard: React.FC<CountryHoverCardProps> = ({ 
  country, 
  position,
  regionalRank,
  activeRegionName
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({
    width: 288,
    height: country.isDependency ? 150 : 250,
  });

  const [windowSize, setWindowSize] = useState(() => ({
    width: typeof window !== 'undefined' ? window.innerWidth : 1024,
    height: typeof window !== 'undefined' ? window.innerHeight : 768,
  }));

  // Track window resizing to ensure continuous viewport containment
  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    window.addEventListener('resize', handleResize, { passive: true });
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Measure card dimensions dynamically whenever country or content changes
  useLayoutEffect(() => {
    const updateSize = () => {
      if (cardRef.current) {
        const rect = cardRef.current.getBoundingClientRect();
        if (rect.width > 0 && rect.height > 0) {
          setDimensions(prev => {
            if (Math.abs(prev.width - rect.width) < 1 && Math.abs(prev.height - rect.height) < 1) {
              return prev;
            }
            return { width: rect.width, height: rect.height };
          });
        }
      }
    };

    updateSize();

    let observer: ResizeObserver | null = null;
    if (typeof ResizeObserver !== 'undefined' && cardRef.current) {
      observer = new ResizeObserver(updateSize);
      observer.observe(cardRef.current);
    }

    return () => {
      observer?.disconnect();
    };
  }, [country.iso3, country.compositeScore, country.isDependency, regionalRank?.rank]);

  const isNoData = country.hasData === false || country.compositeScore == null;

  // Viewport bounds calculation
  const PADDING = 14;      // Minimum distance from screen edge
  const CURSOR_OFFSET = 14; // Distance from cursor pointer

  const vw = typeof window !== 'undefined' ? window.innerWidth : windowSize.width;
  const vh = typeof window !== 'undefined' ? window.innerHeight : windowSize.height;

  const cardWidth = Math.min(dimensions.width, Math.max(160, vw - PADDING * 2));
  const cardHeight = Math.min(dimensions.height, Math.max(100, vh - PADDING * 2));

  // --- Horizontal (X) Positioning ---
  // Default to placing to the right of the cursor; flip to the left if it would overflow right
  let left = position.x + CURSOR_OFFSET;
  if (left + cardWidth + PADDING > vw) {
    const leftFlipped = position.x - cardWidth - CURSOR_OFFSET;
    if (leftFlipped >= PADDING) {
      left = leftFlipped;
    } else {
      left = vw - cardWidth - PADDING;
    }
  }
  // Absolute viewport bounds clamp
  left = Math.max(PADDING, Math.min(vw - cardWidth - PADDING, left));

  // --- Vertical (Y) Positioning ---
  // Default to placing below the cursor; flip above if it would overflow bottom
  let top = position.y + CURSOR_OFFSET;
  if (top + cardHeight + PADDING > vh) {
    const topFlipped = position.y - cardHeight - CURSOR_OFFSET;
    if (topFlipped >= PADDING) {
      top = topFlipped;
    } else {
      top = vh - cardHeight - PADDING;
    }
  }
  // Absolute viewport bounds clamp
  top = Math.max(PADDING, Math.min(vh - cardHeight - PADDING, top));

  if (country.isDependency) {
    return (
      <div
        ref={cardRef}
        style={{
          position: 'fixed',
          left: `${Math.round(left)}px`,
          top: `${Math.round(top)}px`,
          pointerEvents: 'none',
          zIndex: 60,
        }}
        className="bg-white/95 backdrop-blur-md border border-slate-300 rounded-xl shadow-xl p-3 w-72 max-w-[calc(100vw-28px)] max-h-[calc(100vh-28px)] overflow-y-auto text-xs animate-fadeIn select-none"
      >
        <div className="flex items-center justify-between border-b border-slate-100 pb-2 mb-2">
          <div className="flex items-center gap-2">
            <span className="text-xl leading-none">{country.flag}</span>
            <div>
              <div className="font-bold text-slate-900 text-sm leading-tight">
                {country.name}
              </div>
              <div className="text-[10px] text-teal-700 font-medium">
                Territory of {country.parentName || country.parentIso}
              </div>
            </div>
          </div>
          <div className="text-right">
            <span className="inline-block px-1.5 py-0.5 rounded text-[10px] font-bold bg-teal-50 text-teal-700 border border-teal-200">
              Dependency
            </span>
          </div>
        </div>
        <p className="text-[11px] text-slate-600 leading-snug">
          Non-sovereign territory administered under <span className="font-semibold text-slate-800">{country.parentName || country.parentIso}</span>. Click to view {country.parentName || 'parent country'}'s scorecard.
        </p>
      </div>
    );
  }

  // Primary strength & weakness
  const topStrength = country.activeStrengths[0] || country.standoutStrengths[0];
  const topWeakness = country.activeWeaknesses[0] || country.standoutWeaknesses[0];

  return (
    <div
      ref={cardRef}
      style={{
        position: 'fixed',
        left: `${Math.round(left)}px`,
        top: `${Math.round(top)}px`,
        pointerEvents: 'none',
        zIndex: 60,
      }}
      className="bg-white/95 backdrop-blur-md border border-slate-300 rounded-xl shadow-xl p-3 w-72 max-w-[calc(100vw-28px)] max-h-[calc(100vh-28px)] overflow-y-auto text-xs animate-fadeIn select-none"
    >
      {/* Country Header */}
      <div className="flex items-center justify-between border-b border-slate-100 pb-2 mb-2">
        <div className="flex items-center gap-2">
          <span className="text-xl leading-none">{country.flag}</span>
          <div>
            <div className="font-bold text-slate-900 text-sm leading-tight">
              {country.name}
            </div>
            <div className="text-[10px] text-slate-400 font-mono">
              {country.region} • ISO: {country.iso3}
            </div>
          </div>
        </div>

        <div className="text-end">
          {isNoData ? (
            <div>
              <span className="inline-block px-1.5 py-0.5 rounded text-[11px] font-bold bg-slate-100 text-slate-500 border border-slate-200">
                No Data
              </span>
              <div className="text-[10px] font-medium text-slate-400 font-mono tabular-nums mt-0.5">
                Unranked
              </div>
            </div>
          ) : (
            <div>
              <div className="text-base font-extrabold text-teal-800 font-mono tabular-nums leading-none">
                {country.compositeScore}
              </div>
              <div className="text-[10px] font-semibold text-slate-500 font-mono tabular-nums">
                Global #{country.rank}
              </div>
              {regionalRank && regionalRank.rank != null && activeRegionName && activeRegionName !== 'Global' && (
                <div className="text-[10px] font-bold text-teal-700 font-mono tabular-nums mt-0.5">
                  #{regionalRank.rank} in {activeRegionName}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Body: Highlights or No Data Explanation with Concentric Radii (Outer 12px, Inner 8px) */}
      {isNoData ? (
        <div className="p-2 rounded-[8px] bg-slate-50 border border-slate-200 text-[11px] text-slate-600 leading-snug">
          {country.rawFacts?.note || 'No institutional quality-of-life indices available for this territory.'}
        </div>
      ) : (
        <div className="space-y-1.5">
          {topStrength && (
            <div className="p-1.5 rounded-[8px] bg-emerald-50/90 border border-emerald-200/80 text-[11px] flex items-start gap-1.5">
              <ArrowUpRight className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
              <div className="leading-tight">
                <span className="font-semibold text-emerald-900">{topStrength.indicatorName}: </span>
                <span className="font-mono tabular-nums text-emerald-700 font-bold">{topStrength.badgeText}</span>
                <p className="text-[10px] text-emerald-800/80 mt-0.5">{topStrength.explanation}</p>
              </div>
            </div>
          )}

          {topWeakness && (
            <div className="p-1.5 rounded-[8px] bg-rose-50/90 border border-rose-200/80 text-[11px] flex items-start gap-1.5">
              <ArrowDownRight className="w-3.5 h-3.5 text-rose-600 shrink-0 mt-0.5" />
              <div className="leading-tight">
                <span className="font-semibold text-rose-900">{topWeakness.indicatorName}: </span>
                <span className="font-mono tabular-nums text-rose-700 font-bold">{topWeakness.badgeText}</span>
                <p className="text-[10px] text-rose-800/80 mt-0.5">{topWeakness.explanation}</p>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Click Hint */}
      <div className="mt-2 pt-1.5 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-400">
        <span>Click for full dossier &amp; metrics</span>
        <span className="font-medium text-teal-700">Explore &rarr;</span>
      </div>
    </div>
  );
};
