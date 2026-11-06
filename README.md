# Where Lives Stand

**Quality of life, country by country: 186 countries ranked on 34 published indicators, weighted the way you choose.**

[wherelivesstand.com](https://wherelivesstand.com) · Status: Live (beta)

A world map and a table that rank countries on quality of life from the figures of the World Bank, WHO, UNDP,
Transparency International, Reporters Without Borders, V-Dem, the Institute for Economics and Peace, Yale, Notre Dame,
Ookla and others. You set how much each of eight dimensions counts, and the map, the rankings and every country's
dossier follow. Every value links to its publisher and carries its year. Formerly the Index of Indices.

A Where They Stand project. Where They Stand is applying to register as a charity in England and Wales
([wheretheystand.uk](https://wheretheystand.uk)).

> Where Lives Stand is independent. It is not affiliated with or endorsed by any of the publishers whose figures it
> uses.

## Status

6 November 2026. Live in beta at wherelivesstand.com. Redesigned in the family's Bound Volume style, with
addresses for every view, a real 404, security headers and the standard pages. Next: check each publisher's terms
for the files in `data/sources/`, and test with screen-reader users.

## In the family

Built separately from the other projects, as a static React app. It runs on a Cloudflare Worker (named
`indexofindices`, the project's old name), not on the shared server. It carries the family kit (`public/family/`,
see [docs/DESIGN.md](docs/DESIGN.md)). Each country's dossier links to Where Countries Stand (a sources-only search
for that country, until that site has country pages); sister sites can link to a country here at
`https://wherelivesstand.com/country/<ISO3>` ([docs/URLS.md](docs/URLS.md)).

## Documents

| Document | What it covers |
|---|---|
| [SOURCES.md](SOURCES.md) | Every indicator: publisher, years, coverage, direction and goalposts; what was left out and why. Generated, and shown on the site's How it works page |
| [docs/DECISIONS.md](docs/DECISIONS.md) | The owner's product decisions, and those proposed for the owner to confirm |
| [docs/URLS.md](docs/URLS.md) | The address of every view, for sharing and for links from sister sites |
| [docs/DESIGN.md](docs/DESIGN.md) | The look, the family kit, the colour scale and the map |

## The site

- **Weights:** eight dimension dials, six presets (Balanced, Physical, Institutional, Remote worker, Young family,
  Rights and liberties), and a dial for each of the 34 indicators if you want them.
- **Map and table:** a world map (Mercator) coloured on a single-hue scale, regions, and a sortable table of every ranked
  country.
- **Country dossier:** score and rank under your weights, the indicators that lift and hold back that score, the
  eight dimensions, and every indicator with its value, year, world rank and publisher.
- **Compare** any two countries by dimension and by indicator.
- **Behind the rankings:** the traps in combining indices, results that look wrong and why, and the strengths and
  blind spots of every index. Its quoted figures are checked by `npm test`.

## How it works

Every value comes from its publisher's own release. See **[SOURCES.md](SOURCES.md)** for each indicator's publisher, data year, coverage and scoring goalposts.

- **186 countries** are ranked. A country needs at least 20 of the 34 indicators. Observations older than 2015 are dropped and **nothing is imputed**: a missing value stays missing and shows as "n/a". V-Dem's religious-freedom score is the one value averaged over three years (2023–2025), because it rests on a single question rated by a handful of experts per country.
- **Scoring**: each indicator is rescaled to 0–100 between the 2.5th and 97.5th percentile of country values (log scale for skewed data such as GDP or homicide), and flipped where lower is better. A dimension is the average of the indicators a country has; if it has fewer than half of them, the dimension shows n/a and the overall score uses the remaining dimensions, so one available value can't stand in for a whole dimension.
- **Weather & Climate** is the one derived indicator. It is computed from WorldClim 2.1 monthly climate normals at every city of 15,000+ people (GeoNames), weighted by population, so it reflects the climate where people actually live. The comfort thresholds are documented in `scripts/derive_climate.py`.

### Rebuilding the data

```bash
pip install pandas python-calamine pyreadr pycountry rasterio geopandas pyarrow
./scripts/fetch_sources.sh        # re-download every source into data/sources/ (needs pdftotext)
python3 scripts/build_dataset.py  # regenerate src/data/*.json and SOURCES.md
```

`data/sources/` holds a snapshot of each source as downloaded, so `build_dataset.py` runs without network access.

| Path | Contents |
|---|---|
| `data/sources/` | Raw source snapshots (spreadsheets, CSVs, API responses) |
| `scripts/fetch_sources.sh` | Downloads every source from its publisher |
| `scripts/build_dataset.py` | Indicator catalogue, normalisation and ranking; writes `src/data/*.json` and `SOURCES.md` |
| `scripts/derive_climate.py`, `scripts/derive_broadband.py` | Turn WorldClim/GeoNames and Ookla tile data into country values |
| `src/data/indexBiases.ts` | Text for the Behind the rankings page; `test/critique.test.ts` checks its figures |
| `src/lib/scoring.ts` | The scoring in the browser: overall scores, ranks, and each dossier's strengths and weaknesses |

After a data rebuild, change `DATA_UPDATED` in `src/config.ts` and run `npm test`: any figure the Behind the rankings page quotes that has moved fails, naming the text to correct.

## Try it

Node.js 22.18 or later (the tests run TypeScript directly).

```bash
npm install
npm run dev       # http://localhost:3000
npm test          # the scoring, the addresses, and the figures quoted on Behind the rankings
npm run build     # the static site in dist/, with a page for every address, 404.html and sitemap.xml
npm run preview
```

`npx wrangler dev` serves `dist/` as Cloudflare will, with the 404 page, redirects and response headers
(`public/_headers`).

## Checks

GitHub Actions (`.github/workflows/ci.yml`) runs on every push and pull request: `npm ci`, the type-check, the
tests, `npm run check:family` and the build, then checks that the build wrote every page. It deploys nothing.

`npm run check:family` checks the family kit's copy in `public/family/` on its own: that `VERSION` is there, for
this site, from the kit version the build expects (`KIT` in `scripts/check-family.mjs`), and that no copy has been
edited since it was synced. Whether the copy matches the kit itself can only be checked with the charity's
repository, which is private, so CI can't.

### Before merging

From a checkout with the charity's repository beside this one:

```bash
node ../wheretheystand-charity/family/kit/sync.mjs --site lives --out public/family --check
npm run typecheck && npm test && npm run build
npx wrangler dev   # then look at the changed pages, light and dark, at desktop and phone widths
```

If the kit check fails, sync the kit (`docs/DESIGN.md`), commit the copies, and update `KIT` in
`scripts/check-family.mjs` if the kit's version changed. Merging to `main` deploys the site.

## Deploying

Cloudflare Workers Builds is connected to this repository: every push to `main` runs `npm run build` and
`npx wrangler deploy`, which publishes `dist/` to the `indexofindices` Worker at wherelivesstand.com. Pull requests
are not built. The Worker's name must match `wrangler.jsonc`.

The repository was called `indexofindices` until 6 November 2026 (GitHub forwards the old address).

## Known limitations

- The publishers' terms for the files in `data/sources/` are still being checked.
- The scores need JavaScript; without it, a page shows only its title and a link to the sources.
- Small territories are hard to pick out on the map; they are all in the table and the search.
- Data years differ between indicators (2015 to 2026), and some figures are modelled estimates.

## Licence

Code: GNU Affero General Public License 3.0 ([LICENSE](LICENSE)). Anyone who runs a changed copy as a public website
must offer its source code to that site's visitors.

Data: each indicator belongs to its publisher and is used under the publisher's own terms; [SOURCES.md](SOURCES.md)
names the publisher of each. `data/sources/` keeps a copy of each publisher's file as downloaded, so that the dataset
can be rebuilt exactly; those copies stay under their publishers' terms. A file whose terms don't allow it to be
shared will be removed from the repository and downloaded at build time instead. The map is Natural Earth (public
domain), via the world-atlas package (ISC licence). The typefaces are Source Serif 4 and Source Sans 3 (SIL Open
Font License).

The name Where Lives Stand and the mark are not covered by the licence.
