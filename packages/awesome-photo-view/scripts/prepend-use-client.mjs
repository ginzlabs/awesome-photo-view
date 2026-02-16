import { readFileSync, writeFileSync } from 'fs';
import { resolve } from 'path';

const directive = '"use client";\n';
const files = ['dist/index.js', 'dist/index.cjs'];

for (const file of files) {
  const filePath = resolve(file);
  const content = readFileSync(filePath, 'utf-8');
  if (!content.startsWith('"use client"')) {
    writeFileSync(filePath, directive + content);
    console.log(`Prepended "use client" to ${file}`);
  }
}
