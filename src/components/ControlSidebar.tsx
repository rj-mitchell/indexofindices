import React, { useState, useMemo } from 'react';
import { 
  ShieldAlert, 
  Landmark, 
  TrendingUp, 
  HeartPulse, 
  Scale, 
  Cpu, 
  SunMedium, 
  Leaf, 
  Sliders, 
  ChevronDown, 
  ChevronUp, 
  ChevronRight,
  ChevronLeft,
  ChevronsLeft,
  ChevronsRight,
  Search,
  Globe,
  Info, 
  Trophy, 
  ListOrdered,
  HelpCircle
} from 'lucide-react';
import type { MacroCategory, ComputedCountry, IndicatorMeta, MacroCategoryConfig } from '../types';
import { RegionId, REGIONS } from '../data/regions';

interface ControlSidebarProps {
  categories: MacroCategoryConfig[];
  indicators: IndicatorMeta[];
  macroWeights: Record<MacroCategory, number>;
  subWeights: Record<string, number>;
  useSubWeights: boolean;
  countryList: ComputedCountry[];
  onMacroWeightChange: (cat: MacroCategory, val: number) => void;
  onBatchMacroWeightChange?: (weights: Record<MacroCategory, number>) => void;
  onSubWeightChange: (indId: string, val: number) => void;
  onToggleUseSubWeights: (active: boolean) => void;
  onSelectCountry: (iso3: string) => void;
  selectedCountryIso: string | null;
  activeRegion?: RegionId;
  onSelectRegion?: (reg: RegionId) => void;
  countriesInRegion?: ComputedCountry[];
  onOpenBiases?: () => void;
}

export type PresetType = 'balanced' | 'physical' | 'institutional' | 'digital_nomad' | 'young_family' | 'ethics_rights';

export const PRESETS: Record<PresetType, { 
  label: string; 
  subtitle: string;
  tooltip: string; 
  icon: string; 
  weights: Record<MacroCategory, number> 
}> = {
  balanced: {
    label: 'Balanced',
    subtitle: 'Equal 50% All',
    tooltip: 'Holistic baseline: equal 50% weighting across all 8 physical, economic, and institutional dimensions',
    icon: '🌐',
    weights: {
      safety: 50,
      governance: 50,
      economy: 50,
      health: 50,
      rights: 50,
      infrastructure: 50,
      climate: 50,
      environment: 50
    }
  },
  physical: {
    label: 'Physical',
    subtitle: 'Climate & Health',
    tooltip: 'Prioritises physical and environmental well-being: pleasant weather, clean air and water, healthy lifespan, disaster resilience, and physical safety',
    icon: '🌿',
    weights: {
      climate: 100,
      environment: 95,
      health: 85,
      infrastructure: 80,
      safety: 80,
      economy: 30,
      governance: 20,
      rights: 20
    }
  },
  institutional: {
    label: 'Institutional',
    subtitle: 'Civic & Law',
    tooltip: 'Prioritises institutional and civic quality of life: civil liberties, democratic governance, rule of law, anti-corruption, and a sophisticated economy',
    icon: '🏛️',
    weights: {
      rights: 100,
      governance: 95,
      economy: 85,
      safety: 50,
      health: 35,
      infrastructure: 35,
      climate: 10,
      environment: 25
    }
  },
  digital_nomad: {
    label: 'Digital Nomad',
    subtitle: 'Broadband & Climate',
    tooltip: 'Prioritises high-speed broadband & tech infrastructure, warm/sunny climate comfort, local purchasing power and personal safety',
    icon: '💻',
    weights: {
      infrastructure: 100,
      climate: 95,
      environment: 40,
      economy: 80,
      safety: 80,
      health: 50,
      governance: 45,
      rights: 40
    }
  },
  young_family: {
    label: 'Young Family',
    subtitle: 'Safety, Kids & Health',
    tooltip: 'Prioritises safe communities, top-tier healthcare and child survival, clean air and water, schooling, and reasonable working hours',
    icon: '🏡',
    weights: {
      safety: 100,
      health: 100,
      climate: 60,
      environment: 90,
      infrastructure: 80,
      economy: 80,
      governance: 60,
      rights: 55
    }
  },
  ethics_rights: {
    label: 'Ethics & Rights',
    subtitle: 'Civil & Human Rights',
    tooltip: 'Prioritises civil liberties, press freedom, LGBTQ+ equality, women’s status, academic and religious freedom, and liberal democracy',
    icon: '⚖️',
    weights: {
      rights: 100,
      governance: 95,
      economy: 90,
      climate: 30,
      environment: 75,
      health: 70,
      safety: 60,
      infrastructure: 30
    }
  }
};

