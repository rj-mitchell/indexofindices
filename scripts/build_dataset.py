"""Build src/data/{countries,indicators,categories}.json from the source snapshots in data/sources/.

Every indicator value comes straight from its publisher's own release (see SOURCES.md).
Nothing is imputed: a country that a source does not cover simply has no value for it.

Scoring: each indicator is rescaled to 0-100 between "goalposts" set at the 2.5th and 97.5th
percentile of all countries' values (on a log scale where the data are heavily skewed), and
flipped where lower raw values are better. Values beyond the goalposts are clipped to 0 or 100.
A dimension score is the average of the indicator scores a country has in it; if it has fewer than half
of that dimension's indicators, the dimension is N/A and the overall score uses the remaining dimensions.

Run from the repo root:  python3 scripts/build_dataset.py
"""
import json, math, os, sys
import pandas as pd

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SRC = os.path.join(ROOT, 'data', 'sources')
OUT = os.path.join(ROOT, 'src', 'data')
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from country_names import to_iso3

MIN_INDICATORS = 20  # countries with fewer indicator values are shown as "insufficient data"
MIN_YEAR = 2015      # older observations are treated as missing
MIN_DIM_SHARE = 0.5  # a dimension needs at least this share of its indicators, otherwise it is N/A


def src(name):
    return os.path.join(SRC, name)


# ---------------------------------------------------------------------------
# Loaders: each returns {iso3: (value, year)}
# ---------------------------------------------------------------------------
WB = json.load(open(src('worldbank.json')))
WHO = json.load(open(src('who.json')))


def wb(code):
    return {k: (v['v'], int(v['y'])) for k, v in WB[code]['values'].items() if len(k) == 3}


def who(code):
    return {k: (v['v'], int(v['y'])) for k, v in WHO[code].items()}


def cpi():
    df = pd.read_excel(src('cpi2025.xlsx'), 'CPI2025', header=3, engine='calamine')
    return {r['ISO3']: (float(r['CPI 2025 score']), 2025) for _, r in df.iterrows() if isinstance(r['ISO3'], str)}


def rsf():
    df = pd.read_csv(src('rsf2026.csv'), sep=';', encoding='latin1')
    return {r['ISO']: (float(str(r['Score 2026']).replace(',', '.')), 2026) for _, r in df.iterrows()}


VDEM = pd.read_csv(src('vdem_v16_2025.csv'))


def vdem(col):
    return {r['country_text_id']: (float(r[col]), 2025) for _, r in VDEM.iterrows() if pd.notna(r[col])}


HDR = pd.read_csv(src('hdr25.csv'), encoding='latin1')


def education_index():
    # UNDP HDI education index: mean of (mean years of schooling / 15) and (expected years / 18), each capped at 1
    out = {}
    for _, r in HDR.iterrows():
        if len(str(r['iso3'])) != 3 or str(r['iso3']).startswith('ZZ'):
            continue
        if pd.notna(r['mys_2023']) and pd.notna(r['eys_2023']):
            out[r['iso3']] = ((min(r['mys_2023'] / 15, 1) + min(r['eys_2023'] / 18, 1)) / 2, 2023)
    return out


def gpi():
    d = json.load(open(src('gpi2026.json')))
    return {k: (v['v'], 2026) for k, v in d.items()}


def ocindex():
    df = pd.read_excel(src('ocindex.xlsx'), '2025_dataset', engine='calamine')
    out = {}
    for _, r in df.iterrows():
        iso = to_iso3(r['Country'])
        if iso is None:
            raise SystemExit(f"OC Index: unmatched country {r['Country']!r}")
        out[iso] = (float(r['Criminality avg.']), 2025)
    return out


def wri():
    df = pd.read_csv(src('worldriskindex_2026.csv'))
    return {r['ISO3.Code']: (float(r['W']), int(r['Year'])) for _, r in df.iterrows()}


def eci():
    df = pd.read_csv(src('eci.csv'))
    df = df[df.eci_hs92.notna()].sort_values('year').groupby('country_iso3_code').last()
    return {k: (float(r.eci_hs92), int(r.year)) for k, r in df.iterrows() if r.year >= 2022}


def ilo_hours():
    df = pd.read_csv(src('ilo_hours.csv'))
    df = df[df.TIME_PERIOD <= 2025]
    out = {}
    survey = df[~df.SOURCE.str.contains('Modelled', na=False)].sort_values('TIME_PERIOD').groupby('REF_AREA').last()
    modelled = df[df.SOURCE.str.contains('Modelled', na=False)].sort_values('TIME_PERIOD').groupby('REF_AREA').last()
    for k, r in modelled.iterrows():
        out[k] = (float(r.OBS_VALUE), int(r.TIME_PERIOD))
    for k, r in survey.iterrows():
        if r.TIME_PERIOD >= 2018:  # prefer a recent national survey over the ILO model
            out[k] = (float(r.OBS_VALUE), int(r.TIME_PERIOD))
    return out


