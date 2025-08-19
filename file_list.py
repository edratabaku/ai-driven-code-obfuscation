import os
import json

# 1. Get the path to the saved_functions folder relative to this script
current_dir = os.path.dirname(os.path.abspath(__file__))  # path to src/
folder_path = os.path.join(current_dir, '../../saved_functions')  # go up one level and into saved_functions

# 2. List all files and sort alphabetically
file_names = sorted(os.listdir(folder_path))

# 3. Save the array to a JSON file (can save in project root or anywhere you like)
output_path = os.path.join(current_dir, '../file_list.json')
with open(output_path, 'w') as f:
    json.dump(file_names, f, indent=4)

print(f"{len(file_names)} files saved to {output_path}")
