import type { MacroCategory } from '../types';

export interface IndicatorCritique {
  id: string;
  name: string;
  shortName: string;
  category: MacroCategory;
  source: string;
  tier: number;
  tierLabel: string;
  whatItMeasures: string;
  pros: string[];
  cons: string[];
  westernCentricity: string;
  realWorldImpact: string;
  biasRisk: 'Low' | 'Medium' | 'High';
}

export interface MacroCritiqueTheme {
  id: string;
  title: string;
  subtitle: string;
  icon: string;
  content: string[];
  keyQuote?: {
    text: string;
    author: string;
    source: string;
  };
  takeaway: string;
}

export const MACRO_THEMES: MacroCritiqueTheme[] = [
  {
    id: 'index-trap',
    title: 'The Myth of "#1 in the World": Why a Single Number Lies',
    subtitle: 'Boiling an entire country down to one 0–100 score sounds simple, but deciding what makes a "good life" is personal, not scientific.',
    icon: 'Layers',
    content: [
      'Every year, newspapers run headlines claiming: "Norway is the happiest country on Earth" or "Switzerland is #1". But life is not a 100-metre dash. You cannot boil down clean air, affordable housing, free speech, low crime, and warm sunshine into a single number without deciding which ones matter more than others.',
      'How many sunny days are worth faster internet? Is a country with low crime but strict police surveillance better or worse than a free-spirited country with higher street crime? No computer program or maths formula can answer that. It depends entirely on what you personally care about.',
      'When an organisation publishes a "definitive" ranking, they are not discovering an objective scientific fact. They are just packaging their own personal worldview into a spreadsheet and pretending it is universal truth.'
    ],
    keyQuote: {
      text: "Rankings are not measurements of nature; they are human opinions dressed in the language of mathematics.",
      author: "Wendy Nelson Espeland & Michael Sauder",
      source: "Engines of Anxiety"
    },
    takeaway: 'No single country is objectively "the best". Any ranking is simply a mirror of whoever chose the weights.'
  },
  {
    id: 'western-hegemony',
    title: 'Built by the West, for the West: The Hometown Advantage',
    subtitle: 'Almost every major global league table is designed in Washington, London, Paris, or Geneva. Unsurprisingly, Western nations always win.',
    icon: 'Globe',
    content: [
      'Most global scorecards come from a handful of Western capitals: the World Bank in Washington, The Economist in London, the OECD in Paris, or the World Economic Forum in Geneva. Naturally, they build these scorecards around what Western post-industrial countries already do well: formal legal courts, stock markets, and individual consumer lifestyles.',
      'Countries with different traditions get marked down. If an East Asian country relies on strong state coordination, or an African community relies on family networks and village councils rather than paid commercial services, the spreadsheets usually label them as "corrupt" or "backward".',
      'In reality, strong family safety nets, close-knit communities, and low stress often create a happier life than high-consumption city living—even if Western spreadsheets cannot measure it.'
    ],
    keyQuote: {
      text: "The danger of global benchmarks is assuming that one way of living—that of post-industrial Western Europe—is the only target for all humanity.",
      author: "Arturo Escobar",
      source: "Encountering Development"
    },
    takeaway: 'Global scorecards often mistake "doing things the Western way" for "doing things the only right way".'
  },
  {
    id: 'halo-effect',
    title: 'The Reputation Trap: Why Famous Countries Get a Free Pass',
    subtitle: 'Many famous rankings do not count real events—they just ask international consultants for their opinions. That creates an echo chamber.',
    icon: 'Sparkles',
    content: [
      'You might assume rankings count concrete things, like hospital beds or court cases. But famous scores—like Transparency International\'s Corruption Index or the World Bank\'s Governance indicators—are actually built on surveys asking foreign executives and consultants how corrupt or well-run a country "feels".',
      'This creates a huge reputation bias. When a financial scandal breaks in Sweden or the UK, experts tend to view it as an unlucky one-off. But when the exact same scandal happens in Latin America, Africa, or Eastern Europe, experts view it as proof that the entire country is hopelessly broken.',
      'Because the people answering these surveys read each other\'s reports before answering next year\'s questions, perception scores turn into an echo chamber that can take decades to reflect reality.'
    ],
    keyQuote: {
      text: "Perception surveys do not measure corruption; they measure what travelling executives read in newspapers before boarding their flights.",
      author: "Alex Cobham",
      source: "Foreign Policy"
    },
    takeaway: 'Reputation-based scores often measure how prestigious a country feels to foreign visitors, not its actual integrity.'
  },
  {
    id: 'goodharts-law',
    title: 'Gaming the Test: When Looking Good on Paper Replaces Real Help',
    subtitle: 'When governments obsess over moving up in global rankings, they often fix spreadsheets instead of helping real people.',
    icon: 'TrendingDown',
    content: [
      'There is a famous rule in economics: when a measure becomes a target, it stops being a good measure.',
      'Because high rankings attract foreign investment and tourist dollars, governments in developing nations often spend millions hiring Western PR agencies to lobby index makers, or rushing through superficial legal tweaks just to jump three or four spots.',
      'A notorious example was the World Bank\'s old "Doing Business" index: governments stripped away worker protections and safety inspections specifically to score higher on "business friendliness". The ranking looked great in investor brochures, but ordinary workers paid the price.'
    ],
    keyQuote: {
      text: "When a measure becomes a target, it ceases to be a good measure.",
      author: "Charles Goodhart",
      source: "Problems of Monetary Management"
    },
    takeaway: 'Chasing global rankings often diverts public money into cosmetic PR stunts instead of real community needs.'
  },
  {
    id: 'real-world-impacts',
    title: 'Real Money, Real Damage: Why Bad Scores Hurt Ordinary People',
    subtitle: 'Rankings are not just academic charts—they dictate national loan interest rates, foreign aid, and diplomatic pressure.',
    icon: 'Scale',
    content: [
      'A poor score on a global index has harsh, real-world consequences. Big credit-rating agencies (like Moody\'s and S&P) plug World Bank governance scores directly into their loan formulas. When a developing country gets marked down on a subjective survey, the interest rate on its national debt goes up.',
      'This creates an unfair trap: higher interest bills force the government to cut spending on clinics, schools, and clean water. That hurts their future health and education scores, keeping the country stuck at the bottom.',
      'At the same time, politicians use low rankings to justify sanctions, trade penalties, or travel restrictions—often sparing their geopolitical allies while penalising their rivals.'
    ],
    takeaway: 'Index rankings act as financial gatekeepers, directly affecting how much money developing nations can spend on healthcare and schools.'
  },
  {
    id: 'environmental-arbitrage',
    title: 'Exporting Dirty Air: Why Wealthy Countries Look So Clean',
    subtitle: 'Rich countries rank at the top for clean air and water—partly because they moved their dirtiest factories to poorer countries.',
    icon: 'ShieldAlert',
    content: [
      'Environmental scorecards praise European and North American countries for clean air, blue skies, and sparkling lakes. But a big reason they look so clean is that they outsourced their heavy industry overseas.',
      'Over the past forty years, Western nations closed down local steel mills, chemical plants, and coal mines, choosing to buy manufactured goods from factories in China, India, and Southeast Asia. Western shoppers get the latest smartphones, trainers, and electric cars—while developing countries get the smokestacks, smog, and contaminated wastewater.',
      'Penalising developing nations for manufacturing the very goods that Western consumers buy every day is blaming the factory while congratulating the customer.'
    ],
    takeaway: 'Clean skies in rich consumer nations are subsidised by smoky air in the manufacturing hubs of the developing world.'
  }
];

