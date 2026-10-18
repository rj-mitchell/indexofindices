import json
import sys
sys.stdout.reconfigure(encoding='utf-8')

with open('src/data/countries.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

print(f"Total countries in countries.json: {len(data)}")
print(f"Antarctica (ATA) in dataset: {'ATA' in data}")
print(f"Greenland (GRL) in dataset: {'GRL' in data}")

test_isos = ['GBR', 'USA', 'EGY', 'BOL', 'KEN', 'EST', 'SGP', 'JPN', 'NOR', 'RUS', 'ISR', 'BLR', 'BTN', 'HKG', 'BMU', 'FRO']
print("\n--- SAMPLE COUNTRY AUDIT ---")
for iso in test_isos:
    c = data.get(iso)
    if not c:
        print(f"MISSING: {iso}")
        continue
    ind = c['indicators']
    dim = c['dimensions']
    print(f"\n{c['name']} ({iso}):")
    print(f"  • GDP per capita: {ind.get('gdp_per_capita_ppp', {}).get('formatted')} (Score: {ind.get('gdp_per_capita_ppp', {}).get('score')})")
    print(f"  • Press Freedom (RSF): {ind.get('rsf_press_freedom', {}).get('formatted')} (Score: {ind.get('rsf_press_freedom', {}).get('score')})")
    print(f"  • Liberal Democracy (V-Dem): {ind.get('vdem_liberal_democracy', {}).get('formatted')} (Score: {ind.get('vdem_liberal_democracy', {}).get('score')})")
    print(f"  • CPI Corruption (TI): {ind.get('ti_cpi', {}).get('formatted')} (Score: {ind.get('ti_cpi', {}).get('score')})")
    print(f"  • Global Peace (IEP): {ind.get('global_peace_index', {}).get('formatted')} (Score: {ind.get('global_peace_index', {}).get('score')})")
    print(f"  • Homicide Rate (UNODC): {ind.get('unodc_homicide', {}).get('formatted')} (Score: {ind.get('unodc_homicide', {}).get('score')})")
    print(f"  • Internet Penetration (ITU): {ind.get('itu_internet_penetration', {}).get('formatted')}")
    print(f"  • Climate Comfort: {ind.get('climate_comfort', {}).get('formatted')} (Score: {ind.get('climate_comfort', {}).get('score')})")
    print(f"  • Air Quality PM2.5: {ind.get('who_pm25', {}).get('formatted')} (Score: {ind.get('who_pm25', {}).get('score')})")
    print(f"  • Dimension Scores -> Safety: {dim.get('safety')}, Governance: {dim.get('governance')}, Economy: {dim.get('economy')}, Rights: {dim.get('rights')}, Climate: {dim.get('climate')}")

# Check if there are any duplicate identical scores across all indicators (which would happen with regional templates)
scores_signatures = set()
duplicates = 0
for iso, c in data.items():
    sig = tuple(round(c['indicators'][k]['raw'], 2) for k in sorted(c['indicators'].keys()))
    if sig in scores_signatures:
        duplicates += 1
    scores_signatures.add(sig)

print(f"\nTotal countries: {len(data)}, Unique indicator signatures: {len(scores_signatures)}, Duplicates: {duplicates}")
