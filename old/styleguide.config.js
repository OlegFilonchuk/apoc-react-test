const path = require('path');

const packageName = require('./package.json').name;

const SERVER_PORT = 1234;
const OUTPUT_DIR = 'guide';

module.exports = {
  title: 'Apoc React',

  sections: [
    {
      name: 'Introduction',
      content: 'docs/intro.md'
    },

    {
      name: 'Changelog',
      content: 'CHANGELOG.md'
    },

    {
      name: 'Quick Start',
      content: 'docs/quickstart.md'
    },

    {
      name: 'Gitflow',
      content: 'docs/gitflow.md'
    },

    {
      name: 'Development',
      content: 'docs/development.md'
    },

    {
      name: 'Making new release',
      content: 'docs/making-new-release.md'
    },

    {
      name: 'Components',
      content: 'docs/components.md',
      components: 'src/**/*.jsx',
      ignore: 'src/**/*.test.jsx'
    }
  ],

  serverPort: SERVER_PORT,

  styleguideDir: OUTPUT_DIR,

  assetsDir: './node_modules/',

  getComponentPathLine(componentPath) {
    const moduleName = path.basename(componentPath, '.jsx');

    return `import { ${moduleName} } from '${packageName}';`;
  },

  template: './docs/template/index.html',

  skipComponentsWithoutExample: true
};
