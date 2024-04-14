/* eslint-disable no-console */
const fs = require('fs').promises;
const path = require('path');
const { toSnakeCase } = require('@rothko-ui/utils');

const usageDirName = 'usage';
const outputFileName = 'sourceCode.ts';

// Helper to escape backticks and backslashes for template literal syntax
const escapeForTemplateLiteral = str => str.replace(/\\/g, '\\\\').replace(/`/g, '\\`');

const cleanComponent = str => {
  return str
    .replace(/import\s+(type\s+)?\{\s*RothkoKind\s*\}\s+from\s+'@rothko-ui\/ui';\s*/, '') // Remove import type { RothkoKind } from '@rothko-ui/ui';
    .replace(/\(props:\s*\{[^}]*\}\)\s*=>\s*/, '() => ') // Remove prop type annotation
    .replace(/\s+kind={props\.kind}/, ' kind="info"'); // Remove kind={props.kind} and set it to "info"
};

// Function to process .tsx files in a given 'usage' directory
async function processUsageDir(dirPath) {
  let aggregatedSource = '';
  const fileNames = await fs.readdir(dirPath);
  for (const fileName of fileNames) {
    if (fileName.endsWith('.tsx')) {
      const fileContent = await fs.readFile(path.join(dirPath, fileName), 'utf8');
      const varName = toSnakeCase(path.basename(fileName, '.tsx')).toUpperCase();
      aggregatedSource += `export const ${varName} = \`\n${cleanComponent(
        escapeForTemplateLiteral(fileContent)
      )}\`;\n`;
    }
  }
  if (aggregatedSource) {
    // Write the aggregated source to a `sourceCode.ts` file in the current 'usage' directory
    await fs.writeFile(path.join(dirPath, outputFileName), aggregatedSource);
    console.log(`Generated ${outputFileName} in ${dirPath}`);
  }
}

// Recursive function to find 'usage' directories and initiate processing of .tsx files within them
async function findAndProcessUsageDirs(dirPath) {
  const entries = await fs.readdir(dirPath, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dirPath, entry.name);
    if (entry.isDirectory()) {
      // If it's a 'usage' directory, process it
      if (entry.name === usageDirName) {
        await processUsageDir(fullPath);
      } else {
        // Otherwise, continue searching recursively
        await findAndProcessUsageDirs(fullPath);
      }
    }
  }
}

async function generateSourceCode() {
  const rootDir = './'; // Set your root directory here
  await findAndProcessUsageDirs(rootDir);
}

generateSourceCode().catch(error => {
  console.error('Failed to generate source code:', error);
});