const CATEGORY_ICONS: Record<MacroCategory, React.ComponentType<{ className?: string }>> = {
  safety: ShieldAlert,
  governance: Landmark,
  rights: Scale,
  economy: TrendingUp,
  health: HeartPulse,
  infrastructure: Cpu,
  climate: SunMedium,
  environment: Leaf
};

export const ControlSidebar: React.FC<ControlSidebarProps> = ({
  categories,
  indicators,
  macroWeights,
  subWeights,
  useSubWeights,
  countryList,
  onMacroWeightChange,
  onBatchMacroWeightChange,
  onSubWeightChange,
  onToggleUseSubWeights,
  onSelectCountry,
  selectedCountryIso,
  activeRegion,
  onSelectRegion,
  countriesInRegion,
  onOpenBiases
}) => {
  const [activeTab, setActiveTab] = useState<'weights' | 'leaderboard'>('weights');
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);

  const [leaderboardPage, setLeaderboardPage] = useState(1);
  const [leaderboardSearch, setLeaderboardSearch] = useState('');
  const LEADERBOARD_PAGE_SIZE = 25;

  const handleRegionChange = (newReg: RegionId) => {
    onSelectRegion?.(newReg);
    setLeaderboardPage(1);
  };

  const baseLeaderboardList = useMemo(() => {
    const source = activeRegion && activeRegion !== 'global' && countriesInRegion 
      ? countriesInRegion 
      : countryList;
    return source.filter(c => c.hasData !== false && !c.isDependency);
  }, [activeRegion, countriesInRegion, countryList]);

  const filteredLeaderboardList = useMemo(() => {
    if (!leaderboardSearch.trim()) return baseLeaderboardList;
    const q = leaderboardSearch.toLowerCase().trim();
    return baseLeaderboardList.filter(c => 
      c.name.toLowerCase().includes(q) || 
      c.iso3.toLowerCase().includes(q)
    );
  }, [baseLeaderboardList, leaderboardSearch]);

  const totalLeaderboardPages = Math.max(1, Math.ceil(filteredLeaderboardList.length / LEADERBOARD_PAGE_SIZE));
  const currentLeaderboardPage = Math.min(Math.max(1, leaderboardPage), totalLeaderboardPages);
  const startIndex = (currentLeaderboardPage - 1) * LEADERBOARD_PAGE_SIZE;
  const pageCountries = filteredLeaderboardList.slice(startIndex, startIndex + LEADERBOARD_PAGE_SIZE);

  const selectedCountryIndex = filteredLeaderboardList.findIndex(c => c.iso3 === selectedCountryIso);
  const selectedCountryPage = selectedCountryIndex !== -1 ? Math.floor(selectedCountryIndex / LEADERBOARD_PAGE_SIZE) + 1 : null;

  const toggleCategoryExpand = (catId: string) => {
    setExpandedCategory(prev => prev === catId ? null : catId);
  };

  const getActivePreset = (): PresetType | 'custom' => {
    for (const [key, preset] of Object.entries(PRESETS) as [PresetType, typeof PRESETS[PresetType]][]) {
      const isMatch = (Object.keys(preset.weights) as MacroCategory[]).every(
        cat => (macroWeights[cat] ?? 50) === preset.weights[cat]
      );
      if (isMatch) return key;
    }
    return 'custom';
  };
  const activePreset = getActivePreset();

  const handleApplyPreset = (key: PresetType) => {
    const targetWeights = PRESETS[key].weights;
    if (onBatchMacroWeightChange) {
      onBatchMacroWeightChange(targetWeights);
    } else {
      for (const [cat, val] of Object.entries(targetWeights) as [MacroCategory, number][]) {
        onMacroWeightChange(cat, val);
      }
    }
  };

  return (
    <aside className="w-full lg:w-96 bg-white border-e border-slate-200 flex flex-col h-full shadow-xs shrink-0 select-none">
      {/* Sidebar Header & Presets */}
      <div className="px-3 py-2.5 border-b border-slate-200 bg-slate-50/70">
        <div className="flex items-center justify-between mb-1.5">
          <div className="flex items-center gap-1.5">
            <Sliders className="w-3.5 h-3.5 text-teal-700" />
            <span className="text-xs font-bold text-slate-800 uppercase tracking-wider font-sans">
              Weight Presets
            </span>
          </div>
          <span className="text-[10px] text-slate-400 font-mono tabular-nums">
            {activePreset === 'custom' ? 'Custom Dials' : `${PRESETS[activePreset].label} Preset`}
          </span>
        </div>

        {/* Presets Pill Selectors with Concentric Nested Radii (Outer 10px, Padding 2px, Inner 6px) */}
        <div className="space-y-1 mb-2">
          {/* Baseline Presets: Balanced - Physical - Institutional */}
          <div className="grid grid-cols-3 gap-1 p-0.5 bg-slate-200/80 rounded-lg text-xs font-medium">
            {(['balanced', 'physical', 'institutional'] as PresetType[]).map(key => {
              const p = PRESETS[key];
              const isActive = activePreset === key;
              return (
                <button
                  key={key}
                  onClick={() => handleApplyPreset(key)}
                  title={p.tooltip}
                  className={`py-1 px-1 rounded-md flex flex-col items-center justify-center active:scale-[0.98] transition-all cursor-pointer ${
                    isActive
                      ? 'bg-teal-700 text-white shadow-2xs'
                      : 'text-slate-700 hover:bg-white/80 hover:text-slate-900 bg-white/50'
                  }`}
                >
                  <div className="flex items-center gap-1 font-semibold text-[10.5px] leading-tight">
                    <span>{p.icon}</span>
                    <span className="truncate">{p.label}</span>
                  </div>
                  <span className={`text-[8px] truncate max-w-full font-normal ${isActive ? 'text-teal-100' : 'text-slate-500'}`}>
                    {p.subtitle}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Life Persona Presets: Digital Nomad - Young Family - Ethics & Rights */}
          <div className="grid grid-cols-3 gap-1 p-0.5 bg-slate-200/80 rounded-lg text-xs font-medium">
            {(['digital_nomad', 'young_family', 'ethics_rights'] as PresetType[]).map(key => {
              const p = PRESETS[key];
              const isActive = activePreset === key;
              return (
                <button
                  key={key}
                  onClick={() => handleApplyPreset(key)}
                  title={p.tooltip}
                  className={`py-1 px-1 rounded-md flex flex-col items-center justify-center active:scale-[0.98] transition-all cursor-pointer ${
                    isActive
                      ? 'bg-teal-700 text-white shadow-2xs'
                      : 'text-slate-700 hover:bg-white/80 hover:text-slate-900 bg-white/50'
                  }`}
                >
                  <div className="flex items-center gap-1 font-semibold text-[10.5px] leading-tight">
                    <span>{p.icon}</span>
                    <span className="truncate">{p.label}</span>
                  </div>
                  <span className={`text-[8px] truncate max-w-full font-normal ${isActive ? 'text-teal-100' : 'text-slate-500'}`}>
                    {p.subtitle}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Tab Switcher with Concentric Nested Radii (Outer 10px, Padding 2px, Inner 6px) */}
        <div className="grid grid-cols-2 p-0.5 bg-slate-200/80 rounded-lg text-xs font-medium">
          <button
            onClick={() => setActiveTab('weights')}
            title="Dial any category up or down to recolour the map. Click a category name to see its datasets."
            className={`py-1 rounded-md flex items-center justify-center gap-1.5 active:scale-[0.98] transition-all cursor-pointer ${
              activeTab === 'weights'
                ? 'bg-white text-slate-900 shadow-2xs font-semibold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Sliders className="w-3.5 h-3.5" />
            <span>Category Dials</span>
          </button>
          <button
            onClick={() => setActiveTab('leaderboard')}
            className={`py-1 rounded-md flex items-center justify-center gap-1.5 active:scale-[0.98] transition-all cursor-pointer ${
              activeTab === 'leaderboard'
                ? 'bg-white text-slate-900 shadow-2xs font-semibold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Trophy className="w-3.5 h-3.5 text-amber-500" />
            <span>Live Ranks (<span className="font-mono tabular-nums">{countryList.filter(c => c.rank != null).length}</span>)</span>
          </button>
        </div>
      </div>

      {/* Main Tab Content with Overflow Clip Protection */}
      <div className="flex-1 overflow-y-auto overflow-x-clip p-2.5 space-y-1.5">
        {activeTab === 'weights' ? (
          <>
            {/* Sub-Weights Mode Toggle */}
            <div className="flex items-center justify-between px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs">
              <div className="flex items-center gap-1.5">
                <span className="font-semibold text-slate-700 text-xs">Fine-Tune Sub-Indices</span>
                <span className="text-[10px] text-slate-400 font-mono">({indicators.length} datasets)</span>
              </div>
              <button
                onClick={() => onToggleUseSubWeights(!useSubWeights)}
                className={`relative inline-flex h-4.5 w-8 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                  useSubWeights ? 'bg-teal-600' : 'bg-slate-300'
                }`}
                title={useSubWeights ? "Disable custom sub-weights" : "Enable custom sub-weights for individual datasets"}
              >
                <span
                  className={`pointer-events-none inline-block h-3.5 w-3.5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                    useSubWeights ? 'translate-x-3.5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            {/* Macro Category Sliders - compact so all eight fit on a laptop screen */}
            <div className="space-y-1">
              {categories.map((cat) => {
                const IconComponent = CATEGORY_ICONS[cat.id] || HelpCircle;
                const weight = macroWeights[cat.id] ?? 50;
                const isExpanded = expandedCategory === cat.id;
                const catIndicators = indicators.filter(i => i.category === cat.id);

                return (
                  <div 
                    key={cat.id} 
                    className={`px-2.5 pt-1.5 pb-1 bg-white border rounded-xl transition-all shadow-2xs ${
                      isExpanded ? 'border-teal-400/60 ring-1 ring-teal-400/20' : 'border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    {/* Category Header Row with Pop-Out Arrow */}
                    <div className="flex items-center justify-between">
                      <button
                        type="button"
                        onClick={() => toggleCategoryExpand(cat.id)}
                        className="flex items-center gap-1.5 min-w-0 text-start group cursor-pointer hover:opacity-90 active:scale-[0.99] transition-all"
                        title={isExpanded ? `Collapse ${cat.name}` : `Pop out details: ${cat.description}`}
                        aria-expanded={isExpanded}
                      >
                        <div 
                          className="w-5 h-5 rounded-[5px] flex items-center justify-center text-white shrink-0 shadow-2xs"
                          style={{ backgroundColor: cat.color }}
                        >
                          <IconComponent className="w-3 h-3" />
                        </div>
                        <span className="text-xs font-semibold text-slate-800 truncate group-hover:text-teal-700 transition-colors">
                          {cat.name}
                        </span>
                        {/* Pop-out Arrow */}
                        <span 
                          className={`inline-flex items-center justify-center w-4 h-4 rounded text-slate-400 group-hover:text-teal-700 group-hover:bg-teal-50 transition-all ${
                            isExpanded ? 'text-teal-700 bg-teal-100/60' : ''
                          }`}
                          title={isExpanded ? "Hide explanatory text" : "Pop out explanatory text"}
                        >
                          <ChevronRight className={`w-3.5 h-3.5 transform transition-transform duration-200 ${isExpanded ? 'rotate-90' : ''}`} />
                        </span>
                      </button>

                      <div className="flex items-center gap-1 shrink-0">
                        <span className="text-xs font-mono tabular-nums font-semibold px-1.5 py-0.5 rounded bg-slate-100 text-slate-700 min-w-8 text-center">
                          {weight}%
                        </span>
                      </div>
                    </div>

                    {/* Macro Slider */}
                    <div className="flex items-center h-4">
                      <input
                        type="range"
                        min="0"
                        max="100"
                        step="1"
                        value={weight}
                        onChange={(e) => onMacroWeightChange(cat.id, parseInt(e.target.value, 10))}
                        className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-teal-600"
                        aria-label={`${cat.name} weight`}
                      />
                    </div>

                    {/* Popped-out Explanatory Text & Sub-Indices View */}
                    {isExpanded && (
                      <div className="mt-2 pt-2 border-t border-slate-100 space-y-2 animate-fadeIn">
                        {/* Explanatory Text Box */}
                        <div className="text-[11px] text-slate-600 bg-teal-50/60 border border-teal-200/60 rounded-lg p-2 leading-relaxed flex items-start gap-2">
                          <Info className="w-3.5 h-3.5 text-teal-600 shrink-0 mt-0.5" />
                          <div className="space-y-0.5">
                            <span className="text-[9.5px] font-bold uppercase tracking-wider text-teal-800 block">About this Index</span>
                            <p className="leading-snug text-slate-700">{cat.description}</p>
                          </div>
                        </div>

                        {/* Included Sub-Indices */}
                        <div className="space-y-1.5">
                          <div className="flex items-center justify-between text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                            <span>Included Datasets ({catIndicators.length})</span>
                            {useSubWeights ? (
                              <span className="text-teal-600 font-semibold font-mono">Custom Sliders Active</span>
                            ) : (
                              <span className="text-slate-400 font-mono">Linked to Macro Dial</span>
                            )}
                          </div>
                          {catIndicators.map(ind => {
                            const subVal = subWeights[ind.id] ?? 50;
                            return (
                              <div key={ind.id} className="p-1.5 bg-slate-50 rounded-md text-xs space-y-1 border border-slate-100">
                                <div className="flex items-center justify-between">
                                  <span className="font-medium text-slate-800 text-[11px] leading-tight truncate" title={ind.description}>
                                    {ind.name}
                                  </span>
                                  <span className="text-[10px] font-mono tabular-nums font-medium px-1.5 py-0.5 rounded bg-white border border-slate-200 text-slate-700">
                                    {useSubWeights ? `${subVal}%` : 'Linked'}
                                  </span>
                                </div>
                                <div className="flex items-center justify-between text-[9.5px] text-slate-500">
                                  <span className="truncate max-w-[180px]">{ind.source}</span>
                                  <span className="px-1 rounded bg-slate-200/70 text-slate-600 font-mono tabular-nums shrink-0">
                                    {ind.tierLabel}
                                  </span>
                                </div>
                                {useSubWeights && (
                                  <input
                                    type="range"
                                    min="0"
                                    max="100"
                                    step="1"
                                    value={subVal}
                                    onChange={(e) => onSubWeightChange(ind.id, parseInt(e.target.value, 10))}
                                    className="w-full h-1 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-teal-600"
                                  />
                                )}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </>
        ) : (
          /* Live Leaderboard Tab */
          <div className="space-y-2.5">
            {/* Filter Header: Region Dropdown & Quick Search */}
            <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200/90 space-y-2">
              <div className="relative">
                <select
                  value={activeRegion || 'global'}
                  onChange={(e) => handleRegionChange(e.target.value as RegionId)}
                  className="w-full pl-8 pr-7 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-semibold text-slate-700 shadow-2xs hover:border-slate-300 focus:outline-none focus:ring-1 focus:ring-teal-500 appearance-none cursor-pointer"
                >
                  {REGIONS.map(reg => (
                    <option key={reg.id} value={reg.id}>
                      {reg.icon} {reg.name}
                    </option>
                  ))}
                </select>
                <Globe className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>

              {/* Quick Search */}
              <div className="relative">
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="text"
                  value={leaderboardSearch}
                  onChange={(e) => {
                    setLeaderboardSearch(e.target.value);
                    setLeaderboardPage(1);
                  }}
                  placeholder="Filter nation by name or code..."
                  className="w-full pl-8 pr-7 py-1.5 bg-white border border-slate-200 rounded-lg text-xs placeholder:text-slate-400 text-slate-700 shadow-2xs focus:outline-none focus:ring-1 focus:ring-teal-500"
                />
                {leaderboardSearch && (
                  <button 
                    onClick={() => {
                      setLeaderboardSearch('');
                      setLeaderboardPage(1);
                    }}
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs px-1 cursor-pointer"
                    title="Clear filter"
                  >
                    ✕
                  </button>
                )}
              </div>
            </div>

            {/* Jump to selected country banner if on another page */}
            {selectedCountryPage && selectedCountryPage !== currentLeaderboardPage && (
              <button
                onClick={() => setLeaderboardPage(selectedCountryPage)}
                className="w-full py-1.5 px-2.5 bg-teal-50 hover:bg-teal-100/80 border border-teal-200 rounded-lg text-[11px] text-teal-800 flex items-center justify-between transition-colors cursor-pointer group"
              >
                <span className="flex items-center gap-1">
                  <span>Selected nation is on</span>
                  <strong className="underline decoration-teal-400">Page {selectedCountryPage}</strong>
                </span>
                <span className="font-semibold text-teal-700 flex items-center gap-0.5 group-hover:translate-x-0.5 transition-transform">
                  View <ChevronRight className="w-3 h-3" />
                </span>
              </button>
            )}

            {/* Pagination Controls & Count */}
            {filteredLeaderboardList.length > 0 && (
              <div className="flex items-center justify-between px-1 text-[11px] text-slate-500">
                <span>
                  Showing <strong className="text-slate-700 font-medium">{startIndex + 1}</strong>–<strong className="text-slate-700 font-medium">{Math.min(startIndex + LEADERBOARD_PAGE_SIZE, filteredLeaderboardList.length)}</strong> of <strong className="text-slate-700 font-medium">{filteredLeaderboardList.length}</strong>
                </span>
                
                {totalLeaderboardPages > 1 && (
                  <div className="flex items-center gap-1 font-mono text-[11px]">
                    <button
                      onClick={() => setLeaderboardPage(prev => Math.max(1, prev - 1))}
                      disabled={currentLeaderboardPage <= 1}
                      className="p-1 rounded hover:bg-slate-100 disabled:opacity-30 disabled:pointer-events-none transition-colors cursor-pointer"
                      title="Previous page"
                    >
                      <ChevronLeft className="w-3.5 h-3.5" />
                    </button>
                    <span className="px-1 text-slate-600 font-medium">
                      {currentLeaderboardPage} / {totalLeaderboardPages}
                    </span>
                    <button
                      onClick={() => setLeaderboardPage(prev => Math.min(totalLeaderboardPages, prev + 1))}
                      disabled={currentLeaderboardPage >= totalLeaderboardPages}
                      className="p-1 rounded hover:bg-slate-100 disabled:opacity-30 disabled:pointer-events-none transition-colors cursor-pointer"
                      title="Next page"
                    >
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Country List */}
            {filteredLeaderboardList.length === 0 ? (
              <div className="text-center py-8 px-4 bg-slate-50 rounded-xl border border-dashed border-slate-200">
                <p className="text-xs text-slate-500">No nations found matching &quot;{leaderboardSearch}&quot;</p>
                <button
                  onClick={() => {
                    setLeaderboardSearch('');
                    setLeaderboardPage(1);
                  }}
                  className="mt-2 text-xs font-semibold text-teal-600 hover:text-teal-700 cursor-pointer"
                >
                  Clear search
                </button>
              </div>
            ) : (
              <div className="space-y-1.5">
                {pageCountries.map((c, idx) => {
                  const displayRank = activeRegion && activeRegion !== 'global' 
                    ? startIndex + idx + 1 
                    : (c.rank ?? startIndex + idx + 1);
                  const isGold = displayRank === 1;
                  const isSilver = displayRank === 2;
                  const isBronze = displayRank === 3;

                  return (
                    <button
                      key={c.iso3}
                      onClick={() => onSelectCountry(c.iso3)}
                      className={`w-full text-start p-2.5 rounded-xl border text-xs flex items-center justify-between active:scale-[0.985] transition-all cursor-pointer ${
                        selectedCountryIso === c.iso3
                          ? 'bg-teal-50 border-teal-400 shadow-xs ring-1 ring-teal-400/30'
                          : 'bg-white hover:bg-slate-50 border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <span className={`w-7 text-center font-mono tabular-nums font-bold text-xs shrink-0 ${
                          isGold ? 'text-amber-500' : isSilver ? 'text-slate-400' : isBronze ? 'text-amber-700' : 'text-slate-400'
                        }`}>
                          #{displayRank}
                        </span>
                        <span className="text-base shrink-0">{c.flag}</span>
                        <div className="min-w-0 pr-1">
                          <span className="font-semibold text-slate-800 block text-xs truncate">
                            {c.name}
                          </span>
                          <span className="text-[10px] text-slate-400 font-mono truncate block">
                            {c.region}
                          </span>
                        </div>
                      </div>

                      <div className="text-end shrink-0 pl-2">
                        <div className="text-xs font-mono tabular-nums font-bold text-teal-800">
                          {c.compositeScore != null ? c.compositeScore : 'N/A'}
                        </div>
                        <span className="text-[10px] text-slate-400 font-mono tabular-nums">
                          {c.percentile != null 
                            ? (activeRegion && activeRegion !== 'global' ? `Global #${c.rank}` : `Top ${100 - c.percentile}%`)
                            : 'Unranked'}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            )}

            {/* Bottom Pagination Bar */}
            {totalLeaderboardPages > 1 && (
              <div className="pt-2 pb-1 flex items-center justify-between border-t border-slate-100 text-xs">
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => setLeaderboardPage(1)}
                    disabled={currentLeaderboardPage <= 1}
                    className="p-1.5 rounded-lg border border-slate-200 hover:bg-slate-100 disabled:opacity-30 disabled:pointer-events-none transition-colors cursor-pointer text-slate-600 font-mono text-[11px] flex items-center gap-0.5"
                    title="First page"
                  >
                    <ChevronsLeft className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => setLeaderboardPage(prev => Math.max(1, prev - 1))}
                    disabled={currentLeaderboardPage <= 1}
                    className="px-2 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-100 disabled:opacity-30 disabled:pointer-events-none transition-colors cursor-pointer text-slate-600 font-mono text-[11px] flex items-center gap-1"
                  >
                    <ChevronLeft className="w-3.5 h-3.5" /> Prev
                  </button>
                </div>

                <span className="font-mono text-[11px] text-slate-600 font-medium">
                  Page {currentLeaderboardPage} of {totalLeaderboardPages}
                </span>

                <div className="flex items-center gap-1">
                  <button
                    onClick={() => setLeaderboardPage(prev => Math.min(totalLeaderboardPages, prev + 1))}
                    disabled={currentLeaderboardPage >= totalLeaderboardPages}
                    className="px-2 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-100 disabled:opacity-30 disabled:pointer-events-none transition-colors cursor-pointer text-slate-600 font-mono text-[11px] flex items-center gap-1"
                  >
                    Next <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => setLeaderboardPage(totalLeaderboardPages)}
                    disabled={currentLeaderboardPage >= totalLeaderboardPages}
                    className="p-1.5 rounded-lg border border-slate-200 hover:bg-slate-100 disabled:opacity-30 disabled:pointer-events-none transition-colors cursor-pointer text-slate-600 font-mono text-[11px] flex items-center gap-0.5"
                    title="Last page"
                  >
                    <ChevronsRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Footer Info */}
      <div className="px-3 py-1.5 bg-slate-50/80 border-t border-slate-200 text-[10.5px] text-slate-400 flex items-center justify-between font-mono">
        <span>Where Lives Stand</span>
        <span>{countryList.filter(c => c.rank != null).length} ranked countries</span>
      </div>
    </aside>
  );
};
