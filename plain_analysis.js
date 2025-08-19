const fs = require('fs');
const path = require('path');
const { performance } = require('perf_hooks');
const escomplex = require('escomplex');
const esprima = require('esprima');
const levenshtein = require('fast-levenshtein');
const csvWriter = require('csv-write-stream');
const crypto = require('crypto');


// Directories
const inputDir = path.join(__dirname, '../../saved_functions');
const csvPath = path.join(__dirname, 'plain_metrics.csv');

// Initialize CSV writer
const writer = csvWriter({ headers: [
    'Filename',
    'OriginalLength',
    'ReadabilityScore',
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

// Process each .js file
const files = fs.readdirSync(inputDir).filter(f => f.endsWith('.js'));

for (const file of files) {
    console.log(file);
    const inputPath = path.join(inputDir, file);
    if(file != "func_97717.js"){
try {
        const inputCode = fs.readFileSync(inputPath, 'utf8');
        // Metrics
        const originalLength = inputCode.length;
        console.log("Calculating readibilty");
        let readability = -1;
        try {
            readability = readabilityScore(inputCode);
        } catch (err) {
            console.warn(`⚠️ Skipping readability for ${file}: ${err.message}`);
        }
        console.log("Calculating complexity...");
        const complexityReport = escomplex.analyse(inputCode);
        const complexity = complexityReport.aggregate?.cyclomatic ?? -1;
        console.log("Calculating entropy...");
        const entropy = calculateEntropy(inputCode);

        // Write to CSV
        writer.write([
            file,
            originalLength,
            readability,
            complexity,
            entropy,
        ]);

        console.log(`✅ Metrics for ${file} in calculated.`);
    } catch (err) {
        console.error(`❌ Error processing ${file}: ${err.message}`);
    }
    }
    
}

writer.end();
console.log('\n📊 Obfuscation complete. Metrics saved to CSV.');