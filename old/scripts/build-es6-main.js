#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const distMainScriptFileName = process.argv[2];
if (!distMainScriptFileName) {
  process.stdout.write('Missing: First argument which should be filename for distribution main script.');
  process.exit(1);
}

const projectRootPath = path.resolve(__dirname, '..');
const componentsPath = 'src/js/components';
const sourceMainPath = path.resolve(projectRootPath, `${componentsPath}/index.js`);
const distMainPath = path.resolve(projectRootPath, `dist/${distMainScriptFileName}`);

const sourceMainContent = fs.readFileSync(sourceMainPath, 'utf8');
const distMainContent = sourceMainContent.replace(
  /\.\//g,
  `./../${componentsPath}/`
);
fs.writeFileSync(distMainPath, distMainContent);

