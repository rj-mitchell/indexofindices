import json

REL_FREEDOM_DATA = {
    # Nordic & Western Europe
    'NOR': 94.0, 'DNK': 92.0, 'SWE': 92.0, 'FIN': 93.0, 'ISL': 95.0,
    'IRL': 91.0, 'NLD': 91.0, 'LUX': 90.0, 'BEL': 88.0, 'PRT': 92.0,
    'ESP': 89.0, 'GBR': 86.0, 'CHE': 86.0, 'AUT': 85.0, 'DEU': 84.0,
    'ITA': 85.0, 'MLT': 78.0, 'FRA': 72.0, 'CYP': 74.0, 'GRC': 68.0,

    # Central & Eastern Europe, Baltics, Balkans
    'EST': 92.0, 'CZE': 90.0, 'SVN': 88.0, 'LVA': 88.0, 'LTU': 88.0,
    'SVK': 84.0, 'ALB': 82.0, 'HRV': 80.0, 'ROU': 75.0, 'BGR': 74.0,
    'HUN': 74.0, 'POL': 72.0, 'MNE': 72.0, 'MDA': 70.0, 'SRB': 68.0,
    'MKD': 68.0, 'BIH': 60.0, 'UKR': 62.0, 'GEO': 64.0, 'ARM': 68.0,
    'RUS': 32.0, 'BLR': 28.0, 'AZE': 28.0, 'KAZ': 42.0, 'KGZ': 48.0,
    'UZB': 30.0, 'TKM': 14.0, 'TJK': 18.0,

    # Americas
    'CAN': 92.0, 'USA': 82.0, 'URY': 95.0, 'CHL': 92.0, 'CRI': 92.0,
    'PAN': 90.0, 'BRB': 90.0, 'JAM': 88.0, 'BHS': 88.0, 'SUR': 88.0,
    'BLZ': 86.0, 'ARG': 85.0, 'DOM': 84.0, 'GUY': 84.0, 'PRY': 82.0,
    'PER': 80.0, 'ECU': 80.0, 'SLV': 80.0, 'GTM': 78.0, 'HND': 78.0,
    'COL': 78.0, 'BRA': 76.0, 'BOL': 76.0, 'MEX': 74.0, 'HTI': 72.0,
    'VEN': 44.0, 'CUB': 32.0, 'NIC': 26.0,

    # Asia-Pacific
    'TWN': 96.0, 'JPN': 95.0, 'NZL': 94.0, 'KOR': 92.0, 'AUS': 90.0,
    'MNG': 85.0, 'FJI': 82.0, 'PNG': 84.0, 'VUT': 88.0, 'WSM': 84.0,
    'TON': 82.0, 'KIR': 86.0, 'SLB': 85.0, 'NRU': 86.0, 'PLW': 88.0,
    'MHL': 88.0, 'FSM': 88.0, 'TLS': 82.0, 'PHL': 74.0, 'SGP': 68.0,
    'THA': 68.0, 'HKG': 64.0, 'MAC': 68.0, 'KHM': 62.0, 'BTN': 55.0,
    'NPL': 68.0, 'LKA': 44.0, 'IDN': 45.0, 'MYS': 42.0, 'BGD': 40.0,
    'IND': 32.0, 'VNM': 32.0, 'BRN': 32.0, 'LAO': 28.0, 'MMR': 18.0,
    'PAK': 16.0, 'MDV': 18.0, 'CHN': 10.0, 'PRK': 5.0, 'AFG': 6.0,

    # Middle East & North Africa
    'TUN': 58.0, 'LBN': 56.0, 'ISR': 52.0, 'ARE': 52.0, 'MAR': 52.0,
    'KWT': 50.0, 'QAT': 48.0, 'OMN': 48.0, 'JOR': 48.0, 'BHR': 46.0,
    'TUR': 38.0, 'DZA': 36.0, 'EGY': 26.0, 'IRQ': 24.0, 'SYR': 18.0,
    'LBY': 20.0, 'SAU': 14.0, 'YEM': 12.0, 'IRN': 10.0,

    # Sub-Saharan Africa
    'CPV': 90.0, 'MUS': 88.0, 'NAM': 88.0, 'BWA': 88.0, 'SYC': 88.0,
    'STP': 86.0, 'BEN': 84.0, 'ZAF': 82.0, 'GHA': 82.0, 'SEN': 82.0,
    'SLE': 82.0, 'MDG': 82.0, 'LBR': 80.0, 'MWI': 80.0, 'GMB': 78.0,
    'ZMB': 78.0, 'GAB': 76.0, 'TGO': 76.0, 'CIV': 76.0, 'GNB': 76.0,
    'LSO': 76.0, 'SWZ': 74.0, 'AGO': 74.0, 'MOZ': 72.0, 'KEN': 72.0,
    'COG': 72.0, 'RWA': 68.0, 'TZA': 68.0, 'ZWE': 68.0, 'UGA': 66.0,
    'BDI': 64.0, 'CMR': 62.0, 'COD': 60.0, 'ETH': 54.0, 'BFA': 54.0,
    'NER': 52.0, 'GIN': 52.0, 'MLI': 48.0, 'TCD': 48.0, 'DJI': 42.0,
    'SSD': 42.0, 'COM': 38.0, 'CAF': 38.0, 'GNQ': 38.0, 'NGA': 28.0,
    'MRT': 24.0, 'SDN': 22.0, 'ERI': 12.0, 'SOM': 8.0
}

# Update sovereign_empirical_db.json
with open('sovereign_empirical_db.json', 'r', encoding='utf-8') as f:
    db = json.load(f)

updated_count = 0
for iso, score in REL_FREEDOM_DATA.items():
    if iso in db:
        db[iso]['rel_freedom'] = score
        updated_count += 1

print(f"Updated {updated_count} sovereign states with rel_freedom in sovereign_empirical_db.json")

# Fill in any missing countries with regional / global default
for iso in db:
    if 'rel_freedom' not in db[iso]:
        db[iso]['rel_freedom'] = 70.0
        print(f"Assigned default 70.0 to {iso}")

with open('sovereign_empirical_db.json', 'w', encoding='utf-8') as f:
    json.dump(db, f, indent=2)

print("Saved sovereign_empirical_db.json successfully!")
