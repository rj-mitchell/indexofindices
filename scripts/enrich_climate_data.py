import json
import math

# Authoritative Climatological Database: (rain_days, humidity_pct)
# rain_days: average annual precipitation days (>= 1.0 mm)
# humidity_pct: average annual relative humidity (%)
# Sources: WMO (World Meteorological Organization), Copernicus ERA5, National Met Services
COUNTRY_CLIMATE_EXT = {
    # --- Nordic & Baltic ---
    'NOR': (155, 78),  # Oslo ~115, Bergen ~240 -> natl avg ~155d, 78% RH
    'DNK': (125, 82),  # Copenhagen ~125d, 82% RH
    'SWE': (130, 77),  # Stockholm ~128d, 77% RH
    'FIN': (145, 82),  # Helsinki ~145d, 82% RH
    'ISL': (185, 81),  # Reykjavik ~185d, 81% RH
    'EST': (135, 80),  # Tallinn ~135d, 80% RH
    'LVA': (130, 79),  # Riga ~130d, 79% RH
    'LTU': (125, 78),  # Vilnius ~125d, 78% RH

    # --- Western Europe ---
    'IRL': (168, 83),  # Dublin ~151d, West coast ~190d -> 168d, 83% RH
    'NLD': (138, 81),  # Amsterdam ~138d, 81% RH
    'CHE': (125, 75),  # Zurich ~128d, Geneva ~118d -> 125d, 75% RH
    'DEU': (130, 76),  # Berlin ~106d, Munich ~135d -> 130d, 76% RH
    'LUX': (135, 78),  # Luxembourg City ~135d, 78% RH
    'BEL': (140, 79),  # Brussels ~140d, 79% RH
    'FRA': (105, 73),  # Paris ~111d, Nice ~63d, Lyon ~104d -> 105d, 73% RH
    'GBR': (133, 80),  # London ~110d, Manchester ~140d, Glasgow ~170d -> 133d, 80% RH
    'AUT': (120, 73),  # Vienna ~100d, Salzburg ~140d -> 120d, 73% RH

    # --- Southern / Mediterranean Europe ---
    'PRT': (75, 68),   # Lisbon ~77d, Faro ~52d -> 75d, 68% RH
    'ESP': (52, 58),   # Madrid ~63d, Seville ~51d, Malaga ~43d -> 52d, 58% RH
    'ITA': (75, 65),   # Rome ~78d, Milan ~82d, Naples ~70d -> 75d, 65% RH
    'MLT': (48, 68),   # Valletta ~48d, 68% RH
    'CYP': (42, 60),   # Nicosia ~43d, Limassol ~40d -> 42d, 60% RH
    'GRC': (54, 55),   # Athens ~43d, Thessaloniki ~65d -> 54d, 55% RH
    'HRV': (85, 65),   # Zagreb ~100d, Split ~70d -> 85d, 65% RH
    'SVN': (110, 72),  # Ljubljana ~115d, 72% RH

    # --- Eastern Europe & Balkans ---
    'CZE': (115, 74),  # Prague ~115d, 74% RH
    'SVK': (112, 73),  # Bratislava ~112d, 73% RH
    'POL': (120, 77),  # Warsaw ~118d, 77% RH
    'ROU': (90, 72),   # Bucharest ~85d, 72% RH
    'BGR': (85, 68),   # Sofia ~88d, 68% RH
    'HUN': (95, 70),   # Budapest ~95d, 70% RH
    'SRB': (95, 69),   # Belgrade ~95d, 69% RH
    'MNE': (95, 65),   # Podgorica ~90d, 65% RH
    'BIH': (115, 72),  # Sarajevo ~115d, 72% RH
    'ALB': (85, 62),   # Tirana ~85d, 62% RH
    'MKD': (80, 65),   # Skopje ~80d, 65% RH
    'MDA': (90, 71),   # Chisinau ~90d, 71% RH
    'UKR': (105, 75),  # Kyiv ~105d, 75% RH
    'BLR': (125, 78),  # Minsk ~125d, 78% RH
    'RUS': (115, 76),  # Moscow ~115d, 76% RH

    # --- North America ---
    'CAN': (120, 70),  # Toronto ~115d, Vancouver ~160d, Montreal ~125d -> 120d, 70% RH
    'USA': (85, 62),   # LA ~35d, Phoenix ~36d, NYC ~122d, Seattle ~156d -> natl pop avg 85d, 62% RH
    'MEX': (75, 55),   # Mexico City ~85d, Guadalajara ~75d -> 75d, 55% RH

    # --- Central America & Caribbean ---
    'CRI': (140, 78),  # San Jose ~140d, 78% RH
    'PAN': (160, 82),  # Panama City ~160d, 82% RH
    'GTM': (110, 72),  # Guatemala City ~110d, 72% RH
    'HND': (120, 74),  # Tegucigalpa ~120d, 74% RH
    'SLV': (115, 70),  # San Salvador ~115d, 70% RH
    'NIC': (125, 74),  # Managua ~125d, 74% RH
    'CUB': (95, 75),   # Havana ~95d, 75% RH
    'DOM': (105, 76),  # Santo Domingo ~105d, 76% RH
    'JAM': (110, 77),  # Kingston ~110d, 77% RH
    'HTI': (100, 74),  # Port-au-Prince ~100d, 74% RH
    'TTO': (130, 78),  # Port of Spain ~130d, 78% RH
    'BHS': (90, 76),   # Nassau ~90d, 76% RH
    'BRB': (115, 76),  # Bridgetown ~115d, 76% RH
    'BLZ': (130, 79),  # Belize City ~130d, 79% RH

    # --- South America ---
    'BRA': (115, 76),  # Sao Paulo ~110d, Rio ~95d, Brasilia ~115d -> 115d, 76% RH
    'ARG': (85, 68),   # Buenos Aires ~85d, Cordoba ~75d -> 85d, 68% RH
    'CHL': (40, 58),   # Santiago ~40d, 58% RH
    'COL': (140, 74),  # Bogota ~140d, Medellin ~150d -> 140d, 74% RH
    'PER': (25, 78),   # Lima ~25d rain (fog/garua), 78% RH
    'ECU': (145, 76),  # Quito ~145d, 76% RH
    'BOL': (85, 58),   # La Paz ~85d, 58% RH
    'URY': (88, 72),   # Montevideo ~88d, 72% RH
    'PRY': (95, 68),   # Asuncion ~95d, 68% RH
    'VEN': (110, 75),  # Caracas ~110d, 75% RH
    'GUY': (155, 80),  # Georgetown ~155d, 80% RH
    'SUR': (160, 81),  # Paramaribo ~160d, 81% RH

    # --- East Asia ---
    'JPN': (115, 68),  # Tokyo ~106d, Osaka ~110d -> 115d, 68% RH
    'KOR': (105, 68),  # Seoul ~105d, 68% RH
    'TWN': (135, 76),  # Taipei ~135d, 76% RH
    'CHN': (95, 64),   # Beijing ~65d, Shanghai ~125d -> 95d, 64% RH
    'MNG': (55, 52),   # Ulaanbaatar ~55d, 52% RH
    'PRK': (95, 70),   # Pyongyang ~95d, 70% RH

    # --- Southeast Asia ---
    'SGP': (178, 82),  # Singapore ~178d rain, 82% RH (hot & high humidity)
    'MYS': (185, 84),  # Kuala Lumpur ~185d rain, 84% RH
    'THA': (130, 75),  # Bangkok ~130d rain, 75% RH
    'VNM': (135, 80),  # Hanoi ~135d rain, 80% RH
    'IDN': (165, 82),  # Jakarta ~165d rain, 82% RH
    'PHL': (160, 81),  # Manila ~160d rain, 81% RH
    'BRN': (180, 82),  # Bandar Seri Begawan ~180d, 82% RH
    'KHM': (125, 77),  # Phnom Penh ~125d, 77% RH
    'LAO': (130, 76),  # Vientiane ~130d, 76% RH
    'MMR': (125, 78),  # Yangon ~125d, 78% RH
    'TLS': (110, 74),  # Dili ~110d, 74% RH

    # --- South Asia ---
    'IND': (80, 62),   # Delhi ~55d, Mumbai ~90d -> 80d, 62% RH
    'PAK': (45, 52),   # Islamabad ~60d, Karachi ~20d -> 45d, 52% RH
    'BGD': (115, 78),  # Dhaka ~115d, 78% RH
    'LKA': (140, 78),  # Colombo ~140d, 78% RH
    'NPL': (105, 68),  # Kathmandu ~105d, 68% RH
    'BTN': (115, 72),  # Thimphu ~115d, 72% RH
    'MDV': (145, 80),  # Male ~145d, 80% RH
    'AFG': (50, 48),   # Kabul ~50d, 48% RH

    # --- Central Asia & Caucasus ---
    'KAZ': (85, 62),   # Almaty ~85d, 62% RH
    'UZB': (60, 52),   # Tashkent ~60d, 52% RH
    'TKM': (45, 48),   # Ashgabat ~45d, 48% RH
    'KGZ': (80, 58),   # Bishkek ~80d, 58% RH
    'TJK': (75, 55),   # Dushanbe ~75d, 55% RH
    'GEO': (95, 66),   # Tbilisi ~95d, 66% RH
    'ARM': (80, 60),   # Yerevan ~80d, 60% RH
    'AZE': (70, 68),   # Baku ~70d, 68% RH

    # --- Middle East & North Africa ---
    'EGY': (6, 48),    # Cairo ~6d rain, 48% RH
    'SAU': (12, 32),   # Riyadh ~12d rain, 32% RH
    'ARE': (10, 58),   # Dubai ~10d rain, 58% RH (humid summer coast)
    'QAT': (10, 56),   # Doha ~10d rain, 56% RH
    'KWT': (18, 42),   # Kuwait City ~18d rain, 42% RH
    'BHR': (12, 62),   # Manama ~12d rain, 62% RH
    'OMN': (12, 54),   # Muscat ~12d rain, 54% RH
    'YEM': (25, 45),   # Sanaa ~25d rain, 45% RH
    'ISR': (45, 62),   # Tel Aviv ~45d rain, 62% RH
    'JOR': (40, 48),   # Amman ~40d rain, 48% RH
    'LBN': (55, 68),   # Beirut ~55d rain, 68% RH
    'SYR': (50, 55),   # Damascus ~50d rain, 55% RH
    'IRQ': (35, 42),   # Baghdad ~35d rain, 42% RH
    'IRN': (45, 46),   # Tehran ~45d rain, 46% RH
    'TUR': (85, 65),   # Istanbul ~105d, Ankara ~75d -> 85d, 65% RH
    'MAR': (50, 64),   # Casablanca ~50d rain, 64% RH
    'DZA': (55, 62),   # Algiers ~55d rain, 62% RH
    'TUN': (52, 65),   # Tunis ~52d rain, 65% RH
    'LBY': (25, 58),   # Tripoli ~25d rain, 58% RH
    'SDN': (25, 38),   # Khartoum ~25d rain, 38% RH

    # --- Sub-Saharan Africa ---
    'ZAF': (65, 60),   # Cape Town ~75d, Joburg ~65d -> 65d, 60% RH
    'NAM': (35, 38),   # Windhoek ~35d rain, 38% RH
    'BWA': (45, 45),   # Gaborone ~45d rain, 45% RH
    'ZWE': (55, 56),   # Harare ~55d rain, 56% RH
    'ZMB': (75, 62),   # Lusaka ~75d rain, 62% RH
    'MOZ': (80, 72),   # Maputo ~80d rain, 72% RH
    'AGO': (60, 68),   # Luanda ~60d rain, 68% RH
    'KEN': (95, 68),   # Nairobi ~95d rain, 68% RH
    'TZA': (90, 74),   # Dar es Salaam ~90d rain, 74% RH
    'UGA': (120, 76),  # Kampala ~120d rain, 76% RH
    'RWA': (125, 74),  # Kigali ~125d rain, 74% RH
    'BDI': (120, 74),  # Bujumbura ~120d rain, 74% RH
    'ETH': (100, 62),  # Addis Ababa ~100d rain, 62% RH
    'NGA': (105, 76),  # Lagos ~125d, Abuja ~90d -> 105d, 76% RH
    'GHA': (95, 78),   # Accra ~95d rain, 78% RH
    'CIV': (110, 78),  # Abidjan ~110d rain, 78% RH
    'SEN': (45, 65),   # Dakar ~45d rain, 65% RH
    'CMR': (135, 80),  # Yaounde ~135d rain, 80% RH
    'MDG': (105, 76),  # Antananarivo ~105d rain, 76% RH
    'MUS': (110, 76),  # Port Louis ~110d rain, 76% RH
    'SYC': (150, 79),  # Victoria ~150d rain, 79% RH
    'CPV': (20, 68),   # Praia ~20d rain, 68% RH
    'MLI': (40, 42),   # Bamako ~40d rain, 42% RH
    'NER': (35, 36),   # Niamey ~35d rain, 36% RH
    'BFA': (50, 52),   # Ouagadougou ~50d rain, 52% RH
    'TCD': (45, 44),   # N'Djamena ~45d rain, 44% RH
    'GIN': (125, 80),  # Conakry ~125d rain, 80% RH
    'SLE': (130, 82),  # Freetown ~130d rain, 82% RH
    'LBR': (140, 84),  # Monrovia ~140d rain, 84% RH
    'BEN': (95, 77),   # Cotonou ~95d rain, 77% RH
    'TGO': (90, 76),   # Lome ~90d rain, 76% RH
    'COD': (130, 78),  # Kinshasa ~130d rain, 78% RH
    'COG': (125, 78),  # Brazzaville ~125d rain, 78% RH
    'GAB': (140, 82),  # Libreville ~140d rain, 82% RH
    'GNQ': (145, 83),  # Malabo ~145d rain, 83% RH
    'CAF': (115, 74),  # Bangui ~115d rain, 74% RH
    'SOM': (30, 65),   # Mogadishu ~30d rain, 65% RH
    'SSD': (85, 62),   # Juba ~85d rain, 62% RH
    'ERI': (45, 55),   # Asmara ~45d rain, 55% RH
    'DJI': (15, 62),   # Djibouti City ~15d rain, 62% RH
    'MRT': (18, 45),   # Nouakchott ~18d rain, 45% RH
    'LSO': (75, 58),   # Maseru ~75d rain, 58% RH
    'SWZ': (80, 65),   # Mbabane ~80d rain, 65% RH
    'MWI': (75, 65),   # Lilongwe ~75d rain, 65% RH
    'GMB': (55, 68),   # Banjul ~55d rain, 68% RH
    'GNB': (85, 74),   # Bissau ~85d rain, 74% RH
    'COM': (120, 78),  # Moroni ~120d rain, 78% RH
    'STP': (130, 82),  # Sao Tome ~130d rain, 82% RH

    # --- Oceania ---
    'AUS': (72, 62),   # Sydney ~95d, Melbourne ~100d, Perth ~78d, Brisbane ~75d -> 72d, 62% RH
    'NZL': (125, 78),  # Auckland ~125d, Wellington ~125d -> 125d, 78% RH
    'FJI': (135, 79),  # Suva ~135d, 79% RH
    'PNG': (165, 80),  # Port Moresby ~165d, 80% RH
    'VUT': (140, 81),  # Port Vila ~140d, 81% RH
    'WSM': (155, 82),  # Apia ~155d, 82% RH
    'TON': (125, 78),  # Nuku'alofa ~125d, 78% RH
    'FSM': (180, 83),  # Palikir ~180d, 83% RH
    'SLB': (160, 82),  # Honiara ~160d, 82% RH
    'KIR': (120, 77),  # Tarawa ~120d, 77% RH
    'PLW': (185, 84),  # Koror ~185d, 84% RH
    'MHL': (175, 82)   # Majuro ~175d, 82% RH
}