def wps():
    df = pd.read_excel(src('wps2025.xlsx'), 'TABLE 1', header=None, engine='calamine')
    d = df.iloc[6:, [2, 4]]
    d.columns = ['code', 'wps']
    d = d[d.code.astype(str).str.fullmatch(r'[A-Z]{3}') & pd.to_numeric(d.wps, errors='coerce').notna()]
    return {r.code: (float(r.wps), 2025) for r in d.itertuples()}


def epi():
    df = pd.read_excel(src('epi2026.xlsx'), 'data', engine='calamine')
    return {r['iso']: (float(r['EPI.new']), 2026) for _, r in df.iterrows() if pd.notna(r['EPI.new'])}


def equaldex():
    df = pd.read_csv(src('owid_lgbt-legal-equality-index.csv'))
    df = df[df.code.astype(str).str.len() == 3].sort_values('year').groupby('code').last()
    return {k: (float(r.ei_legal), int(r.year)) for k, r in df.iterrows()}


def ndgain():
    df = pd.read_csv(src('ndgain_gain.csv'))
    return {r['ISO3']: (float(r['2024']), 2024) for _, r in df.iterrows() if pd.notna(r['2024'])}


CLIMATE = json.load(open(src('climate.json')))


def climate():
    return {k: (v['score'], None) for k, v in CLIMATE.items() if v['popCovered'] >= 15000}


def ookla():
    d = json.load(open(src('ookla_fixed.json')))
    return {k: (v['v'], 2026) for k, v in d.items() if v['tests'] >= 2000}


# ---------------------------------------------------------------------------
# Indicator catalogue
# transform: 'log' rescales on a log10 scale; 'band' uses fixed goalposts (lo, hi)
# ---------------------------------------------------------------------------
I = []


def ind(id, name, short, cat, source, url, unit, desc, tier, tier_label, inverted, loader, fmt, transform=None, band=None):
    I.append(dict(id=id, name=name, shortName=short, category=cat, source=source, sourceUrl=url, unit=unit,
                  description=desc, tier=tier, tierLabel=tier_label, inverted=inverted,
                  _loader=loader, _fmt=fmt, _transform=transform, _band=band))


EMP, EXP, NORM, DER = 'Technocratic / Empirical', 'Expert / Institutional', 'Normative Consensus', 'Derived Empirical'

# Safety & Peace
ind('unodc_homicide', 'Intentional Homicide Rate', 'Homicide Rate', 'safety',
    'UNODC via World Bank WDI', 'https://data.worldbank.org/indicator/VC.IHR.PSRC.P5', 'per 100k',
    'Intentional homicides per 100,000 people (UNODC International Homicide Statistics). The most comparable cross-country measure of lethal violence.',
    1, EMP, True, lambda: wb('VC.IHR.PSRC.P5'), lambda v: f'{v:.1f} / 100k', 'log')
ind('who_traffic_safety', 'Road Traffic Death Rate', 'Road Deaths', 'safety',
    'WHO Global Health Observatory', 'https://www.who.int/data/gho/data/indicators/indicator-details/GHO/estimated-road-traffic-death-rate-(per-100-000-population)',
    'deaths per 100k', 'WHO-modelled road traffic deaths per 100,000 people (Global Status Report on Road Safety).',
    1, EMP, True, lambda: who('RS_198'), lambda v: f'{v:.1f} / 100k', 'log')
ind('global_peace_index', 'Global Peace Index 2026', 'Peace Index', 'safety',
    'Institute for Economics & Peace (IEP)', 'https://www.visionofhumanity.org/maps/', 'Score 1-5 (lower = more peaceful)',
    '23 indicators of societal safety, ongoing domestic and international conflict, and militarisation. Includes terrorism impact.',
    2, NORM, True, gpi, lambda v: f'{v:.3f} / 5 (GPI)')
ind('organized_crime_index', 'Organised Crime: Criminality Score', 'Organised Crime', 'safety',
    'Global Initiative Against Transnational Organized Crime', 'https://ocindex.net/', 'Score 1-10 (lower = less crime)',
    'Expert-assessed scale and influence of 15 criminal markets and 5 types of criminal actor (Global Organized Crime Index 2025).',
    3, EXP, True, ocindex, lambda v: f'{v:.2f} / 10')
