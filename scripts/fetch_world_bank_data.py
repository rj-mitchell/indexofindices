import urllib.request
import json
import time

indicators = {
    'gdp_ppp': 'NY.GDP.PCAP.PP.CD',
    'internet_pct': 'IT.NET.USER.ZS',
    'life_exp': 'SP.DYN.LE00.IN',
    'traffic_fatalities': 'SH.STA.TRAF.P5',
    'homicide_rate': 'VC.IHR.PSRC.P5',
    'pm25_pollution': 'EN.ATM.PM25.MC.M3',
    'uhc_index': 'SH.UHC.SRVC.CV.XD',
    'wgi_rule_of_law': 'RL.EST',
    'wgi_gov_eff': 'GE.EST',
    'wgi_corruption': 'CC.EST',
    'wgi_reg_quality': 'RQ.EST'
}

results = {}
for name, code in indicators.items():
    try:
        url = f"https://api.worldbank.org/v2/country/all/indicator/{code}?date=2018:2023&format=json&per_page=1000"
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
        with urllib.request.urlopen(req, timeout=10) as resp:
            data = json.load(resp)
            if len(data) > 1 and data[1]:
                country_vals = {}
                for row in data[1]:
                    iso = row.get('countryiso3code')
                    val = row.get('value')
                    if iso and val is not None and len(iso) == 3 and iso not in country_vals:
                        country_vals[iso] = val
                results[name] = country_vals
                print(f"Fetched {name:<20}: {len(country_vals)} countries")
    except Exception as e:
        print(f"Failed {name}: {e}")
    time.sleep(0.2)

with open('wb_cached.json', 'w', encoding='utf-8') as f:
    json.dump(results, f)
print("Saved wb_cached.json successfully!")
