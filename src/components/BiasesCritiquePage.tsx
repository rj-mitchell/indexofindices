import React, { useState, useMemo } from 'react';
import { 
  ArrowLeft, 
  Search, 
  ShieldAlert, 
  Scale, 
  Globe, 
  Layers, 
  TrendingDown, 
  Sparkles, 
  CheckCircle2, 
  AlertTriangle, 
  SlidersHorizontal,
  ExternalLink,
  BookOpen,
  Filter,
  Info,
  HelpCircle,
  AlertCircle
} from 'lucide-react';
import { 
  MACRO_THEMES, 
  INDICATOR_CRITIQUES, 
  COUNTRY_ANOMALIES,
  type IndicatorCritique 
} from '../data/indexBiases';
import type { MacroCategory, MacroCategoryConfig } from '../types';

interface BiasesCritiquePageProps {
  categories: MacroCategoryConfig[];
  onBackToMap: () => void;
}

export const BiasesCritiquePage: React.FC<BiasesCritiquePageProps> = ({
  categories,
  onBackToMap
}) => {
  const [activeTab, setActiveTab] = useState<'themes' | 'anomalies' | 'indicators' | 'manifesto'>('themes');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedRisk, setSelectedRisk] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [expandedCardId, setExpandedCardId] = useState<string | null>(null);

  // Filter indicators
  const filteredIndicators = useMemo(() => {
    return INDICATOR_CRITIQUES.filter(ind => {
      // Category filter
      if (selectedCategory !== 'all' && ind.category !== selectedCategory) {
        return false;
      }
      // Risk filter
      if (selectedRisk !== 'all' && ind.biasRisk !== selectedRisk) {
        return false;
      }
      // Search query
      if (searchQuery.trim().length > 0) {
        const q = searchQuery.toLowerCase();
        const matchesName = ind.name.toLowerCase().includes(q) || ind.shortName.toLowerCase().includes(q);
        const matchesSource = ind.source.toLowerCase().includes(q);
        const matchesDesc = ind.whatItMeasures.toLowerCase().includes(q) || ind.westernCentricity.toLowerCase().includes(q);
        return matchesName || matchesSource || matchesDesc;
      }
      return true;
    });
  }, [selectedCategory, selectedRisk, searchQuery]);

  const getRiskBadgeColor = (risk: IndicatorCritique['biasRisk']) => {
    switch (risk) {
      case 'High':
        return 'bg-rose-100 text-rose-800 border-rose-300';
      case 'Medium':
        return 'bg-amber-100 text-amber-800 border-amber-300';
      case 'Low':
        return 'bg-emerald-100 text-emerald-800 border-emerald-300';
      default:
        return 'bg-slate-100 text-slate-700 border-slate-300';
    }
  };

  const getRiskBadgeLabel = (risk: IndicatorCritique['biasRisk']) => {
    switch (risk) {
      case 'High': return 'High Bias';
      case 'Medium': return 'Medium Bias';
      case 'Low': return 'Low Bias';
      default: return `${risk} Bias`;
    }
  };

  const formatTierLabel = (tierLabel: string) => {
    if (tierLabel.includes('Empirical') || tierLabel.includes('Technocratic')) return 'Hard Data & Counts';
    if (tierLabel.includes('Consensus') || tierLabel.includes('Standard')) return 'International Standard';
    if (tierLabel.includes('Perception')) return 'Opinion Survey';
    if (tierLabel.includes('Institutional')) return 'Institutional Score';
    if (tierLabel.includes('Regulatory')) return 'Regulatory Standard';
    if (tierLabel.includes('Rights')) return 'Human Rights Scorecard';
    if (tierLabel.includes('Academic')) return 'Academic Survey';
    return tierLabel;
  };

  const getCategoryMeta = (catId: MacroCategory) => {
    return categories.find(c => c.id === catId);
  };

  const renderIcon = (name: string) => {
    switch (name) {
      case 'Layers': return <Layers className="w-5 h-5 text-indigo-600" />;
      case 'Globe': return <Globe className="w-5 h-5 text-teal-600" />;
      case 'Sparkles': return <Sparkles className="w-5 h-5 text-amber-600" />;
      case 'TrendingDown': return <TrendingDown className="w-5 h-5 text-rose-600" />;
      case 'Scale': return <Scale className="w-5 h-5 text-violet-600" />;
      case 'ShieldAlert': return <ShieldAlert className="w-5 h-5 text-emerald-600" />;
      default: return <Info className="w-5 h-5 text-slate-600" />;
    }
  };

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
            <div className="min-w-0">
              <h1 className="text-sm sm:text-base font-bold text-slate-900 tracking-tight truncate">
                Behind the Rankings
              </h1>
            </div>
          </div>

          {/* Quick tab switchers with Concentric Radii (Outer 12px, Inner 8px) */}
          <div className="flex flex-wrap items-center gap-1 bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs w-full md:w-auto">
            <button
              onClick={() => setActiveTab('themes')}
              className={`px-3 py-1.5 rounded-[8px] font-medium active:scale-95 transition-all cursor-pointer whitespace-nowrap ${
                activeTab === 'themes' 
                  ? 'bg-white text-slate-900 shadow-xs font-semibold' 
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              🏛️ Big Traps
            </button>
            <button
              onClick={() => setActiveTab('anomalies')}
              className={`px-3 py-1.5 rounded-[8px] font-medium active:scale-95 transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
                activeTab === 'anomalies' 
                  ? 'bg-white text-teal-800 shadow-xs font-bold' 
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <span>🎯 Odd Results</span>
              <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-rose-100 text-rose-700 font-bold">
                North Korea &amp; China
              </span>
            </button>
            <button
              onClick={() => setActiveTab('indicators')}
              className={`px-3 py-1.5 rounded-[8px] font-medium active:scale-95 transition-all cursor-pointer whitespace-nowrap ${
                activeTab === 'indicators' 
                  ? 'bg-white text-slate-900 shadow-xs font-semibold' 
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              🔍 35 Indices Explained
            </button>
            <button
              onClick={() => setActiveTab('manifesto')}
              className={`px-3 py-1.5 rounded-[8px] font-medium active:scale-95 transition-all cursor-pointer whitespace-nowrap ${
                activeTab === 'manifesto' 
                  ? 'bg-white text-slate-900 shadow-xs font-semibold' 
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              ⚖️ You're in Control
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Body */}
      <div className="max-w-6xl mx-auto px-4 sm:px-8 py-8 space-y-8">
        
        {/* Banner Hero */}
        <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-teal-950 text-white rounded-2xl p-6 sm:p-8 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 transform translate-x-12 -translate-y-12 w-64 h-64 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="max-w-3xl space-y-3 relative z-10">
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-teal-400/15 border border-teal-400/30 text-teal-300 text-xs font-medium">
              <BookOpen className="w-3.5 h-3.5" />
              <span>Behind the Scenes: How Global Rankings Really Work</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white font-sans">
              Why No Country Is Simply "The Best in the World"
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
              Every year, headlines claim one country has the "best quality of life". But deciding what makes a good life is personal: one person prioritises warm sunshine and affordable housing; another wants top healthcare and clean air; another values freedom of speech above all else. 
              This guide pulls back the curtain on all 35 indicators we track—explaining where the numbers come from, what they get right, their hidden blind spots, and why we put the control sliders directly in your hands.
            </p>
            <div className="flex flex-wrap items-center gap-4 pt-2 text-xs text-slate-300">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                <span>35 Indices Audited</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-amber-400"></span>
                <span>7 Real-Life Domains</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-rose-400"></span>
                <span>Real-World Impact on People</span>
              </div>
            </div>

            {/* Quick Spotlight Banner Link */}
            <div className="pt-2">
              <button
                onClick={() => setActiveTab('anomalies')}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-rose-500/20 hover:bg-rose-500/30 border border-rose-400/40 text-rose-200 text-xs font-medium transition-all active:scale-98 cursor-pointer"
              >
                <span>🎯 Why is North Korea #1 for lack of terrorism &amp; China 197th for housing?</span>
                <span className="font-bold underline text-white">See Case Studies &rarr;</span>
              </button>
            </div>
          </div>
        </div>

        {/* TAB 1: MACRO THEMES */}
        {activeTab === 'themes' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h3 className="text-base font-bold text-slate-900">
                  6 Hidden Traps in Global Country Rankings
                </h3>
                <p className="text-xs text-slate-500">
                  The common blind spots, reputation loops, and biases built into famous international scorecards.
                </p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setActiveTab('anomalies')}
                  className="text-xs font-semibold text-rose-700 hover:text-rose-800 bg-rose-50 hover:bg-rose-100 border border-rose-200 px-2.5 py-1 rounded-md transition-colors cursor-pointer flex items-center gap-1"
                >
                  <span>🎯 Odd Results</span>
                  <span>→</span>
                </button>
                <button
                  onClick={() => setActiveTab('indicators')}
                  className="text-xs font-semibold text-teal-700 hover:text-teal-800 flex items-center gap-1 cursor-pointer"
                >
                  <span>35 Indices</span>
                  <span>→</span>
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {MACRO_THEMES.map((theme) => (
                <div 
                  key={theme.id}
                  className="bg-white rounded-xl border border-slate-200/90 p-5 shadow-xs flex flex-col justify-between hover:border-slate-300 transition-all space-y-4"
                >
                  <div className="space-y-3">
                    <div className="flex items-center gap-2.5">
                      <div className="p-2 rounded-lg bg-slate-50 border border-slate-100">
                        {renderIcon(theme.icon)}
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-slate-900 leading-snug">
                          {theme.title}
                        </h4>
                      </div>
                    </div>

                    <p className="text-xs font-medium text-teal-800 bg-teal-50/70 p-2 rounded-md border border-teal-100">
                      {theme.subtitle}
                    </p>

                    <div className="space-y-2 text-xs text-slate-600 leading-relaxed">
                      {theme.content.map((p, i) => (
                        <p key={i}>{p}</p>
                      ))}
                    </div>

                    {theme.keyQuote && (
                      <blockquote className="border-l-2 border-indigo-500 pl-3 py-1 my-2 bg-indigo-50/50 rounded-r text-[11px] text-slate-700 italic">
                        "{theme.keyQuote.text}"
                        <span className="block not-italic text-[10px] text-slate-500 font-medium mt-1">
                          — {theme.keyQuote.author}, <span className="underline">{theme.keyQuote.source}</span>
                        </span>
                      </blockquote>
                    )}
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-start gap-2 text-xs bg-slate-50/60 p-2.5 rounded-lg">
                    <span className="font-semibold text-slate-700 shrink-0">Key Takeaway:</span>
                    <span className="text-slate-600 text-[11px] leading-tight">{theme.takeaway}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 2: COUNTRY SPOTLIGHTS & ANOMALIES */}
        {activeTab === 'anomalies' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <span>Countries That Look "Wrong" on Paper (And Why)</span>
                  <span className="text-[10px] font-semibold bg-rose-50 text-rose-700 border border-rose-200 px-2 py-0.5 rounded">
                    5 Real-World Case Studies
                  </span>
                </h3>
                <p className="text-xs text-slate-500">
                  Why North Korea ranks #1 for lack of terrorism, China ranks 197th for housing, and other famous ranking paradoxes.
                </p>
              </div>

              <button
                onClick={() => setActiveTab('indicators')}
                className="text-xs font-semibold text-teal-700 hover:text-teal-800 flex items-center gap-1 cursor-pointer self-start sm:self-auto"
              >
                <span>Browse All 35 Indices</span>
                <span>→</span>
              </button>
            </div>

            <div className="grid grid-cols-1 gap-5">
              {COUNTRY_ANOMALIES.map((item) => (
                <div 
                  key={item.id}
                  className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden hover:border-slate-300 transition-all p-5 sm:p-6 space-y-4"
                >
                  {/* Header */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
                    <div className="flex items-center gap-3">
                      <span className="text-3xl leading-none">{item.flag}</span>
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="text-base font-bold text-slate-900">
                            {item.countryName}
                          </h4>
                          <span className="text-xs font-mono px-1.5 py-0.5 rounded bg-slate-100 text-slate-500">
                            {item.iso3}
                          </span>
                        </div>
                        <div className="text-xs font-semibold text-teal-800 mt-0.5">
                          {item.headline}
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-2 self-start sm:self-auto">
                      <span className="px-2.5 py-1 rounded-md text-[11px] font-semibold bg-slate-100 text-slate-700 border border-slate-200">
                        Metric: {item.metric}
                      </span>
                      <span className="px-2.5 py-1 rounded-md text-[11px] font-bold font-mono tabular-nums bg-rose-50 text-rose-700 border border-rose-200">
                        {item.rankText}
                      </span>
                    </div>
                  </div>

                  {/* 3 Structured Columns */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 text-xs">
                    {/* Block 1: Why it looks wrong */}
                    <div className="bg-rose-50/70 rounded-xl p-3.5 border border-rose-200/80 space-y-1.5">
                      <div className="flex items-center gap-1.5 font-bold text-rose-900 text-xs">
                        <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                        <span>Why It Looks Wrong on Paper</span>
                      </div>
                      <p className="text-rose-950 leading-relaxed font-sans">
                        {item.whyItLooksWrong}
                      </p>
                    </div>

                    {/* Block 2: The real explanation */}
                    <div className="bg-amber-50/70 rounded-xl p-3.5 border border-amber-200/80 space-y-1.5">
                      <div className="flex items-center gap-1.5 font-bold text-amber-900 text-xs">
                        <Info className="w-4 h-4 text-amber-600 shrink-0" />
                        <span>The Real Explanation</span>
                      </div>
                      <p className="text-amber-950 leading-relaxed font-sans">
                        {item.theRealExplanation}
                      </p>
                    </div>

                    {/* Block 3: Where it balances out */}
                    <div className="bg-emerald-50/70 rounded-xl p-3.5 border border-emerald-200/80 space-y-1.5">
                      <div className="flex items-center gap-1.5 font-bold text-emerald-900 text-xs">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>Where the Data Balances Out</span>
                      </div>
                      <p className="text-emerald-950 leading-relaxed font-sans">
                        {item.whereItBalancesOut}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: INDICATOR AUDIT */}
        {activeTab === 'indicators' && (
          <div className="space-y-6">
            <div className="space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h3 className="text-base font-bold text-slate-900">
                    Plain-English Guide to All 35 Indices
                  </h3>
                  <p className="text-xs text-slate-500">
                    What each index measures, what it does well, its hidden flaws, and how it affects people on the ground.
                  </p>
                </div>
                
                {/* Search Box */}
                <div className="relative w-full sm:w-64">
                  <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search indicators, sources, or topics..."
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

              {/* Filters Bar */}
              <div className="flex flex-wrap items-center gap-2 pt-1 border-t border-slate-200">
                <span className="text-[11px] font-semibold text-slate-500 flex items-center gap-1">
                  <Filter className="w-3 h-3" /> Domain:
                </span>

                {/* Category Pills */}
                <button
                  onClick={() => setSelectedCategory('all')}
                  className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition-colors ${
                    selectedCategory === 'all'
                      ? 'bg-slate-900 text-white'
                      : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  All Domains
                </button>
                {categories.map(cat => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`px-2 py-1 rounded-md text-[11px] font-medium transition-colors ${
                      selectedCategory === cat.id
                        ? 'bg-teal-700 text-white'
                        : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    {cat.name}
                  </button>
                ))}

                {/* Risk Filter - Low, Medium, High */}
                <div className="h-4 w-px bg-slate-300 hidden sm:block mx-1" />
                <span className="text-[11px] font-semibold text-slate-500 hidden sm:inline">Bias risk:</span>
                {[
                  { id: 'all', label: 'All Biases' },
                  { id: 'Low', label: 'Low Bias' },
                  { id: 'Medium', label: 'Medium Bias' },
                  { id: 'High', label: 'High Bias' }
                ].map(r => (
                  <button
                    key={r.id}
                    onClick={() => setSelectedRisk(r.id)}
                    className={`px-2.5 py-0.5 rounded text-[10px] font-semibold transition-colors cursor-pointer ${
                      selectedRisk === r.id
                        ? 'bg-slate-800 text-white shadow-2xs'
                        : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    {r.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Indicator Cards List */}
            {filteredIndicators.length === 0 ? (
              <div className="bg-white rounded-xl border border-slate-200 p-8 text-center text-slate-500 text-xs">
                No indicators match the selected filter or search term.
              </div>
            ) : (
              <div className="space-y-4">
                {filteredIndicators.map((ind) => {
                  const cat = getCategoryMeta(ind.category);
                  const isExpanded = expandedCardId === ind.id || searchQuery.length > 0;

                  return (
                    <div 
                      key={ind.id}
                      className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden transition-all hover:border-slate-300"
                    >
                      {/* Card Header */}
                      <div 
                        onClick={() => setExpandedCardId(expandedCardId === ind.id ? null : ind.id)}
                        className="p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 cursor-pointer hover:bg-slate-50/60 transition-colors"
                      >
                        <div className="space-y-1">
                          <div className="flex flex-wrap items-center gap-2">
                            <h4 className="text-sm font-bold text-slate-900">
                              {ind.name}
                            </h4>
                            <span className="text-xs text-slate-400 font-mono">
                              ({ind.shortName})
                            </span>
                            <span 
                              className="px-2 py-0.5 rounded text-[10px] font-semibold text-white shadow-2xs"
                              style={{ backgroundColor: cat?.color || '#0d9488' }}
                            >
                              {cat?.name}
                            </span>
                          </div>
                          <p className="text-xs text-slate-500">
                            Source: <span className="font-medium text-slate-700">{ind.source}</span> • Data type: <span className="font-medium text-slate-700">{formatTierLabel(ind.tierLabel)}</span>
                          </p>
                        </div>

                        <div className="flex items-center gap-2.5 self-end sm:self-center shrink-0">
                          <span className={`px-2.5 py-1 rounded-md text-[11px] font-semibold border ${getRiskBadgeColor(ind.biasRisk)}`}>
                            {getRiskBadgeLabel(ind.biasRisk)}
                          </span>
                          <span className="text-slate-400 text-xs font-mono">
                            {expandedCardId === ind.id ? '▲ Close Details' : '▼ Read Plain Breakdown'}
                          </span>
                        </div>
                      </div>

                      {/* Summary Banner */}
                      <div className="px-4 sm:px-5 pb-3 pt-0">
                        <p className="text-xs text-slate-600 bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                          <strong className="text-slate-800">In plain English:</strong> {ind.whatItMeasures}
                        </p>
                      </div>

                      {/* Detailed Critique Body (Expandable) */}
                      {isExpanded && (
                        <div className="px-4 sm:px-5 pb-5 pt-2 border-t border-slate-100 space-y-4">
                          {/* Pros & Cons 2-column layout */}
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* Pros */}
                            <div className="bg-emerald-50/50 rounded-lg p-3.5 border border-emerald-100 space-y-2">
                              <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-900">
                                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                                <span>What It Does Well</span>
                              </div>
                              <ul className="space-y-1.5 text-xs text-emerald-950">
                                {ind.pros.map((pro, i) => (
                                  <li key={i} className="flex items-start gap-1.5">
                                    <span className="text-emerald-500 font-bold">•</span>
                                    <span>{pro}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>

                            {/* Cons */}
                            <div className="bg-rose-50/50 rounded-lg p-3.5 border border-rose-100 space-y-2">
                              <div className="flex items-center gap-1.5 text-xs font-bold text-rose-900">
                                <AlertTriangle className="w-4 h-4 text-rose-600" />
                                <span>What It Misses or Gets Wrong</span>
                              </div>
                              <ul className="space-y-1.5 text-xs text-rose-950">
                                {ind.cons.map((con, i) => (
                                  <li key={i} className="flex items-start gap-1.5">
                                    <span className="text-rose-500 font-bold">•</span>
                                    <span>{con}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>

                          {/* Deep Dive 1: Western-Centricity */}
                          <div className="bg-amber-50/60 rounded-lg p-3.5 border border-amber-200/80 space-y-1.5">
                            <div className="flex items-center gap-2 text-xs font-bold text-amber-900">
                              <Globe className="w-4 h-4 text-amber-700" />
                              <span>Western &amp; Cultural Blind Spots</span>
                            </div>
                            <p className="text-xs text-amber-950 leading-relaxed font-sans">
                              {ind.westernCentricity}
                            </p>
                          </div>

                          {/* Deep Dive 2: Real-World Impacts */}
                          <div className="bg-indigo-50/60 rounded-lg p-3.5 border border-indigo-200/80 space-y-1.5">
                            <div className="flex items-center gap-2 text-xs font-bold text-indigo-900">
                              <Scale className="w-4 h-4 text-indigo-700" />
                              <span>Real-World Impact on Ordinary People</span>
                            </div>
                            <p className="text-xs text-indigo-950 leading-relaxed font-sans">
                              {ind.realWorldImpact}
                            </p>
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

        {/* TAB 3: MANIFESTO & DEMOCRATISING WEIGHTS */}
        {activeTab === 'manifesto' && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-5">
              <div className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-teal-700 bg-teal-50 px-2.5 py-1 rounded border border-teal-200">
                  Our Core Philosophy
                </span>
                <h3 className="text-lg sm:text-xl font-bold text-slate-900">
                  Why We Put the Sliders in Your Hands
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Most international scorecards hand you a finished table and declare: <em>"Country X is #1, and that is final."</em> But who actually decided that? 
                  Behind every traditional league table, a small group of economists in London, Washington, or Geneva made hundreds of hidden choices about what they think matters most in life.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                  <div className="font-bold text-sm text-slate-800 flex items-center gap-2">
                    <span>1. Everyone Values Different Things</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    A remote worker looking for high-speed internet and warm sunshine wants something completely different from a young parent looking for safe streets and good schools, or a pensioner looking for great healthcare and quiet parks. Forcing everyone to accept the exact same formula makes no sense.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                  <div className="font-bold text-sm text-slate-800 flex items-center gap-2">
                    <span>2. Life Is Made of Real Trade-Offs</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Would you trade a bit of warm sunshine for faster trains? Would you accept higher taxes if it meant free healthcare and cheaper universities? There is no single "correct" answer—only the choices you would make for yourself.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                  <div className="font-bold text-sm text-slate-800 flex items-center gap-2">
                    <span>3. You Decide What "#1" Means</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Instead of locking you into someone else's idea of a good life, our tool lets you pick from real-life presets (like <strong>Young Family</strong>, <strong>Digital Nomad</strong>, or <strong>Physical Comfort</strong>) or fine-tune all 35 sliders yourself. When you move a slider, the entire world map recalculates in real time to match your priorities.
                  </p>
                </div>
              </div>

              <div className="p-5 rounded-xl bg-gradient-to-r from-teal-50 to-indigo-50 border border-teal-200 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="space-y-1 text-center sm:text-left">
                  <h4 className="text-sm font-bold text-slate-900">
                    Ready to see how your priorities reshape the map?
                  </h4>
                  <p className="text-xs text-slate-600">
                    Adjust the 7 life domains and 35 indicators to see which countries match what you actually care about.
                  </p>
                </div>
                <button
                  onClick={onBackToMap}
                  className="px-5 py-2.5 rounded-lg bg-teal-700 hover:bg-teal-800 text-white text-xs font-semibold shadow-xs transition-colors shrink-0 flex items-center gap-2 cursor-pointer"
                >
                  <SlidersHorizontal className="w-4 h-4" />
                  <span>Open Interactive Map</span>
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
