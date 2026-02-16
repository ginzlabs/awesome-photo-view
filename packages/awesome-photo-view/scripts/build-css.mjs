import less from 'less';
import { readFileSync, writeFileSync, readdirSync, statSync } from 'fs';
import { join, resolve } from 'path';

const srcDir = resolve('src');
const outFile = resolve('dist/awesome-photo-view.css');

function findLessFiles(dir) {
  const files = [];
  for (const entry of readdirSync(dir)) {
    const fullPath = join(dir, entry);
    if (statSync(fullPath).isDirectory()) {
      files.push(...findLessFiles(fullPath));
    } else if (entry.endsWith('.less')) {
      files.push(fullPath);
    }
  }
  return files;
}

const lessFiles = findLessFiles(srcDir);
let combined = '';

for (const file of lessFiles) {
  combined += readFileSync(file, 'utf-8') + '\n';
}

const result = await less.render(combined);
writeFileSync(outFile, result.css);
console.log(`Built ${outFile} (${result.css.length} bytes)`);
