// "Your weights": the presets, the eight dimension dials and, when switched on, a dial for each indicator.
import React, { useState } from 'react';
import type { IndicatorMeta, MacroCategory, MacroCategoryConfig } from '../types';
import { PRESETS, matchingPreset } from '../data/presets';
import { Icon } from './Icon';

interface Props {
  categories: MacroCategoryConfig[];
  indicators: IndicatorMeta[];
  macro: Record<MacroCategory, number>;
  sub: Record<string, number>;
  fine: boolean;
  onMacro: (cat: MacroCategory, value: number) => void;
  onPreset: (weights: Record<MacroCategory, number>) => void;
  onSub: (id: string, value: number) => void;
  onFine: (on: boolean) => void;
  onReset: () => void;
}

const Dial: React.FC<{
  id: string;
  label: React.ReactNode;
  value: number;
  onChange: (v: number) => void;
  small?: boolean;
}> = ({ id, label, value, onChange, small }) => (
  <div className={small ? 'py-1' : 'py-1.5'}>
    <div className="flex items-baseline justify-between gap-3">
      <label htmlFor={id} className={small ? 'text-sm' : 'text-[0.9375rem] font-semibold'}>
        {label}
      </label>
      <output htmlFor={id} className="num text-sm text-muted min-w-[3ch] text-right">
        {value}%
      </output>
    </div>
    <input
      id={id}
      type="range"
      min={0}
      max={100}
      step={5}
      value={value}
      aria-valuetext={`${value} per cent`}
      onChange={e => onChange(Number(e.target.value))}
      style={{ ['--fill' as string]: `${value}%` }}
    />
  </div>
);

export const WeightsPanel: React.FC<Props> = ({ categories, indicators, macro, sub, fine, onMacro, onPreset, onSub, onFine, onReset }) => {
  const [open, setOpen] = useState<MacroCategory | null>(null);
  const preset = matchingPreset(macro);

  return (
    <section aria-labelledby="weights-title" className="font-sans">
      <h2 id="weights-title" className="text-xl">
        Your weights
      </h2>
      <p className="text-sm text-muted mt-1">
        How much each dimension counts towards a country's overall score. Start from a preset, or set the dials.
      </p>

      <fieldset className="mt-4">
        <legend className="caps text-gilt-text">Start from</legend>
        <div className="mt-2 grid grid-cols-2 gap-1.5">
          {PRESETS.map(p => {
            const on = preset?.id === p.id;
            return (
              <button
                key={p.id}
                type="button"
                aria-pressed={on}
                onClick={() => onPreset({ ...p.weights })}
                className={`min-h-[40px] px-2.5 py-1.5 text-left text-sm border cursor-pointer ${on ? 'bg-heather text-on-heather border-heather font-semibold' : 'bg-sheet border-rule hover:border-heather'}`}
              >
                {p.label}
              </button>
            );
          })}
        </div>
        <p className="text-sm text-muted mt-2 min-h-[2.9em]" aria-live="polite">
          {preset ? <><span className="text-ink font-semibold">{preset.label}.</span> {preset.summary}</> : <><span className="text-ink font-semibold">Your own weights.</span> No preset matches the dials.</>}
        </p>
      </fieldset>

      <div className="mt-3 border-t border-rule">
        {categories.map(cat => {
          const inCat = indicators.filter(i => i.category === cat.id);
          const expanded = open === cat.id;
          return (
            <div key={cat.id} className="border-b border-faint py-1">
              <Dial id={`w-${cat.id}`} label={cat.name} value={macro[cat.id]} onChange={v => onMacro(cat.id, v)} />
              <button
                type="button"
                aria-expanded={expanded}
                aria-controls={`w-${cat.id}-more`}
                onClick={() => setOpen(expanded ? null : cat.id)}
                className="inline-flex items-center gap-1 text-sm text-heather hover:text-ink cursor-pointer min-h-[32px]"
              >
                <Icon name="chevron" className={`w-3.5 h-3.5 transition-transform ${expanded ? 'rotate-90' : ''}`} />
                {expanded ? 'Hide' : 'Show'} its {inCat.length} {inCat.length === 1 ? 'indicator' : 'indicators'}
              </button>
              <div id={`w-${cat.id}-more`} hidden={!expanded} className="pb-2">
                <p className="text-sm text-muted mt-1">{cat.description}</p>
                <ul className="mt-1.5 space-y-0.5">
                  {inCat.map(ind =>
                    fine ? (
                      <li key={ind.id} className="pl-3 border-l-2 border-faint">
                        <Dial id={`s-${ind.id}`} small label={ind.name} value={sub[ind.id] ?? 50} onChange={v => onSub(ind.id, v)} />
                      </li>
                    ) : (
                      <li key={ind.id} className="text-sm pl-3 border-l-2 border-faint">
                        {ind.name} <span className="text-muted">({ind.source})</span>
                      </li>
                    ),
                  )}
                </ul>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-4 space-y-3">
        <label className="flex items-start gap-2.5 text-sm cursor-pointer">
          <input type="checkbox" checked={fine} onChange={e => onFine(e.target.checked)} className="mt-1 w-4 h-4 accent-[rgb(var(--heather))]" />
          <span>
            <span className="font-semibold">Weight each of the {indicators.length} indicators separately.</span>{' '}
            <span className="text-muted">Their dials appear under each dimension.</span>
          </span>
        </label>
        <button type="button" onClick={onReset} className="btn">
          <Icon name="reset" />
          Reset to balanced
        </button>
      </div>
    </section>
  );
};
