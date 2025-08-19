import os
import time
import csv
import json
import requests
import re
import math
import jsbeautifier
from radon.complexity import cc_visit
from Levenshtein import distance as levenshtein_distance
import ollama
import subprocess
import json
import tempfile
import os
import re
import math
# Paths
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
INPUT_DIR = os.path.join(BASE_DIR, '../../../saved_functions')
OUTPUT_DIR = os.path.join(BASE_DIR, 'obf-results')
CSV_PATH = os.path.join(BASE_DIR, 'llm_obfuscation_metrics.csv')

# Ensure output directory exists
os.makedirs(OUTPUT_DIR, exist_ok=True)

# Ollama API
OLLAMA_URL = "http://localhost:11434/api/generate"
MODEL_NAME = "mistral"

# Prompt template
PROMPT_TEMPLATE = """Obfuscate the following JavaScript code using:
- Control flow flattening
- Variable renaming
- String encoding

Ensure the functionality remains unchanged. Return only the obfuscated code nothing else, no other text just immediately the obfuscated code and only one version of it.

Code:
```javascript
{code}
```"""

# Utility functions
def get_variable_entropy(code):
    # Extract variable names from var, let, const declarations
    variables = re.findall(r'\bvar\s+(\w+)|\blet\s+(\w+)|\bconst\s+(\w+)', code)
    # Flatten the tuples and filter out empty matches
    var_names = [v for group in variables for v in group if v]
    if not var_names:
        return 0.0
    # Calculate frequency of each variable name
    freqs = {}
    for v in var_names:
        freqs[v] = freqs.get(v, 0) + 1
    total = sum(freqs.values())
    # Calculate Shannon entropy over variable *frequency* distribution
    entropy = -sum((count / total) * math.log2(count / total) for count in freqs.values())
    return round(entropy, 3)


def get_readability(code):
    # Use AST metrics: indentation, line length, etc.
    beautified = jsbeautifier.beautify(code)
    lines = beautified.splitlines()
    avg_indent = sum(len(line) - len(line.lstrip()) for line in lines) / len(lines)
    avg_length = sum(len(line) for line in lines) / len(lines)
    return round(avg_indent + avg_length / 100, 3)

def get_cyclomatic_complexity(code):
    # Create temp file and close it immediately to release handle
    with tempfile.NamedTemporaryFile(mode='w', suffix='.js', delete=False, encoding='utf-8') as temp:
        temp.write(code)
        temp_path = temp.name

    try:
        result = subprocess.run(
            ["npx", "typhonjs-escomplex", temp_path, "--output", "json"],
            capture_output=True,
            text=True,
            check=True  # optional: raises exception if process fails
        )
        output = json.loads(result.stdout)
        functions = output.get('functions', [])
        complexities = [fn['cyclomatic'] for fn in functions]
        return sum(complexities) if complexities else 0
    except Exception as e:
        print("Error during JS complexity analysis:", e)
        return -1
    finally:
        # Wait a tiny bit if needed (optional)
        # time.sleep(0.1)
        # Now safe to remove
        os.remove(temp_path)


def test_functionality(original_code, obfuscated_code):
    # Basic test: compare outputs of a known function
    test_input = "console.log('test');"
    try:
        with open("temp_original.js", "w") as f:
            f.write(original_code + "\n" + test_input)
        with open("temp_obfuscated.js", "w") as f:
            f.write(obfuscated_code + "\n" + test_input)
        orig_out = os.popen("node temp_original.js").read().strip()
        obf_out = os.popen("node temp_obfuscated.js").read().strip()
        os.remove("temp_original.js")
        os.remove("temp_obfuscated.js")
        return orig_out == obf_out
    except Exception:
        return False

def test_deobfuscation_resistance(code):
    # Try beautifying and checking if it's readable
    beautified = jsbeautifier.beautify(code)
    return get_readability(beautified) < get_readability(code)

import subprocess

# def obfuscate(code):
#     prompt = PROMPT_TEMPLATE.format(code=code)
#     try:
#         response = ollama.chat(
#             model='mistral',  
#             messages=[{'role': 'user', 'content': prompt}]
#         )

#         obfuscated_code = response['message']['content']
#         return obfuscated_code
#     except subprocess.TimeoutExpired:
#         return "// Obfuscation timed out"

# Main loop
with open(CSV_PATH, mode='w', newline='', encoding='utf-8') as csvfile:
    writer = csv.writer(csvfile)
    writer.writerow([
        "Filename", "OriginalLength", "ObfuscatedLength", #"Time" #,
        "Readability", "Cyclomatic Complexity", "Variable Entropy",
        "Levenshtein Distance", "Functionality Preserved", "Deobfuscation Resistance"
    ])
    for filename in os.listdir(OUTPUT_DIR):
        saved_file = os.path.join(INPUT_DIR, filename)
        obf_file = os.path.join(OUTPUT_DIR, filename)
    # Check if there's a matching file in obf-results
        if os.path.exists(obf_file):
            print(obf_file)
            print(saved_file)
            with open(saved_file, 'r', encoding='utf-8') as f1, open(obf_file, 'r', encoding='utf-8') as f2:
                saved_content = f1.read()
                obf_content = f2.read()

        # for filename in os.listdir(INPUT_DIR):
        #     if filename.endswith(".js") and count <= 60 and filename > 'func_100031.js':
        #         filepath = os.path.join(INPUT_DIR, filename)
        #         with open(filepath, "r", encoding="utf-8") as f:
        #             original_code = f.read()
        #         print(f"Obfuscating {filename}...")
        #         start_time = time.time()
        #         obfuscated_code = obfuscate(original_code)
        #         elapsed = round(time.time() - start_time, 3)

                obf_path = os.path.join(OUTPUT_DIR, filename)
                with open(obf_path, "w", encoding="utf-8") as f:
                    f.write(obf_content)
                print(f"Calculating metrics for {filename}...")
                if filename == 'func_100087.js':
                    metrics = {
                    "filename": filename,
                    "orig_len": len(saved_content),
                    "obf_len": len(obf_content),
                    # "time": elapsed #,
                    "readability": get_readability(obf_content),
                    "complexity": -1,
                    "entropy": get_variable_entropy(obf_content),
                    "levenshtein": levenshtein_distance(saved_content, obf_content),
                    "functionality": False,
                    "resistance": test_deobfuscation_resistance(obf_content)
                    }

                    writer.writerow([
                        metrics["filename"], metrics["orig_len"], metrics["obf_len"],
                        #metrics["time"] # , 
                        metrics["readability"], metrics["complexity"],
                        metrics["entropy"], metrics["levenshtein"],
                        metrics["functionality"], metrics["resistance"]
                    ])
                else:
                    metrics = {
                    "filename": filename,
                    "orig_len": len(saved_content),
                    "obf_len": len(obf_content),
                    # "time": elapsed #,
                    "readability": get_readability(obf_content),
                    "complexity": get_cyclomatic_complexity(obf_content),
                    "entropy": get_variable_entropy(obf_content),
                    "levenshtein": levenshtein_distance(saved_content, obf_content),
                    "functionality": test_functionality(saved_content, obf_content),
                    "resistance": test_deobfuscation_resistance(obf_content)
                    }

                    writer.writerow([
                        metrics["filename"], metrics["orig_len"], metrics["obf_len"],
                        #metrics["time"] # , 
                        metrics["readability"], metrics["complexity"],
                        metrics["entropy"], metrics["levenshtein"],
                        metrics["functionality"], metrics["resistance"]
                    ])
                # count +=1

print("✅ Obfuscation complete. Metrics saved to:", CSV_PATH)