export const INDICATOR_CRITIQUES: IndicatorCritique[] = [
  // --- SAFETY ---
  {
    id: 'unodc_homicide',
    name: 'Violent Crime (Intentional Homicide Rate)',
    shortName: 'Homicide Rate',
    category: 'safety',
    source: 'UNODC / WHO Mortality Database',
    tier: 1,
    tierLabel: 'Empirical / Technocratic',
    whatItMeasures: 'Annual intentional homicides per 100,000 residents, widely treated as the most reliable indicator of violent crime.',
    pros: [
      'Unlike theft or assault, dead bodies are hard to conceal, making homicide the least underreported violent crime globally.',
      'Definitions across legal jurisdictions are relatively standardised compared to other criminal offences.',
      'Directly measures the most severe violation of personal physical security.'
    ],
    cons: [
      'Relies on national police and coronial registries. In low-capacity, rural, or active conflict zones, deaths are frequently recorded as accidental, unclassified, or missing persons.',
      'Does not capture non-lethal violence, gender-based domestic abuse, street harassment, extortion, or the subjective fear of crime.',
      'Paradoxically, when a developing state invests in professionalising its forensic and coronial system, its recorded homicide rate often increases due to improved detection.'
    ],
    westernCentricity: 'Relatively low conceptual bias, but high institutional capacity bias. High-income nations with complete digital death certificates produce high-precision data, while lower-income countries must rely on statistical estimations and verbal autopsies.',
    realWorldImpact: 'Massive impact on international tourism, expat relocation, and foreign direct investment. High homicide rates in Latin America and the Caribbean trigger aggressive Western travel advisories that crush local economies.',
    biasRisk: 'Low'
  },
  {
    id: 'global_peace_index',
    name: 'Global Peace Index (GPI)',
    shortName: 'Peace Index',
    category: 'safety',
    source: 'Institute for Economics & Peace (IEP, Sydney/London)',
    tier: 2,
    tierLabel: 'Normative Consensus',
    whatItMeasures: 'Composite index measuring 23 indicators across ongoing domestic/international conflict, societal safety, and militarisation.',
    pros: [
      'Comprehensive multi-dimensional approach to peace that looks beyond simple battlefield casualties.',
      'Examines weapons exports and heavy armaments alongside domestic police presence.',
      'Brings international attention to the economic costs of violence containment.'
    ],
    cons: [
      'Conflates aggressive militarism with legitimate defensive deterrence. A small democracy bordering an aggressive superpower is penalised equally to an offensive aggressor for maintaining strong defenses.',
      'Subjective qualitative scoring on internal conflict indicators relies on small panels of Western-trained analysts.',
      'Nuclear weapons capabilities and military alliances (like NATO) are weighted in ways that can produce paradoxical results.'
    ],
    westernCentricity: 'Reflects a post-Cold War Western European pacifist ideal that assumes physical borders are permanently settled and external military deterrence is an outdated relic—an assumption that collapsed following recent geopolitical invasions.',
    realWorldImpact: 'Frequently cited in United Nations reports, ESG investment frameworks, and sovereign sustainability criteria.',
    biasRisk: 'High'
  },
  {
    id: 'global_terrorism_index',
    name: 'Terrorism Impact (GTI)',
    shortName: 'Terrorism Impact',
    category: 'safety',
    source: 'Institute for Economics & Peace (IEP)',
    tier: 1,
    tierLabel: 'Empirical / Technocratic',
    whatItMeasures: 'Direct casualties, property damage, and psychological impact of non-state insurgent and extremist attacks.',
    pros: [
      'Rigorous event-based tracking based on the Global Terrorism Database (GTD).',
      'Captures the disproportionate concentration of non-state extremist violence in fragile and conflict-affected states.'
    ],
    cons: [
      'Excludes state-sponsored terrorism, military airstrikes on civilian infrastructure, and drone warfare conducted by sovereign armed forces.',
      'The definition of "terrorist" vs "freedom fighter" or "insurgent" is deeply contested in international law and frequently politicised by national governments.'
    ],
    westernCentricity: 'Heavily shaped by Western counter-terrorism doctrines post-2001. Actions by non-state actors in Africa or the Middle East are classified as "terrorism", whereas state actions that cause comparable civilian deaths are classified as "military operations".',
    realWorldImpact: 'Used to justify banking restrictions, anti-money laundering (AML/CFT) blacklists, international aid freezes, and strict visa vetting.',
    biasRisk: 'High'
  },
  {
    id: 'who_traffic_safety',
    name: 'Road Safety (Traffic Mortality Rate)',
    shortName: 'Traffic Deaths',
    category: 'safety',
    source: 'World Health Organisation (WHO)',
    tier: 1,
    tierLabel: 'Empirical / Technocratic',
    whatItMeasures: 'Annual road traffic fatalities per 100,000 population.',
    pros: [
      'In peacetime nations, daily transit fatality risk dwarfs violent crime by an order of magnitude.',
      'Direct, tangible measure of civil engineering quality, vehicle standards, and traffic law enforcement.',
      'Directly correlates with basic state capacity to protect everyday human life.'
    ],
    cons: [
      'Severe underreporting in developing nations where deaths occurring days after a crash in under-equipped hospitals are not coded as traffic fatalities.',
      'Fails to measure non-fatal catastrophic disabilities (traumatic brain injuries, amputations) that place enormous burdens on families.'
    ],
    westernCentricity: 'Relatively low philosophical bias, though road designs and vehicle safety certification standards are heavily dominated by European (Euro NCAP) and North American automotive regulations.',
    realWorldImpact: 'Shapes multilateral development bank (MDB) highway and urban transit infrastructure loans.',
    biasRisk: 'Low'
  },
  {
    id: 'world_risk_index',
    name: 'Natural Disaster & Hazard Safety',
    shortName: 'Disaster Safety (WRI)',
    category: 'safety',
    source: 'Bündnis Entwicklung Hilft & Ruhr University Bochum',
    tier: 1,
    tierLabel: 'Empirical / Technocratic',
    whatItMeasures: 'Exposure to natural hazards (earthquakes, cyclones, floods, droughts) combined with national coping and adaptive capacity.',
    pros: [
      'Accounts for physical environmental vulnerability that dwarfs human violent crime in hazard-prone territories.',
      'Explicitly models institutional coping capacity rather than merely measuring physical storm exposure.'
    ],
    cons: [
      'Small island states and volcanic rim countries (Vanuatu, Philippines) suffer geographically immutable penalties regardless of governance quality.',
      'Coping capacity metrics correlate heavily with national capital wealth, penalising poorer nations.'
    ],
    westernCentricity: 'Rewards capital-intensive concrete engineering solutions (dykes, seismic dampening skyscrapers) while undervaluing traditional indigenous disaster response knowledge and communal mutual aid.',
    realWorldImpact: 'Shapes international catastrophe reinsurance pricing, climate adaptation grants, and disaster relief allocations.',
    biasRisk: 'Medium'
  },
  {
    id: 'organized_crime_index',
    name: 'Organised Crime Resilience',
    shortName: 'Crime Resilience (GI-TOC)',
    category: 'safety',
    source: 'Global Initiative Against Transnational Organised Crime (GI-TOC, Geneva)',
    tier: 2,
    tierLabel: 'Normative Consensus',
    whatItMeasures: 'Transnational illicit criminal markets (cartels, smuggling, extortion) balanced against state judicial and enforcement resilience.',
    pros: [
      'Captures shadow economies and criminal syndicates that standard national police statistics intentionally omit.',
      'Assesses both the threat of criminal enterprise and the democratic state capacity to resist corruption.'
    ],
    cons: [
      'Relies on qualitative expert consensus panels; illicit networks operate secretly, making objective measurement challenging.',
      'Prone to reputational stereotypes regarding specific geographic regions.'
    ],
    westernCentricity: 'Western demand drives illicit markets (cocaine, narcotics, weapons, and untaxed financial flows), yet source and transit nations in Latin America and Africa bear the stigma and penalties in the rankings.',
    realWorldImpact: 'Influences bilateral security cooperation, INTERPOL operations, and international anti-money laundering (AML) compliance.',
    biasRisk: 'High'
  },

  // --- GOVERNANCE ---
  {
    id: 'ti_cpi',
    name: 'Corruption Perceptions Index (CPI)',
    shortName: 'Anti-Corruption (CPI)',
    category: 'governance',
    source: 'Transparency International (Berlin)',
    tier: 3,
    tierLabel: 'Expert Perception',
    whatItMeasures: 'Perceived levels of public sector corruption as evaluated by business executives, risk analysts, and country experts.',
    pros: [
      'Put the issue of global corruption on the international political and corporate agenda.',
      'Provides civil society watchdogs and investigative journalists with a potent rhetorical weapon against corrupt autocrats.',
      'Aggregates 13 separate external surveys to dampen individual survey outliers.'
    ],
    cons: [
      'Measures *perceptions*, not actual corruption. Studies consistently show that citizen experiences of paying bribes correlate weakly with their country\'s CPI rank.',
      'Heavily biased toward petty, bureaucratic bribery (police bribes, customs grease payments) common in the Global South, while ignoring institutionalised, legalised influence peddling common in the West.',
      'Prone to severe perceptual inertia: a country\'s ranking often remains stagnant long after genuine anti-corruption reforms have been enacted.'
    ],
    westernCentricity: 'Extreme. In the United States and Western Europe, corporate campaign contributions, Super-PACs, revolving-door contracts between regulators and Wall Street, and multi-billion-dollar lobbying industries are legalised and codified as "free speech". CPI treats this as "clean", while treating kinship reciprocity or informal patron-client arrangements in Africa or Asia as criminal graft. Furthermore, Western tax havens (London, Delaware, Switzerland) that launder looted wealth routinely score near the top.',
    realWorldImpact: 'Massive impact on international credit ratings, IMF lending conditionalities, and foreign corporate investment decisions. A poor CPI score can trigger capital flight and economic stagnation.',
    biasRisk: 'High'
  },
  {
    id: 'wgi_rule_of_law',
    name: 'Rule of Law Indicator',
    shortName: 'Rule of Law',
    category: 'governance',
    source: 'World Bank Worldwide Governance Indicators (WGI)',
    tier: 3,
    tierLabel: 'Expert / Institutional',
    whatItMeasures: 'Confidence in contract enforcement, property rights, police fairness, and the independence of courts.',
    pros: [
      'Property rights and judicial predictability are indisputably critical for large-scale economic planning and personal security.',
      'Provides a rigorous statistical aggregation combining dozens of independent data providers.'
    ],
    cons: [
      'Conflates "rule of law" (fairness, human dignity, equality before the law) with "rule by law" or the protection of commercial foreign investor property.',
      'Marginalises customary, community, or indigenous legal traditions that prioritise restorative justice over Western adversarial litigation.',
      'Expert respondents are overwhelmingly corporate commercial lawyers and investment risk consultants.'
    ],
    westernCentricity: 'Heavily biased toward Anglo-American common law and continental civil law traditions. Legal systems that prioritise collective land rights, communal stewardship, or religious jurisprudence are automatically rated as possessing weak property rights.',
    realWorldImpact: 'Used by the Millennium Challenge Corporation (MCC) and international development banks to allocate billions of dollars in foreign assistance.',
    biasRisk: 'High'
  },
  {
    id: 'wgi_gov_effectiveness',
    name: 'Government Effectiveness',
    shortName: 'Gov Effectiveness',
    category: 'governance',
    source: 'World Bank Worldwide Governance Indicators (WGI)',
    tier: 3,
    tierLabel: 'Expert / Institutional',
    whatItMeasures: 'Quality of public services, civil service independence from political pressures, and policy delivery competence.',
    pros: [
      'Recognises that state capacity is essential for delivering public goods like clean water, vaccines, and roads.',
      'Evaluates administrative delivery rather than purely ideological constitutional structures.'
    ],
    cons: [
      'Subtly penalises states with large interventionist welfare systems or state-owned enterprises if evaluators view state intervention as "bureaucratic inefficiency".',
      'Relies heavily on surveys of multinational corporate executives who prioritise low red tape and fast customs clearance over equitable social service delivery.'
    ],
    westernCentricity: 'Embeds the "New Public Management" doctrine popular in the West since the 1990s, which values market-oriented efficiency, privatisation, and technocratic administration over popular participation and democratic contestation.',
    realWorldImpact: 'Influences sovereign bond spreads and conditions attached to World Bank policy loans.',
    biasRisk: 'High'
  },
  {
    id: 'ipri_property_rights',
    name: 'Property & Land Rights Security',
    shortName: 'Property Rights (IPRI)',
    category: 'governance',
    source: 'Property Rights Alliance (Washington, D.C.)',
    tier: 2,
    tierLabel: 'Normative Regulatory',
    whatItMeasures: 'Legal protection of physical land tenure, protection from unlawful expropriation, and intellectual property protections.',
    pros: [
      'Secure property tenure prevents arbitrary land grabs and enables long-term familial wealth generation.',
      'Examines both physical land protections and judicial independence against executive expropriation.'
    ],
    cons: [
      'Aggressively rewards restrictive Western intellectual property patents, penalising countries providing affordable generic pharmaceuticals.',
      'Biased against communal, collective, or indigenous land tenure systems that lack formalised individual deeds.'
    ],
    westernCentricity: 'Rooted in Anglo-American Lockean private property theory. Treats non-commercial communal lands as legally "unprotected" deficits.',
    realWorldImpact: 'Directly influences bilateral investment treaties, patent law litigation, and international agribusiness concessions.',
    biasRisk: 'High'
  },

  // --- ECONOMY ---
  {
    id: 'cri_inequality',
    name: 'Income Equality (Low Gini / CRI)',
    shortName: 'Income Equality',
    category: 'economy',
    source: 'World Bank / Oxfam & DFI (Commitment to Reducing Inequality)',
    tier: 1,
    tierLabel: 'Empirical / Technocratic',
    whatItMeasures: 'Distribution of household income (Gini coefficient) alongside public social spending on health, education, and labour protections.',
    pros: [
      'Exposes extreme internal inequality masked by high aggregate national GDP per capita.',
      'Highlights whether economic growth translates into broad living standard improvements for regular citizens.'
    ],
    cons: [
      'Top-1% wealth is frequently hidden in offshore tax shelters, leading to underestimation of actual inequality in wealthy nations.',
      'Does not capture informal intra-family transfers or non-monetary mutual aid.'
    ],
    westernCentricity: 'Rewards formal European-style welfare state redistribution models; penalises nations relying on family networks or religious mutual aid systems (e.g. Zakat).',
    realWorldImpact: 'Drives progressive tax policy debates, IMF poverty assessments, and international development NGO campaigning.',
    biasRisk: 'Medium'
  },
  {
    id: 'ituc_worker_rights',
    name: 'Workers\' Rights & Union Protections',
    shortName: 'Workers\' Rights (ITUC)',
    category: 'economy',
    source: 'International Trade Union Confederation (ITUC, Brussels)',
    tier: 2,
    tierLabel: 'Normative Consensus',
    whatItMeasures: 'Evaluates statutory collective bargaining rights, strike protections, fair dismissals, and physical safety of trade union organisers.',
    pros: [
      'Directly measures whether working people can organise without facing police violence, retaliatory firing, or legal harassment.',
      'Examines real-world violations and violence against labour activists.'
    ],
    cons: [
      'Focuses primarily on formal unionisation, which misses the majority of workers in developing nations with high informal employment.',
      'Can overlook high statutory wage growth in developmental state models with controlled union structures.'
    ],
    westernCentricity: 'Rooted in Western European post-war social partnership models; treats informal agrarian and artisanal work as an institutional deficit.',
    realWorldImpact: 'Used in corporate ESG supply-chain audits, ILO complaint filings, and international trade agreement labour clauses.',
    biasRisk: 'High'
  },
  {
    id: 'work_life_balance',
    name: 'Work-Life Balance & Reasonable Hours',
    shortName: 'Work-Life Balance',
    category: 'economy',
    source: 'OECD / International Labour Organisation (ILO)',
    tier: 1,
    tierLabel: 'Empirical / Technocratic',
    whatItMeasures: 'Share of workforce avoiding excessive hours (50+ hrs/wk), statutory paid annual leave, and dedicated leisure time.',
    pros: [
      'Direct counterweight to productivist metrics; recognises that life quality requires leisure, rest, and personal time.',
      'Correlates strongly with parental mental health and family stability.'
    ],
    cons: [
      'Only measures formal wage employment; ignores uncompensated domestic labour, childcare, and gig-work overwork.',
      'Can be distorted in developing countries where long hours are an economic necessity rather than corporate culture.'
    ],
    westernCentricity: 'Presumes a strict binary separation between "work" and "leisure". In communal and artisanal cultures, social life and daily labour are fluidly intertwined.',
    realWorldImpact: 'Informs national legislation on statutory leave, 4-day workweek trials, and right-to-disconnect laws.',
    biasRisk: 'Medium'
  },
  {
    id: 'housing_affordability',
    name: 'Housing Affordability (Price-to-Income)',
    shortName: 'Housing Affordability',
    category: 'economy',
    source: 'OECD Affordable Housing Database / Demographia',
    tier: 1,
    tierLabel: 'Empirical / Technocratic',
    whatItMeasures: 'Median home purchase price and rent relative to median household disposable income.',
    pros: [
      'Housing is the single largest household expense; directly measures middle-class economic solvency.',
      'Exposes financialised real estate bubbles in globally wealthy cities.'
    ],
    cons: [
      'National averages conceal extreme disparities between capital megacities and regional towns.',
      'Assumes single-family freehold homeownership; does not account for multi-generational communal residences.'
    ],
    westernCentricity: 'Focuses on formal commercial mortgage markets, overlooking self-built housing and non-mortgaged community land trusts.',
    realWorldImpact: 'Drives urban migration, youth political frustration, and municipal rent-control/zoning reforms.',
    biasRisk: 'Medium'
  },
  {
    id: 'atlas_economic_complexity',
    name: 'Economic Complexity Index (ECI)',
    shortName: 'Economic Complexity',
    category: 'economy',
    source: 'Harvard Growth Lab (Hausmann & Hidalgo)',
    tier: 1,
    tierLabel: 'Empirical / Technocratic',
    whatItMeasures: 'The diversity and technical sophistication of knowledge embedded in a country\'s physical export basket.',
    pros: [
      'Purely empirical, mathematically derived metric based on United Nations Comtrade trade data.',
      'One of the single best long-term predictors of sustained economic growth and institutional resilience in modern economics.',
      'Exposes the fragility of resource-curse economies (e.g., oil petrostates that have high GDP but zero technological complexity).'
    ],
    cons: [
      'Only measures *physical, tradable goods*. Completely ignores service exports, software code, finance, and domestic internal innovation.',
      'Heavily penalises small island states, tourism-dependent economies, and agrarian societies that have vibrant domestic lives but narrow export profiles.'
    ],
    westernCentricity: 'Rewards industrialised, high-tech manufacturing economies (Germany, Japan, Switzerland, South Korea). It reflects an industrial-productivist philosophy that treats agrarian and pastoral livelihoods as primitive.',
    realWorldImpact: 'Heavily utilised by sovereign wealth funds, industrial planning ministries, and development finance institutions to guide industrial subsidies.',
    biasRisk: 'Low'
  },
  {
    id: 'wb_purchasing_power',
    name: 'Local Purchasing Power',
    shortName: 'Purchasing Power',
    category: 'economy',
    source: 'World Bank International Comparison Programme (ICP)',
    tier: 1,
    tierLabel: 'Empirical / Technocratic',
    whatItMeasures: 'How far median domestic earnings stretch to purchase a standardised basket of local goods, food, and housing.',
    pros: [
      'Corrects for the major flaw of market exchange rates, recognising that $1 goes much further in Hanoi than in Manhattan.',
      'Focuses on real lived consumption capacity rather than nominal financial abstractions.'
    ],
    cons: [
      'Constructing a single globally comparable "basket of goods" is fundamentally impossible. A consumer in rural Scandinavia requires heating, insulation, and winter apparel; a consumer in tropical West Africa requires ventilation, mosquito netting, and fresh water.',
      'Fails to account for quality variations in public goods: high private purchasing power is less vital in countries where healthcare, university tuition, and transit are free.'
    ],
    westernCentricity: 'The "standardised basket" is implicitly designed around Western urban consumer lifestyles, measuring items like personal computers, processed groceries, and formal retail products rather than locally sourced subsistence goods.',
    realWorldImpact: 'Forms the computational basis for global poverty thresholds ($2.15/day) and international living wage benchmarks.',
    biasRisk: 'Medium'
  },
  {
    id: 'gdp_per_capita_ppp',
    name: 'GDP per Capita (PPP adjusted)',
    shortName: 'GDP per Capita',
    category: 'economy',
    source: 'World Bank / IMF',
    tier: 1,
    tierLabel: 'Empirical / Technocratic',
    whatItMeasures: 'Gross Domestic Product per person adjusted for purchasing power parity.',
    pros: [
      'The foundational metric of modern macroeconomic accounts; highly correlated with technological capacity and public health infrastructure.'
    ],
    cons: [
      'Distorted by extreme wealth inequality: a billionaire walking into a village raises the average GDP per capita without feeding anyone.',
      'Completely ignores unpaid care labour, domestic housework, childcare, and volunteerism, which are disproportionately performed by women.',
      'Counts environmental destruction as economic growth: an oil spill or a clearcut ancient forest increases GDP through cleanup expenditures and timber sales.'
    ],
    westernCentricity: 'Ignores the informal and communal economy. In Sub-Saharan Africa and South Asia, 50% to 80% of citizens work in informal, agrarian, or mutual aid networks that are invisible to tax collectors and thus omitted or heavily discounted in GDP calculations. Furthermore, corporate tax havens (Ireland, Luxembourg, Bermuda) experience phantom "Leprechaun GDP" spikes due to multinational intellectual property booking that does not benefit ordinary residents.',
    realWorldImpact: 'Determines eligibility for concessional development loans (IDA), World Bank classification (Low, Middle, High Income), and international climate assistance.',
    biasRisk: 'High'
  },

  // --- HEALTH ---
  {
    id: 'who_hale',
    name: 'Healthy Life Expectancy (HALE)',
    shortName: 'Healthy Lifespan',
    category: 'health',
    source: 'World Health Organisation (WHO) / IHME',
    tier: 1,
    tierLabel: 'Empirical / Technocratic',
    whatItMeasures: 'The average number of years a person is expected to live in "full health", subtracting years burdened by severe disability and chronic illness.',
    pros: [
      'Far superior to crude life expectancy, which simply counts biological survival even if spent in vegetative or heavily medicated states.',
      'Integrates epidemiological burden of disease (DALYs) into a single intuitive metric.'
    ],
    cons: [
      'Assigning mathematical "disability weights" to various physical conditions (e.g. blindness, mobility impairments, depression) involves subjective, ableist value judgments.',
      'Does not measure psychological flourishing, loneliness, social isolation, or community belonging.'
    ],
    westernCentricity: 'Reflects a biomedical model of health centred on individual bodily longevity. Western countries with 80+ year lifespans often suffer from catastrophic epidemics of elder loneliness, social atomisation, and youth anxiety that this metric cannot detect.',
    realWorldImpact: 'Directly influences national retirement ages, public pension liabilities, and healthcare resource allocation.',
    biasRisk: 'Low'
  },
  {
    id: 'who_uhc_coverage',
    name: 'Universal Health Coverage (UHC Index)',
    shortName: 'Healthcare Coverage',
    category: 'health',
    source: 'WHO Sustainable Development Goal (SDG 3.8.1)',
    tier: 2,
    tierLabel: 'Normative Consensus',
    whatItMeasures: 'Coverage of essential health services (prevention, treatment, maternal care, non-communicable diseases).',
    pros: [
      'Emphasises preventive primary healthcare and universal access rather than expensive tertiary hospital technology for the wealthy.',
      'Monitors global commitments to the UN Sustainable Development Goals.'
    ],
    cons: [
      'Measures the presence of service coverage, not financial catastrophe: a patient might have access to a clinic but be plunged into bankruptcy paying for the prescription drugs (though complementary UHC metrics attempt to track this).',
      'Data in low-income nations relies heavily on donor surveys and modelled extrapolations.'
    ],
    westernCentricity: 'Heavily influenced by the European social-democratic model of state-sponsored universal healthcare. While widely regarded as humane, it can overlook traditional, preventative herbal, and community healthcare structures in non-Western societies.',
    realWorldImpact: 'Guides the allocation of billions in global health funding from Gavi, the Global Fund, and USAID.',
    biasRisk: 'Medium'
  },
  {
    id: 'kids_rights_index',
    name: 'Child Welfare & Family Rights',
    shortName: 'Child Welfare',
    category: 'health',
    source: 'KidsRights Foundation & Erasmus University Rotterdam',
    tier: 2,
    tierLabel: 'Normative Consensus',
    whatItMeasures: 'Rights of children across health, education, protection, enabling environment, and parental statutory leave.',
    pros: [
      'Focuses on society\'s most vulnerable demographic; reflects long-term intergenerational investment.',
      'Combines practical child survival statistics with legal protections against exploitation.'
    ],
    cons: [
      'Treaty ratification weighting allows nations to score well through symbolic legal compliance without field implementation.',
      'Can penalise traditional family-run agrarian apprenticeships as labour violations.'
    ],
    westernCentricity: 'Framed around the Western individualist legal conception of child rights; sometimes clashes with communal and extended-family care models.',
    realWorldImpact: 'Influences UNICEF programming priorities, child protection grants, and international adoption standards.',
    biasRisk: 'Medium'
  },
  {
    id: 'undp_education',
    name: 'Education & Academic Attainment',
    shortName: 'Education Attainment',
    category: 'health',
    source: 'UNDP Human Development Index / UNESCO',
    tier: 1,
    tierLabel: 'Empirical / Technocratic',
    whatItMeasures: 'Adult mean years of schooling and youth expected years of schooling.',
    pros: [
      'Foundational indicator of human cognitive capital, universal literacy, and developmental potential.',
      'Standardised worldwide across decades of census data.'
    ],
    cons: [
      'Measures classroom "seat time" rather than actual learning outcomes, functional literacy, or critical problem-solving skills.',
      'Ignores oral histories, artisanal apprenticeships, and indigenous ecological knowledge.'
    ],
    westernCentricity: 'Treats formal Western-style institutional schooling as the sole legitimate form of human knowledge acquisition.',
    realWorldImpact: 'Key pillar of the UN Human Development Index (HDI), directly guiding global education aid.',
    biasRisk: 'Low'
  },

  // --- RIGHTS ---
  {
    id: 'rsf_press_freedom',
    name: 'World Press Freedom Index',
    shortName: 'Press Freedom',
    category: 'rights',
    source: 'Reporters Without Borders (RSF, Paris)',
    tier: 3,
    tierLabel: 'Expert Rights',
    whatItMeasures: 'Evaluates the legal framework, physical safety, and political independence of journalists and media outlets.',
    pros: [
      'Vital international shield for independent journalists, exposing state censorship, arbitrary detentions, and extrajudicial murders.',
      'Combines quantitative counts of attacks on journalists with qualitative evaluations of media diversity.'
    ],
    cons: [
      'Qualitative survey questionnaires rely on panels of journalists, lawyers, and researchers selected by RSF, whose selections can introduce ideological bias.',
      'Focuses heavily on state interference while downplaying commercial coercion and oligarchic media concentration.'
    ],
    westernCentricity: 'Assumes the Anglo-American model of privatised, commercial media is inherently "free". It rarely penalises Western nations where media is monopolised by a handful of billionaire oligarchs (e.g. Rupert Murdoch, Silvio Berlusconi) who systematically manipulate public opinion, as long as the state does not directly jail reporters.',
    realWorldImpact: 'Directly cited in Western foreign policy debates, human rights reports, and international diplomatic reprimands.',
    biasRisk: 'High'
  },
  {
    id: 'vdem_liberal_democracy',
    name: 'V-Dem Liberal Democracy Index',
    shortName: 'Liberal Democracy',
    category: 'rights',
    source: 'V-Dem Institute (University of Gothenburg)',
    tier: 3,
    tierLabel: 'Expert Academic',
    whatItMeasures: 'Protections for individual civil liberties, rule of law, independent judiciary checks, and transparent electoral competition.',
    pros: [
      'The most methodologically sophisticated academic democracy dataset in the world, utilising Bayesian item response theory to calibrate expert ratings.',
      'Deconstructs democracy into distinct components (electoral, liberal, participatory, deliberative, egalitarian).'
    ],
    cons: [
      'Ultimately grounded in the subjective ratings of academic experts who overwhelmingly share Western liberal-democratic philosophical priors.',
      'Prioritises negative procedural liberties (freedom from state interference) over positive substantive capabilities (guarantees of housing, healthcare, nutrition, and education).'
    ],
    westernCentricity: 'Embeds a Western ideological orthodoxy that equates legitimate governance exclusively with multiparty competitive elections. It systematically downgrades developmental states (such as Singapore, Vietnam, or post-genocide Rwanda) that have achieved historic poverty reduction, social stability, and public safety without adopting Anglo-American multiparty contestation.',
    realWorldImpact: 'Cited by the US State Department, European Union, and international human rights bodies to justify trade conditionality, sanctions, and foreign policy alliances.',
    biasRisk: 'High'
  },
  {
    id: 'pew_religious_freedom',
    name: 'Religious Freedom & Toleration',
    shortName: 'Religious Freedom',
    category: 'rights',
    source: 'Pew Research Centre / V-Dem Institute',
    tier: 2,
    tierLabel: 'Normative Consensus',
    whatItMeasures: 'Evaluates government restrictions on religion (Pew GRI: laws, administrative bans, registration hurdles, apostasy/blasphemy penalties) and societal hostilities (Pew SHI: sectarian violence, mob harassment, religious riots, vigilante discrimination).',
    pros: [
      'Empirically documents severe physical persecution, state atheism crackdowns, sectarian pogroms, and capital apostasy/blasphemy punishments worldwide.',
      'Explicitly distinguishes between state oppression (GRI) and non-state societal mob violence (SHI), preventing regimes from evading responsibility for communal violence.',
      'Acts as a vital international shield for vulnerable minority faiths (e.g. Ahmadiyya, Baha\'i, Rohingya, Uyghurs, Coptic Christians, Jehovah\'s Witnesses).'
    ],
    cons: [
      'Relies heavily on annual US State Department International Religious Freedom reports, human rights NGOs, and international media reporting, creating uneven observational density in remote or closed nations.',
      'Can blur the line between legitimate protection of public health or secular civil rights (e.g. outlawing child marriage, female genital cutting, or discriminatory caste hierarchies) and state religious restriction.'
    ],
    westernCentricity: 'Anglo-American Evangelical & Individualist Framing: The concept of "religious freedom" in international metrics was codified largely through the US International Religious Freedom Act of 1998 (IRFA). It conceptualises religion through a Western Protestant-individualist lens—emphasising individual conscience and the unfettered right to proselytise/convert. Non-Western traditions and continental European secular republics (such as France\'s laïcité) often prioritise civic cohesion, communal harmony, or public sphere neutrality over competitive missionary activity. In many post-colonial Asian and African nations, aggressive foreign-funded missionary campaigns are perceived as geopolitical interference rather than benign religious worship.',
    realWorldImpact: 'Directly triggers US diplomatic designations (Countries of Particular Concern - CPC), determines eligibility for security cooperation, impacts asylum and refugee status determinations, and guides targeted Magnitsky human rights sanctions.',
    biasRisk: 'High'
  },
  {
    id: 'lgbtq_equality',
    name: 'LGBTQ+ Equality & Legal Protections',
    shortName: 'LGBTQ+ Equality',
    category: 'rights',
    source: 'ILGA-Europe / Franklin & Marshall Global Barometer',
    tier: 2,
    tierLabel: 'Normative Consensus',
    whatItMeasures: 'Statutory non-discrimination protections, same-sex marriage/partnership, gender recognition, and freedom from state persecution.',
    pros: [
      'Directly measures bodily integrity, legal equality, and personal security for sexual and gender minorities.',
      'Tracks concrete legislative protections against hate crimes and workplace discrimination.'
    ],
    cons: [
      'Focuses primarily on statutory law on the books; does not always capture public cultural tolerance or informal community acceptance.',
      'Can overlook rural vs urban disparities within a nation.'
    ],
    westernCentricity: 'Modelled after late-20th century Western rights campaigns. Often overlooks traditional non-Western third-gender systems (e.g. Hijra, Fa\'afafine, Two-Spirit) that do not fit Anglo-American legal categories.',
    realWorldImpact: 'Heavily influences international tourism boycotts, expat talent migration, and asylum court rulings.',
    biasRisk: 'High'
  },
  {
    id: 'georgetown_wps',
    name: 'Women, Peace and Security Index (WPS)',
    shortName: 'Women\'s Rights (WPS)',
    category: 'rights',
    source: 'Georgetown Institute for Women, Peace and Security',
    tier: 2,
    tierLabel: 'Normative Consensus',
    whatItMeasures: 'Women\'s inclusion (education, employment, parliament), justice (legal equality), and security (intimate partner violence, safety).',
    pros: [
      'Combines economic and political agency with physical protection and community safety.',
      'Draws on robust international legal standards under UN Security Council Resolution 1325.'
    ],
    cons: [
      'Intimate partner violence is severely underreported in societies with intense patriarchal stigma.',
      'Parliamentary quota metrics can be manipulated by autocrats who appoint family members to state bodies.'
    ],
    westernCentricity: 'Focuses heavily on formal wage-earning employment; undercounts unpaid agrarian domestic labour and traditional matriarchal authority.',
    realWorldImpact: 'Guides bilateral development assistance, UN diplomatic benchmarks, and sovereign gender equality programmes.',
    biasRisk: 'Medium'
  },
  {
    id: 'academic_freedom',
    name: 'Academic Freedom Index (AFI)',
    shortName: 'Academic Freedom',
    category: 'rights',
    source: 'V-Dem Institute & Friedrich-Alexander-Universität',
    tier: 3,
    tierLabel: 'Expert Academic',
    whatItMeasures: 'Freedom to research, teach, and publish, university institutional autonomy, and freedom of scholarly communication.',
    pros: [
      'Critical early-warning barometer for wider civil authoritarian repression.',
      'Assesses campus security and institutional autonomy from political interference.'
    ],
    cons: [
      'Expert survey perceptions can be dominated by ideological campus debates.',
      'Rarely accounts for corporate donor influence or commercial defence research contracts in Western private universities.'
    ],
    westernCentricity: 'Built on the 19th-century German Humboldtian university ideal, penalising states with national development curriculum coordination.',
    realWorldImpact: 'Influences university international accreditations, researcher migration, and cross-border research grants.',
    biasRisk: 'High'
  },

  // --- INFRASTRUCTURE ---
  {
    id: 'ookla_broadband',
    name: 'Median Broadband Download Speed',
    shortName: 'Broadband Speed',
    category: 'infrastructure',
    source: 'Ookla Speedtest Open Data',
    tier: 1,
    tierLabel: 'Empirical / Technocratic',
    whatItMeasures: 'Real-world measured fixed and mobile download speeds experienced by everyday internet users.',
    pros: [
      'Based on billions of crowdsourced, empirical speed tests conducted on consumer devices across actual telecom networks.',
      'Free from government propaganda or theoretical claims of telecommunication coverage.'
    ],
    cons: [
      'Sample selection bias: only people who already have internet access and choose to run a Speedtest are measured, skewing results toward wealthier, urban citizens in developing nations.',
      'Fast download speeds do not imply affordability: gigabit fiber that costs half a monthly salary is useless to the general population.'
    ],
    westernCentricity: 'Equates digital speed with human progress. It ignores the growing sociological evidence that hyper-connected digital societies suffer from acute screen addiction, youth mental health crises, and social fragmentation.',
    realWorldImpact: 'Used by tech conglomerates and venture capital funds to assess digital market readiness and cloud infrastructure investment.',
    biasRisk: 'Medium'
  },
  {
    id: 'wb_lpi_infrastructure',
    name: 'Trade & Logistics Infrastructure (LPI)',
    shortName: 'Logistics Quality',
    category: 'infrastructure',
    source: 'World Bank Logistics Performance Index',
    tier: 1,
    tierLabel: 'Empirical / Technocratic',
    whatItMeasures: 'Quality of trade and transport infrastructure (ports, freight rail, roads, customs clearance velocity).',
    pros: [
      'Essential for understanding a country\'s ability to integrate into global value chains and supply networks.'
    ],
    cons: [
      'Inherently favours small, wealthy maritime entrepôts and transshipment hubs (Singapore, Netherlands, Hong Kong, UAE, Belgium) over vast continental nations with challenging topography (DR Congo, Brazil, India).',
      'Surveyed primarily among multinational freight forwarders (DHL, Maersk, FedEx) who evaluate speed of commercial container movement, not whether rural farmers can get crops to local village markets.'
    ],
    westernCentricity: 'Focuses entirely on facilitating globalised maritime export trade rather than internal domestic self-sufficiency or rural connectivity.',
    realWorldImpact: 'Determines priority corridors for multilateral infrastructure financing and sovereign port concessions.',
    biasRisk: 'Low'
  },
  {
    id: 'itu_internet_penetration',
    name: 'Internet User Penetration',
    shortName: 'Internet Penetration',
    category: 'infrastructure',
    source: 'International Telecommunication Union (ITU)',
    tier: 1,
    tierLabel: 'Empirical / Technocratic',
    whatItMeasures: 'The percentage of the total population who actively use the internet.',
    pros: [
      'Captures the democratisation of knowledge access, financial inclusion (mobile money), and civic connectivity.'
    ],
    cons: [
      'Binary metric: counts a rural farmer checking weather on a 2G SMS service the same as a tech worker on fiber optic broadband.',
      'Government self-reported data is often exaggerated for prestige.'
    ],
    westernCentricity: 'Low direct ideological bias, but reinforces techno-deterministic assumptions that digital connectivity automatically enhances human freedom, ignoring state digital surveillance and algorithmic manipulation.',
    realWorldImpact: 'Shapes international digital divide funding from the UN, GSMA, and tech philanthropic foundations.',
    biasRisk: 'Low'
  },
  {
    id: 'public_transit_access',
    name: 'Public Transit Access & Walkability',
    shortName: 'Public Transit (SDG 11.2.1)',
    category: 'infrastructure',
    source: 'UN-Habitat / UITP',
    tier: 1,
    tierLabel: 'Empirical / Technocratic',
    whatItMeasures: 'Share of urban residents within 500 metres walking distance of reliable public transit stops.',
    pros: [
      'Measures pedestrian accessibility and freedom from car dependency.',
      'Directly correlates with lower carbon emissions, lower traffic accidents, and affordable mobility.'
    ],
    cons: [
      'Measures stop distance, not service frequency, overcrowding, or fare affordability.',
      'Overlooks flexible informal transit networks (minibuses, jeepneys, shared vans) that serve millions.'
    ],
    westernCentricity: 'Designed around formalised European municipal bus and metro networks, penalising decentralised transport solutions.',
    realWorldImpact: 'Informs urban municipal master planning and multilateral green transit bond allocations.',
    biasRisk: 'Low'
  },

  // --- CLIMATE ---
  {
    id: 'climate_comfort',
    name: 'Bioclimatic Quality & Comfort (Holiday Climate Index - HCI)',
    shortName: 'Climate Quality (HCI)',
    category: 'climate',
    source: 'Copernicus ERA5 / WMO Climatology',
    tier: 1,
    tierLabel: 'Bioclimatic Standard',
    whatItMeasures: 'Peer-reviewed bioclimatic comfort combining thermal comfort (Humidex), rainy day frequency, annual sunshine hours, and extreme heat/freezing penalties.',
    pros: [
      'Grounded in objective meteorological physics and peer-reviewed human bioclimatology.',
      'Explicitly penalises dangerous heat-stress (Humidex > 35°C) and oppressive sultriness rather than relying on crude temperature averages.',
      'Factors in sunshine hours, which have proven clinical impacts on seasonal affective disorder (SAD) and Vitamin D synthesis.'
    ],
    cons: [
      'Originally conceived for European beach and leisure tourism (Holiday Climate Index), which introduces an implicit tourist gaze.',
      'Averages across national territories: massive continental nations (Chile, US, China) have dozens of microclimates, making a single national score an oversimplification.'
    ],
    westernCentricity: 'Assumes a temperate mid-latitude ideal (20°C–24°C, low humidity, clear skies). Populations native to tropical rainforests, arid savannas, or Arctic tundras possess physiological acclimatisation, distinct architectural cooling traditions, and cultural activity rhythms (such as mid-day siestas and vibrant nocturnal markets) that make their native climates comfortable and culturally rich.',
    realWorldImpact: 'Drives global retirement migration, digital nomad destinations, and seasonal tourism revenues.',
    biasRisk: 'High'
  },
  {
    id: 'who_pm25',
    name: 'Clean Air (Low Ambient PM2.5)',
    shortName: 'Air Quality (PM2.5)',
    category: 'climate',
    source: 'WHO Ambient Air Quality Database',
    tier: 1,
    tierLabel: 'Empirical / Technocratic',
    whatItMeasures: 'Population-weighted annual average exposure to fine inhalable particulate matter under 2.5 micrometers.',
    pros: [
      'PM2.5 is the single deadliest environmental carcinogen and cardiovascular hazard on Earth, causing an estimated 7 million premature deaths annually.',
      'Monitored via high-precision ground sensors combined with NASA satellite aerosol optical depth (AOD) measurements.'
    ],
    cons: [
      'Does not distinguish between toxic anthropogenic industrial soot and natural windblown mineral dust (e.g. Saharan dust over North Africa), penalising desert nations unfairly.',
      'Severe shortage of ground-level calibrated reference monitors across Sub-Saharan Africa and Central Asia.'
    ],
    westernCentricity: 'The Environmental Arbitrage: High-income Western nations boast clean air precisely because they offshored heavy industry, coal power, and raw material processing to China, India, and Southeast Asia. The West imports the clean, finished consumer goods while the Global South breathes the toxic manufacturing exhaust. Penalising developing countries for air pollution without accounting for consumption-based emissions is an act of international hypocrisy.',
    realWorldImpact: 'Shapes urban low-emission zones, environmental litigation, and sovereign ESG investment ratings.',
    biasRisk: 'High'
  },
  {
    id: 'yale_clean_water',
    name: 'Clean Water & Sanitation Access',
    shortName: 'Clean Water',
    category: 'climate',
    source: 'Yale Environmental Performance Index (EPI) / WHO-UNICEF JMP',
    tier: 1,
    tierLabel: 'Empirical / Technocratic',
    whatItMeasures: 'Percentage of the population with safely managed drinking water and hygienic sanitation on premises.',
    pros: [
      'Access to uncontaminated water is the most fundamental prerequisite for human survival, preventing waterborne diarrheal epidemics.',
      'High consensus across all international human rights frameworks.'
    ],
    cons: [
      'In rural areas, water testing for invisible industrial toxins (PFAS, heavy metals, microplastics) is rarely performed, leading to false-positive cleanliness ratings in some low-income nations and missed contamination in wealthy ones.'
    ],
    westernCentricity: 'Low ideological bias. Clean drinking water and basic sanitation are universal biological imperatives for all human beings.',
    realWorldImpact: 'Directly influences public health infrastructure loans and United Nations SDG 6 compliance monitoring.',
    biasRisk: 'Low'
  },
  {
    id: 'nd_gain_resilience',
    name: 'Climate Change Resilience & Adaptation',
    shortName: 'Climate Resilience',
    category: 'climate',
    source: 'Notre Dame Global Adaptation Initiative (ND-GAIN)',
    tier: 1,
    tierLabel: 'Empirical / Technocratic',
    whatItMeasures: 'A nation\'s vulnerability to severe climate impacts weighted against its institutional readiness to adapt.',
    pros: [
      'Connects physical climate disruption with sovereign fiscal and technological capacity to protect citizens.',
      'Exposes the existential threat faced by developing and small-island nations.'
    ],
    cons: [
      'Readiness criteria heavily correlate with baseline GDP and credit ratings, making it structurally harder for lower-income nations to score well.',
      'Does not evaluate community-led grassroots resilience or indigenous mutual aid mechanisms.'
    ],
    westernCentricity: 'Favours large, centralised engineering adaptations over decentralised ecological stewardship traditions.',
    realWorldImpact: 'Informs UN Green Climate Fund grants, sovereign adaptation bonds, and international climate loss-and-damage negotiations.',
    biasRisk: 'Medium'
  }
];