ind('world_risk_index', 'WorldRiskIndex 2026 (Disaster Risk)', 'Disaster Risk', 'safety',
    'Bündnis Entwicklung Hilft & IFHV Ruhr University Bochum', 'https://weltrisikobericht.de/en/', 'Risk score 0-100 (lower = safer)',
    'Exposure to earthquakes, tsunamis, floods, cyclones, drought and sea-level rise, combined with societal vulnerability.',
    1, EMP, True, wri, lambda v: f'{v:.2f} WRI', 'log')

# Governance
ind('ti_cpi', 'Corruption Perceptions Index 2025', 'Anti-Corruption', 'governance',
    'Transparency International', 'https://www.transparency.org/en/cpi/2025', 'Score 0-100 (higher = cleaner)',
    'Perceived public-sector corruption, aggregated from 13 expert and business surveys.',
    3, 'Expert Perception', False, cpi, lambda v: f'{v:.0f} / 100')
ind('wgi_rule_of_law', 'Rule of Law (WGI)', 'Rule of Law', 'governance',
    'World Bank Worldwide Governance Indicators', 'https://www.worldbank.org/en/publication/worldwide-governance-indicators', 'Estimate -2.5 to +2.5',
    'Confidence in and abidance by the rules of society: contract enforcement, property rights, police, courts and crime.',
    3, EXP, False, lambda: wb('GOV_WGI_RL.EST'), lambda v: f'{v:+.2f} WGI')
ind('wgi_gov_effectiveness', 'Government Effectiveness (WGI)', 'Gov Effectiveness', 'governance',
    'World Bank Worldwide Governance Indicators', 'https://www.worldbank.org/en/publication/worldwide-governance-indicators', 'Estimate -2.5 to +2.5',
    'Quality of public services and the civil service, and the credibility of policy formulation and implementation.',
    3, EXP, False, lambda: wb('GOV_WGI_GE.EST'), lambda v: f'{v:+.2f} WGI')
ind('wgi_regulatory_quality', 'Regulatory Quality (WGI)', 'Regulatory Quality', 'governance',
    'World Bank Worldwide Governance Indicators', 'https://www.worldbank.org/en/publication/worldwide-governance-indicators', 'Estimate -2.5 to +2.5',
    'Ability of government to formulate and implement sound policies and regulations that permit and promote private-sector development.',
    3, EXP, False, lambda: wb('GOV_WGI_RQ.EST'), lambda v: f'{v:+.2f} WGI')

# Economy
ind('gdp_per_capita_ppp', 'GDP per Capita (PPP)', 'GDP per Capita', 'economy',
    'World Bank WDI / ICP', 'https://data.worldbank.org/indicator/NY.GDP.PCAP.PP.CD', 'current international $',
    'Gross domestic product per person at purchasing-power parity, i.e. adjusted for local price levels.',
    1, EMP, False, lambda: wb('NY.GDP.PCAP.PP.CD'), lambda v: f'${v:,.0f}', 'log')
ind('gini_inequality', 'Income Inequality (Gini)', 'Income Equality', 'economy',
    'World Bank Poverty & Inequality Platform', 'https://data.worldbank.org/indicator/SI.POV.GINI', 'Gini 0-100 (lower = more equal)',
    'Gini index of household income or consumption from national surveys. Latest available survey year varies by country.',
    1, EMP, True, lambda: wb('SI.POV.GINI'), lambda v: f'{v:.1f} Gini')
ind('ilo_unemployment', 'Unemployment Rate', 'Unemployment', 'economy',
    'ILO modelled estimates via World Bank WDI', 'https://data.worldbank.org/indicator/SL.UEM.TOTL.ZS', '% of labour force',
    'Share of the labour force without work but available for and seeking employment (ILO harmonised definition).',
    1, EMP, True, lambda: wb('SL.UEM.TOTL.ZS'), lambda v: f'{v:.1f}%')
ind('ilo_working_hours', 'Average Weekly Working Hours', 'Working Hours', 'economy',
    'International Labour Organization (ILOSTAT)', 'https://ilostat.ilo.org/topics/working-time/', 'hours per week',
    'Mean weekly hours actually worked per employed person. Scored 100 at 35 hours or fewer, falling to 0 at 50 hours.',
    1, EMP, True, ilo_hours, lambda v: f'{v:.1f} h/week', 'band', (35, 50))
ind('atlas_economic_complexity', 'Economic Complexity Index', 'Economic Complexity', 'economy',
    'Harvard Growth Lab (Atlas of Economic Complexity)', 'https://atlas.hks.harvard.edu/rankings', 'ECI (HS92)',
    'Diversity and sophistication of the goods a country exports — a proxy for productive know-how and future growth.',
    1, EMP, False, eci, lambda v: f'{v:+.2f} ECI')

