import sys
import json
import shutil
import os

backup_path = 'public/world-50m.json.bak'
target_path = 'public/world-50m.json'

# Backup original if not already backed up
if not os.path.exists(backup_path):
    shutil.copyfile(target_path, backup_path)
    print(f"Created backup at {backup_path}")
else:
    print(f"Backup already exists at {backup_path}")

# Always read from backup to ensure repeatable, deterministic transforms
with open(backup_path, 'r', encoding='utf-8') as f:
    topo = json.load(f)

scale = topo['transform']['scale']
translate = topo['transform']['translate']
arcs = topo['arcs']

def decode_ring(ring):
    pts = []
    for arc_idx in ring:
        if arc_idx < 0:
            raw_arc = arcs[~arc_idx]
            curr = []
            x, y = 0, 0
            for dx, dy in raw_arc:
                x += dx
                y += dy
                curr.append((x * scale[0] + translate[0], y * scale[1] + translate[1]))
            pts.extend(curr[::-1])
        else:
            raw_arc = arcs[arc_idx]
            x, y = 0, 0
            for dx, dy in raw_arc:
                x += dx
                y += dy
                pts.append((x * scale[0] + translate[0], y * scale[1] + translate[1]))
    return pts

geoms = topo['objects']['countries']['geometries']
new_geoms = []

# Identifiers to completely remove (Antarctica, Greenland, polar dependencies)
EXCLUDE_IDS = {'010', '10', '304', '260', '239', '334'}
EXCLUDE_NAMES = {
    'Antarctica', 
    'Greenland', 
    'Fr. S. Antarctic Lands', 
    'S. Geo. and the Is.', 
    'Heard I. and McDonald Is.'
}

removed_countries = []

for g in geoms:
    gid = str(g.get('id', ''))
    name = g.get('properties', {}).get('name', '')
    
    # 1. Drop Antarctica, Greenland, and polar dependencies entirely
    if gid in EXCLUDE_IDS or name in EXCLUDE_NAMES:
        removed_countries.append(f"{gid} ({name})")
        continue
    
    # 2. Canada (id: 124): drop Arctic archipelago islands north of mainland
    if gid == '124':
        original_polys = g.get('arcs', [])
        kept_polys = []
        dropped_names = []
        for i, poly in enumerate(original_polys):
            pts = decode_ring(poly[0])
            lats = [p[1] for p in pts]
            min_lat = min(lats)
            max_lat = max(lats)
            
            # Poly #3 is Canada mainland
            is_mainland = (min_lat < 45.0 and max_lat > 70.0 and len(pts) > 1000)
            
            # Arctic islands have min_lat >= 60.0 (Baffin, Ellesmere, Victoria, Devon, etc.)
            # Southern inhabited islands (Vancouver Island, Newfoundland, PEI, Cape Breton, Haida Gwaii, St Lawrence) have min_lat < 55.0
            if is_mainland or min_lat < 60.0:
                kept_polys.append(poly)
            else:
                dropped_names.append((i, len(pts), min_lat, max_lat))
        
        g['arcs'] = kept_polys
        print(f"Canada (124): kept {len(kept_polys)} / {len(original_polys)} polygons (dropped {len(dropped_names)} Arctic island polygons)")
        new_geoms.append(g)
        continue

    # 3. Russia (id: 643): drop Arctic islands north of mainland
    if gid == '643':
        original_polys = g.get('arcs', [])
        kept_polys = []
        dropped_names = []
        for i, poly in enumerate(original_polys):
            pts = decode_ring(poly[0])
            lats = [p[1] for p in pts]
            min_lat = min(lats)
            max_lat = max(lats)
            
            # Poly #17 is Russia mainland
            is_mainland = (min_lat < 45.0 and max_lat > 70.0 and len(pts) > 1000)
            
            # Russian Arctic islands (Novaya Zemlya, Severnaya Zemlya, Franz Josef Land, New Siberian Islands, Wrangel Island) have min_lat >= 68.0
            # Non-arctic islands (Sakhalin, Kuril Islands, Crimea, Kaliningrad, Solovetsky, Ob delta) have min_lat < 67.0
            if is_mainland or min_lat < 68.0:
                kept_polys.append(poly)
            else:
                dropped_names.append((i, len(pts), min_lat, max_lat))
        
        g['arcs'] = kept_polys
        print(f"Russia (643): kept {len(kept_polys)} / {len(original_polys)} polygons (dropped {len(dropped_names)} Arctic island polygons)")
        new_geoms.append(g)
        continue

    # 4. Norway (id: 578): drop Arctic islands north of mainland (Svalbard, Bear Island, Jan Mayen)
    if gid == '578':
        original_polys = g.get('arcs', [])
        kept_polys = []
        dropped_names = []
        for i, poly in enumerate(original_polys):
            pts = decode_ring(poly[0] if isinstance(poly[0], list) else poly)
            lats = [p[1] for p in pts]
            lons = [p[0] for p in pts]
            min_lat = min(lats)
            max_lat = max(lats)
            min_lon = min(lons)
            
            # Poly #0 is Norway mainland (pts=997, lat 58.02 to 71.09)
            is_mainland = (len(pts) > 500)
            
            # Svalbard & Bear Island have min_lat >= 73.0, Jan Mayen has lon < 0 & lat >= 70.0
            is_arctic_island = (min_lat >= 73.0) or (min_lon < 0 and min_lat >= 70.0)
            
            if is_mainland or not is_arctic_island:
                kept_polys.append(poly)
            else:
                dropped_names.append((i, len(pts), min_lat, max_lat))
        
        g['arcs'] = kept_polys
        print(f"Norway (578): kept {len(kept_polys)} / {len(original_polys)} polygons (dropped {len(dropped_names)} Arctic island polygons)")
        new_geoms.append(g)
    new_geoms.append(g)

topo['objects']['countries']['geometries'] = new_geoms
print(f"Total geometries: {len(geoms)} -> {len(new_geoms)}")
print(f"Removed countries/territories: {', '.join(removed_countries)}")

# 5. St. Lawrence Island (Arc 99): shift longitudes east of -169.4 to prevent splitting across the Bering Strait antimeridian
arc_99 = topo['arcs'][99]
abs_pts = []
x, y = 0, 0
for dx, dy in arc_99:
    x += dx
    y += dy
    lon = x * scale[0] + translate[0]
    lat = y * scale[1] + translate[1]
    abs_pts.append((lon, lat))
min_lon = min(p[0] for p in abs_pts)
shift = (-169.0) - min_lon
shifted_pts = [(p[0] + shift, p[1]) for p in abs_pts]
last_qx, last_qy = 0, 0
new_arc_99 = []
for p in shifted_pts:
    qx = int(round((p[0] - translate[0]) / scale[0]))
    qy = int(round((p[1] - translate[1]) / scale[1]))
    new_arc_99.append([qx - last_qx, qy - last_qy])
    last_qx, last_qy = qx, qy
topo['arcs'][99] = new_arc_99
print("Shifted St. Lawrence Island (arc 99) east of Bering cut line")

# Save updated TopoJSON
with open(target_path, 'w', encoding='utf-8') as f:
    json.dump(topo, f, separators=(',', ':'))

print(f"Successfully saved updated {target_path} (size: {os.path.getsize(target_path):,} bytes)")
