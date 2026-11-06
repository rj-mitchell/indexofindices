# Design

Where Lives Stand is a volume in the Where They Stand family's Bound Volume style (the charity's
`brand/README.md`): ivory paper, ink, gilt rules, Source Serif 4, and heather (`#5E3F63`), its cloth, as the one
accent. It is a printed record, not a dashboard: square corners, rules rather than shadows and cards, small
capitals for labels, and no emoji or decorative icons.

## The family kit

The binding every Where They Stand site shares comes from the charity's family kit, copied into `public/family/`
(kit 1.0.0) and committed. Don't edit those files: change the kit and sync again.

```bash
node ../wheretheystand-charity/family/kit/sync.mjs --site lives --out public/family           # update
node ../wheretheystand-charity/family/kit/sync.mjs --site lives --out public/family --check   # verify
```

- `head.html` goes into every page's `<head>` at build time (`vite.config.ts`): the favicons, `theme-color`, the
  kit's stylesheets and Source Serif 4, and the link-preview card.
- `endorsement.html` (the spine and "A Where They Stand project") sits under the site's name in the masthead, and
  `shelf.html` (every project, the charity line, Donate) at the foot of every page. The app gets both as strings from
  the virtual module `virtual:family`.
- `<body class="wts-headings">` sets headings in Source Serif 4. `scripts/postbuild.mjs` copies
  `family/favicon.ico` to `/favicon.ico`.

## Type

- **Source Serif 4** (from the kit) for the name, headings and running text on the text pages.
- **Source Sans 3** (`src/fonts/`) for controls, tables and figures, with tabular numerals.
- Nothing smaller than 13px (`tailwind.config.js` sets the scale).

Both are served from this site; nothing is loaded from Google or any other host.

## Colour

Tokens are CSS variables in `src/index.css`, with a dark-mode value for each, following the system setting.

| Token | Light | Dark | Use |
|---|---|---|---|
| paper | `#F5F0E3` | `#181B1D` | Page |
| sheet | `#FBF8F0` | `#1F2326` | Panels, the sea on the map |
| ink | `#1C2427` | `#EDE6D3` | Text |
| ink-muted | `#42484D` | `#BEB7A5` | Secondary text |
| rule | `#CDBF9C` | `#585242` | Rules and borders |
| gilt | `#B08D3C` | `#B08D3C` | Decorative rules only |
| gilt-text | `#7A5C1C` | `#D9BC72` | Small-capital labels |
| heather | `#5E3F63` | `#C7AACC` | Links, selected controls, focus |
| compare-a / compare-b | heather / gilt-text | the same, lifted | The two countries in a comparison |

## The map and rankings view

The map comes first ([DECISIONS.md](DECISIONS.md), 6). Above it there are only the one-line beta banner, the
compact masthead (the name and endorsement, the navigation and the search, on one row at desktop) and the region
tabs and zoom buttons, in one row that scrolls sideways on a phone. The page's heading is visually hidden. The
count of countries, the data date and "Copy a link to this view" sit under the map; the weights are beside it at
desktop and under it on phones.

## The map

- **Projection:** Mercator, by the owner's choice ([DECISIONS.md](DECISIONS.md), 5), so that small, densely
  populated countries such as Europe's are big enough to see and select. Antarctica, Greenland and the far-northern
  Arctic islands (Svalbard, and every Russian and Canadian island lying wholly north of about 66°N, such as Novaya
  Zemlya, the New Siberian Islands and Canada's Arctic archipelago) are left out of the geometry, `src/data/world-50m.json`, because Mercator makes them enormous; that file is the one
  the site used before the redesign, and `test/map.test.ts` checks they stay out. The world view is 960 by 520,
  scale 150, rotated 10.6° so the land is centred; the regional views are in `src/data/regions.ts`.
- **Scale:** one hue, heather, by lightness (`src/lib/colour.ts`). On paper, low scores are pale and high scores
  dark; in dark mode the anchor flips. Order reads from lightness alone, so it holds for any colour vision. The
  seven sample steps were checked for monotone lightness, step separation and contrast with the surface in both modes.
  The world scale runs from 20 or less to 90 or more; in a region it can be stretched over that region's range.
- **Legend:** drawn by sampling the same function, with ticks where those scores fall, so it cannot disagree with
  the map.
- **Not ranked:** a hatched pattern, distinct from every step of the scale.
- **Keyboard:** every country in the data is a button with its name, score and rank; Enter opens the dossier;
  focus draws an ink outline and shows the hover card. A skip link goes to the table, which lists every ranked
  country and sorts by any column.