# Health & education
ind('who_hale', 'Healthy Life Expectancy (HALE)', 'Healthy Lifespan', 'health',
    'WHO Global Health Observatory', 'https://www.who.int/data/gho/data/indicators/indicator-details/GHO/gho-ghe-hale-healthy-life-expectancy-at-birth',
    'years', 'Average number of years a newborn can expect to live in full health.',
    1, EMP, False, lambda: who('WHOSIS_000002'), lambda v: f'{v:.1f} yrs')
ind('who_uhc_coverage', 'Universal Health Coverage Index', 'Healthcare Coverage', 'health',
    'WHO / World Bank (SDG 3.8.1)', 'https://www.who.int/data/gho/data/indicators/indicator-details/GHO/uhc-index-of-service-coverage',
    'Index 0-100', 'Coverage of essential health services: reproductive and child health, infectious and non-communicable disease, service capacity.',
    2, NORM, False, lambda: who('UHC_INDEX_REPORTED'), lambda v: f'{v:.0f} / 100')
ind('under5_mortality', 'Under-5 Mortality Rate', 'Child Survival', 'health',
    'UN IGME via World Bank WDI', 'https://data.worldbank.org/indicator/SH.DYN.MORT', 'per 1,000 live births',
    'Probability of a child dying before age five (UN Inter-agency Group for Child Mortality Estimation).',
    1, EMP, True, lambda: wb('SH.DYN.MORT'), lambda v: f'{v:.1f} / 1,000', 'log')
ind('undp_education', 'Education Index (HDI)', 'Education', 'health',
    'UNDP Human Development Report 2025', 'https://hdr.undp.org/data-center/documentation-and-downloads', 'Index 0-1',
    'UNDP education index: average of mean years of schooling (adults) and expected years of schooling (children).',
    1, EMP, False, education_index, lambda v: f'{v:.3f} / 1')

# Civil liberties & rights
ind('rsf_press_freedom', 'World Press Freedom Index 2026', 'Press Freedom', 'rights',
    'Reporters Without Borders (RSF)', 'https://rsf.org/en/index', 'Score 0-100',
    'Political, economic, legal, social and safety conditions for journalists, from expert questionnaires and abuse counts.',
    3, 'Expert Rights', False, rsf, lambda v: f'{v:.1f} / 100')
ind('vdem_liberal_democracy', 'Liberal Democracy Index', 'Liberal Democracy', 'rights',
    'V-Dem Institute (v16)', 'https://www.v-dem.net/data/the-v-dem-dataset/', 'Index 0-1',
    'Electoral democracy plus constraints on the executive, judicial independence and protection of individual liberties.',
    3, 'Expert Academic', False, lambda: vdem('v2x_libdem'), lambda v: f'{v:.2f} / 1')
ind('academic_freedom', 'Academic Freedom Index', 'Academic Freedom', 'rights',
    'V-Dem Institute / FAU Erlangen-Nürnberg', 'https://academic-freedom-index.net/', 'Index 0-1',
    'Freedom to research and teach, academic exchange, institutional autonomy, campus integrity and freedom of academic expression.',
    3, 'Expert Academic', False, lambda: vdem('v2xca_academ'), lambda v: f'{v:.2f} / 1')
ind('vdem_religious_freedom', 'Freedom of Religion', 'Religious Freedom', 'rights',
    'V-Dem Institute (v16)', 'https://www.v-dem.net/data/the-v-dem-dataset/', 'Latent scale (≈ -3 to +3)',
    'Expert-coded freedom to choose, practise and change religion, including freedom from state religious repression.',
    3, 'Expert Academic', False, lambda: vdem('v2clrelig'), lambda v: f'{v:+.2f} V-Dem')
ind('georgetown_wps', 'Women, Peace and Security Index 2025', "Women's Status", 'rights',
    'Georgetown Institute for Women, Peace and Security & PRIO', 'https://giwps.georgetown.edu/the-index/', 'Index 0-1',
    "Women's inclusion (education, jobs, finance, politics), justice (legal discrimination, son bias) and security (intimate partner violence, community safety).",
    2, NORM, False, wps, lambda v: f'{v:.3f} / 1')
ind('lgbtq_equality', 'LGBTQ+ Legal Equality Index', 'LGBTQ+ Equality', 'rights',
    'Equaldex Equality Index via Our World in Data', 'https://ourworldindata.org/grapher/lgbt-legal-equality-index', 'Score 0-100',
    'Legal status of same-sex relationships, marriage, adoption, discrimination protection, gender-marker changes and conversion therapy.',
    2, NORM, False, equaldex, lambda v: f'{v:.0f} / 100')

