with open('scripts/generate_dataset.py', 'r', encoding='utf-8') as f:
    code = f.read()

import re
matches = re.findall(r"'([A-Z]{3})':\s*\{", code)
print("Explicitly defined countries count:", len(matches))
print("Explicitly defined countries:", sorted(matches))
