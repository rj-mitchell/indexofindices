import React, { useState, useMemo } from 'react';
import {
  ArrowLeft,
  Search,
  ShieldAlert,
  Scale,
  Globe,
  Layers,
  TrendingDown,
  CheckCircle2,
  AlertTriangle,
  SlidersHorizontal,
  ExternalLink,
  BookOpen,
  Filter,
  Info,
  AlertCircle
} from 'lucide-react';
import {
  MACRO_THEMES,
  INDICATOR_CRITIQUES,
  COUNTRY_ANOMALIES,
  type BiasRisk
} from '../data/indexBiases';
import rawIndicators from '../data/indicators.json';
import type { IndicatorMeta, MacroCategory, MacroCategoryConfig } from '../types';

const indicatorMeta = new Map((rawIndicators as unknown as IndicatorMeta[]).map(i => [i.id, i]));

interface BiasesCritiquePageProps {
  categories: MacroCategoryConfig[];
  onBackToMap: () => void;
}

type Tab = 'themes' | 'anomalies' | 'indicators' | 'manifesto';

const TABS: { id: Tab; label: string }[] = [
  { id: 'themes', label: '🏛️ Big Traps' },
  { id: 'anomalies', label: '🎯 Odd Results' },
  { id: 'indicators', label: '🔍 Every Index' },
  { id: 'manifesto', label: "⚖️ You're in Control" }
];

const RISK_STYLES: Record<BiasRisk, string> = {
  High: 'bg-rose-100 text-rose-800 border-rose-300',
  Medium: 'bg-amber-100 text-amber-800 border-amber-300',
  Low: 'bg-emerald-100 text-emerald-800 border-emerald-300'
};

const formatTierLabel = (tierLabel: string) => {
  if (tierLabel.includes('Derived')) return 'Derived from measurements';
  if (tierLabel.includes('Empirical')) return 'Measured counts & rates';
  if (tierLabel.includes('Consensus')) return 'Composite index';
  return 'Expert assessment';
};

const renderIcon = (name: string) => {
  switch (name) {
    case 'Layers': return <Layers className="w-5 h-5 text-indigo-600" />;
    case 'Globe': return <Globe className="w-5 h-5 text-teal-600" />;
    case 'TrendingDown': return <TrendingDown className="w-5 h-5 text-rose-600" />;
    case 'Scale': return <Scale className="w-5 h-5 text-violet-600" />;
    case 'ShieldAlert': return <ShieldAlert className="w-5 h-5 text-emerald-600" />;
    default: return <Info className="w-5 h-5 text-slate-600" />;
  }
};