# Infrastructure & tech
ind('ookla_broadband', 'Fixed Broadband Download Speed', 'Broadband Speed', 'infrastructure',
    'Ookla Open Data (Speedtest, Q3 2026)', 'https://github.com/teamookla/ookla-open-data', 'Mbps (test-weighted mean)',
    'Test-weighted mean fixed-broadband download speed across all Speedtest map tiles in the country, July–September 2026.',
    1, EMP, False, ookla, lambda v: f'{v:.0f} Mbps', 'log')
ind('itu_internet_penetration', 'Internet Users', 'Internet Use', 'infrastructure',
    'ITU via World Bank WDI', 'https://data.worldbank.org/indicator/IT.NET.USER.ZS', '% of population',
    'Share of the population that used the internet in the last three months.',
    1, EMP, False, lambda: wb('IT.NET.USER.ZS'), lambda v: f'{v:.1f}%')
ind('electricity_access', 'Access to Electricity', 'Electricity Access', 'infrastructure',
    'World Bank / SDG 7.1.1', 'https://data.worldbank.org/indicator/EG.ELC.ACCS.ZS', '% of population',
    'Share of the population with access to electricity.',
    1, EMP, False, lambda: wb('EG.ELC.ACCS.ZS'), lambda v: f'{v:.1f}%')
ind('wb_lpi_infrastructure', 'Logistics Performance Index', 'Logistics', 'infrastructure',
    'World Bank LPI', 'https://lpi.worldbank.org/', 'Score 1-5',
    'Efficiency of customs, quality of trade and transport infrastructure, shipment timeliness and tracking, from a survey of logistics professionals.',
    2, NORM, False, lambda: wb('LP.LPI.OVRL.XQ'), lambda v: f'{v:.1f} / 5')

# Weather & climate
ind('climate_comfort', 'Climate Comfort (where people live)', 'Climate Comfort', 'climate',
    'Derived from WorldClim 2.1 normals + GeoNames city populations', 'https://www.worldclim.org/data/worldclim21.html', 'Score 0-100',
    'Population-weighted climate of every city over 15,000 people. Each month scores 100 minus penalties for daytime highs below 20°C '
    '(4/°C) or above 28°C (6/°C), nights below 5°C (2/°C), dew point above 16°C (5/°C) and rain above 100 mm (0.15/mm, max 30); '
    'the 12-month average makes up 80%, and sunshine (solar radiation 2.5–6 kWh/m²/day) the other 20%.',
    4, DER, False, climate, lambda v: f'{v:.0f} / 100')
# Environment
ind('who_pm25', 'Air Pollution (PM2.5)', 'Clean Air', 'environment',
    'WHO Global Health Observatory (SDG 11.6.2)', 'https://www.who.int/data/gho/data/themes/air-pollution', 'μg/m³ annual mean',
    'Population-weighted annual mean concentration of fine particulate matter. WHO guideline: 5 μg/m³.',
    1, EMP, True, lambda: who('SDGPM25'), lambda v: f'{v:.1f} μg/m³', 'log')
ind('safe_drinking_water', 'Safely Managed Drinking Water', 'Safe Water', 'environment',
    'WHO/UNICEF JMP via World Bank WDI', 'https://data.worldbank.org/indicator/SH.H2O.SMDW.ZS', '% of population',
    'Share of people using an improved water source on premises, available when needed and free from contamination.',
    1, EMP, False, lambda: wb('SH.H2O.SMDW.ZS'), lambda v: f'{v:.1f}%')
ind('yale_epi', 'Environmental Performance Index 2026', 'Environmental Performance', 'environment',
    'Yale & Columbia (EPI)', 'https://epi.yale.edu/', 'Score 0-100',
    '58 indicators of environmental health, ecosystem vitality and climate-change mitigation.',
    2, NORM, False, epi, lambda v: f'{v:.1f} / 100')
ind('nd_gain_resilience', 'ND-GAIN Climate Adaptation Index', 'Climate Resilience', 'environment',
    'Notre Dame Global Adaptation Initiative', 'https://gain.nd.edu/our-work/country-index/', 'Score 0-100',
    'Vulnerability to climate change combined with readiness (economic, governance, social) to adapt.',
    1, EMP, False, ndgain, lambda v: f'{v:.1f} / 100')

