import json

with open('src/data/countries.json', 'r', encoding='utf-8') as f:
    existing = json.load(f)

print(f"Total entries in existing countries: {len(existing)}")
# Check all ISO3 codes and names
sample = [(k, v['name'], v.get('region', '')) for k, v in list(existing.items())[:30]]
print("Sample entries:")
for s in sample:
    print(s)
