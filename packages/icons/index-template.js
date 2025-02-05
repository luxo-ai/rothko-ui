const path = require('path');
const kebabCase = require('lodash.kebabcase');

function importFrom(imports, pkg) {
  const importsList = typeof imports === 'string' ? [imports] : imports;
  return `import { ${importsList.join(', ')} } from '${pkg}'`;
}

function exportFromModule(exports) {
  const exportsList = typeof exports === 'string' ? [exports] : exports;
  return `export { ${exportsList.join(', ')} }`;
}

function importDefaultFrom(exportName, pkg) {
  return importFrom(`default as ${exportName}`, pkg);
}

function lazyDefaultImport(pkg) {
  return `lazy(() => import("${pkg}"))`;
}

function defaultIndexTemplate(filePaths) {
  const svgs = filePaths.map(filePath => {
    const baseName = path.basename(filePath, path.extname(filePath));
    const name = /^\d/.test(baseName) ? `Svg${baseName}` : baseName;
    const kebabName = kebabCase(name);
    return { name, kebabName, path: `./${baseName}` };
  });

  const reactImports = importFrom(
    ['lazy', 'type SVGProps', 'type JSX', 'type LazyExoticComponent'],
    'react'
  );
  const svgImports = svgs.map(({ name, path }) => importDefaultFrom(name, path)).join('\n');

  const exportNames = svgs.map(({ name }) => name);
  const svgExports = exportFromModule(exportNames);

  const iconKey = [
    'export',
    'type',
    'IconKey',
    '=',
    `${svgs.map(({ kebabName }) => `'${kebabName}'`).join(' | ')};`,
  ].join(' ');

  const iconLazyLookup = [
    'export',
    'const',
    'iconLazyLookup:',
    'Record<IconKey, LazyExoticComponent<(props: SVGProps<SVGSVGElement>) => JSX.Element>>',
    '=',
    '{',
    svgs.map(({ kebabName, path }) => `'${kebabName}': ${lazyDefaultImport(path)}`).join(', '),
    '};',
  ].join(' ');

  const fileParts = [
    `// This file is generated automatically. Do not modify this file manually.`,
    `// Run \`yarn svgr\` to update this file.`,
    '',
    reactImports,
    svgImports,
    '',
    svgExports,
    '',
    iconKey,
    '',
    iconLazyLookup,
    '',
  ];

  return fileParts.join('\n');
}

module.exports = defaultIndexTemplate;