CATEGORIES = [
    dict(id='safety', name='Safety & Peace', iconName='ShieldAlert', color='#0d9488',
         description='Lethal violence, road danger, armed conflict and militarisation, organised crime, and exposure to natural disasters.'),
    dict(id='governance', name='Governance & Rule of Law', iconName='Landmark', color='#2563eb',
         description='Clean government, courts and contracts that work, effective public services, and sound regulation.'),
    dict(id='rights', name='Civil Liberties & Inclusion', iconName='Scale', color='#7c3aed',
         description="Press freedom, liberal democracy, academic and religious freedom, women's status, and LGBTQ+ legal equality."),
    dict(id='economy', name='Economy, Labour & Living Costs', iconName='TrendingUp', color='#d97706',
         description='Income levels adjusted for local prices, inequality, joblessness, working hours, and economic sophistication.'),
    dict(id='health', name='Health, Education & Family', iconName='HeartPulse', color='#e11d48',
         description='Healthy lifespan, access to essential health care, child survival, and schooling.'),
    dict(id='infrastructure', name='Infrastructure & Tech', iconName='Cpu', color='#0891b2',
         description='Measured broadband speeds, internet use, electricity access, and logistics quality.'),
    dict(id='climate', name='Weather & Climate', iconName='Sun', color='#ea580c',
         description='How pleasant the weather is where people actually live: mild days and nights, low mugginess, moderate rain, and sunshine.'),
    dict(id='environment', name='Environment & Resilience', iconName='Leaf', color='#16a34a',
         description='Clean air, safe drinking water, environmental performance, and readiness to cope with climate change.'),
]


# ---------------------------------------------------------------------------
# Build
# ---------------------------------------------------------------------------
def percentile(vals, q):
    s = sorted(vals)
    k = (len(s) - 1) * q
    f, c = math.floor(k), math.ceil(k)
    return s[f] + (s[c] - s[f]) * (k - f)


