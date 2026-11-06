// The phase banner, the masthead (the site's spine, its name, the family endorsement and the
// tagline), the search and the main navigation, closed by a double rule.
import React from 'react';
import type { ComputedCountry } from '../types';
import type { View } from '../lib/url';
import { Link } from '../lib/nav';
import { endorsement } from 'virtual:family';
import { CountrySearch } from './CountrySearch';
import { TAGLINE } from '../config';

interface Props {
  view: View;
  compareOpen: boolean;
  mapHref: string;
  compareHref: string;
  countries: ComputedCountry[];
  onSelectCountry: (iso3: string) => void;
}

export const Masthead: React.FC<Props> = ({ view, compareOpen, mapHref, compareHref, countries, onSelectCountry }) => {
  const items: { href: string; label: string; current: boolean }[] = [
    { href: mapHref, label: 'Map and rankings', current: view === 'map' && !compareOpen },
    { href: compareHref, label: 'Compare', current: view === 'map' && compareOpen },
    { href: '/behind-the-rankings', label: 'Behind the rankings', current: view === 'behind-the-rankings' },
    { href: '/method', label: 'How it works', current: view === 'method' },
    { href: '/about', label: 'About', current: view === 'about' },
  ];
  return (
    <header className="no-print">
      <div className="border-b border-rule bg-sheet">
        <p className="max-w-page mx-auto px-4 md:px-8 py-1.5 text-sm flex flex-wrap items-baseline gap-x-2">
          <strong className="caps text-paper bg-ink px-1.5 py-px font-sans tracking-wider">Beta</strong>
          <span>This site is new and still being tested; figures and methods may change.</span>
          <Link href="/corrections">Tell us about a problem</Link>
        </p>
      </div>
      <div className="max-w-page mx-auto px-4 md:px-8 pt-5 md:pt-7">
        <div className="flex flex-wrap items-end justify-between gap-x-8 gap-y-4">
          <div className="flex flex-col gap-2">
            <Link href={mapHref} className="font-serif font-semibold text-[2rem] md:text-[2.5rem] text-ink no-underline leading-none tracking-tight hover:text-heather">
              Where Lives Stand
            </Link>
            {/* The family kit's endorsement (public/family/endorsement.html): the spine and "A Where They Stand project" */}
            <div className="wts-slot-endorsement" dangerouslySetInnerHTML={{ __html: endorsement }} />
          </div>
          <p className="hidden lg:block font-serif italic text-muted text-lg pb-1">{TAGLINE}</p>
        </div>
        <div className="mt-5 flex flex-col-reverse md:flex-row md:items-end md:justify-between gap-3 double-rule pb-0">
          <nav aria-label="Main" className="-mb-px">
            <ul className="flex flex-wrap gap-x-5 md:gap-x-6 whitespace-nowrap text-[0.9375rem] font-sans">
              {items.map(item => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    aria-current={item.current ? 'page' : undefined}
                    className={`inline-block py-2.5 no-underline border-b-[3px] ${item.current ? 'border-heather text-ink font-semibold' : 'border-transparent text-muted hover:text-ink'}`}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <CountrySearch countries={countries} onSelect={onSelectCountry} className="w-full md:w-72 md:mb-2.5" />
        </div>
      </div>
    </header>
  );
};
