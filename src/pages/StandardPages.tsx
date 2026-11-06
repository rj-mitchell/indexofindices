// The standard pages every Where They Stand site carries: about, how it works, privacy, accessibility,
// corrections, and not found.
import React from 'react';
import { Page } from './Page';
import { Link } from '../lib/nav';
import { renderMarkdown } from '../lib/markdown';
import sourcesMd from '../../SOURCES.md?raw';
import {
  FEEDBACK_EMAIL,
  feedbackMailto,
  INDEPENDENCE_LINE,
  DATA_UPDATED,
  ACCESSIBILITY_CHECKED,
  formatDate,
  REPO_URL,
  SOURCES_URL,
  SITE_URL,
} from '../config';
const HUB_URL = 'https://wheretheystand.uk/';
const SISTERS = [
  { name: 'Where MPs Stand', url: 'https://wherempsstand.com' },
  { name: 'Where Councils Stand', url: 'https://wherecouncilsstand.com' },
  { name: 'Where Landlords Stand', url: 'https://wherelandlordsstand.com' },
  { name: 'Where Countries Stand', url: 'https://wherecountriesstand.com' },
];

const Email = () => <a href={feedbackMailto()}>{FEEDBACK_EMAIL}</a>;

export const About: React.FC<{ rankedCount: number; indicatorCount: number }> = ({ rankedCount, indicatorCount }) => (
  <Page title="About Where Lives Stand" kicker="About">
    <p className="text-lg">
      Where Lives Stand ranks {rankedCount} countries on quality of life, using {indicatorCount} indicators that
      others publish: the World Bank, the World Health Organization, the UN Development Programme, Transparency
      International, Reporters Without Borders, V-Dem, the Institute for Economics and Peace, Yale, Notre Dame, Ookla
      and others. You choose how much each of eight dimensions counts, and the map and the rankings follow.
    </p>
    <p>
      It collects no figures of its own. It rescales each publisher's figures to a common 0 to 100 scale, averages
      them within each dimension, and weights the dimensions as you set them. <Link href="/method">How it works</Link>{' '}
      gives the method and every source; <Link href="/behind-the-rankings">Behind the rankings</Link> sets out what the
      indices miss and where they lean.
    </p>
    <h2>Who runs it</h2>
    <p>
      Where Lives Stand is a project of <a href={HUB_URL}>Where They Stand</a>, which is applying to register as a
      charity in England and Wales. Until 6 November 2026 it was called the Index of Indices.
    </p>
    <p>{INDEPENDENCE_LINE}</p>
    <h2>In the family</h2>
    <p>
      Where Lives Stand is a Where They Stand project. Its sister sites are{' '}
      {SISTERS.map((p, i) => (
        <React.Fragment key={p.url}>
          <a href={p.url}>{p.name}</a>
          {i < SISTERS.length - 2 ? ', ' : i === SISTERS.length - 2 ? ' and ' : ''}
        </React.Fragment>
      ))}
      ; the charity's own site is <a href={HUB_URL}>wheretheystand.uk</a>.
    </p>
    <h2>Linking to a country</h2>
    <p>
      Every country has its own address: <code>{SITE_URL}/country/</code> followed by its three-letter ISO 3166 code,
      such as <a href="/country/GBR">{SITE_URL}/country/GBR</a> for the United Kingdom. Weights, regions and
      comparisons can be shared too: the address bar always holds the current view.
    </p>
    <h2>Contact</h2>
    <p>
      For corrections, problems and questions, write to <Email />. See <Link href="/corrections">Corrections</Link>{' '}
      for what to include.
    </p>
    <h2>Licence</h2>
    <p>
      The code is open source under the GNU Affero General Public License 3.0, at <a href={REPO_URL}>GitHub</a>. The
      figures are not covered by that licence: each belongs to its publisher and is used under the publisher's terms.
    </p>
  </Page>
);

export const Method: React.FC = () => (
  <Page title="How it works" kicker="Method and sources">
    <p className="text-lg">
      How the figures are chosen, scored and combined, and where each comes from. The rest of this page is generated
      with the dataset itself, from the same build that produces the figures (<a href={SOURCES_URL}>SOURCES.md</a>),
      and was last rebuilt on {formatDate(DATA_UPDATED)}.
    </p>
    <h2>The overall score</h2>
    <p>
      Each country's overall score is the weighted average of its eight dimension scores, using the weights you set
      (all 50% to begin with). A dimension a country lacks is left out, and the others share its weight. If you weight
      the indicators separately, each dimension becomes the weighted average of its indicators.
    </p>
    <p>
      The strengths and weaknesses in a country's dossier are the indicators with the most pull on its score: how far
      its world rank on each sits above or below the middle, times the share of the overall score that indicator
      carries under your weights. An indicator you weight at zero is never among them.
    </p>
    <h2>The colour scale</h2>
    <p>
      The map uses one hue, heather, from pale to dark (light to bright in dark mode), so the order can be read from
      lightness alone, whatever a reader's colour vision. On the world scale, 20 or less is the palest and 90 or more
      the darkest. In a region you can stretch the scale over that region's own range. The legend is drawn from the
      same scale as the map. The map uses the Mercator projection, so that smaller countries are large enough to see and
      select; it makes countries far from the equator look bigger than they are, and Antarctica, Greenland and the
      far-northern Arctic islands are left off it for that reason.
    </p>
    <div className="method-sources">{renderMarkdown(sourcesMd, { skipTitle: true })}</div>
  </Page>
);