def main():
    base = json.load(open(os.path.join(OUT, 'countries.json')))  # geography metadata only (names, flags, regions, map ids)
    meta = {k: {f: v[f] for f in ('iso3', 'numeric', 'name', 'region', 'flag')} | (
        {'isDependency': True, 'parentIso': v['parentIso'], 'parentName': v['parentName']} if v.get('isDependency') else {})
        for k, v in base.items()}

    raw = {}
    for d in I:
        data = d['_loader']()
        raw[d['id']] = {k: v for k, v in data.items() if k in meta and v[0] is not None and not (isinstance(v[0], float) and math.isnan(v[0]))
                        and (v[1] is None or v[1] >= MIN_YEAR)}

    eligible = {k for k, m in meta.items() if not m.get('isDependency')
                and sum(1 for d in I if k in raw[d['id']]) >= MIN_INDICATORS}

    # Scores
    scores = {d['id']: {} for d in I}
    for d in I:
        vals = {k: v for k, (v, _) in raw[d['id']].items() if k in eligible}
        if d['id'] == 'climate_comfort':
            scores[d['id']] = {k: round(v, 1) for k, v in vals.items()}
            d['goalposts'] = [0, 100]
            continue
        tf = (lambda x: math.log10(max(x, 1e-3))) if d['_transform'] == 'log' else (lambda x: x)
        if d['_transform'] == 'band':
            lo, hi = d['_band']
            for k, v in vals.items():
                s = (v - lo) / (hi - lo)
                scores[d['id']][k] = round((1 - max(0.0, min(1.0, s)) if d['inverted'] else max(0.0, min(1.0, s))) * 100, 1)
            d['goalposts'] = list(d['_band'])
            continue
        t = {k: tf(v) for k, v in vals.items()}
        lo, hi = percentile(t.values(), 0.025), percentile(t.values(), 0.975)
        for k, x in t.items():
            s = max(0.0, min(1.0, (x - lo) / (hi - lo)))
            if d['inverted']:
                s = 1 - s
            scores[d['id']][k] = round(s * 100, 1)
        inv = (lambda x: 10 ** x) if d['_transform'] == 'log' else (lambda x: x)
        d['goalposts'] = [round(inv(lo), 3), round(inv(hi), 3)]

    # Ranks (1 = best) use the raw values, so countries clipped to the same 0/100 score keep their true order
    ranks = {}
    for d in I:
        sign = 1 if d['inverted'] else -1
        ordered = sorted(((k, raw[d['id']][k][0]) for k in scores[d['id']]), key=lambda kv: sign * kv[1])
        r, out = 0, {}
        for i, (k, v) in enumerate(ordered):
            if i == 0 or v != ordered[i - 1][1]:
                r = i + 1
            out[k] = r
        ranks[d['id']] = (out, len(ordered))

    tie_size = {i: {} for i in ranks}
    for i, (r, _) in ranks.items():
        for rk in r.values():
            tie_size[i][rk] = tie_size[i].get(rk, 0) + 1

    cat_inds = {c['id']: [d['id'] for d in I if d['category'] == c['id']] for c in CATEGORIES}
    ind_map = {d['id']: d for d in I}
    countries = {}
    for k, m in meta.items():
        c = dict(m)
        c['indicators'] = {}
        if k in eligible:
            for d in I:
                if k not in scores[d['id']]:
                    continue
                v, y = raw[d['id']][k]
                r, n = ranks[d['id']]
                c['indicators'][d['id']] = {'raw': round(v, 4), 'formatted': d['_fmt'](v) + (f' · {y}' if y else ''),
                                            'score': scores[d['id']][k], 'rank': r[k], 'total': n}
        c['hasData'] = k in eligible
        c['dimensions'] = {}
        for cid, ids in cat_inds.items():
            # Missing indicators are skipped, but a dimension backed by too few of them is left out entirely,
            # so a single value can't stand in for the whole dimension
            vals = [c['indicators'][i]['score'] for i in ids if i in c['indicators']]
            c['dimensions'][cid] = round(sum(vals) / len(vals), 1) if vals and len(vals) >= MIN_DIM_SHARE * len(ids) else None
        c['coverage'] = f"{sum(1 for d in I if k in raw[d['id']])}/{len(I)}"
        countries[k] = c

    # Dimension ranks, strengths/weaknesses, divergence story, key facts
    dim_rank = {}
    for cid in cat_inds:
        ordered = sorted([(k, c['dimensions'][cid]) for k, c in countries.items() if c['hasData'] and c['dimensions'][cid] is not None], key=lambda kv: -kv[1])
        dim_rank[cid] = {k: i + 1 for i, (k, _) in enumerate(ordered)}
    cat_name = {c['id']: c['name'] for c in CATEGORIES}
    for k, c in countries.items():
        if not c['hasData']:
            c.update(divergenceStory='', standoutStrengths=[], standoutWeaknesses=[])
            if c.get('isDependency'):
                c['rawFacts'] = {'note': f"Territory of {c['parentName']}. Most source indices report it under its parent state, so it is not ranked separately."}
            else:
                c['rawFacts'] = {'note': f"Only {len([d for d in I if k in raw[d['id']]])} of {len(I)} indices cover {c['name']} — too few to rank it fairly."}
            continue
        items = sorted([(i, v) for i, v in c['indicators'].items() if tie_size[i][v['rank']] <= max(3, v['total'] * 0.03)],
                       key=lambda kv: kv[1]['rank'] / kv[1]['total'])

        def fact(iid, v):
            return {'indicatorId': iid, 'indicatorName': ind_map[iid]['shortName'], 'score': v['score'], 'rank': v['rank'],
                    'totalCountries': v['total'], 'badgeText': f"Rank #{v['rank']} of {v['total']}",
                    'explanation': f"Ranks #{v['rank']} of {v['total']} in {ind_map[iid]['shortName']} ({v['formatted']})."}
        c['standoutStrengths'] = [fact(i, v) for i, v in items[:2]]
        c['standoutWeaknesses'] = [fact(i, v) for i, v in items[::-1][:2]]
        dr = {cid: dim_rank[cid][k] for cid in cat_inds if k in dim_rank[cid]}
        best, worst = min(dr, key=dr.get), max(dr, key=dr.get)
        n = len(dim_rank[best])
        c['divergenceStory'] = (f"{c['name']} is strongest on {cat_name[best]} (#{dr[best]} of {n}, {c['dimensions'][best]}/100) "
                                f"and weakest on {cat_name[worst]} (#{dr[worst]} of {n}, {c['dimensions'][worst]}/100).")
        cl = CLIMATE.get(k)
        facts = []

        def add(label, iid):
            if iid in c['indicators']:
                facts.append({'label': label, 'value': c['indicators'][iid]['formatted']})
        add('Intentional homicides', 'unodc_homicide')
        add('Road traffic deaths', 'who_traffic_safety')
        add('Healthy life expectancy', 'who_hale')
        add('Broadband speed', 'ookla_broadband')
        add('GDP per capita (PPP)', 'gdp_per_capita_ppp')
        add('Average working week', 'ilo_working_hours')
        add('PM2.5 air pollution', 'who_pm25')
        if cl:
            facts += [
                {'label': 'Mean temperature', 'value': f"{cl['meanTemp']}°C"},
                {'label': 'Hottest-month avg high', 'value': f"{cl['hottestMonthHigh']}°C"},
                {'label': 'Coldest-month avg low', 'value': f"{cl['coldestMonthLow']}°C"},
                {'label': 'Annual rainfall', 'value': f"{cl['annualPrecip']:,} mm"},
                {'label': 'Comfortable months', 'value': f"{cl['comfortableMonths']} / 12"},
                {'label': 'Peak dew point (mugginess)', 'value': f"{cl['maxDewPoint']}°C"},
                {'label': 'Solar radiation', 'value': f"{cl['solarKwh']} kWh/m²/day"},
            ]
        c['rawFacts'] = {'keyFacts': facts}

    indicators_out = [{k: v for k, v in d.items() if not k.startswith('_')} | {'coverage': len(scores[d['id']])} for d in I]
    categories_out = [c | {'indicators': cat_inds[c['id']]} for c in CATEGORIES]
    json.dump(countries, open(os.path.join(OUT, 'countries.json'), 'w'), ensure_ascii=False, indent=1)
    json.dump(indicators_out, open(os.path.join(OUT, 'indicators.json'), 'w'), ensure_ascii=False, indent=2)
    json.dump(categories_out, open(os.path.join(OUT, 'categories.json'), 'w'), ensure_ascii=False, indent=2)

    write_sources_md(indicators_out, categories_out, len(eligible))
    print(f"{len(eligible)} countries ranked (>= {MIN_INDICATORS} of {len(I)} indicators); {len(countries) - len(eligible)} unranked")
    for d in indicators_out:
        print(f"  {d['id']:28s} {d['coverage']:4d} countries  goalposts {d['goalposts']}")


