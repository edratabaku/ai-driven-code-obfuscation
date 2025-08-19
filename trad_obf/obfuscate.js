const fs = require('fs');
const path = require('path');
const JavaScriptObfuscator = require('javascript-obfuscator');
const { performance } = require('perf_hooks');
const escomplex = require('escomplex');
const esprima = require('esprima');
const levenshtein = require('fast-levenshtein');
const csvWriter = require('csv-write-stream');
const crypto = require('crypto');
const deobfuscator = require('javascript-deobfuscator');


// Directories
const inputDir = path.join(__dirname, '../../../saved_functions');
const outputDir = path.join(__dirname, 'obf-results');
const csvPath = path.join(__dirname, 'trad_obfuscation_metrics.csv');

// Ensure output directory exists
if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir);
}

// Initialize CSV writer
const writer = csvWriter({ headers: [
    'Filename',
    'OriginalLength',
    'ObfuscatedLength',
    'TimeMs',
    'ReadabilityScore',
    'CyclomaticComplexity',
    'VariableEntropy',
    'LevenshteinDistance',
    'FunctionalityMatch',
    'DeobfuscationResistance'
]});
writer.pipe(fs.createWriteStream(csvPath));

// Helper: calculate entropy of variable names
function calculateEntropy(code) {
    const identifiers = [];
    const ast = esprima.parseScript(code, { tolerant: true });
    esprima.tokenize(code, {}, token => {
        if (token.type === 'Identifier') identifiers.push(token.value);
    });
    const freq = {};
    identifiers.forEach(id => freq[id] = (freq[id] || 0) + 1);
    const total = identifiers.length;
    let entropy = 0;
    for (const id in freq) {
        const p = freq[id] / total;
        entropy -= p * Math.log2(p);
    }
    return entropy.toFixed(3);
}

// Helper: readability score (AST node count)
function readabilityScore(code) {
    try {
        const ast = esprima.parseScript(code);
        let count = 0;
        const traverse = node => {
            count++;
            for (const key in node) {
                if (node[key] && typeof node[key] === 'object') {
                    traverse(node[key]);
                }
            }
        };
        traverse(ast);
        return count;
    } catch {
        return -1;
    }
}

// Helper: test functionality (basic eval comparison)
function testFunctionality(original, obfuscated) {
    try {
        const origHash = crypto.createHash('sha256').update(eval(original)).digest('hex');
        const obfHash = crypto.createHash('sha256').update(eval(obfuscated)).digest('hex');
        return origHash === obfHash;
    } catch {
        return false;
    }
}


function testDeobfuscationResistance(code) {
    try {
        const result = deobfuscator.deobfuscate(code);
        const deobCode = result.code;

        // Compare Levenshtein distance between obfuscated and deobfuscated code
        const distance = levenshtein.get(code, deobCode);

        // If distance is low, deobfuscation was effective
        if (distance < code.length * 0.3) {
            return 'Weak';
        } else if (distance < code.length * 0.6) {
            return 'Moderate';
        } else {
            return 'Strong';
        }
    } catch (err) {
        return 'Error';
    }
}

// Process each .js file
const files = fs.readdirSync(inputDir).filter(f => f.endsWith('.js'));

for (const file of files) {
    console.log(file);
    const inputPath = path.join(inputDir, file);
    const outputPath = path.join(outputDir, 'obf-' + file);
    if(file != "func_97717.js"){
try {
        const inputCode = fs.readFileSync(inputPath, 'utf8');
        const start = performance.now();
        const obfuscatedCode = JavaScriptObfuscator.obfuscate(inputCode, {
            compact: true,
            controlFlowFlattening: true,
            stringArray: true
        }).getObfuscatedCode();
        const end = performance.now();

        fs.writeFileSync(outputPath, obfuscatedCode);

        // Metrics
        console.log("Obfuscating...");
        const originalLength = inputCode.length;
        const obfuscatedLength = obfuscatedCode.length;
        const timeMs = (end - start).toFixed(2);
        console.log("Calculating readibilty");
        let readability = -1;
        try {
            readability = readabilityScore(obfuscatedCode);
        } catch (err) {
            console.warn(`⚠️ Skipping readability for ${file}: ${err.message}`);
        }
        console.log("Calculating complexity...");
        const complexityReport = escomplex.analyse(obfuscatedCode);
        const complexity = complexityReport.aggregate?.cyclomatic ?? -1;
        console.log("Calculating entropy...");
        const entropy = calculateEntropy(obfuscatedCode);
        console.log("Calculating levenshtein distance...");
        const distance = levenshtein.get(inputCode, obfuscatedCode);
        console.log("Calculating functionality match...");
        const functionalityMatch = testFunctionality(inputCode, obfuscatedCode);
        console.log("Testing deobfuscation resistance...");
        const deobRes = testDeobfuscationResistance(obfuscatedCode);

        // Write to CSV
        writer.write([
            file,
            originalLength,
            obfuscatedLength,
            timeMs,
            readability,
            complexity,
            entropy,
            distance,
            functionalityMatch,
            deobRes
        ]);

        console.log(`✅ Obfuscated ${file} in ${timeMs}ms`);
    } catch (err) {
        console.error(`❌ Error processing ${file}: ${err.message}`);
    }
    }
    
}

writer.end();
console.log('\n📊 Obfuscation complete. Metrics saved to CSV.');