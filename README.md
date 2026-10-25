# Where Lives Stand 🌍

*Formerly the Global Quality of Life Index of Indices.*

An interactive world map that ranks countries by quality of life using **your** weights. It combines 33 indicators from the publishers' own releases: the World Bank, WHO, UNDP, Transparency International, RSF, V-Dem, IEP, Yale, Notre Dame, Ookla and others.

Built with **React 18**, **TypeScript**, **Tailwind CSS** and **react-simple-maps**. All scoring runs in the browser, so the map recolours as you move a slider.

---

## Features

- **Eight dials**: Safety & Peace, Governance & Rule of Law, Civil Liberties & Inclusion, Economy & Labour, Health & Education, Infrastructure & Tech, Weather & Climate, Environment & Resilience. Turn on **Fine-Tune Sub-Indices** to weight each of the 33 indicators separately.
- **Presets** for common priorities (Balanced, Physical, Institutional, Digital Nomad, Young Family, Ethics & Rights).
- **Country dossier**: hover for rank and standout strengths and weaknesses, or click for every indicator's raw value, data year, global rank and a link to the source.
- **Head-to-head comparison** of any two countries, indicator by indicator.
- **Regional view** with colours rescaled within a region.
- **Index Biases & Critique**: a plain-English guide to what each index measures, its blind spots, and case studies of odd-looking results.

## Data

Every value comes from its publisher's own release. See **[SOURCES.md](SOURCES.md)** for each indicator's publisher, data year, coverage and scoring goalposts.

- **184 countries** are ranked. A country needs at least 20 of the 33 indicators. Observations older than 2015 are dropped and **nothing is imputed**: a missing value stays missing and shows as "N/A".
- **Scoring**: each indicator is rescaled to 0–100 between the 2.5th and 97.5th percentile of country values (log scale for skewed data such as GDP or homicide), and flipped where lower is better. A dimension is the average of the indicators a country has; if it has fewer than half of them, the dimension shows N/A and the overall score uses the remaining dimensions, so one available value can't stand in for a whole dimension.
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
| `src/data/indexBiases.ts` | Text for the critique page |

## Running locally

Requires Node.js 18+.

```bash
npm install
npm run dev       # http://localhost:3000
npm run build     # static site in dist/
npm run preview
```

## Deploying

`npm run build` produces a fully static site in `dist/`. It uses relative paths, so it works at a domain root or under a sub-path.

- **Cloudflare Pages / Netlify / Vercel**: import the GitHub repo, set the build command to `npm run build` and the output directory to `dist`.
- **Cloudflare Workers** (current setup): `wrangler.jsonc` serves `dist/`; set the build command to `npm run build` and the deploy command to `npx wrangler deploy`.