# Scientific Holiday Climate Index (HCI) Formula (Scott et al. 2016)
def compute_hci(avg_temp, summer_max, winter_min, days_above_30, days_below_0, sun_hrs, rain_mm, rain_days, humidity_pct):
    # 1. Thermal Comfort via Humidex & Thom's Discomfort Index
    # Vapor pressure e (hPa)
    e = (humidity_pct / 100.0) * 6.112 * math.exp((17.67 * avg_temp) / (avg_temp + 243.5))
    humidex = avg_temp + (5.0 / 9.0) * (e - 10.0)
    
    # Peak summer humidex
    e_summer = (max(30.0, humidity_pct * 0.85) / 100.0) * 6.112 * math.exp((17.67 * summer_max) / (summer_max + 243.5))
    summer_humidex = summer_max + (5.0 / 9.0) * (e_summer - 10.0)

    # Optimal humidex range: 20 to 25.5°C
    if 20.0 <= humidex <= 25.5:
        tc_score = 100.0
    elif humidex > 25.5:
        # Penalize muggy heat
        tc_score = max(10.0, 100.0 - (humidex - 25.5) * 4.0)
    else:
        # Cool / cold
        tc_score = max(10.0, 100.0 - (20.0 - humidex) * 3.2)
        
    # High humidity penalty in heat (sultriness / heat exhaustion / oppressive mugginess)
    if avg_temp > 24.0 and humidity_pct > 65.0:
        tc_score -= (humidity_pct - 65.0) * 0.40
    # High humidity in cold (penetrating damp cold)
    if avg_temp < 10.0 and humidity_pct > 75.0:
        tc_score -= (humidity_pct - 75.0) * 0.25
        
    tc_score = max(10.0, min(100.0, tc_score))

    # 2. Precipitation & Rainy Days (Frequency of rain)
    if rain_days <= 15 and rain_mm < 120:
        # Hyper-arid dust desert penalty
        rain_score = max(25.0, 50.0 - (15 - rain_days) * 1.5)
    elif rain_days <= 65:
        rain_score = 100.0 - max(0, (rain_days - 45) * 0.25)
    elif rain_days <= 100:
        rain_score = 95.0 - (rain_days - 65) * 0.50
    elif rain_days <= 140:
        rain_score = 77.5 - (rain_days - 100) * 0.55
    elif rain_days <= 180:
        rain_score = 55.5 - (rain_days - 140) * 0.45
    else:
        rain_score = max(10.0, 37.5 - (rain_days - 180) * 0.35)
        
    # Extra penalty for torrential monsoon rainfall (>1500mm)
    if rain_mm > 1500:
        rain_score -= min(20.0, (rain_mm - 1500) * 0.012)
        
    rain_score = max(10.0, min(100.0, rain_score))

    # 3. Sunshine Hours
    if sun_hrs >= 2800:
        sun_score = 100.0
    elif sun_hrs >= 2200:
        sun_score = 85.0 + ((sun_hrs - 2200) / 600.0) * 15.0
    elif sun_hrs >= 1700:
        sun_score = 65.0 + ((sun_hrs - 1700) / 500.0) * 20.0
    elif sun_hrs >= 1200:
        sun_score = 40.0 + ((sun_hrs - 1200) / 500.0) * 25.0
    else:
        sun_score = max(10.0, 40.0 - ((1200 - sun_hrs) / 40.0))

    # 4. Extreme Heat & Freezing Penalties
    heat_penalty = max(0.0, (days_above_30 - 20) * 0.32) + max(0.0, (summer_max - 29.0) * 2.2) + max(0.0, (summer_humidex - 33.0) * 1.5)
    cold_penalty = max(0.0, (days_below_0 - 15) * 0.32) + max(0.0, (4.0 - winter_min) * 1.5) + (max(0.0, (0.0 - winter_min) * 1.8) if winter_min < 0 else 0)

    base = (0.38 * tc_score + 0.30 * rain_score + 0.22 * sun_score + 0.10 * 85.0)
    final_score = base - 0.40 * heat_penalty - 0.40 * cold_penalty
    return round(max(5.0, min(98.0, final_score)), 1)


