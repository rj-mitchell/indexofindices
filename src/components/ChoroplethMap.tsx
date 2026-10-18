import React, { useState, useMemo } from 'react';
import { ComposableMap, Geographies, Geography, ZoomableGroup } from 'react-simple-maps';
import { Plus, Minus, RotateCcw, Sparkles } from 'lucide-react';
import type { ComputedCountry } from '../types';
import { CountryHoverCard } from './CountryHoverCard';
import { 
  RegionId, 
  REGIONS, 
  isCountryInRegion, 
  RegionalScaleInfo 
} from '../data/regions';

const GEO_URL = '/world-50m.json';

interface ChoroplethMapProps {
  computedCountries: Record<string, ComputedCountry>;
  selectedCountryIso: string | null;
  onSelectCountry: (iso3: string) => void;
  getScoreColor: (score: number | null | undefined) => string;
  activeRegion: RegionId;
  onSelectRegion: (region: RegionId) => void;
  relativiseColors: boolean;
  onToggleRelativiseColors: (rel: boolean) => void;
  regionalScale: RegionalScaleInfo;
  regionalRanks: Record<string, { rank: number | null; total: number }>;
}

const SPECIAL_GEOMETRIES: Record<string, string> = {
  'Siachen Glacier': 'IND',
  'Somaliland': 'SOM',
  'Kosovo': 'XKX',
  'N. Cyprus': 'CYN',
  'Indian Ocean Ter.': 'IOT'
};