export const BiasesCritiquePage: React.FC<BiasesCritiquePageProps> = ({
  categories,
  onBackToMap
}) => {
  const [activeTab, setActiveTab] = useState<Tab>('themes');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedRisk, setSelectedRisk] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [expandedCardId, setExpandedCardId] = useState<string | null>(null);

  const critiques = useMemo(
    () => INDICATOR_CRITIQUES.flatMap(c => {
      const meta = indicatorMeta.get(c.id);
      return meta ? [{ ...c, meta }] : [];
    }),
    []
  );

  const filteredIndicators = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return critiques.filter(({ meta, ...c }) => {
      if (selectedCategory !== 'all' && meta.category !== selectedCategory) return false;
      if (selectedRisk !== 'all' && c.biasRisk !== selectedRisk) return false;
      if (!q) return true;
      return [meta.name, meta.shortName, meta.source, c.whatItMeasures, c.blindSpot]
        .some(text => text.toLowerCase().includes(q));
    });
  }, [critiques, selectedCategory, selectedRisk, searchQuery]);

  const getCategoryMeta = (catId: MacroCategory) => categories.find(c => c.id === catId);

  return (
    <div className="flex-1 h-full overflow-y-auto overflow-x-clip bg-slate-50 text-slate-800 font-sans">
      {/* Top Navigation Sticky Bar */}
      <div className="sticky top-0 z-20 bg-white/95 backdrop-blur-md border-b border-slate-200 px-4 sm:px-8 py-3 shadow-xs">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <button
              onClick={onBackToMap}
              className="min-h-[36px] flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-teal-600 hover:bg-teal-700 active:scale-95 text-white text-xs font-semibold shadow-xs transition-all shrink-0 cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Back to Global Map</span>
              <span className="sm:hidden">Back</span>
            </button>
            <div className="h-4 w-px bg-slate-200 hidden sm:block shrink-0" />
            <h1 className="text-sm sm:text-base font-bold text-slate-900 tracking-tight truncate">
              Behind the Rankings
            </h1>
          </div>

          <div className="flex flex-wrap items-center gap-1 bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs w-full md:w-auto">
            {TABS.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-3 py-1.5 rounded-[8px] font-medium active:scale-95 transition-all cursor-pointer whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'bg-white text-slate-900 shadow-xs font-semibold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-8 py-8 space-y-8">
        {/* Hero */}
        <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-teal-950 text-white rounded-2xl p-6 sm:p-8 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 transform translate-x-12 -translate-y-12 w-64 h-64 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="max-w-3xl space-y-3 relative z-10">
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-teal-400/15 border border-teal-400/30 text-teal-300 text-xs font-medium">
              <BookOpen className="w-3.5 h-3.5" />
              <span>How to read these rankings</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
              No country is simply "the best"
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Every ranking depends on what you choose to count and how much it matters to you.
              This page explains the {critiques.length} indices behind the map: what each measures, where it falls short, and the traps in combining them.
            </p>
          </div>
        </div>

        {/* TAB 1: THEMES */}
        {activeTab === 'themes' && (
          <div className="space-y-4">
            <h3 className="text-base font-bold text-slate-900">
              {MACRO_THEMES.length} traps in country rankings
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {MACRO_THEMES.map(theme => (
                <div
                  key={theme.id}
                  className="bg-white rounded-xl border border-slate-200/90 p-5 shadow-xs flex flex-col justify-between gap-3 hover:border-slate-300 transition-all"
                >
                  <div className="space-y-2.5">
                    <div className="flex items-center gap-2.5">
                      <div className="p-2 rounded-lg bg-slate-50 border border-slate-100">
                        {renderIcon(theme.icon)}
                      </div>
                      <h4 className="text-sm font-bold text-slate-900 leading-snug">{theme.title}</h4>
                    </div>
                    <div className="space-y-2 text-xs text-slate-600 leading-relaxed">
                      {theme.points.map((p, i) => <p key={i}>{p}</p>)}
                    </div>
                  </div>
                  <p className="text-[11px] text-teal-900 bg-teal-50/70 border border-teal-100 rounded-lg p-2.5 leading-snug">
                    <span className="font-semibold">Takeaway:</span> {theme.takeaway}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 2: ODD RESULTS */}
        {activeTab === 'anomalies' && (
          <div className="space-y-4">
            <div>
              <h3 className="text-base font-bold text-slate-900">Results that look wrong, and why they aren't</h3>
              <p className="text-xs text-slate-500">All ranks are from the current data, with every dial at 50%.</p>
            </div>
            <div className="grid grid-cols-1 gap-4">
              {COUNTRY_ANOMALIES.map(item => (
                <div
                  key={item.id}
                  className="bg-white rounded-xl border border-slate-200 shadow-xs hover:border-slate-300 transition-all p-5 space-y-3"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div className="flex items-center gap-3">
                      <span className="text-3xl leading-none">{item.flag}</span>
                      <div>
                        <h4 className="text-base font-bold text-slate-900">{item.countryName}</h4>
                        <div className="text-xs font-semibold text-teal-800">{item.headline}</div>
                      </div>
                    </div>
                    <span className="self-start sm:self-auto px-2.5 py-1 rounded-md text-[11px] font-bold font-mono tabular-nums bg-rose-50 text-rose-700 border border-rose-200">
                      {item.rankText}
                    </span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                    <div className="bg-rose-50/70 rounded-xl p-3 border border-rose-200/80 space-y-1">
                      <div className="flex items-center gap-1.5 font-bold text-rose-900">
                        <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                        <span>Why it looks odd</span>
                      </div>
                      <p className="text-rose-950 leading-relaxed">{item.whyItLooksWrong}</p>
                    </div>
                    <div className="bg-amber-50/70 rounded-xl p-3 border border-amber-200/80 space-y-1">
                      <div className="flex items-center gap-1.5 font-bold text-amber-900">
                        <Info className="w-4 h-4 text-amber-600 shrink-0" />
                        <span>What's going on</span>
                      </div>
                      <p className="text-amber-950 leading-relaxed">{item.theRealExplanation}</p>
                    </div>
                    <div className="bg-emerald-50/70 rounded-xl p-3 border border-emerald-200/80 space-y-1">
                      <div className="flex items-center gap-1.5 font-bold text-emerald-900">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>Overall</span>
                      </div>
                      <p className="text-emerald-950 leading-relaxed">{item.whereItBalancesOut}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: EVERY INDEX */}
        {activeTab === 'indicators' && (
          <div className="space-y-4">
            <div className="space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h3 className="text-base font-bold text-slate-900">All {critiques.length} indices</h3>
                  <p className="text-xs text-slate-500">Click an index for its strengths, weaknesses and blind spot.</p>
                </div>
                <div className="relative w-full sm:w-64">
                  <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search indices or sources..."
                    className="w-full pl-8 pr-3 py-1.5 text-xs bg-white border border-slate-200 rounded-lg text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs"
                    >
                      ×
                    </button>
                  )}
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-200">
                <span className="text-[11px] font-semibold text-slate-500 flex items-center gap-1">
                  <Filter className="w-3 h-3" /> Dimension:
                </span>
                {[{ id: 'all', name: 'All' }, ...categories].map(cat => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`px-2 py-1 rounded-md text-[11px] font-medium transition-colors cursor-pointer ${
                      selectedCategory === cat.id
                        ? 'bg-teal-700 text-white'
                        : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    {cat.name}
                  </button>
                ))}
                <div className="h-4 w-px bg-slate-300 hidden sm:block mx-1" />
                <span className="text-[11px] font-semibold text-slate-500">Bias risk:</span>
                {['all', 'Low', 'Medium', 'High'].map(r => (
                  <button
                    key={r}
                    onClick={() => setSelectedRisk(r)}
                    className={`px-2.5 py-0.5 rounded text-[10px] font-semibold transition-colors cursor-pointer ${
                      selectedRisk === r
                        ? 'bg-slate-800 text-white shadow-2xs'
                        : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    {r === 'all' ? 'All' : r}
                  </button>
                ))}
              </div>
            </div>

            {filteredIndicators.length === 0 ? (
              <div className="bg-white rounded-xl border border-slate-200 p-8 text-center text-slate-500 text-xs">
                No indices match that filter or search.
              </div>
            ) : (
              <div className="space-y-3">
                {filteredIndicators.map(({ meta, ...ind }) => {
                  const cat = getCategoryMeta(meta.category);
                  const isExpanded = expandedCardId === ind.id || searchQuery.length > 0;

                  return (
                    <div
                      key={ind.id}
                      className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden transition-all hover:border-slate-300"
                    >
                      <div
                        onClick={() => setExpandedCardId(expandedCardId === ind.id ? null : ind.id)}
                        className="p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 cursor-pointer hover:bg-slate-50/60 transition-colors"
                      >
                        <div className="space-y-1 min-w-0">
                          <div className="flex flex-wrap items-center gap-2">
                            <h4 className="text-sm font-bold text-slate-900">{meta.name}</h4>
                            <span
                              className="px-2 py-0.5 rounded text-[10px] font-semibold text-white shadow-2xs"
                              style={{ backgroundColor: cat?.color || '#0d9488' }}
                            >
                              {cat?.name}
                            </span>
                          </div>
                          <p className="text-xs text-slate-600">{ind.whatItMeasures}</p>
                          <p className="text-[11px] text-slate-500">
                            {meta.sourceUrl ? (
                              <a
                                href={meta.sourceUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={(e) => e.stopPropagation()}
                                className="font-medium text-slate-700 underline decoration-slate-300 hover:text-teal-700 inline-flex items-center gap-0.5"
                              >
                                {meta.source}
                                <ExternalLink className="w-3 h-3" />
                              </a>
                            ) : (
                              <span className="font-medium text-slate-700">{meta.source}</span>
                            )}
                            {' · '}{formatTierLabel(meta.tierLabel)}
                            {meta.coverage != null && <> · {meta.coverage} countries</>}
                          </p>
                        </div>
                        <div className="flex items-center gap-2.5 self-end sm:self-center shrink-0">
                          <span className={`px-2.5 py-1 rounded-md text-[11px] font-semibold border ${RISK_STYLES[ind.biasRisk]}`}>
                            {ind.biasRisk} bias risk
                          </span>
                          <span className="text-slate-400 text-xs">{isExpanded ? '▲' : '▼'}</span>
                        </div>
                      </div>

                      {isExpanded && (
                        <div className="px-4 pb-4 pt-3 border-t border-slate-100 grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                          <div className="bg-emerald-50/50 rounded-lg p-3 border border-emerald-100 space-y-1.5">
                            <div className="flex items-center gap-1.5 font-bold text-emerald-900">
                              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                              <span>Strengths</span>
                            </div>
                            <ul className="space-y-1 text-emerald-950">
                              {ind.pros.map((pro, i) => <li key={i}>• {pro}</li>)}
                            </ul>
                          </div>
                          <div className="bg-rose-50/50 rounded-lg p-3 border border-rose-100 space-y-1.5">
                            <div className="flex items-center gap-1.5 font-bold text-rose-900">
                              <AlertTriangle className="w-4 h-4 text-rose-600" />
                              <span>Weaknesses</span>
                            </div>
                            <ul className="space-y-1 text-rose-950">
                              {ind.cons.map((con, i) => <li key={i}>• {con}</li>)}
                            </ul>
                          </div>
                          <div className="bg-amber-50/60 rounded-lg p-3 border border-amber-200/80 space-y-1.5">
                            <div className="flex items-center gap-1.5 font-bold text-amber-900">
                              <Globe className="w-4 h-4 text-amber-700" />
                              <span>Blind spot</span>
                            </div>
                            <p className="text-amber-950 leading-relaxed">{ind.blindSpot}</p>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* TAB 4: YOU'RE IN CONTROL */}
        {activeTab === 'manifesto' && (
          <div className="bg-white rounded-xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-5">
            <div className="space-y-2">
              <h3 className="text-lg font-bold text-slate-900">Why the sliders are yours</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Published league tables fix the weights for you. This map doesn't: you decide how much each dimension counts.
              </p>
            </div>
            <ul className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs text-slate-600">
              <li className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <span className="block font-bold text-sm text-slate-800 mb-1">Priorities differ</span>
                A remote worker, a young family and a retiree want different things from a country.
              </li>
              <li className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <span className="block font-bold text-sm text-slate-800 mb-1">Trade-offs are real</span>
                Sunshine or safety, low taxes or public services: there is no single right answer.
              </li>
              <li className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <span className="block font-bold text-sm text-slate-800 mb-1">Start from a preset</span>
                Try Young Family or Digital Nomad, or fine-tune all {critiques.length} indices yourself.
              </li>
            </ul>
            <div className="p-4 rounded-xl bg-gradient-to-r from-teal-50 to-indigo-50 border border-teal-200 flex flex-col sm:flex-row items-center justify-between gap-3">
              <p className="text-sm font-semibold text-slate-900">
                See how your priorities reshape the map.
              </p>
              <button
                onClick={onBackToMap}
                className="px-5 py-2.5 rounded-lg bg-teal-700 hover:bg-teal-800 text-white text-xs font-semibold shadow-xs transition-colors shrink-0 flex items-center gap-2 cursor-pointer"
              >
                <SlidersHorizontal className="w-4 h-4" />
                <span>Open the map</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
