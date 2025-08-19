const fs = require('fs');
const path = require('path');
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
const csvPath = path.join(__dirname, 'llm_entropy_complex.csv');

// Initialize CSV writer
const writer = csvWriter({ headers: [
    'Filename',
    'CyclomaticComplexity',
    'VariableEntropy'
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

// Process each .js file
const files = fs.readdirSync(outputDir).filter(f => f.endsWith('.js'));

for (const file of files) {
    const inputPath = path.join(inputDir, file);
    const outputPath = path.join(outputDir, file);
    if(file != "func_97717.js"){
try {
        const inputCode = fs.readFileSync(inputPath, 'utf8');
        const obfuscatedCode = fs.readFileSync(outputPath, 'utf8');
        // Metrics
        console.log("Calculating complexity...");
        const complexityReport = escomplex.analyse(obfuscatedCode);
        const complexity = complexityReport.aggregate?.cyclomatic ?? -1;
        console.log("Calculating entropy...");
        const entropy = calculateEntropy(obfuscatedCode);

        // Write to CSV
        writer.write([
            file,
            complexity,
            entropy
        ]);

    } catch (err) {
        console.error(`❌ Error processing ${file}: ${err.message}`);
    }
    }
    
}

writer.end();
console.log('\n📊 Obfuscation complete. Metrics saved to CSV.');