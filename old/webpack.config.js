const fs = require('fs');
const gracefulFs = require('graceful-fs');

const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const execSync = require('child_process').execSync;
const packageInfo = require('./package.json');

const gitSha1 = execSync('git rev-parse --short HEAD')
  .toString()
  .trim();
const packageName = packageInfo.name.replace(/@[^/]+\//, '');
const buildVersion = process.env.BUILD_NUMBER || '0';
const packageVersion = `${packageInfo.version}-${buildVersion}`;
const packageGitUrl = packageInfo.repository.url.replace(/\.git$/i, '');

const ENV = require('./env');
const eslintConfig = require('./.eslintrc');

/**
 * Patch `fs`
 * https://github.com/kevlened/copy-webpack-plugin#emfile-too-many-open-files-or-enfile-file-table-overflow
 */
gracefulFs.gracefulify(fs);

const PATHS = {
  components: path.join(__dirname, 'src/js/components'),
  utils: path.join(__dirname, 'src/js/utils'),
  build: path.join(__dirname, 'dist')
};

process.env.BABEL_ENV = process.env.BABEL_ENV || ENV;

module.exports = {
  entry: {
    components: PATHS.components
  },

  output: {
    path: PATHS.build,
    filename: `${packageName}.js`,
    sourceMapFilename: '[file].map',
    library: packageName,
    libraryTarget: 'umd',
    pathinfo: false
  },

  devtool: 'source-map',

  resolve: {
    extensions: ['.js', '.jsx', '.json'],
    modules: ['node_modules', 'src/js/components/'],
    alias: {
      moment: 'moment/moment.js'
    }
  },

  module: {
    loaders: [
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [{ loader: 'css-loader', options: { sourceMap: true, context: '/' } }]
        })
      },
      {
        test: /\.less$/,
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: { sourceMap: true, context: '/' }
            },
            {
              loader: 'less-loader',
              options: { sourceMap: true, context: '/', strictMath: true }
            }
          ]
        })
      },
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        include: [PATHS.components, PATHS.utils],
        exclude: /(\.test\.js|node_modules)/
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot)$/,
        loader: 'file'
      }
    ]
  },

  plugins: [
    new ExtractTextPlugin({
      filename: `${packageName}.css`,
      disable: ENV === 'development'
    }),

    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(ENV)
      },
      APOC_PKG_VERSION: JSON.stringify(packageVersion),
      APOC_GIT_SHA1: JSON.stringify(gitSha1),
      APOC_GIT_URL: JSON.stringify(`${packageGitUrl}/commit/${gitSha1}`)
    }),

    // Ignore all locale files of moment.js
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),

    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      },
      comments: false,
      mangle: true,
      beautify: false,
      sourceMap: true
    }),

    new webpack.optimize.ModuleConcatenationPlugin()
  ],

  externals: {
    react: {
      root: 'React',
      commonjs2: 'react',
      commonjs: 'react',
      amd: 'react'
    },

    'react-dom': {
      root: 'ReactDOM',
      commonjs2: 'react-dom',
      commonjs: 'react-dom',
      amd: 'react-dom'
    }
  }
};