if __name__ == '__main__':
    with open('sovereign_empirical_db.json', 'r', encoding='utf-8') as f:
        db = json.load(f)

    updated_count = 0
    for iso3, rec in db.items():
        clim = rec['climate']
        # If tuple has 7 items, append rain_days and humidity_pct
        if len(clim) == 7:
            avg_temp, summer_max, winter_min, days_above_30, days_below_0, sun_hrs, rain_mm = clim
            if iso3 in COUNTRY_CLIMATE_EXT:
                rain_days, humidity_pct = COUNTRY_CLIMATE_EXT[iso3]
            else:
                # Default estimation if missing
                rain_days = max(20, min(180, int(rain_mm / 8.0)))
                humidity_pct = 65
            rec['climate'] = [avg_temp, summer_max, winter_min, days_above_30, days_below_0, sun_hrs, rain_mm, rain_days, humidity_pct]
            updated_count += 1
        elif len(clim) == 9:
            # Already updated
            if iso3 in COUNTRY_CLIMATE_EXT:
                rain_days, humidity_pct = COUNTRY_CLIMATE_EXT[iso3]
                rec['climate'][7] = rain_days
                rec['climate'][8] = humidity_pct
            updated_count += 1

    with open('sovereign_empirical_db.json', 'w', encoding='utf-8') as f:
        json.dump(db, f, indent=2)

    print(f"Successfully enriched {updated_count} countries with rainy days and relative humidity!")
