/**
 * Build smoke test: verifies the dist output is correct.
 * Run after `pnpm build` to check file existence, "use client" directive, and size-limit.
 */
import { readFileSync, existsSync } from 'fs';
import { resolve } from 'path';
import { execSync } from 'child_process';

const dist = resolve('dist');
let failed = false;

function check(label, condition) {
  if (condition) {
    console.log(`  PASS  ${label}`);
  } else {
    console.log(`  FAIL  ${label}`);
    failed = true;
  }
}

console.log('\nVerifying build output...\n');

// 1. Check required files exist
const requiredFiles = [
  'index.js',      // ESM
  'index.cjs',     // CJS
  'index.d.ts',    // ESM types
  'index.d.cts',   // CJS types
  'awesome-photo-view.css',
];

for (const file of requiredFiles) {
  check(`${file} exists`, existsSync(resolve(dist, file)));
}

// 2. Check "use client" directive
for (const file of ['index.js', 'index.cjs']) {
  const content = readFileSync(resolve(dist, file), 'utf-8');
  check(`${file} starts with "use client"`, content.startsWith('"use client"'));
}

// 3. Check ESM file uses import/export syntax (not require)
const esmContent = readFileSync(resolve(dist, 'index.js'), 'utf-8');
check('index.js (ESM) contains import statements', esmContent.includes('import '));
check('index.js (ESM) contains export statements', esmContent.includes('export '));

// 4. Check CJS file uses require syntax
const cjsContent = readFileSync(resolve(dist, 'index.cjs'), 'utf-8');
check('index.cjs (CJS) contains "use strict"', cjsContent.includes("'use strict'"));

// 5. Check CSS is non-empty
const cssContent = readFileSync(resolve(dist, 'awesome-photo-view.css'), 'utf-8');
check('CSS file is non-empty', cssContent.length > 100);

// 6. Run size-limit
console.log('\nRunning size-limit...\n');
try {
  execSync('npx size-limit', { stdio: 'inherit' });
  console.log('\n  PASS  size-limit check');
} catch {
  console.log('\n  FAIL  size-limit check');
  failed = true;
}

// Summary
console.log(failed ? '\nBuild verification FAILED.\n' : '\nBuild verification PASSED.\n');
process.exit(failed ? 1 : 0);
