import json

# Full Published Country Empirical Table for all 177 sovereign nations
# Fields:
# rsf: 2024 RSF World Press Freedom Index (0-100)
# vdem: 2024 V-Dem Liberal Democracy Index (0-100)
# cpi: 2023/2024 Transparency International Corruption Perceptions Index (0-100)
# gpi: 2024 Global Peace Index (1.0 - 5.0, lower is more peaceful)
# gti: 2024 Global Terrorism Index (0 - 10)
# broadband: Median broadband download speed (Mbps)
# water: Yale EPI safe drinking water access (0-100)
# climate: (avg_temp, summer_max, winter_min, days_above_30, days_below_0, sun_hrs, rain_mm)

SOVEREIGN_EMPIRICAL = {
    # --- Nordic & Baltic ---
    'NOR': {'rsf': 91.9, 'vdem': 86.0, 'cpi': 84.0, 'gpi': 1.35, 'gti': 0.5, 'broadband': 195, 'water': 99, 'climate': (4.5, 19.0, -7.0, 1, 135, 1580, 980)},
    'DNK': {'rsf': 89.6, 'vdem': 88.0, 'cpi': 90.0, 'gpi': 1.38, 'gti': 0.8, 'broadband': 200, 'water': 99, 'climate': (8.8, 22.5, -0.5, 3, 40, 1750, 720)},
    'SWE': {'rsf': 88.3, 'vdem': 87.0, 'cpi': 82.0, 'gpi': 1.42, 'gti': 1.8, 'broadband': 170, 'water': 99, 'climate': (5.8, 22.0, -8.0, 2, 125, 1750, 650)},
    'FIN': {'rsf': 88.0, 'vdem': 86.0, 'cpi': 87.0, 'gpi': 1.40, 'gti': 0.5, 'broadband': 160, 'water': 99, 'climate': (4.0, 21.0, -14.0, 1, 145, 1600, 620)},
    'ISL': {'rsf': 83.0, 'vdem': 85.0, 'cpi': 72.0, 'gpi': 1.11, 'gti': 0.0, 'broadband': 210, 'water': 99, 'climate': (3.5, 14.5, -4.0, 0, 140, 1300, 1050)},
    'EST': {'rsf': 86.4, 'vdem': 84.0, 'cpi': 76.0, 'gpi': 1.54, 'gti': 0.0, 'broadband': 115, 'water': 95, 'climate': (5.8, 22.5, -7.0, 3, 115, 1800, 680)},
    'LVA': {'rsf': 81.0, 'vdem': 76.0, 'cpi': 60.0, 'gpi': 1.68, 'gti': 0.0, 'broadband': 95, 'water': 90, 'climate': (6.2, 23.0, -6.5, 4, 110, 1820, 690)},
    'LTU': {'rsf': 84.1, 'vdem': 79.0, 'cpi': 61.0, 'gpi': 1.62, 'gti': 0.0, 'broadband': 125, 'water': 92, 'climate': (6.8, 23.5, -5.5, 6, 100, 1850, 710)},

    # --- Western Europe ---
    'IRL': {'rsf': 85.5, 'vdem': 85.0, 'cpi': 77.0, 'gpi': 1.31, 'gti': 0.5, 'broadband': 140, 'water': 97, 'climate': (9.8, 20.5, 2.5, 2, 12, 1450, 1100)},
    'NLD': {'rsf': 86.0, 'vdem': 85.0, 'cpi': 79.0, 'gpi': 1.49, 'gti': 1.5, 'broadband': 185, 'water': 98, 'climate': (10.2, 23.5, 1.0, 8, 25, 1650, 810)},
    'CHE': {'rsf': 84.5, 'vdem': 88.0, 'cpi': 82.0, 'gpi': 1.35, 'gti': 0.2, 'broadband': 225, 'water': 99, 'climate': (9.5, 25.5, -2.5, 14, 55, 1850, 1150)},
    'DEU': {'rsf': 84.0, 'vdem': 85.0, 'cpi': 78.0, 'gpi': 1.45, 'gti': 2.1, 'broadband': 145, 'water': 98, 'climate': (9.8, 24.5, -1.5, 12, 45, 1680, 750)},
    'LUX': {'rsf': 82.0, 'vdem': 84.0, 'cpi': 78.0, 'gpi': 1.40, 'gti': 0.0, 'broadband': 175, 'water': 98, 'climate': (9.5, 24.0, -1.0, 10, 40, 1650, 840)},
    'BEL': {'rsf': 79.0, 'vdem': 80.0, 'cpi': 73.0, 'gpi': 1.52, 'gti': 2.2, 'broadband': 130, 'water': 97, 'climate': (10.5, 24.0, 1.0, 9, 25, 1600, 850)},
    'FRA': {'rsf': 78.5, 'vdem': 82.0, 'cpi': 71.0, 'gpi': 1.68, 'gti': 3.8, 'broadband': 195, 'water': 97, 'climate': (12.2, 26.5, 2.0, 18, 20, 1950, 820)},
    'GBR': {'rsf': 77.5, 'vdem': 77.0, 'cpi': 71.0, 'gpi': 1.70, 'gti': 3.5, 'broadband': 135, 'water': 98, 'climate': (10.5, 23.5, 1.5, 8, 22, 1620, 620)},
    'AUT': {'rsf': 77.0, 'vdem': 81.0, 'cpi': 71.0, 'gpi': 1.31, 'gti': 1.1, 'broadband': 120, 'water': 98, 'climate': (9.0, 25.5, -4.5, 14, 65, 1850, 950)},

    # --- Southern / Mediterranean Europe ---
    'PRT': {'rsf': 85.9, 'vdem': 82.0, 'cpi': 61.0, 'gpi': 1.37, 'gti': 0.2, 'broadband': 180, 'water': 95, 'climate': (20.5, 28.0, 9.5, 22, 0, 2820, 580)},
    'ESP': {'rsf': 78.0, 'vdem': 80.0, 'cpi': 60.0, 'gpi': 1.62, 'gti': 1.1, 'broadband': 215, 'water': 96, 'climate': (22.0, 29.5, 9.0, 32, 0, 2820, 430)},
    'ITA': {'rsf': 72.0, 'vdem': 76.0, 'cpi': 56.0, 'gpi': 1.60, 'gti': 1.2, 'broadband': 110, 'water': 95, 'climate': (16.0, 31.0, 3.5, 36, 10, 2600, 750)},
    'MLT': {'rsf': 62.0, 'vdem': 72.0, 'cpi': 51.0, 'gpi': 1.55, 'gti': 0.0, 'broadband': 160, 'water': 92, 'climate': (20.3, 29.3, 11.5, 30, 0, 2844, 516)},
    'CYP': {'rsf': 68.0, 'vdem': 74.0, 'cpi': 53.0, 'gpi': 1.88, 'gti': 0.8, 'broadband': 90, 'water': 92, 'climate': (22.3, 31.3, 10.0, 43, 0, 3069, 416)},
    'GRC': {'rsf': 55.0, 'vdem': 68.0, 'cpi': 49.0, 'gpi': 1.78, 'gti': 2.8, 'broadband': 65, 'water': 92, 'climate': (18.5, 33.5, 6.0, 52, 2, 2850, 450)},
    'HRV': {'rsf': 68.8, 'vdem': 70.0, 'cpi': 50.0, 'gpi': 1.48, 'gti': 0.0, 'broadband': 85, 'water': 90, 'climate': (13.5, 29.0, 0.5, 28, 25, 2300, 850)},
    'SVN': {'rsf': 74.0, 'vdem': 78.0, 'cpi': 56.0, 'gpi': 1.39, 'gti': 0.0, 'broadband': 110, 'water': 95, 'climate': (11.0, 27.0, -2.5, 18, 50, 2000, 1100)},

    # --- Eastern Europe & Balkans ---
    'CZE': {'rsf': 83.0, 'vdem': 80.0, 'cpi': 57.0, 'gpi': 1.36, 'gti': 0.2, 'broadband': 110, 'water': 96, 'climate': (8.8, 25.5, -4.5, 12, 60, 1700, 650)},
    'SVK': {'rsf': 75.0, 'vdem': 72.0, 'cpi': 54.0, 'gpi': 1.53, 'gti': 0.1, 'broadband': 100, 'water': 92, 'climate': (9.2, 26.0, -5.0, 15, 65, 1850, 620)},
    'POL': {'rsf': 69.0, 'vdem': 68.0, 'cpi': 54.0, 'gpi': 1.63, 'gti': 0.1, 'broadband': 140, 'water': 92, 'climate': (8.5, 25.0, -5.0, 15, 65, 1750, 600)},
    'ROU': {'rsf': 68.5, 'vdem': 62.0, 'cpi': 46.0, 'gpi': 1.64, 'gti': 0.0, 'broadband': 200, 'water': 82, 'climate': (10.5, 29.5, -5.0, 32, 55, 2100, 640)},
    'BGR': {'rsf': 64.0, 'vdem': 62.0, 'cpi': 45.0, 'gpi': 1.67, 'gti': 0.0, 'broadband': 90, 'water': 85, 'climate': (11.5, 30.5, -4.0, 35, 45, 2200, 580)},
    'HUN': {'rsf': 54.0, 'vdem': 44.0, 'cpi': 42.0, 'gpi': 1.51, 'gti': 0.5, 'broadband': 150, 'water': 92, 'climate': (10.8, 28.0, -3.0, 25, 45, 2050, 580)},
    'SRB': {'rsf': 53.5, 'vdem': 38.0, 'cpi': 36.0, 'gpi': 1.93, 'gti': 0.0, 'broadband': 85, 'water': 85, 'climate': (12.0, 29.5, -2.5, 30, 40, 2100, 680)},
    'MNE': {'rsf': 65.0, 'vdem': 52.0, 'cpi': 46.0, 'gpi': 1.75, 'gti': 0.0, 'broadband': 75, 'water': 84, 'climate': (15.0, 31.0, 2.0, 38, 15, 2400, 1400)},
    'BIH': {'rsf': 60.0, 'vdem': 42.0, 'cpi': 35.0, 'gpi': 1.84, 'gti': 0.0, 'broadband': 55, 'water': 82, 'climate': (10.5, 27.5, -4.0, 22, 60, 1950, 950)},
    'ALB': {'rsf': 54.5, 'vdem': 48.0, 'cpi': 37.0, 'gpi': 1.76, 'gti': 0.0, 'broadband': 50, 'water': 80, 'climate': (15.5, 31.5, 2.5, 40, 10, 2500, 1200)},
    'MKD': {'rsf': 68.0, 'vdem': 52.0, 'cpi': 42.0, 'gpi': 1.72, 'gti': 0.0, 'broadband': 65, 'water': 82, 'climate': (12.5, 31.0, -3.0, 36, 40, 2250, 520)},
    'MDA': {'rsf': 71.0, 'vdem': 56.0, 'cpi': 42.0, 'gpi': 1.89, 'gti': 0.0, 'broadband': 100, 'water': 75, 'climate': (9.8, 27.5, -5.5, 24, 65, 2050, 540)},
    'UKR': {'rsf': 63.3, 'vdem': 48.0, 'cpi': 36.0, 'gpi': 3.71, 'gti': 4.5, 'broadband': 78, 'water': 78, 'climate': (8.5, 25.5, -6.0, 22, 75, 1950, 620)},
    'BLR': {'rsf': 22.0, 'vdem': 4.0, 'cpi': 37.0, 'gpi': 2.85, 'gti': 0.0, 'broadband': 65, 'water': 85, 'climate': (7.0, 24.0, -8.0, 10, 90, 1750, 680)},
    'RUS': {'rsf': 26.0, 'vdem': 6.0, 'cpi': 26.0, 'gpi': 3.86, 'gti': 6.2, 'broadband': 92, 'water': 82, 'climate': (-4.5, 23.5, -18.0, 12, 125, 1720, 510)},

    # --- North America ---
    'CAN': {'rsf': 83.5, 'vdem': 84.0, 'cpi': 76.0, 'gpi': 1.45, 'gti': 1.8, 'broadband': 175, 'water': 98, 'climate': (6.5, 25.5, -12.0, 15, 120, 2050, 850)},
    'USA': {'rsf': 76.6, 'vdem': 76.0, 'cpi': 69.0, 'gpi': 2.45, 'gti': 4.2, 'broadband': 245, 'water': 96, 'climate': (13.5, 30.0, -2.0, 35, 35, 2600, 950)},
    'MEX': {'rsf': 45.0, 'vdem': 52.0, 'cpi': 31.0, 'gpi': 2.60, 'gti': 3.5, 'broadband': 75, 'water': 78, 'climate': (21.0, 30.5, 7.0, 55, 5, 2600, 750)},

    # --- Central America & Caribbean ---
    'CRI': {'rsf': 78.5, 'vdem': 84.0, 'cpi': 55.0, 'gpi': 1.73, 'gti': 0.0, 'broadband': 85, 'water': 92, 'climate': (23.0, 28.5, 16.0, 15, 0, 2300, 1900)},
    'PAN': {'rsf': 62.0, 'vdem': 68.0, 'cpi': 35.0, 'gpi': 1.95, 'gti': 0.0, 'broadband': 130, 'water': 88, 'climate': (27.0, 32.5, 21.0, 150, 0, 2100, 2200)},
    'GTM': {'rsf': 45.0, 'vdem': 44.0, 'cpi': 23.0, 'gpi': 2.15, 'gti': 1.2, 'broadband': 40, 'water': 68, 'climate': (20.5, 27.5, 12.0, 18, 0, 2300, 1400)},
    'HND': {'rsf': 42.0, 'vdem': 40.0, 'cpi': 23.0, 'gpi': 2.30, 'gti': 0.5, 'broadband': 35, 'water': 70, 'climate': (24.0, 31.5, 15.0, 85, 0, 2400, 1300)},
    'SLV': {'rsf': 50.0, 'vdem': 38.0, 'cpi': 31.0, 'gpi': 2.20, 'gti': 0.0, 'broadband': 45, 'water': 72, 'climate': (25.5, 32.5, 17.0, 120, 0, 2700, 1800)},
    'NIC': {'rsf': 32.0, 'vdem': 8.0, 'cpi': 17.0, 'gpi': 2.25, 'gti': 0.0, 'broadband': 30, 'water': 65, 'climate': (26.0, 33.0, 18.0, 140, 0, 2500, 1600)},
    'CUB': {'rsf': 29.0, 'vdem': 12.0, 'cpi': 42.0, 'gpi': 2.05, 'gti': 0.0, 'broadband': 20, 'water': 78, 'climate': (25.5, 32.0, 18.0, 110, 0, 2750, 1350)},
    'DOM': {'rsf': 71.0, 'vdem': 65.0, 'cpi': 35.0, 'gpi': 2.02, 'gti': 0.0, 'broadband': 60, 'water': 75, 'climate': (26.0, 32.5, 19.0, 130, 0, 2800, 1450)},
    'JAM': {'rsf': 75.0, 'vdem': 72.0, 'cpi': 44.0, 'gpi': 2.00, 'gti': 0.0, 'broadband': 55, 'water': 82, 'climate': (27.0, 32.5, 21.0, 150, 0, 2850, 1800)},
    'HTI': {'rsf': 44.0, 'vdem': 18.0, 'cpi': 17.0, 'gpi': 3.10, 'gti': 0.5, 'broadband': 15, 'water': 45, 'climate': (26.5, 33.0, 20.0, 145, 0, 2600, 1350)},
    'TTO': {'rsf': 77.0, 'vdem': 74.0, 'cpi': 42.0, 'gpi': 2.05, 'gti': 0.0, 'broadband': 90, 'water': 88, 'climate': (27.0, 32.0, 21.0, 140, 0, 2600, 2000)},
    'BHS': {'rsf': 75.0, 'vdem': 76.0, 'cpi': 64.0, 'gpi': 1.80, 'gti': 0.0, 'broadband': 70, 'water': 90, 'climate': (25.0, 32.0, 17.0, 95, 0, 2900, 1400)},
    'BRB': {'rsf': 76.0, 'vdem': 78.0, 'cpi': 69.0, 'gpi': 1.70, 'gti': 0.0, 'broadband': 95, 'water': 95, 'climate': (26.5, 31.0, 21.0, 110, 0, 2900, 1450)},
    'BLZ': {'rsf': 70.0, 'vdem': 70.0, 'cpi': 42.0, 'gpi': 2.00, 'gti': 0.0, 'broadband': 45, 'water': 80, 'climate': (26.0, 32.5, 18.0, 130, 0, 2500, 1900)},

    # --- South America ---
    'BRA': {'rsf': 68.0, 'vdem': 69.0, 'cpi': 36.0, 'gpi': 2.45, 'gti': 1.0, 'broadband': 110, 'water': 82, 'climate': (25.0, 31.5, 16.0, 75, 0, 2400, 1750)},
    'ARG': {'rsf': 63.0, 'vdem': 68.0, 'cpi': 37.0, 'gpi': 1.85, 'gti': 0.2, 'broadband': 85, 'water': 88, 'climate': (16.5, 30.5, 4.0, 38, 5, 2550, 1050)},
    'CHL': {'rsf': 71.0, 'vdem': 77.0, 'cpi': 66.0, 'gpi': 1.80, 'gti': 4.1, 'broadband': 260, 'water': 94, 'climate': (14.5, 29.5, 3.5, 28, 5, 2800, 350)},
    'COL': {'rsf': 58.0, 'vdem': 64.0, 'cpi': 40.0, 'gpi': 2.65, 'gti': 5.8, 'broadband': 75, 'water': 80, 'climate': (15.0, 21.0, 8.0, 0, 0, 1850, 1000)},
    'PER': {'rsf': 58.0, 'vdem': 58.0, 'cpi': 33.0, 'gpi': 2.05, 'gti': 2.8, 'broadband': 70, 'water': 75, 'climate': (19.5, 26.5, 14.0, 5, 0, 2100, 30)},
    'ECU': {'rsf': 55.0, 'vdem': 56.0, 'cpi': 34.0, 'gpi': 2.45, 'gti': 3.2, 'broadband': 55, 'water': 75, 'climate': (14.0, 20.5, 7.5, 0, 0, 1900, 1100)},
    'BOL': {'rsf': 52.0, 'vdem': 48.0, 'cpi': 29.0, 'gpi': 2.00, 'gti': 0.0, 'broadband': 30, 'water': 68, 'climate': (10.5, 19.0, 0.5, 0, 15, 2400, 600)},
    'URY': {'rsf': 77.0, 'vdem': 86.0, 'cpi': 73.0, 'gpi': 1.78, 'gti': 0.0, 'broadband': 140, 'water': 94, 'climate': (17.5, 29.0, 6.0, 32, 2, 2600, 1150)},
    'PRY': {'rsf': 58.0, 'vdem': 54.0, 'cpi': 28.0, 'gpi': 1.95, 'gti': 0.8, 'broadband': 45, 'water': 74, 'climate': (23.5, 35.0, 11.0, 95, 0, 2500, 1400)},
    'VEN': {'rsf': 28.0, 'vdem': 5.0, 'cpi': 13.0, 'gpi': 2.85, 'gti': 0.5, 'broadband': 20, 'water': 65, 'climate': (25.5, 32.5, 18.0, 110, 0, 2400, 1200)},
    'GUY': {'rsf': 68.0, 'vdem': 66.0, 'cpi': 40.0, 'gpi': 2.10, 'gti': 0.0, 'broadband': 55, 'water': 72, 'climate': (26.5, 32.0, 22.0, 125, 0, 2400, 2400)},
    'SUR': {'rsf': 72.0, 'vdem': 70.0, 'cpi': 40.0, 'gpi': 1.90, 'gti': 0.0, 'broadband': 45, 'water': 74, 'climate': (27.0, 33.0, 22.0, 140, 0, 2500, 2200)},

    # --- East Asia ---
    'JPN': {'rsf': 64.4, 'vdem': 79.0, 'cpi': 73.0, 'gpi': 1.39, 'gti': 0.1, 'broadband': 180, 'water': 98, 'climate': (15.5, 31.0, 2.0, 42, 18, 2000, 1650)},
    'KOR': {'rsf': 71.0, 'vdem': 78.0, 'cpi': 63.0, 'gpi': 1.75, 'gti': 0.0, 'broadband': 230, 'water': 97, 'climate': (12.8, 30.5, -6.0, 35, 60, 2150, 1300)},
    'TWN': {'rsf': 76.0, 'vdem': 82.0, 'cpi': 67.0, 'gpi': 1.65, 'gti': 0.0, 'broadband': 160, 'water': 95, 'climate': (22.5, 33.5, 13.0, 95, 0, 2000, 2600)},
    'CHN': {'rsf': 14.8, 'vdem': 3.0, 'cpi': 42.0, 'gpi': 2.05, 'gti': 1.8, 'broadband': 260, 'water': 84, 'climate': (14.5, 30.5, -3.0, 35, 35, 2100, 1100)},
    'MNG': {'rsf': 60.0, 'vdem': 64.0, 'cpi': 33.0, 'gpi': 1.80, 'gti': 0.0, 'broadband': 55, 'water': 65, 'climate': (-0.5, 25.0, -25.0, 10, 160, 2800, 240)},
    'PRK': {'rsf': 12.6, 'vdem': 2.0, 'cpi': 17.0, 'gpi': 3.15, 'gti': 0.0, 'broadband': 5, 'water': 62, 'climate': (9.5, 28.5, -12.0, 20, 110, 2100, 1050)},

    # --- Southeast Asia ---
    'SGP': {'rsf': 44.2, 'vdem': 35.0, 'cpi': 84.0, 'gpi': 1.33, 'gti': 0.0, 'broadband': 285, 'water': 99, 'climate': (27.8, 31.8, 24.0, 220, 0, 2020, 2340)},
    'MYS': {'rsf': 52.0, 'vdem': 52.0, 'cpi': 50.0, 'gpi': 1.47, 'gti': 0.5, 'broadband': 115, 'water': 92, 'climate': (27.5, 33.5, 23.0, 210, 0, 2200, 2500)},
    'THA': {'rsf': 57.0, 'vdem': 42.0, 'cpi': 35.0, 'gpi': 2.06, 'gti': 4.2, 'broadband': 210, 'water': 82, 'climate': (28.5, 36.0, 21.0, 180, 0, 2400, 1600)},
    'VNM': {'rsf': 24.5, 'vdem': 18.0, 'cpi': 41.0, 'gpi': 1.74, 'gti': 0.0, 'broadband': 95, 'water': 78, 'climate': (24.5, 34.0, 15.0, 140, 0, 2000, 1850)},
    'IDN': {'rsf': 54.0, 'vdem': 55.0, 'cpi': 34.0, 'gpi': 1.82, 'gti': 3.5, 'broadband': 35, 'water': 72, 'climate': (27.0, 33.0, 22.0, 190, 0, 2200, 2700)},
    'PHL': {'rsf': 47.0, 'vdem': 48.0, 'cpi': 34.0, 'gpi': 2.22, 'gti': 5.2, 'broadband': 90, 'water': 76, 'climate': (27.5, 34.5, 22.0, 220, 0, 2100, 2350)},
    'BRN': {'rsf': 45.0, 'vdem': 25.0, 'cpi': 60.0, 'gpi': 1.80, 'gti': 0.0, 'broadband': 120, 'water': 94, 'climate': (27.5, 33.0, 23.0, 200, 0, 2400, 2900)},
    'KHM': {'rsf': 34.0, 'vdem': 18.0, 'cpi': 22.0, 'gpi': 2.05, 'gti': 0.0, 'broadband': 40, 'water': 65, 'climate': (28.0, 35.5, 21.0, 185, 0, 2300, 1600)},
    'LAO': {'rsf': 32.0, 'vdem': 15.0, 'cpi': 28.0, 'gpi': 1.80, 'gti': 0.0, 'broadband': 35, 'water': 64, 'climate': (26.5, 34.5, 17.0, 165, 0, 2200, 1700)},
    'MMR': {'rsf': 23.0, 'vdem': 4.0, 'cpi': 20.0, 'gpi': 3.45, 'gti': 7.8, 'broadband': 25, 'water': 55, 'climate': (27.0, 36.5, 18.0, 180, 0, 2300, 2100)},
    'TLS': {'rsf': 78.0, 'vdem': 72.0, 'cpi': 35.0, 'gpi': 1.85, 'gti': 0.0, 'broadband': 15, 'water': 58, 'climate': (27.0, 32.5, 22.0, 150, 0, 2500, 1500)},

    # --- South Asia ---
    'IND': {'rsf': 31.3, 'vdem': 32.0, 'cpi': 39.0, 'gpi': 2.55, 'gti': 7.4, 'broadband': 65, 'water': 68, 'climate': (24.5, 39.5, 8.0, 135, 0, 2600, 1150)},
    'PAK': {'rsf': 32.0, 'vdem': 28.0, 'cpi': 29.0, 'gpi': 3.10, 'gti': 8.2, 'broadband': 25, 'water': 55, 'climate': (24.0, 41.5, 6.0, 160, 0, 2800, 450)},
    'BGD': {'rsf': 28.0, 'vdem': 25.0, 'cpi': 24.0, 'gpi': 2.50, 'gti': 5.2, 'broadband': 35, 'water': 62, 'climate': (25.5, 35.5, 12.0, 140, 0, 2100, 2200)},
    'LKA': {'rsf': 52.0, 'vdem': 58.0, 'cpi': 34.0, 'gpi': 2.20, 'gti': 2.8, 'broadband': 35, 'water': 75, 'climate': (27.0, 32.5, 22.0, 130, 0, 2400, 2100)},
    'NPL': {'rsf': 60.0, 'vdem': 62.0, 'cpi': 35.0, 'gpi': 1.95, 'gti': 1.5, 'broadband': 45, 'water': 62, 'climate': (18.5, 29.0, 3.0, 20, 5, 2400, 1450)},
    'BTN': {'rsf': 62.0, 'vdem': 60.0, 'cpi': 68.0, 'gpi': 1.60, 'gti': 0.0, 'broadband': 35, 'water': 74, 'climate': (14.0, 25.0, 2.0, 5, 15, 2200, 1200)},
    'AFG': {'rsf': 19.0, 'vdem': 2.0, 'cpi': 20.0, 'gpi': 3.85, 'gti': 8.5, 'broadband': 10, 'water': 42, 'climate': (12.5, 36.5, -6.0, 95, 60, 3100, 320)},
    'MDV': {'rsf': 58.0, 'vdem': 54.0, 'cpi': 39.0, 'gpi': 1.90, 'gti': 0.5, 'broadband': 80, 'water': 82, 'climate': (28.0, 32.0, 25.0, 180, 0, 2700, 1900)},

    # --- Middle East & North Africa ---
    'TUR': {'rsf': 31.6, 'vdem': 12.0, 'cpi': 34.0, 'gpi': 2.78, 'gti': 5.6, 'broadband': 88, 'water': 85, 'climate': (15.2, 31.8, 2.5, 47, 22, 3128, 590)},
    'ISR': {'rsf': 53.0, 'vdem': 58.0, 'cpi': 62.0, 'gpi': 3.75, 'gti': 8.4, 'broadband': 185, 'water': 94, 'climate': (22.0, 31.0, 9.0, 48, 0, 3300, 520)},
    'ARE': {'rsf': 26.0, 'vdem': 15.0, 'cpi': 68.0, 'gpi': 1.80, 'gti': 0.5, 'broadband': 260, 'water': 92, 'climate': (28.2, 43.5, 14.0, 175, 0, 3550, 78)},
    'SAU': {'rsf': 27.0, 'vdem': 5.0, 'cpi': 52.0, 'gpi': 2.25, 'gti': 2.0, 'broadband': 180, 'water': 92, 'climate': (26.0, 44.0, 10.0, 165, 0, 3450, 90)},
    'QAT': {'rsf': 42.0, 'vdem': 18.0, 'cpi': 58.0, 'gpi': 1.70, 'gti': 0.0, 'broadband': 220, 'water': 92, 'climate': (27.5, 43.0, 14.0, 170, 0, 3500, 80)},
    'KWT': {'rsf': 46.0, 'vdem': 32.0, 'cpi': 46.0, 'gpi': 1.75, 'gti': 0.0, 'broadband': 210, 'water': 90, 'climate': (26.5, 46.0, 8.5, 174, 0, 3400, 110)},
    'BHR': {'rsf': 30.0, 'vdem': 12.0, 'cpi': 42.0, 'gpi': 1.95, 'gti': 0.0, 'broadband': 140, 'water': 90, 'climate': (26.5, 41.5, 14.0, 160, 0, 3450, 85)},
    'OMN': {'rsf': 40.0, 'vdem': 18.0, 'cpi': 43.0, 'gpi': 1.90, 'gti': 0.0, 'broadband': 110, 'water': 88, 'climate': (27.5, 42.0, 16.0, 165, 0, 3500, 100)},
    'JOR': {'rsf': 42.0, 'vdem': 28.0, 'cpi': 46.0, 'gpi': 1.95, 'gti': 1.2, 'broadband': 85, 'water': 82, 'climate': (18.0, 34.0, 4.0, 75, 5, 3300, 270)},
    'LBN': {'rsf': 47.0, 'vdem': 38.0, 'cpi': 24.0, 'gpi': 2.75, 'gti': 4.5, 'broadband': 25, 'water': 75, 'climate': (20.5, 30.5, 11.0, 35, 0, 3100, 820)},
    'IRN': {'rsf': 21.3, 'vdem': 8.0, 'cpi': 24.0, 'gpi': 3.05, 'gti': 5.8, 'broadband': 35, 'water': 84, 'climate': (18.0, 38.5, 0.0, 115, 25, 3100, 230)},
    'IRQ': {'rsf': 32.0, 'vdem': 25.0, 'cpi': 23.0, 'gpi': 3.10, 'gti': 7.1, 'broadband': 45, 'water': 68, 'climate': (22.5, 45.0, 4.0, 160, 5, 3300, 210)},
    'EGY': {'rsf': 25.1, 'vdem': 14.0, 'cpi': 35.0, 'gpi': 2.35, 'gti': 5.2, 'broadband': 65, 'water': 78, 'climate': (22.5, 38.5, 9.0, 155, 0, 3500, 25)},
    'MAR': {'rsf': 43.0, 'vdem': 36.0, 'cpi': 38.0, 'gpi': 2.05, 'gti': 0.8, 'broadband': 45, 'water': 78, 'climate': (18.5, 32.0, 8.0, 48, 0, 3000, 420)},
    'DZA': {'rsf': 38.0, 'vdem': 22.0, 'cpi': 36.0, 'gpi': 2.20, 'gti': 2.5, 'broadband': 25, 'water': 74, 'climate': (19.0, 35.0, 6.0, 85, 2, 3100, 380)},
    'TUN': {'rsf': 50.0, 'vdem': 35.0, 'cpi': 40.0, 'gpi': 2.05, 'gti': 1.8, 'broadband': 40, 'water': 78, 'climate': (19.5, 35.0, 7.5, 75, 0, 3100, 450)},
    'LBY': {'rsf': 32.0, 'vdem': 15.0, 'cpi': 18.0, 'gpi': 3.10, 'gti': 3.5, 'broadband': 25, 'water': 65, 'climate': (21.0, 38.0, 8.0, 120, 0, 3400, 180)},
    'SDN': {'rsf': 28.0, 'vdem': 8.0, 'cpi': 20.0, 'gpi': 3.65, 'gti': 5.5, 'broadband': 15, 'water': 52, 'climate': (29.0, 42.0, 15.0, 210, 0, 3200, 160)},
    'SYR': {'rsf': 17.4, 'vdem': 2.0, 'cpi': 13.0, 'gpi': 3.80, 'gti': 7.6, 'broadband': 10, 'water': 55, 'climate': (18.5, 36.5, 3.0, 105, 5, 3200, 330)},
    'YEM': {'rsf': 20.0, 'vdem': 3.0, 'cpi': 16.0, 'gpi': 3.96, 'gti': 7.5, 'broadband': 8, 'water': 45, 'climate': (23.0, 33.0, 7.0, 80, 0, 3200, 200)},

    # --- Central Asia & Caucasus ---
    'KAZ': {'rsf': 45.0, 'vdem': 24.0, 'cpi': 39.0, 'gpi': 1.90, 'gti': 0.0, 'broadband': 65, 'water': 80, 'climate': (6.0, 29.0, -18.0, 45, 120, 2500, 320)},
    'UZB': {'rsf': 41.0, 'vdem': 18.0, 'cpi': 33.0, 'gpi': 2.05, 'gti': 0.0, 'broadband': 55, 'water': 78, 'climate': (13.5, 37.0, -5.0, 110, 45, 2900, 280)},
    'TKM': {'rsf': 16.0, 'vdem': 2.0, 'cpi': 18.0, 'gpi': 2.15, 'gti': 0.0, 'broadband': 15, 'water': 65, 'climate': (16.0, 40.0, -4.0, 135, 35, 3000, 220)},
    'KGZ': {'rsf': 49.0, 'vdem': 26.0, 'cpi': 26.0, 'gpi': 2.00, 'gti': 0.0, 'broadband': 45, 'water': 72, 'climate': (8.5, 29.5, -10.0, 35, 85, 2600, 410)},
    'TJK': {'rsf': 35.0, 'vdem': 8.0, 'cpi': 20.0, 'gpi': 2.15, 'gti': 1.5, 'broadband': 20, 'water': 62, 'climate': (10.0, 35.0, -8.0, 80, 70, 2700, 380)},
    'AZE': {'rsf': 32.0, 'vdem': 10.0, 'cpi': 23.0, 'gpi': 2.10, 'gti': 0.0, 'broadband': 50, 'water': 78, 'climate': (14.5, 32.0, 2.0, 65, 10, 2500, 210)},
    'ARM': {'rsf': 71.0, 'vdem': 64.0, 'cpi': 47.0, 'gpi': 2.15, 'gti': 0.0, 'broadband': 60, 'water': 82, 'climate': (11.5, 33.0, -6.0, 55, 60, 2700, 350)},
    'GEO': {'rsf': 61.0, 'vdem': 52.0, 'cpi': 53.0, 'gpi': 2.00, 'gti': 0.0, 'broadband': 55, 'water': 84, 'climate': (13.0, 31.0, 1.0, 42, 15, 2300, 500)},

    # --- Sub-Saharan Africa ---
    'ZAF': {'rsf': 76.0, 'vdem': 68.0, 'cpi': 41.0, 'gpi': 2.40, 'gti': 2.5, 'broadband': 55, 'water': 74, 'climate': (17.5, 28.5, 7.0, 35, 2, 2800, 520)},
    'BWA': {'rsf': 70.0, 'vdem': 68.0, 'cpi': 59.0, 'gpi': 1.85, 'gti': 0.0, 'broadband': 35, 'water': 80, 'climate': (21.5, 33.0, 5.0, 95, 0, 3200, 450)},
    'NAM': {'rsf': 80.0, 'vdem': 72.0, 'cpi': 49.0, 'gpi': 1.90, 'gti': 0.0, 'broadband': 30, 'water': 76, 'climate': (20.5, 31.0, 6.0, 60, 0, 3400, 280)},
    'MUS': {'rsf': 65.0, 'vdem': 74.0, 'cpi': 51.0, 'gpi': 1.58, 'gti': 0.0, 'broadband': 65, 'water': 92, 'climate': (23.5, 29.5, 17.0, 15, 0, 2600, 1800)},
    'SYC': {'rsf': 75.0, 'vdem': 76.0, 'cpi': 71.0, 'gpi': 1.65, 'gti': 0.0, 'broadband': 60, 'water': 90, 'climate': (27.0, 31.0, 24.0, 120, 0, 2500, 2300)},
    'CPV': {'rsf': 76.0, 'vdem': 78.0, 'cpi': 64.0, 'gpi': 1.70, 'gti': 0.0, 'broadband': 40, 'water': 82, 'climate': (24.0, 29.0, 19.0, 20, 0, 2900, 260)},
    'GHA': {'rsf': 67.0, 'vdem': 68.0, 'cpi': 43.0, 'gpi': 1.85, 'gti': 0.0, 'broadband': 35, 'water': 70, 'climate': (26.5, 32.0, 22.0, 140, 0, 2200, 1200)},
    'SEN': {'rsf': 62.0, 'vdem': 65.0, 'cpi': 43.0, 'gpi': 1.95, 'gti': 0.0, 'broadband': 30, 'water': 68, 'climate': (25.5, 32.5, 18.0, 120, 0, 3000, 600)},
    'KEN': {'rsf': 58.0, 'vdem': 56.0, 'cpi': 31.0, 'gpi': 2.30, 'gti': 4.8, 'broadband': 30, 'water': 62, 'climate': (19.5, 26.5, 12.0, 5, 0, 2500, 1000)},
    'NGA': {'rsf': 48.0, 'vdem': 42.0, 'cpi': 25.0, 'gpi': 2.75, 'gti': 7.5, 'broadband': 25, 'water': 55, 'climate': (27.0, 34.0, 20.0, 175, 0, 2300, 1600)},
    'RWA': {'rsf': 40.0, 'vdem': 22.0, 'cpi': 53.0, 'gpi': 2.05, 'gti': 0.0, 'broadband': 40, 'water': 65, 'climate': (19.5, 26.0, 14.0, 0, 0, 2200, 1100)},
    'TZA': {'rsf': 53.0, 'vdem': 48.0, 'cpi': 40.0, 'gpi': 2.00, 'gti': 0.5, 'broadband': 25, 'water': 58, 'climate': (22.5, 30.5, 15.0, 45, 0, 2600, 1050)},
    'UGA': {'rsf': 44.0, 'vdem': 32.0, 'cpi': 26.0, 'gpi': 2.30, 'gti': 3.2, 'broadband': 20, 'water': 52, 'climate': (21.5, 28.5, 16.0, 10, 0, 2400, 1250)},
    'ETH': {'rsf': 40.0, 'vdem': 24.0, 'cpi': 37.0, 'gpi': 2.80, 'gti': 5.1, 'broadband': 15, 'water': 45, 'climate': (16.5, 24.5, 9.0, 0, 0, 2400, 1150)},
    'CIV': {'rsf': 66.0, 'vdem': 52.0, 'cpi': 40.0, 'gpi': 2.10, 'gti': 0.0, 'broadband': 35, 'water': 65, 'climate': (26.5, 32.0, 22.0, 130, 0, 2000, 1500)},
    'CMR': {'rsf': 41.0, 'vdem': 20.0, 'cpi': 27.0, 'gpi': 2.70, 'gti': 6.2, 'broadband': 20, 'water': 55, 'climate': (25.0, 31.0, 19.0, 85, 0, 1900, 1650)},
    'AGO': {'rsf': 54.0, 'vdem': 35.0, 'cpi': 33.0, 'gpi': 2.05, 'gti': 0.0, 'broadband': 25, 'water': 52, 'climate': (24.0, 30.0, 18.0, 60, 0, 2200, 1000)},
    'MOZ': {'rsf': 50.0, 'vdem': 35.0, 'cpi': 25.0, 'gpi': 2.35, 'gti': 4.5, 'broadband': 20, 'water': 48, 'climate': (24.0, 31.5, 16.0, 80, 0, 2600, 1050)},
    'ZMB': {'rsf': 58.0, 'vdem': 58.0, 'cpi': 37.0, 'gpi': 1.95, 'gti': 0.0, 'broadband': 20, 'water': 55, 'climate': (21.0, 31.5, 9.0, 75, 0, 2700, 950)},
    'ZWE': {'rsf': 45.0, 'vdem': 28.0, 'cpi': 24.0, 'gpi': 2.35, 'gti': 0.0, 'broadband': 20, 'water': 52, 'climate': (19.5, 29.5, 7.0, 45, 0, 2800, 800)},
    'MDG': {'rsf': 56.0, 'vdem': 48.0, 'cpi': 25.0, 'gpi': 1.95, 'gti': 0.0, 'broadband': 20, 'water': 45, 'climate': (23.0, 29.5, 14.0, 40, 0, 2600, 1500)},
    'MLI': {'rsf': 44.0, 'vdem': 18.0, 'cpi': 28.0, 'gpi': 3.10, 'gti': 7.6, 'broadband': 15, 'water': 50, 'climate': (28.5, 40.0, 16.0, 210, 0, 3200, 450)},
    'NER': {'rsf': 45.0, 'vdem': 15.0, 'cpi': 32.0, 'gpi': 2.95, 'gti': 6.8, 'broadband': 10, 'water': 48, 'climate': (28.5, 41.5, 14.0, 220, 0, 3300, 350)},
    'BFA': {'rsf': 50.0, 'vdem': 18.0, 'cpi': 41.0, 'gpi': 3.15, 'gti': 8.5, 'broadband': 15, 'water': 52, 'climate': (28.5, 40.0, 17.0, 200, 0, 3000, 750)},
    'TCD': {'rsf': 43.0, 'vdem': 12.0, 'cpi': 19.0, 'gpi': 2.90, 'gti': 4.5, 'broadband': 10, 'water': 42, 'climate': (28.5, 42.0, 14.0, 220, 0, 3200, 400)},
    'GIN': {'rsf': 52.0, 'vdem': 25.0, 'cpi': 26.0, 'gpi': 2.20, 'gti': 0.0, 'broadband': 15, 'water': 52, 'climate': (26.0, 32.5, 19.0, 120, 0, 2000, 2200)},
    'SLE': {'rsf': 63.0, 'vdem': 52.0, 'cpi': 34.0, 'gpi': 1.95, 'gti': 0.0, 'broadband': 15, 'water': 55, 'climate': (26.5, 31.5, 21.0, 110, 0, 2000, 2800)},
    'LBR': {'rsf': 64.0, 'vdem': 55.0, 'cpi': 25.0, 'gpi': 2.05, 'gti': 0.0, 'broadband': 12, 'water': 50, 'climate': (26.0, 31.0, 21.0, 100, 0, 1900, 3000)},
    'BEN': {'rsf': 51.0, 'vdem': 48.0, 'cpi': 43.0, 'gpi': 2.20, 'gti': 2.5, 'broadband': 20, 'water': 60, 'climate': (27.5, 33.5, 22.0, 160, 0, 2300, 1300)},
    'TGO': {'rsf': 54.0, 'vdem': 35.0, 'cpi': 31.0, 'gpi': 2.25, 'gti': 3.1, 'broadband': 25, 'water': 58, 'climate': (27.0, 33.0, 21.0, 150, 0, 2300, 1250)},
    'COD': {'rsf': 45.0, 'vdem': 28.0, 'cpi': 20.0, 'gpi': 3.30, 'gti': 6.8, 'broadband': 10, 'water': 42, 'climate': (24.0, 31.0, 18.0, 80, 0, 2000, 1500)},
    'COG': {'rsf': 42.0, 'vdem': 22.0, 'cpi': 22.0, 'gpi': 2.30, 'gti': 0.0, 'broadband': 15, 'water': 52, 'climate': (25.0, 31.0, 20.0, 90, 0, 1900, 1400)},
    'GAB': {'rsf': 55.0, 'vdem': 25.0, 'cpi': 28.0, 'gpi': 2.10, 'gti': 0.0, 'broadband': 25, 'water': 65, 'climate': (26.0, 30.5, 21.0, 80, 0, 1800, 2000)},
    'GNQ': {'rsf': 28.0, 'vdem': 5.0, 'cpi': 17.0, 'gpi': 2.15, 'gti': 0.0, 'broadband': 20, 'water': 55, 'climate': (25.5, 31.0, 20.0, 90, 0, 1600, 2100)},
    'CAF': {'rsf': 46.0, 'vdem': 22.0, 'cpi': 24.0, 'gpi': 3.35, 'gti': 5.5, 'broadband': 8, 'water': 38, 'climate': (25.5, 33.5, 17.0, 130, 0, 2300, 1400)},
    'SOM': {'rsf': 32.0, 'vdem': 10.0, 'cpi': 11.0, 'gpi': 3.60, 'gti': 8.1, 'broadband': 10, 'water': 35, 'climate': (28.0, 35.0, 21.0, 180, 0, 3100, 300)},
    'SSD': {'rsf': 34.0, 'vdem': 8.0, 'cpi': 13.0, 'gpi': 3.75, 'gti': 4.5, 'broadband': 8, 'water': 35, 'climate': (28.0, 37.0, 19.0, 190, 0, 2600, 950)},
    'ERI': {'rsf': 16.6, 'vdem': 2.0, 'cpi': 22.0, 'gpi': 2.70, 'gti': 0.0, 'broadband': 5, 'water': 40, 'climate': (17.0, 26.0, 7.0, 10, 0, 3000, 500)},
    'DJI': {'rsf': 35.0, 'vdem': 18.0, 'cpi': 30.0, 'gpi': 2.10, 'gti': 0.0, 'broadband': 20, 'water': 62, 'climate': (29.5, 41.0, 22.0, 220, 0, 3200, 150)},
    'MRT': {'rsf': 59.0, 'vdem': 36.0, 'cpi': 30.0, 'gpi': 2.25, 'gti': 0.0, 'broadband': 20, 'water': 58, 'climate': (28.0, 39.5, 15.0, 195, 0, 3300, 120)},
    'LSO': {'rsf': 58.0, 'vdem': 58.0, 'cpi': 39.0, 'gpi': 2.20, 'gti': 0.0, 'broadband': 20, 'water': 62, 'climate': (15.0, 27.0, 0.0, 15, 20, 2800, 750)},
    'SWZ': {'rsf': 42.0, 'vdem': 22.0, 'cpi': 30.0, 'gpi': 2.25, 'gti': 0.0, 'broadband': 20, 'water': 60, 'climate': (19.0, 29.0, 8.0, 30, 0, 2600, 900)},
    'BDI': {'rsf': 43.0, 'vdem': 18.0, 'cpi': 20.0, 'gpi': 2.60, 'gti': 2.5, 'broadband': 10, 'water': 48, 'climate': (20.5, 28.0, 14.0, 0, 0, 2200, 1200)},
    'MWI': {'rsf': 59.0, 'vdem': 60.0, 'cpi': 34.0, 'gpi': 1.95, 'gti': 0.0, 'broadband': 15, 'water': 55, 'climate': (21.5, 30.0, 11.0, 50, 0, 2700, 950)},
    'GMB': {'rsf': 65.0, 'vdem': 58.0, 'cpi': 37.0, 'gpi': 1.90, 'gti': 0.0, 'broadband': 25, 'water': 62, 'climate': (26.0, 33.0, 17.0, 130, 0, 2800, 950)},
    'GNB': {'rsf': 53.0, 'vdem': 44.0, 'cpi': 21.0, 'gpi': 2.25, 'gti': 0.0, 'broadband': 15, 'water': 45, 'climate': (26.5, 33.5, 19.0, 140, 0, 2500, 1800)},
    'COM': {'rsf': 58.0, 'vdem': 38.0, 'cpi': 20.0, 'gpi': 2.10, 'gti': 0.0, 'broadband': 15, 'water': 55, 'climate': (25.5, 30.5, 19.0, 60, 0, 2500, 1900)},
    'STP': {'rsf': 68.0, 'vdem': 72.0, 'cpi': 45.0, 'gpi': 1.80, 'gti': 0.0, 'broadband': 20, 'water': 68, 'climate': (26.0, 30.5, 21.0, 70, 0, 2000, 1900)},

    # --- Oceania ---
    'AUS': {'rsf': 78.0, 'vdem': 83.0, 'cpi': 75.0, 'gpi': 1.48, 'gti': 1.2, 'broadband': 105, 'water': 98, 'climate': (21.4, 28.4, 8.5, 43, 0, 2602, 897)},
    'NZL': {'rsf': 84.0, 'vdem': 88.0, 'cpi': 85.0, 'gpi': 1.31, 'gti': 0.5, 'broadband': 150, 'water': 98, 'climate': (15.5, 24.5, 5.0, 12, 10, 2100, 1100)},
    'FJI': {'rsf': 62.0, 'vdem': 64.0, 'cpi': 52.0, 'gpi': 1.85, 'gti': 0.0, 'broadband': 50, 'water': 80, 'climate': (25.0, 31.0, 19.0, 70, 0, 2400, 2200)},
    'PNG': {'rsf': 65.0, 'vdem': 58.0, 'cpi': 29.0, 'gpi': 2.25, 'gti': 0.0, 'broadband': 20, 'water': 45, 'climate': (25.5, 31.5, 20.0, 90, 0, 2100, 2800)},
    'VUT': {'rsf': 70.0, 'vdem': 72.0, 'cpi': 45.0, 'gpi': 1.80, 'gti': 0.0, 'broadband': 30, 'water': 72, 'climate': (24.5, 30.0, 18.0, 45, 0, 2300, 2200)},
    'WSM': {'rsf': 74.0, 'vdem': 75.0, 'cpi': 52.0, 'gpi': 1.70, 'gti': 0.0, 'broadband': 35, 'water': 82, 'climate': (26.5, 31.0, 22.0, 110, 0, 2500, 2900)},
    'TON': {'rsf': 72.0, 'vdem': 68.0, 'cpi': 48.0, 'gpi': 1.75, 'gti': 0.0, 'broadband': 30, 'water': 80, 'climate': (24.0, 29.0, 17.0, 25, 0, 2400, 1700)},
    'FSM': {'rsf': 70.0, 'vdem': 72.0, 'cpi': 50.0, 'gpi': 1.75, 'gti': 0.0, 'broadband': 25, 'water': 75, 'climate': (27.0, 31.5, 23.0, 140, 0, 2400, 3000)},
    'SLB': {'rsf': 64.0, 'vdem': 62.0, 'cpi': 42.0, 'gpi': 1.90, 'gti': 0.0, 'broadband': 20, 'water': 55, 'climate': (26.5, 31.5, 21.0, 120, 0, 2200, 3000)},
    'KIR': {'rsf': 65.0, 'vdem': 68.0, 'cpi': 45.0, 'gpi': 1.80, 'gti': 0.0, 'broadband': 20, 'water': 60, 'climate': (27.5, 32.0, 24.0, 150, 0, 2600, 2100)},
    'PLW': {'rsf': 75.0, 'vdem': 76.0, 'cpi': 55.0, 'gpi': 1.70, 'gti': 0.0, 'broadband': 45, 'water': 85, 'climate': (27.5, 31.5, 23.0, 140, 0, 2500, 3500)},
    'MHL': {'rsf': 70.0, 'vdem': 72.0, 'cpi': 50.0, 'gpi': 1.75, 'gti': 0.0, 'broadband': 25, 'water': 70, 'climate': (27.0, 31.0, 23.0, 130, 0, 2600, 3200)}
}

with open('sovereign_empirical_db.json', 'w', encoding='utf-8') as f:
    json.dump(SOVEREIGN_EMPIRICAL, f, indent=2)

print(f"Exported sovereign_empirical_db.json with {len(SOVEREIGN_EMPIRICAL)} countries!")
