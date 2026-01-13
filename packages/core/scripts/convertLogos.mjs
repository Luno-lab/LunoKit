import fs from 'node:fs';
import path, { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const MAX_SIZE = 48 * 1024;

const HEADER =
  '// Copyright 2025 Luno contributors\n// SPDX-License-Identifier: MIT\n\n// Do not edit. Auto-generated via node scripts/convertLogos.mjs\n\n';

function stringCamelCase(str) {
  return str
    .split(/[-\s]+/)
    .map((word, index) => {
      return index === 0
        ? word.toLowerCase()
        : word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    })
    .join('');
}

function makeContents(exportName, base64Data) {
  return `${HEADER}export const ${exportName} = '${base64Data}';\n`;
}

const logosDir = path.join(__dirname, '../src/config/logos');
const generatedDir = path.join(logosDir, 'generated');

if (fs.existsSync(generatedDir)) {
  fs.rmSync(generatedDir, { force: true, recursive: true });
}
fs.mkdirSync(generatedDir);

const result = {};
const allLogos = {};
const oversized = {};

const SOURCE_DIRS = [
  { path: 'chains/substrate', suffix: 'Chain' },
  { path: 'chains/evm', suffix: 'Chain', prefix: 'Evm' },

  { path: 'wallets/evm', suffix: 'Wallet', prefix: 'Evm' },
  { path: 'wallets/substrate', suffix: 'Wallet', prefix: 'Substrate' },

  { path: 'wallets', suffix: 'Wallet', excludeSubdirs: true }
];

SOURCE_DIRS.forEach(({ path: subPath, suffix, prefix, excludeSubdirs }) => {
  const typeDir = path.join(logosDir, subPath);

  if (!fs.existsSync(typeDir)) {
    console.warn(`⚠️  Directory not found: ${subPath}, skipping...`);
    return;
  }

  fs.readdirSync(typeDir)
    .filter((file) => {
      const fullPath = path.join(typeDir, file);
      if (excludeSubdirs && fs.statSync(fullPath).isDirectory()) return false;

      return (file.endsWith('.svg') || file.endsWith('.webp')) && !file.startsWith('.');
    })
    .forEach((file) => {
      const fullPath = path.join(typeDir, file);
      const fileName = path.basename(file, path.extname(file));
      const fileExt = path.extname(file).toLowerCase();

      const camelName = stringCamelCase(fileName);
      const prefixStr = prefix || '';
      const suffixStr = suffix;

      const exportName = `${camelName}${prefixStr}${suffixStr}`;
      const outputFileName = exportName;

      let base64Data = '';
      const buffer = fs.readFileSync(fullPath);

      if (fileExt === '.svg') {
        base64Data = `data:image/svg+xml;base64,${buffer.toString('base64')}`;
      } else if (fileExt === '.webp') {
        base64Data = `data:image/webp;base64,${buffer.toString('base64')}`;
      }

      const outputPath = path.join(generatedDir, `${outputFileName}.ts`);
      fs.writeFileSync(outputPath, makeContents(exportName, base64Data));

      result[exportName] = outputFileName;
      allLogos[exportName] = base64Data;

      if (buffer.length > MAX_SIZE) {
        oversized[exportName] = buffer.length;
      }

      console.log(`✅ Generated: ${exportName} (${Math.round(buffer.length / 1024)}KB)`);
    });
});

if (Object.keys(result).length > 0) {
  const indexContent = `${HEADER}${Object.keys(result)
    .sort()
    .map((exportName) => `export { ${exportName} } from './${result[exportName]}.js';`)
    .join('\n')}\n`;

  fs.writeFileSync(path.join(generatedDir, 'index.ts'), indexContent);
  console.log(`✅ Generated index.ts with ${Object.keys(result).length} exports`);
}

const allKeys = Object.keys(allLogos);
const dupes = {};

allKeys.forEach((a) => {
  const duplicates = allKeys.filter((b) => a !== b && allLogos[a] === allLogos[b]);

  if (duplicates.length > 0) {
    dupes[a] = duplicates;
  }
});

if (Object.keys(dupes).length > 0) {
  console.warn('\n⚠️  Duplicate logos found:');
  Object.entries(dupes).forEach(([key, duplicates]) => {
    console.warn(`   ${key} >> ${duplicates.join(', ')}`);
  });
}

if (Object.keys(oversized).length > 0) {
  console.error('\n❌ Files exceeding 48KB limit:');
  Object.entries(oversized).forEach(([key, size]) => {
    console.error(
      `   ${key}: ${Math.round(size / 1024)}KB (+${Math.round((size - MAX_SIZE) / 1024)}KB over limit)`
    );
  });
  process.exit(1);
}

console.log('\n🎉 Logo conversion completed successfully!');
