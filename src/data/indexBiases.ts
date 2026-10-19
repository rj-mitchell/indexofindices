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
    name: 'Intentional Homicide Rate',
    shortName: 'Homicide Rate',
    category: 'safety',
    source: 'UNODC via World Bank WDI',
    tier: 1,
    tierLabel: 'Technocratic / Empirical',
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
    id: 'who_traffic_safety',
    name: 'Road Traffic Death Rate',
    shortName: 'Road Deaths',
    category: 'safety',
    source: 'WHO Global Health Observatory',
    tier: 1,
    tierLabel: 'Technocratic / Empirical',
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
    id: 'global_peace_index',
    name: 'Global Peace Index 2026',
    shortName: 'Peace Index',
    category: 'safety',
    source: 'Institute for Economics & Peace (IEP)',
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
    id: 'organized_crime_index',
    name: 'Organised Crime: Criminality Score',
    shortName: 'Organised Crime',
    category: 'safety',
    source: 'Global Initiative Against Transnational Organized Crime',
    tier: 3,
    tierLabel: 'Expert / Institutional',
    whatItMeasures: 'Expert-assessed scale and influence of 15 criminal markets (trafficking, extortion, drugs, cyber-crime and more) and 5 types of criminal actor. This dashboard uses the criminality score only, not the separate resilience score.',
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
  {
    id: 'world_risk_index',
    name: 'WorldRiskIndex 2026 (Disaster Risk)',
    shortName: 'Disaster Risk',
    category: 'safety',
    source: 'Bündnis Entwicklung Hilft & IFHV Ruhr University Bochum',
    tier: 1,
    tierLabel: 'Technocratic / Empirical',
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
  // --- GOVERNANCE ---
  {
    id: 'ti_cpi',
    name: 'Corruption Perceptions Index 2025',
    shortName: 'Anti-Corruption',
    category: 'governance',
    source: 'Transparency International',
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
    name: 'Rule of Law (WGI)',
    shortName: 'Rule of Law',
    category: 'governance',
    source: 'World Bank Worldwide Governance Indicators',
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
    name: 'Government Effectiveness (WGI)',
    shortName: 'Gov Effectiveness',
    category: 'governance',
    source: 'World Bank Worldwide Governance Indicators',
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
    id: 'wgi_regulatory_quality',
    name: 'Regulatory Quality (WGI)',
    shortName: 'Regulatory Quality',
    category: 'governance',
    source: 'World Bank Worldwide Governance Indicators',
    tier: 3,
    tierLabel: 'Expert / Institutional',
    whatItMeasures: 'Perceptions of the government\'s ability to formulate and implement sound policies and regulations that permit and promote private-sector development.',
    pros: [
      'Aggregates dozens of underlying surveys and expert assessments, and publishes a margin of error for every country.',
      'Captures the day-to-day burden of red tape, licensing and price controls that people and small businesses actually face.'
    ],
    cons: [
      'Many underlying sources are business-risk surveys, so "good regulation" leans towards what investors want rather than what workers or consumers want.',
      'Highly correlated with the other WGI dimensions and with income, so it adds less independent information than it seems.'
    ],
    westernCentricity: 'Embeds a market-liberal view of the state: heavy regulation is scored as bad even where it protects public health, labour or the environment.',
    realWorldImpact: 'Feeds into sovereign credit assessments, aid allocation formulas and foreign direct investment decisions.',
    biasRisk: 'Medium'
  },
  // --- ECONOMY ---
  {
    id: 'gdp_per_capita_ppp',
    name: 'GDP per Capita (PPP)',
    shortName: 'GDP per Capita',
    category: 'economy',
    source: 'World Bank WDI / ICP',
    tier: 1,
    tierLabel: 'Technocratic / Empirical',
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
  {
    id: 'gini_inequality',
    name: 'Income Inequality (Gini)',
    shortName: 'Income Equality',
    category: 'economy',
    source: 'World Bank Poverty & Inequality Platform',
    tier: 1,
    tierLabel: 'Technocratic / Empirical',
    whatItMeasures: 'How unevenly household income (or consumption) is distributed, from 0 (everyone equal) to 100 (one household has everything), taken from national household surveys.',
    pros: [
      'Built directly from household survey microdata harmonised by the World Bank, not from expert opinion.',
      'Captures something GDP per capita hides: whether prosperity reaches the typical household.'
    ],
    cons: [
      'Survey years vary widely: some countries\' latest figure is a decade old.',
      'Some countries measure income and others measure consumption, which is naturally more equal, so comparisons are imperfect.',
      'Household surveys under-sample the very rich, so top-end inequality is understated almost everywhere.'
    ],
    westernCentricity: 'Low conceptual bias, but data quality is far higher in countries with established statistical offices.',
    realWorldImpact: 'Central to SDG 10 monitoring and to debates about taxation and social transfers.',
    biasRisk: 'Low'
  },
  {
    id: 'ilo_unemployment',
    name: 'Unemployment Rate',
    shortName: 'Unemployment',
    category: 'economy',
    source: 'ILO modelled estimates via World Bank WDI',
    tier: 1,
    tierLabel: 'Technocratic / Empirical',
    whatItMeasures: 'The share of the labour force that is without work but available for and actively seeking a job, using the harmonised ILO definition.',
    pros: [
      'One consistent international definition applied to every country, with ILO modelling filling gaps between surveys.',
      'A direct, intuitive signal of how hard it is to find work.'
    ],
    cons: [
      'Low unemployment can mean a strong job market or simply that people cannot afford to be unemployed and take any informal work available.',
      'Ignores underemployment, informality and people who have given up looking.'
    ],
    westernCentricity: 'The concept fits formal wage economies best; in largely informal economies it says little about job quality.',
    realWorldImpact: 'One of the headline indicators for central banks, governments and migrants choosing where to move.',
    biasRisk: 'Medium'
  },
  {
    id: 'ilo_working_hours',
    name: 'Average Weekly Working Hours',
    shortName: 'Working Hours',
    category: 'economy',
    source: 'International Labour Organization (ILOSTAT)',
    tier: 1,
    tierLabel: 'Technocratic / Empirical',
    whatItMeasures: 'Mean weekly hours actually worked per employed person, from national labour force surveys (or ILO modelled estimates where no recent survey exists).',
    pros: [
      'A concrete, measured proxy for time available for family, rest and leisure.',
      'Comes from labour force surveys rather than statutory limits, so it reflects what people really work.'
    ],
    cons: [
      'Short average hours can reflect lots of part-time or underemployed workers rather than a comfortable work-life balance.',
      'Says nothing about commuting time, unpaid care work or job intensity.',
      'This dashboard scores 35 hours or fewer as 100 and 50 hours as 0; that band is a judgement call.'
    ],
    westernCentricity: 'The "shorter is better" assumption suits rich economies; in poorer ones, longer hours often reflect the need to earn enough to live.',
    realWorldImpact: 'Used in work-life balance debates, four-day-week campaigns and labour regulation.',
    biasRisk: 'Medium'
  },
  {
    id: 'atlas_economic_complexity',
    name: 'Economic Complexity Index',
    shortName: 'Economic Complexity',
    category: 'economy',
    source: 'Harvard Growth Lab (Atlas of Economic Complexity)',
    tier: 1,
    tierLabel: 'Technocratic / Empirical',
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
  // --- HEALTH ---
  {
    id: 'who_hale',
    name: 'Healthy Life Expectancy (HALE)',
    shortName: 'Healthy Lifespan',
    category: 'health',
    source: 'WHO Global Health Observatory',
    tier: 1,
    tierLabel: 'Technocratic / Empirical',
    whatItMeasures: 'The average number of years a newborn can expect to live in full health, after subtracting years lived with illness or disability.',
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
    name: 'Universal Health Coverage Index',
    shortName: 'Healthcare Coverage',
    category: 'health',
    source: 'WHO / World Bank (SDG 3.8.1)',
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
    id: 'under5_mortality',
    name: 'Under-5 Mortality Rate',
    shortName: 'Child Survival',
    category: 'health',
    source: 'UN IGME via World Bank WDI',
    tier: 1,
    tierLabel: 'Technocratic / Empirical',
    whatItMeasures: 'The probability that a newborn dies before reaching age five, per 1,000 live births.',
    pros: [
      'Among the most robust health statistics in existence: UN agencies reconcile censuses, surveys and civil registration into one consistent series.',
      'A sensitive summary of nutrition, sanitation, vaccination and basic health-care access.'
    ],
    cons: [
      'In rich countries rates are all very low, so differences between them say little about overall family life.',
      'Countries without full civil registration rely on modelled estimates with wide uncertainty.'
    ],
    westernCentricity: 'Low conceptual bias: child survival is valued universally.',
    realWorldImpact: 'An SDG headline target (3.2) that drives global vaccination and maternal-health funding.',
    biasRisk: 'Low'
  },
  {
    id: 'undp_education',
    name: 'Education Index (HDI)',
    shortName: 'Education',
    category: 'health',
    source: 'UNDP Human Development Report 2025',
    tier: 1,
    tierLabel: 'Technocratic / Empirical',
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
    name: 'World Press Freedom Index 2026',
    shortName: 'Press Freedom',
    category: 'rights',
    source: 'Reporters Without Borders (RSF)',
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
    name: 'Liberal Democracy Index',
    shortName: 'Liberal Democracy',
    category: 'rights',
    source: 'V-Dem Institute (v16)',
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
    id: 'academic_freedom',
    name: 'Academic Freedom Index',
    shortName: 'Academic Freedom',
    category: 'rights',
    source: 'V-Dem Institute / FAU Erlangen-Nürnberg',
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
  {
    id: 'vdem_religious_freedom',
    name: 'Freedom of Religion',
    shortName: 'Religious Freedom',
    category: 'rights',
    source: 'V-Dem Institute (v16)',
    tier: 3,
    tierLabel: 'Expert Academic',
    whatItMeasures: 'Expert-coded freedom of individuals and groups to choose, practise and change their religion, including freedom from state religious repression.',
    pros: [
      'Coded by multiple country experts per country and combined with a statistical model that corrects for coder bias.',
      'Updated every year for almost every country, with uncertainty estimates.'
    ],
    cons: [
      'Measures state behaviour more than social hostility between religious communities.',
      'The latent scale (roughly -3 to +3) is hard to interpret on its own.'
    ],
    westernCentricity: 'Rests on a liberal, individual-rights view of religion; established state churches or communal religious law can score lower even where most residents accept them.',
    realWorldImpact: 'Cited in US and EU religious-freedom reports and in asylum decisions.',
    biasRisk: 'Medium'
  },
  {
    id: 'georgetown_wps',
    name: 'Women, Peace and Security Index 2025',
    shortName: 'Women\'s Status',
    category: 'rights',
    source: 'Georgetown Institute for Women, Peace and Security & PRIO',
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
    id: 'lgbtq_equality',
    name: 'LGBTQ+ Legal Equality Index',
    shortName: 'LGBTQ+ Equality',
    category: 'rights',
    source: 'Equaldex Equality Index via Our World in Data',
    tier: 2,
    tierLabel: 'Normative Consensus',
    whatItMeasures: 'Legal equality for LGBTQ+ people: legality of same-sex relationships, marriage, adoption, discrimination protections, gender-marker changes, conversion-therapy bans and censorship laws (Equaldex Legal Index).',
    pros: [
      'Directly measures bodily integrity, legal equality, and personal security for sexual and gender minorities.',
      'Tracks concrete legislative protections against hate crimes and workplace discrimination.'
    ],
    cons: [
      'Measures laws on the books, not social acceptance or how laws are enforced.',
      'Equaldex is a collaborative, citation-based database rather than an academic survey, so individual entries can lag behind recent legal changes.'
    ],
    westernCentricity: 'Modelled after late-20th century Western rights campaigns. Often overlooks traditional non-Western third-gender systems (e.g. Hijra, Fa\'afafine, Two-Spirit) that do not fit Anglo-American legal categories.',
    realWorldImpact: 'Heavily influences international tourism boycotts, expat talent migration, and asylum court rulings.',
    biasRisk: 'High'
  },
  // --- INFRASTRUCTURE ---
  {
    id: 'ookla_broadband',
    name: 'Fixed Broadband Download Speed',
    shortName: 'Broadband Speed',
    category: 'infrastructure',
    source: 'Ookla Open Data (Speedtest, Q3 2026)',
    tier: 1,
    tierLabel: 'Technocratic / Empirical',
    whatItMeasures: 'Test-weighted mean fixed-broadband download speed across every Speedtest map tile in the country (Ookla Open Data, Q3 2026).',
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
    id: 'itu_internet_penetration',
    name: 'Internet Users',
    shortName: 'Internet Use',
    category: 'infrastructure',
    source: 'ITU via World Bank WDI',
    tier: 1,
    tierLabel: 'Technocratic / Empirical',
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
    id: 'electricity_access',
    name: 'Access to Electricity',
    shortName: 'Electricity Access',
    category: 'infrastructure',
    source: 'World Bank / SDG 7.1.1',
    tier: 1,
    tierLabel: 'Technocratic / Empirical',
    whatItMeasures: 'The percentage of the population with access to electricity, from household surveys and utility data.',
    pros: [
      'A basic precondition for lighting, refrigeration, study and connectivity, measured for almost every country.',
      'Separates countries sharply at the lower end, where it matters most.'
    ],
    cons: [
      'Says nothing about reliability: a connection with daily blackouts counts the same as an uninterrupted grid.',
      'Almost every rich country is at 100%, so it offers no differentiation among them.'
    ],
    westernCentricity: 'Low conceptual bias; access to energy is a near-universal aspiration.',
    realWorldImpact: 'Guides World Bank and development-bank energy lending under SDG 7.',
    biasRisk: 'Low'
  },
  {
    id: 'wb_lpi_infrastructure',
    name: 'Logistics Performance Index',
    shortName: 'Logistics',
    category: 'infrastructure',
    source: 'World Bank LPI',
    tier: 2,
    tierLabel: 'Normative Consensus',
    whatItMeasures: 'Efficiency of customs and border management, quality of trade and transport infrastructure, ease of shipping, logistics competence, tracking and timeliness, from a survey of logistics professionals.',
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
  // --- WEATHER & CLIMATE ---
  {
    id: 'climate_comfort',
    name: 'Climate Comfort (where people live)',
    shortName: 'Climate Comfort',
    category: 'climate',
    source: 'Derived from WorldClim 2.1 normals + GeoNames city populations',
    tier: 4,
    tierLabel: 'Derived Empirical',
    whatItMeasures: 'Population-weighted monthly climate (WorldClim 2.1 normals at every city of 15,000+ people): penalties for daytime highs below 20°C or above 28°C, cold nights, muggy dew points and heavy rain, plus a sunshine component.',
    pros: [
      'Weighted by where people live, so vast empty areas (Siberia, the Australian outback, northern Canada) do not distort the national figure.',
      'Built from peer-reviewed gridded climate normals (WorldClim 2.1, Fick & Hijmans 2017), with every penalty published so you can disagree with it.',
      'Penalises humidity (dew point) as well as temperature, which crude temperature averages miss.'
    ],
    cons: [
      'The comfort thresholds (20–28°C daytime highs, dew point under 16°C, under 100 mm of rain a month) are one judgement call, not a scientific standard.',
      'Uses 1970–2000 normals; recent warming makes many places hotter than shown.',
      'Ignores air conditioning, heating and building quality, which change how a climate feels day to day.'
    ],
    westernCentricity: 'Assumes a temperate mid-latitude ideal (20°C–24°C, low humidity, clear skies). Populations native to tropical rainforests, arid savannas, or Arctic tundras possess physiological acclimatisation, distinct architectural cooling traditions, and cultural activity rhythms (such as mid-day siestas and vibrant nocturnal markets) that make their native climates comfortable and culturally rich.',
    realWorldImpact: 'Drives global retirement migration, digital nomad destinations, and seasonal tourism revenues.',
    biasRisk: 'High'
  },
  // --- ENVIRONMENT ---
  {
    id: 'who_pm25',
    name: 'Air Pollution (PM2.5)',
    shortName: 'Clean Air',
    category: 'environment',
    source: 'WHO Global Health Observatory (SDG 11.6.2)',
    tier: 1,
    tierLabel: 'Technocratic / Empirical',
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
    id: 'safe_drinking_water',
    name: 'Safely Managed Drinking Water',
    shortName: 'Safe Water',
    category: 'environment',
    source: 'WHO/UNICEF JMP via World Bank WDI',
    tier: 1,
    tierLabel: 'Technocratic / Empirical',
    whatItMeasures: 'Share of people using an improved water source that is on premises, available when needed and free from faecal and priority chemical contamination.',
    pros: [
      'The strictest international water standard, which also requires water-quality testing.',
      'Compiled by the WHO/UNICEF JMP from national surveys, censuses and regulator data.'
    ],
    cons: [
      'Coverage is the patchiest of any indicator here (about 130 countries) because many countries lack water-quality testing data.',
      'National averages hide large urban/rural gaps.'
    ],
    westernCentricity: 'Assumes piped, regulated utilities; community-managed systems can be safe but hard to certify.',
    realWorldImpact: 'The official measure for SDG target 6.1 and for water-sector investment.',
    biasRisk: 'Low'
  },
  {
    id: 'yale_epi',
    name: 'Environmental Performance Index 2026',
    shortName: 'Environmental Performance',
    category: 'environment',
    source: 'Yale & Columbia (EPI)',
    tier: 2,
    tierLabel: 'Normative Consensus',
    whatItMeasures: 'Dozens of indicators of environmental health, ecosystem vitality and climate-change mitigation, combined into one score.',
    pros: [
      'Transparent methodology with every indicator and weight published.',
      'Broad coverage of issues that daily-life indicators miss: biodiversity, fisheries, waste and emissions trends.'
    ],
    cons: [
      'Weighting choices strongly shape the ranking and change between editions, so scores are not comparable across years.',
      'Partly overlaps with the PM2.5 and drinking-water indicators already in this dashboard.',
      'Rich countries can score well while outsourcing polluting production abroad.'
    ],
    westernCentricity: 'Rewards regulatory and conservation approaches typical of rich democracies; low-consumption lifestyles get little credit.',
    realWorldImpact: 'Widely cited by governments and in ESG investment screening.',
    biasRisk: 'Medium'
  },
  {
    id: 'nd_gain_resilience',
    name: 'ND-GAIN Climate Adaptation Index',
    shortName: 'Climate Resilience',
    category: 'environment',
    source: 'Notre Dame Global Adaptation Initiative',
    tier: 1,
    tierLabel: 'Technocratic / Empirical',
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
    id: 'sgp-liberties',
    countryName: 'Singapore',
    flag: '🇸🇬',
    iso3: 'SGP',
    headline: '#1 for Government Effectiveness, #117 for Press Freedom',
    metric: 'Public order vs. civil liberties',
    rankText: 'WGI Government Effectiveness #1 of 184 · RSF Press Freedom #117 of 174 (44.6/100)',
    whyItLooksWrong: 'Singapore is clean, safe and efficient, with one of the lowest homicide rates in the world (0.1 per 100k). Many visitors assume it must top every quality-of-life table.',
    theRealExplanation: 'Indices of civil liberties reward a free, adversarial press, open protest and competitive elections. Singapore deliberately trades some of these for public order and policy continuity, so RSF and V-Dem (Liberal Democracy #85 of 174) mark it down while the World Bank governance indicators put it at the very top.',
    whereItBalancesOut: 'With every dial at 50% Singapore ranks #18. Raise Safety, Governance and Infrastructure to 100% and it climbs to #7; raise Civil Liberties and Weather instead (it ranks #177 of 183 for climate comfort because of year-round heat and humidity) and it falls to #31.',
    relatedIndicatorId: 'rsf_press_freedom'
  },
  {
    id: 'usa-paradox',
    countryName: 'United States',
    flag: '🇺🇸',
    iso3: 'USA',
    headline: 'Top 10 for Income, but #142 for Road Safety',
    metric: 'GDP per capita vs. health and safety',
    rankText: 'GDP per capita (PPP) #9 of 182 ($90,027) · Road deaths #142 of 183 · Homicide #117 of 167',
    whyItLooksWrong: 'The US has the largest economy in the world, leading universities and some of the fastest broadband anywhere (#6 of 163). High income is often assumed to buy the best quality of life.',
    theRealExplanation: 'GDP measures output, not how safe or healthy daily life is. The US records 5.8 homicides and 18.4 road deaths per 100,000 people, several times Western European levels, and a healthy life expectancy of 64.6 years (#81 of 183), below many countries with half its income. The 2026 Global Peace Index also places it #134, citing political instability.',
    whereItBalancesOut: 'With every dial at 50% the US ranks #36. Raising Economy and Infrastructure to 100% lifts it only to #33, while raising Safety and Health drops it to #40.',
    relatedIndicatorId: 'gdp_per_capita_ppp'
  },
  {
    id: 'nor-nordic',
    countryName: 'Norway',
    flag: '🇳🇴',
    iso3: 'NOR',
    headline: 'Near the Top Overall, #176 of 183 for Weather',
    metric: 'Institutions vs. climate',
    rankText: 'RSF Press Freedom #1 of 174 · WGI Rule of Law #3 of 184 · Climate comfort #176 of 183',
    whyItLooksWrong: 'Are long dark winters and summers that rarely pass 20°C really everyone\'s idea of the best place on Earth?',
    theRealExplanation: 'Most global league tables measure institutions, income and health, and simply leave out the weather. With every dial at 50%, Norway ranks #4 because it scores near the maximum on almost every institutional index.',
    whereItBalancesOut: 'Raise Weather & Climate to 100% and Australia, New Zealand, Spain and Portugal all move ahead of Norway.',
    relatedIndicatorId: 'climate_comfort'
  },
  {
    id: 'mex-climate',
    countryName: 'Mexico',
    flag: '🇲🇽',
    iso3: 'MEX',
    headline: '#7 for Climate, #180 of 182 for Organised Crime',
    metric: 'Weather vs. safety',
    rankText: 'Climate comfort #7 of 183 (91/100) · Organised crime #180 of 182 · Homicide 24.9 per 100k',
    whyItLooksWrong: 'A country can hardly be both one of the most pleasant places to live and one of the most dangerous.',
    theRealExplanation: 'Most Mexicans live on the high central plateau, where Mexico City and Guadalajara have spring-like weather all year, and the population-weighted climate score reflects this. The GI-TOC Organized Crime Index and UNODC homicide data, meanwhile, record cartel violence that is concentrated in particular states and cities. National averages hide that both are true at once.',
    whereItBalancesOut: 'This is why one composite score can mislead: the same country swings from top 10 to bottom 10 depending on whether you weight Weather or Safety.',
    relatedIndicatorId: 'organized_crime_index'
  },
  {
    id: 'jpn-disasters',
    countryName: 'Japan',
    flag: '🇯🇵',
    iso3: 'JPN',
    headline: '#2 for Healthy Lifespan, #164 for Disaster Risk',
    metric: 'Health vs. natural hazards',
    rankText: 'Healthy life expectancy #2 of 183 (72.2 yrs) · WorldRiskIndex #164 of 182',
    whyItLooksWrong: 'Japan has superb infrastructure, building codes and emergency services. How can it rank alongside much poorer countries for disaster risk?',
    theRealExplanation: 'The WorldRiskIndex multiplies exposure (earthquakes, tsunamis, typhoons and floods affecting a large, coastal population) by societal vulnerability. Japan\'s vulnerability is low, but its exposure is among the highest on Earth, so its overall risk stays high. The Philippines, with both high exposure and higher vulnerability, ranks last.',
    whereItBalancesOut: 'Disaster risk is one of five Safety indicators, so it drags Japan\'s Safety score down only modestly.',
    relatedIndicatorId: 'world_risk_index'
  }
];