def write_sources_md(inds, cats, n_ranked):
    years = {}
    for c in json.load(open(os.path.join(OUT, 'countries.json'))).values():
        for iid, v in c['indicators'].items():
            y = v['formatted'].rsplit(' · ', 1)[-1] if ' · ' in v['formatted'] else None
            if y and y.isdigit():
                years.setdefault(iid, set()).add(int(y))
    lines = ['# Data sources', '',
             f'Generated by `scripts/build_dataset.py`. {n_ranked} countries are ranked; a country needs at least '
             f'{MIN_INDICATORS} of the {len(inds)} indicators to be ranked. Observations older than {MIN_YEAR} are dropped, and nothing is imputed — a country a source does not cover has no value for it.', '',
             '**Scoring.** Each indicator is rescaled to 0–100 between goalposts at the 2.5th and 97.5th percentile of country values '
             '(log scale for skewed data) and flipped where lower is better; values beyond the goalposts are clipped. '
             'Ranks use the raw values. A dimension score is the mean of the indicator scores a country has in it; with fewer than half of its indicators the dimension is N/A, and the overall score is averaged over the remaining dimensions.', '',
             'Raw snapshots of every source are in `data/sources/`; `scripts/fetch_sources.sh` re-downloads them from the publishers.', '']
    for c in cats:
        lines += [f"## {c['name']}", '', '| Indicator | Publisher | Data year(s) | Countries | Lower is better | Goalposts (0 → 100) |', '|---|---|---|---|---|---|']
        for d in inds:
            if d['category'] != c['id']:
                continue
            ys = sorted(years.get(d['id'], []))
            yr = '1970–2000 normals' if d['id'] == 'climate_comfort' else (f'{ys[0]}–{ys[-1]}' if len(ys) > 1 else (str(ys[0]) if ys else ''))
            gp = d['goalposts'] if not d['inverted'] else d['goalposts'][::-1]
            lines.append(f"| [{d['name']}]({d['sourceUrl']}) | {d['source']} | {yr} | {d['coverage']} | {'yes' if d['inverted'] else ''} | {gp[0]:g} → {gp[1]:g} {d['unit']} |")
        lines.append('')
    lines += ['## Considered and left out', '',
              '- **Global Terrorism Index (IEP)** — terrorism is already one of the 23 Global Peace Index indicators, and over half of countries score exactly 0.',
              '- **International Property Rights Index** — published by an advocacy group and largely duplicates the WGI rule-of-law measure.',
              '- **ITUC Global Rights Index** — the site was offline when this dataset was built. ILO SDG 8.8.2 was also left out because the ILO states it "is not intended as a tool to compare compliance among ILO member States".',
              '- **Housing affordability, public-transit access, KidsRights Index** — no source covers most countries.',
              '- **Taiwan, Kosovo, Monaco, Andorra and other small states** are shown but not ranked: UN-system sources (World Bank, WHO, UNDP) do not report them, leaving fewer than the minimum number of indicators.', '']
    open(os.path.join(ROOT, 'SOURCES.md'), 'w').write('\n'.join(lines))


if __name__ == '__main__':
    main()