export interface CountryAnomalyCaseStudy {
  id: string;
  countryName: string;
  flag: string;
  iso3: string;
  headline: string;
  metric: string;
  rankText: string;
  whyItLooksWrong: string;
  theRealExplanation: string;
  whereItBalancesOut: string;
  relatedIndicatorId?: string;
}

export const COUNTRY_ANOMALIES: CountryAnomalyCaseStudy[] = [
  {
    id: 'prk-terrorism',
    countryName: 'North Korea',
    flag: '🇰🇵',
    iso3: 'PRK',
    headline: '#1 in the World for Lack of Terrorism?',
    metric: 'Terrorism Impact (GTI)',
    rankText: 'Rank #1 / 199 (Raw: 0.0 GTI, Score: 99.0)',
    whyItLooksWrong: 'North Korea is an isolated totalitarian dictatorship with nuclear tests, military parades, and extreme internal repression. Seeing it rank #1 in the world alongside peaceful nations like Iceland looks completely bizarre at first glance.',
    theRealExplanation: 'The Global Terrorism Index (IEP) strictly tracks violent attacks, casualties, and hostage incidents committed by non-state insurgent groups (like ISIS or Al-Qaeda). Because North Korea enforces total border closure, pervasive internal surveillance, and strict travel permits, non-state insurgent cells simply cannot organise or operate inside the country. It recorded 0.0 attacks and 0 casualties, tying at #1 with 108 other nations.',
    whereItBalancesOut: 'North Korea’s real danger—state-sponsored violence, massive militarism, and systemic internal repression—is captured under the Global Peace Index (GPI), where it ranks near the very bottom of the world: Rank 186 out of 199 (raw 3.15 / 5.0, score 35.5).',
    relatedIndicatorId: 'global_terrorism_index'
  },
  {
    id: 'chn-housing',
    countryName: 'China',
    flag: '🇨🇳',
    iso3: 'CHN',
    headline: 'Rank 197 / 199 for Housing Affordability?',
    metric: 'Housing Affordability (Price-to-Income)',
    rankText: 'Rank 197 / 199 (Raw: 14.5x Income, Score: 43.3)',
    whyItLooksWrong: 'China is a manufacturing powerhouse with massive high-speed construction and state economic planning. Many people assume homes in Chinese cities are far cheaper than in London, New York, or Sydney.',
    theRealExplanation: 'Housing affordability is not measured by raw dollar price; it is measured by the House-Price-to-Income Ratio (median home price divided by median annual household disposable income). Prior to recent market cooling, apartments in Tier-1 megacities (Shenzhen, Beijing, Shanghai) reached a staggering 35x to 40x annual household income—meaning it took 35–40 years of total household earnings to purchase a typical flat. Even averaged nationwide across lower-tier cities, the ratio is 14.5x, putting mainland China alongside Hong Kong (19x+) and Macao at the bottom of the globe.',
    whereItBalancesOut: 'While home ownership is extremely stretched relative to local wages, China scores very high on modern infrastructure, high-speed rail connectivity, and public transit access.',
    relatedIndicatorId: 'housing_affordability'
  },
  {
    id: 'usa-paradox',
    countryName: 'United States',
    flag: '🇺🇸',
    iso3: 'USA',
    headline: 'Top 5 for Wealth ($82k+ GDP), but #45+ for Life Expectancy & Safety?',
    metric: 'GDP per Capita vs. Health & Safety',
    rankText: 'Top 5 in Economic Output, but #45 in Healthy Lifespan & #100+ in Homicide',
    whyItLooksWrong: 'The US has the world\'s largest economy, top research universities, and cutting-edge medical technology. Many expect towering GDP per capita to automatically translate into the world\'s best quality of life.',
    theRealExplanation: 'Traditional economic output metrics like GDP measure dollars spent, not how health, safety, or daily well-being are experienced. The US has elevated violent crime (homicide rate of 5.8 per 100k vs ~1.0 in Western Europe and East Asia), high road traffic fatalities (12.7 per 100k), and healthcare coverage gaps that drag healthy life expectancy down to 69.0 years—below countries with less than half its income.',
    whereItBalancesOut: 'When you weight pure Economic Complexity and Broadband Speed, the US ranks near the top. When you turn up sliders for Personal Safety, Healthy Lifespan, and Work-Life Balance, the US drops noticeably.',
    relatedIndicatorId: 'gdp_per_capita_ppp'
  },
  {
    id: 'sgp-liberties',
    countryName: 'Singapore',
    flag: '🇸🇬',
    iso3: 'SGP',
    headline: '#1 for Safety & Transit, but Near the Bottom for Press Freedom?',
    metric: 'Public Order vs. Western Civil Liberties',
    rankText: '#1 in Public Transit & Broadband, #130+ in World Press Freedom',
    whyItLooksWrong: 'Singapore is clean, safe, and boasts one of the highest standards of living anywhere. Western visitors often assume it should be near the very top of every quality-of-life league table.',
    theRealExplanation: 'Western ranking systems define a "good society" as requiring aggressive investigative journalism, public demonstrations, and minimal government censorship. Singapore’s governing social contract deliberately trades public protests and unrestricted media for communal harmony, strict public order, and economic efficiency.',
    whereItBalancesOut: 'This is the exact reason our Observatory gives you sliders: if you weight Physical Comfort, Safety, and Fast Transit, Singapore shoots to the top. If you prioritise Civil Liberties, it moves down.',
    relatedIndicatorId: 'rsf_press_freedom'
  },
  {
    id: 'nor-nordic',
    countryName: 'Norway & Switzerland',
    flag: '🇳🇴',
    iso3: 'NOR',
    headline: 'Why Are Nordic & Alpine Countries Almost Always #1?',
    metric: 'The Western Welfare Benchmark Bias',
    rankText: '#1 & #2 on Most Standard Global League Tables',
    whyItLooksWrong: 'Are freezing Scandinavian winters, months of afternoon darkness, high living costs, and 50%+ income taxes really everyone’s idea of paradise?',
    theRealExplanation: 'Traditional indexes are designed by economists in Geneva, Paris, and London who define the "ideal society" as a wealthy European social democracy. They heavily reward formal welfare systems and high GDP per person, but completely ignore weather comfort, seasonal depression, and high prices for everyday goods and dining out.',
    whereItBalancesOut: 'Slide up the weighting for Climate Comfort & Sunshine, and Southern Europe (Spain, Portugal, Greece) and Latin America immediately leap ahead of the cold Nordics!',
    relatedIndicatorId: 'climate_comfort'
  }
];
