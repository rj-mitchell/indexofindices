import React, { useState } from 'react';
import { useQualityOfLifeIndex } from './hooks/useQualityOfLifeIndex';
import { Header } from './components/Header';
import { ControlSidebar } from './components/ControlSidebar';
import { ChoroplethMap } from './components/ChoroplethMap';
import { CountryDossierSheet } from './components/CountryDossierSheet';
import { CountryComparisonModal } from './components/CountryComparisonModal';
import { SlidersHorizontal, Map as MapIcon } from 'lucide-react';
import { BiasesCritiquePage } from './components/BiasesCritiquePage';
import { BetaBanner } from './components/BetaBanner';

export function App() {
  const {
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
  } = useQualityOfLifeIndex();

  const [mobileTab, setMobileTab] = useState<'map' | 'controls'>('map');
  const [currentView, setCurrentView] = useState<'map' | 'biases'>('map');

  const selectedCountry = selectedCountryIso ? computedCountries[selectedCountryIso] : null;

  const handleOpenCompareWith = (iso3: string) => {
    setCompareCountryIso(iso3);
    setIsCompareOpen(true);
  };

  return (
    <div className="flex flex-col h-screen w-screen overflow-hidden bg-[#f8fafc] text-slate-800 font-sans">
      <BetaBanner />

      {/* Top Application Header */}
      <Header
        countryList={countryList}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onSelectCountry={setSelectedCountryIso}
        onResetWeights={resetWeights}
        onOpenCompare={() => setIsCompareOpen(true)}
        selectedCountry={selectedCountry}
        activeView={currentView}
        onToggleView={setCurrentView}
      />

      {/* Main Workspace Body */}
      {currentView === 'biases' ? (
        <BiasesCritiquePage
          categories={categories}
          onBackToMap={() => setCurrentView('map')}
        />
      ) : (
        <>
          <div className="flex-1 flex flex-col lg:flex-row overflow-hidden relative">
            {/* Desktop / Responsive Control Sidebar */}
            <div className={`h-full ${mobileTab === 'controls' ? 'flex w-full' : 'hidden lg:flex'}`}>
              <ControlSidebar
                categories={categories}
                indicators={indicators}
                macroWeights={macroWeights}
                subWeights={subWeights}
                useSubWeights={useSubWeights}
                countryList={countryList}
                onMacroWeightChange={setMacroWeight}
                onBatchMacroWeightChange={setAllMacroWeights}
                onSubWeightChange={setSubWeight}
                onToggleUseSubWeights={setUseSubWeights}
                onSelectCountry={setSelectedCountryIso}
                selectedCountryIso={selectedCountryIso}
                activeRegion={activeRegion}
                onSelectRegion={setActiveRegion}
                countriesInRegion={countriesInRegion}
                onOpenBiases={() => setCurrentView('biases')}
              />
            </div>

            {/* Center / Fullscreen World Choropleth Map */}
            <main className={`flex-1 h-full relative ${mobileTab === 'map' ? 'flex' : 'hidden lg:flex'}`}>
              <ChoroplethMap
                computedCountries={computedCountries}
                selectedCountryIso={selectedCountryIso}
                onSelectCountry={setSelectedCountryIso}
                getScoreColor={getScoreColor}
                activeRegion={activeRegion}
                onSelectRegion={setActiveRegion}
                relativiseColors={relativiseColors}
                onToggleRelativiseColors={setRelativiseColors}
                regionalScale={regionalScale}
                regionalRanks={regionalRanks}
              />
            </main>
          </div>

          {/* Mobile Tab Toggle Bar with 44px Minimum Touch Targets */}
          <div className="lg:hidden flex items-center justify-around bg-white border-t border-slate-200 p-2 z-20">
            <button
              onClick={() => setMobileTab('map')}
              className={`min-h-[44px] flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold active:scale-95 transition-all cursor-pointer ${
                mobileTab === 'map' ? 'bg-teal-50 text-teal-700 border border-teal-200 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <MapIcon className="w-4 h-4" />
              <span>Interactive Map</span>
            </button>
            <button
              onClick={() => setMobileTab('controls')}
              className={`min-h-[44px] flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold active:scale-95 transition-all cursor-pointer ${
                mobileTab === 'controls' ? 'bg-teal-50 text-teal-700 border border-teal-200 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <SlidersHorizontal className="w-4 h-4" />
              <span>Weight Controls</span>
            </button>
          </div>
        </>
      )}

      {/* Slide-out Country Dossier Sheet */}
      <CountryDossierSheet
        country={selectedCountry}
        categories={categories}
        indicators={indicators}
        onClose={() => setSelectedCountryIso(null)}
        onOpenCompareWith={handleOpenCompareWith}
        getScoreColor={getScoreColor}
        onOpenBiases={() => setCurrentView('biases')}
      />

      {/* Head-to-Head Country Comparison Modal */}
      <CountryComparisonModal
        countryList={countryList}
        computedCountries={computedCountries}
        initialCountryA={compareCountryIso || selectedCountryIso || 'ESP'}
        initialCountryB={countryList.find(c => c.iso3 !== (compareCountryIso || selectedCountryIso || 'ESP'))?.iso3 || 'NOR'}
        categories={categories}
        indicators={indicators}
        isOpen={isCompareOpen}
        onClose={() => setIsCompareOpen(false)}
        getScoreColor={getScoreColor}
      />
    </div>
  );
}

export default App;