export const Privacy: React.FC = () => (
  <Page title="Privacy" kicker="Privacy notice">
    <p className="text-lg">Where Lives Stand does not use cookies, analytics or advertising, and does not ask for any personal details.</p>
    <h2>What happens when you visit</h2>
    <p>
      The site is served by Cloudflare, Inc., which handles every request. Like any web server, Cloudflare receives your
      IP address and the details your browser sends (such as the page asked for and the browser's name), to deliver
      the page and to protect the site from attack. Cloudflare's privacy policy describes how it treats that
      information. We do not add analytics, and Where They Stand does not receive or keep a record of visits.
    </p>
    <p>
      The typefaces, the map and the figures all come from this site; nothing is loaded from Google or any other
      third party. Your weights and the country you are looking at are held in the page's address, not stored.
    </p>
    <h2>If you write to us</h2>
    <p>
      If you email <Email />, we keep your message and address only as long as we need them to deal with what you
      raised, and do not pass them on.
    </p>
    <h2>Who is responsible</h2>
    <p>
      Where They Stand, which is applying to register as a charity in England and Wales, is responsible for this site.
      You can ask what we hold about you, or complain to the Information Commissioner's Office (ico.org.uk).
    </p>
  </Page>
);

export const Accessibility: React.FC = () => (
  <Page title="Accessibility statement" kicker="Accessibility">
    <p className="text-lg">
      We want everyone to be able to use Where Lives Stand. We aim to meet the Web Content Accessibility Guidelines
      (WCAG) 2.2 at level AA.
    </p>
    <h2>What you can do</h2>
    <ul>
      <li>Use the whole site with a keyboard. On the map, each country is a stop with its name and score; Enter opens its dossier. A link before the map skips straight to the table.</li>
      <li>Read every figure on the map in the table of rankings below it, which you can sort by any column.</li>
      <li>Close a dossier or the comparison with Escape; focus returns to where you were.</li>
      <li>Read the map whatever your colour vision: the scale runs from pale to dark in one hue.</li>
      <li>Zoom the page to 200% and more, and use dark mode, which the site follows from your system.</li>
      <li>Copy any figure, name or source from the page.</li>
    </ul>
    <h2>How we tested it</h2>
    <p>
      On {formatDate(ACCESSIBILITY_CHECKED)} we checked the site with a keyboard alone, at phone and desktop widths, in
      light and dark mode, with reduced motion, and against the colour-contrast and colour-vision checks for the map
      scale. We have not yet tested it with screen-reader users or with an independent audit.
    </p>
    <h2>Known limits</h2>
    <ul>
      <li>The map has about two hundred keyboard stops, one per country. Use the skip link, the search box or the table to go straight to a country.</li>
      <li>The small territories and islands on the map are hard to hover or tap; they are all in the table and the search.</li>
      <li>The site needs JavaScript to work out the scores. Without it you see only the page titles.</li>
    </ul>
    <h2>Problems and feedback</h2>
    <p>
      If something does not work for you, email <Email /> and say what you were trying to do. We aim to reply within
      five working days. If you are not happy with our reply, you can contact the Equality Advisory and Support Service
      (EASS).
    </p>
  </Page>
);

export const Corrections: React.FC = () => (
  <Page title="Corrections and problems" kicker="Corrections">
    <p className="text-lg">
      If a figure looks wrong, a source is out of date, or something on the site does not work, tell us at <Email />.
    </p>
    <h2>What to include</h2>
    <ul>
      <li>the address of the page (it holds your weights and the country, so we see what you saw);</li>
      <li>what looks wrong, and what you expected;</li>
      <li>for a figure, where you found the right one, with a link if you can.</li>
    </ul>
    <h2>What we do</h2>
    <p>
      We check every report against the publisher's own release. Where we got something wrong, we correct it and
      record the correction here. Where the publisher's figure is what is wrong, we tell the publisher and leave the
      figure as they published it until they correct it, so the site stays a faithful record of their releases.
    </p>
    <p>
      Every figure is rebuilt from the publishers' files when the data is refreshed. The data was last refreshed on{' '}
      {formatDate(DATA_UPDATED)}. The full history of changes is in the <a href={`${REPO_URL}/commits/main`}>project's history on GitHub</a>.
    </p>
    <h2>Corrections made</h2>
    <p>None recorded yet.</p>
  </Page>
);

export const NotFound: React.FC<{ mapHref: string }> = ({ mapHref }) => (
  <Page title="Page not found" kicker="Not found">
    <p className="text-lg">There is no page at this address. It may have been mistyped, or it may have moved.</p>
    <p>
      Try the <Link href={mapHref}>map and rankings</Link>, or find a country with the search above. A country's page is
      at <code>/country/</code> followed by its three-letter code, such as <a href="/country/NOR">/country/NOR</a>.
    </p>
  </Page>
);
