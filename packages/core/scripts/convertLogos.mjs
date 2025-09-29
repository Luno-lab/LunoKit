// Copyright 2024 Luno contributors
// SPDX-License-Identifier: Apache-2.0

import fs from 'node:fs';
import path, { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const MAX_SIZE = 48 * 1024;

const HEADER =
  '// Copyright 2025 Luno contributors\n// SPDX-License-Identifier: MIT\n\n// Do not edit. Auto-generated via node scripts/convertLogos.mjs\n\n';

/**
 * Convert string to camelCase
 * @param {string} str
 * @returns {string}
 */
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

/**
 * Generate file contents
 * @param {string} exportName
 * @param {string} base64Data
 * @returns {string}
 */
function makeContents(exportName, base64Data) {
  return `${HEADER}export const ${exportName} = '${base64Data}';\n`;
}

const logosDir = path.join(__dirname, '../src/config/logos');
const generatedDir = path.join(logosDir, 'generated');

// Clean and recreate generated directory
if (fs.existsSync(generatedDir)) {
  fs.rmSync(generatedDir, { force: true, recursive: true });
}
fs.mkdirSync(generatedDir);

/** @type {Record<string, string>} */
const result = {};
/** @type {Record<string, string>} */
const allLogos = {};
/** @type {Record<string, number>} */
const oversized = {};

const LOGO_TYPES = ['chains', 'wallets'];

// Process SVG files
LOGO_TYPES.forEach((type) => {
  const typeDir = path.join(logosDir, type);
  fs.readdirSync(typeDir)
    .filter((file) => (file.endsWith('.svg') || file.endsWith('.webp')) && !file.startsWith('.'))
    .forEach((file) => {
      const fullPath = path.join(typeDir, file);
      const fileName = path.basename(file, path.extname(file)); // 获取不带扩展名的文件名
      const fileExt = path.extname(file).toLowerCase();

      const suffix = type.slice(0, -1);
      const resultSuffix = suffix.charAt(0).toUpperCase() + suffix.slice(1);

      const exportName = `${stringCamelCase(fileName)}${resultSuffix}`;
      const outputFileName = `${stringCamelCase(fileName)}${resultSuffix}`;

      if (fileExt === '.svg') {
        const buffer = fs.readFileSync(fullPath);
        const base64Data = `data:image/svg+xml;base64,${buffer.toString('base64')}`;

        const outputPath = path.join(generatedDir, `${outputFileName}.ts`);
        fs.writeFileSync(outputPath, makeContents(exportName, base64Data));

        result[exportName] = outputFileName;
        allLogos[exportName] = base64Data;

        if (buffer.length > MAX_SIZE) {
          oversized[exportName] = buffer.length;
        }

        console.log(`✅ Generated: ${exportName} (${Math.round(buffer.length / 1024)}KB)`);
      } else if (fileExt === '.webp') {
        const buffer = fs.readFileSync(fullPath);
        const base64Data = `data:image/webp;base64,${buffer.toString('base64')}`;

        const outputPath = path.join(generatedDir, `${outputFileName}.ts`);
        fs.writeFileSync(outputPath, makeContents(exportName, base64Data));

        result[exportName] = outputFileName;
        allLogos[exportName] = base64Data;

        if (buffer.length > MAX_SIZE) {
          oversized[exportName] = buffer.length;
        }

        console.log(`✅ Generated: ${exportName} (${Math.round(buffer.length / 1024)}KB)`);
      }
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

// Check oversized files
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