export const ChoroplethMap: React.FC<ChoroplethMapProps> = ({
  computedCountries,
  selectedCountryIso,
  onSelectCountry,
  getScoreColor,
  activeRegion,
  onSelectRegion,
  relativiseColors,
  onToggleRelativiseColors,
  regionalScale,
  regionalRanks
}) => {
  const [position, setPosition] = useState<{ coordinates: [number, number]; zoom: number }>({
    coordinates: [0, 0],
    zoom: 1
  });

  const [hoveredCountry, setHoveredCountry] = useState<ComputedCountry | null>(null);
  const [mousePos, setMousePos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  const activeRegionConfig = useMemo(() => {
    return REGIONS.find(r => r.id === activeRegion) || REGIONS[0];
  }, [activeRegion]);

  // Map from numeric id or iso3 to country object
  const numericMap = useMemo(() => {
    const map: Record<string, ComputedCountry> = {};
    for (const country of Object.values(computedCountries)) {
      if (country.numeric) {
        map[country.numeric] = country;
        const parsed = parseInt(country.numeric, 10);
        if (!isNaN(parsed)) {
          map[String(parsed)] = country;
        }
      }
      map[country.iso3] = country;
    }
    return map;
  }, [computedCountries]);

  const handleSelectRegion = (regionId: RegionId) => {
    onSelectRegion(regionId);
    const target = REGIONS.find(r => r.id === regionId);
    if (target) {
      setPosition({
        coordinates: target.center,
        zoom: target.zoom
      });
    }
    if (regionId !== 'global') {
      onToggleRelativiseColors(true);
    }
  };

  const handleZoomIn = () => {
    setPosition(pos => ({ ...pos, zoom: Math.min(pos.zoom * 1.5, 8) }));
  };

  const handleZoomOut = () => {
    setPosition(pos => ({ ...pos, zoom: Math.max(pos.zoom / 1.5, 0.8) }));
  };

  const handleReset = () => {
    if (activeRegion !== 'global') {
      handleSelectRegion('global');
    } else {
      setPosition({ coordinates: [0, 0], zoom: 1 });
    }
  };

  return (
    <div className="relative flex-1 w-full h-full bg-[#f8fafc] overflow-hidden select-none">
      {/* Regional Viewport Selector Bar with Concentric Nested Radii (Outer 16px, Padding 6px, Inner 10px) */}
      <div className="absolute top-4 start-4 z-20 flex flex-wrap items-center gap-1.5 bg-white/95 backdrop-blur-md border border-slate-200 p-1.5 rounded-2xl shadow-md max-w-[calc(100%-80px)]">
        <div className="flex items-center gap-1 overflow-x-auto py-0.5 px-0.5 no-scrollbar">
          {REGIONS.map(reg => {
            const isActive = activeRegion === reg.id;
            return (
              <button
                key={reg.id}
                onClick={() => handleSelectRegion(reg.id)}
                className={`px-2.5 py-1 rounded-[10px] text-xs font-medium active:scale-95 transition-all whitespace-nowrap flex items-center gap-1.5 cursor-pointer ${
                  isActive
                    ? 'bg-teal-600 text-white shadow-2xs font-semibold'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <span>{reg.icon}</span>
                <span>{reg.name}</span>
              </button>
            );
          })}
        </div>

        {/* Relativise Colours Toggle Button */}
        {activeRegion !== 'global' && (
          <div className="flex items-center gap-1.5 ps-2 border-s border-slate-200 text-xs">
            <button
              onClick={() => onToggleRelativiseColors(!relativiseColors)}
              className={`px-2.5 py-1 rounded-[10px] text-[11px] font-semibold active:scale-95 transition-all flex items-center gap-1.5 cursor-pointer ${
                relativiseColors
                  ? 'bg-teal-50 text-teal-700 border border-teal-200'
                  : 'bg-slate-100 text-slate-500 hover:text-slate-700'
              }`}
              title="Toggle between regional relative gradient and global absolute scale"
            >
              <Sparkles className="w-3 h-3 text-teal-600" />
              <span>Relative Colours: {relativiseColors ? 'ON' : 'OFF'}</span>
            </button>
          </div>
        )}
      </div>

      {/* Zoom / Navigation Controls with Concentric Radii (Outer 16px, Padding 6px, Inner 10px) */}
      <div className="absolute top-4 end-4 z-20 flex flex-col gap-1.5 bg-white/95 backdrop-blur-md border border-slate-200 p-1.5 rounded-2xl shadow-md">
        <button
          onClick={handleZoomIn}
          className="min-w-[36px] min-h-[36px] flex items-center justify-center hover:bg-slate-100 rounded-[10px] text-slate-700 active:scale-90 transition-all cursor-pointer"
          title="Zoom In"
        >
          <Plus className="w-4 h-4" />
        </button>
        <button
          onClick={handleZoomOut}
          className="min-w-[36px] min-h-[36px] flex items-center justify-center hover:bg-slate-100 rounded-[10px] text-slate-700 active:scale-90 transition-all cursor-pointer"
          title="Zoom Out"
        >
          <Minus className="w-4 h-4" />
        </button>
        <button
          onClick={handleReset}
          className="min-w-[36px] min-h-[36px] flex items-center justify-center hover:bg-slate-100 rounded-[10px] text-slate-700 active:scale-90 transition-all cursor-pointer border-t border-slate-100"
          title={activeRegion !== 'global' ? 'Reset to Global View' : 'Reset View'}
        >
          <RotateCcw className="w-4 h-4" />
        </button>
      </div>

      {/* SVG Map Container */}
      <div 
        className="w-full h-full cursor-grab active:cursor-grabbing"
        onMouseMove={(e) => setMousePos({ x: e.clientX, y: e.clientY })}
        onMouseLeave={() => setHoveredCountry(null)}
      >
        <ComposableMap
          projection="geoMercator"
          projectionConfig={{
            scale: 125,
            center: [-10.6, 22],
            rotate: [-10.6, 0, 0]
          }}
          className="w-full h-full"
        >
          <ZoomableGroup
            zoom={position.zoom}
            center={position.coordinates}
            onMoveEnd={(pos) => setPosition(pos)}
          >
            <Geographies geography={GEO_URL}>
              {({ geographies }) =>
                geographies
                  .filter((geo) => {
                    const geoId = String(geo.id || '');
                    const geoName = geo.properties?.name || '';
                    if (
                      geoId === '010' ||
                      geoId === '10' ||
                      geoName === 'Antarctica' ||
                      geoId === '304' ||
                      geoName === 'Greenland' ||
                      geoId === '260' ||
                      geoId === '239' ||
                      geoId === '334' ||
                      geoName === 'Fr. S. Antarctic Lands' ||
                      geoName === 'S. Geo. and the Is.' ||
                      geoName === 'Heard I. and McDonald Is.'
                    ) {
                      return false;
                    }
                    return true;
                  })
                  .map((geo) => {
                    const geoId = String(geo.id || '');
                    const geoName = geo.properties?.name || '';
                    let country = numericMap[geoId];
                    if (!country && geo.id != null) {
                      const parsed = parseInt(String(geo.id), 10);
                      if (!isNaN(parsed)) {
                        country = numericMap[String(parsed)];
                      }
                    }
                    if (!country && geoName && SPECIAL_GEOMETRIES[geoName]) {
                      country = computedCountries[SPECIAL_GEOMETRIES[geoName]];
                    }

                  const isSelected = country && (
                    country.iso3 === selectedCountryIso ||
                    (country.isDependency && country.parentIso === selectedCountryIso)
                  );
                  const inActiveRegion = country ? isCountryInRegion(country, activeRegion) : false;

                  let fillColor = '#e2e8f0';
                  let strokeColor = isSelected ? '#0f172a' : '#ffffff';
                  let strokeWidth = isSelected ? 1.2 : 0.35;
                  let opacity = 1.0;

                  if (country) {
                    if (country.isDependency && country.parentIso) {
                      // Non-sovereign dependency: color with parent sovereign country's score
                      const parentCountry = computedCountries[country.parentIso];
                      if (parentCountry && parentCountry.compositeScore != null) {
                        if (activeRegion === 'global' || !relativiseColors) {
                          fillColor = getScoreColor(parentCountry.compositeScore);
                        } else if (inActiveRegion || isCountryInRegion(parentCountry, activeRegion)) {
                          fillColor = regionalScale.getColor(parentCountry.compositeScore);
                        } else {
                          fillColor = '#f1f5f9';
                          strokeColor = '#e2e8f0';
                          strokeWidth = 0.25;
                          opacity = 0.85;
                        }
                      } else {
                        fillColor = '#e2e8f0';
                        strokeColor = isSelected ? '#0f172a' : '#cbd5e1';
                        strokeWidth = isSelected ? 1.2 : 0.35;
                      }
                    } else if (country.hasData === false || country.compositeScore == null) {
                      // Neutral clean styling for no-data / uninhabited territories
                      fillColor = '#e2e8f0';
                      strokeColor = isSelected ? '#0f172a' : '#cbd5e1';
                      strokeWidth = isSelected ? 1.2 : 0.35;
                    } else if (activeRegion === 'global' || !relativiseColors) {
                      fillColor = getScoreColor(country.compositeScore);
                    } else if (inActiveRegion) {
                      fillColor = regionalScale.getColor(country.compositeScore);
                    } else {
                      // Background non-active region countries
                      fillColor = '#f1f5f9';
                      strokeColor = '#e2e8f0';
                      strokeWidth = 0.25;
                      opacity = 0.85;
                    }
                  }

                  return (
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      fill={fillColor}
                      stroke={strokeColor}
                      strokeWidth={strokeWidth}
                      strokeLinejoin="round"
                      strokeLinecap="round"
                      style={{
                        default: { 
                            outline: 'none', 
                            opacity,
                            vectorEffect: 'non-scaling-stroke'
                          },
                        hover: { 
                          fill: fillColor, 
                          stroke: '#0f172a', 
                          strokeWidth: 0.9, 
                          outline: 'none',
                          opacity: 1.0,
                          vectorEffect: 'non-scaling-stroke',
                          cursor: country ? 'pointer' : 'default'
                        },
                        pressed: { outline: 'none' }
                      }}
                        onMouseEnter={() => {
                          if (country) {
                            setHoveredCountry(country);
                          }
                        }}
                        onMouseLeave={() => {
                          setHoveredCountry(null);
                        }}
                        onClick={() => {
                          if (country) {
                            onSelectCountry(country.isDependency && country.parentIso ? country.parentIso : country.iso3);
                          }
                        }}
                      />
                    );
                  })
              }
            </Geographies>
          </ZoomableGroup>
        </ComposableMap>
      </div>

      {/* Floating Hover Card */}
      {hoveredCountry && (
        <CountryHoverCard 
          country={hoveredCountry} 
          position={mousePos} 
          regionalRank={regionalRanks[hoveredCountry.iso3]}
          activeRegionName={activeRegionConfig.name}
        />
      )}

      {/* Editorial Publication Continuous Colour Legend with Concentric Radii (Outer 16px, Padding 14px) */}
      <div className="absolute bottom-4 start-4 z-20 bg-white/95 backdrop-blur-md border border-slate-200 p-3.5 rounded-2xl shadow-lg text-xs font-sans w-64 sm:w-72">
        <div className="font-semibold text-slate-800 text-[11px] mb-1.5 flex items-center justify-between gap-2">
          <div className="flex items-center gap-1.5">
            <span className="font-bold text-slate-900">{activeRegionConfig.name} Scale</span>
            {activeRegion !== 'global' && relativiseColors && (
              <span className="px-1.5 py-0.5 rounded text-[9.5px] bg-emerald-50 text-emerald-800 font-bold border border-emerald-200">
                Relativised
              </span>
            )}
          </div>
          <span className="text-[10px] text-slate-400 font-mono tabular-nums">
            {activeRegion === 'global' || !relativiseColors 
              ? 'Red (Low) → Green (Best)' 
              : `${regionalScale.minScore.toFixed(1)} – ${regionalScale.maxScore.toFixed(1)}`}
          </span>
        </div>

        {/* Continuous Gradient Bar with Hover Needle */}
        <div className="relative">
          <div 
            className="w-full h-2.5 rounded-full shadow-inner border border-slate-200/80"
            style={{
              background: 'linear-gradient(to right, #dc2626 0%, #ea580c 20%, #f59e0b 38%, #eab308 50%, #84cc16 65%, #22c55e 80%, #15803d 100%)'
            }}
          />

          {/* Hovered Country Needle Marker */}
          {hoveredCountry && (() => {
            const scoreVal = hoveredCountry.compositeScore ?? (hoveredCountry.parentIso ? computedCountries[hoveredCountry.parentIso]?.compositeScore : null);
            if (scoreVal == null) return null;
            
            let pct = 0;
            if (activeRegion === 'global' || !relativiseColors) {
              pct = Math.max(0, Math.min(100, ((scoreVal - 20) / (90 - 20)) * 100));
            } else {
              const delta = regionalScale.maxScore - regionalScale.minScore;
              pct = delta > 0 ? Math.max(0, Math.min(100, ((scoreVal - regionalScale.minScore) / delta) * 100)) : 50;
            }

            return (
              <div 
                className="absolute -top-1 bottom-0 w-1.5 bg-slate-900 rounded-full shadow-md -translate-x-1/2 pointer-events-none transition-all duration-150 ring-2 ring-white"
                style={{ left: `${pct.toFixed(1)}%` }}
              />
            );
          })()}
        </div>

        {/* Gradient Scale Axis Labels with Tabular Numerics */}
        <div className="flex items-center justify-between text-[9px] font-mono tabular-nums text-slate-500 mt-1 px-0.5">
          <span className="text-rose-600 font-medium">{activeRegion === 'global' || !relativiseColors ? '<30 (Lowest)' : regionalScale.minScore.toFixed(1)}</span>
          <span className="text-slate-400">{activeRegion === 'global' || !relativiseColors ? '60 (Average)' : ((regionalScale.minScore + regionalScale.maxScore) / 2).toFixed(1)}</span>
          <span className="text-emerald-700 font-bold">{activeRegion === 'global' || !relativiseColors ? '85+ (Best)' : regionalScale.maxScore.toFixed(1)}</span>
        </div>
      </div>
    </div>
  );
};
