const path = require('path');
const webpack = require('webpack');

const eslintConfig = require('./.eslintrc');
const baseConfig = require('./webpack.config');

const webpackConfig = Object.assign({}, baseConfig);

const stylesLoaders = ['less-loader', 'css-loader', 'style-loader'];

const styleLoaders = item => {
  if (Array.isArray(item.loader)) {
    return !item.loader.filter(subloader => stylesLoaders.includes(subloader.loader)).length;
  }

  return true;
};

module.exports = (componentsAbsolutePath, sourceCodeAbsolutePath) => {
  /* eslint-disable no-param-reassign */
  webpackConfig.module.loaders = [
    ...webpackConfig.module.loaders,
    {
      test: /\.jsx?$/,
      include: path.resolve(componentsAbsolutePath, '..'),
      loader: 'babel-loader',
      exclude: /\.test\.jsx?$/
    },
    {
      test: /\.css/,
      include: componentsAbsolutePath,
      use: [{ loader: 'style-loader' }, { loader: 'css-loader', options: { sourceMap: true, context: '/' } }]
    },
    {
      test: /\.less$/,
      include: componentsAbsolutePath,
      use: [
        { loader: 'style-loader' },
        { loader: 'css-loader', options: { sourceMap: true, context: '/' } },
        { loader: 'less-loader', options: { sourceMap: true, context: '/', strictMath: true } }
      ]
    }
  ].filter(styleLoaders);

  webpackConfig.module.loaders.push({
    test: /\.jsx?$/,
    loader: 'eslint-loader',
    include: sourceCodeAbsolutePath,
    exclude: /node_modules/,
    options: eslintConfig,
    enforce: 'pre'
  });

  // We don't want NoErrorsPlugin to be turned on - as eslint errors are blocking the building in dev mode
  webpackConfig.plugins = webpackConfig.plugins.filter(plugin => !(plugin instanceof webpack.NoEmitOnErrorsPlugin));
  /* eslint-enable */

  webpackConfig.devtool = 'source-map';
};
