const path = require('path');
const webpack = require('webpack');

const WORKING_DIR = __dirname;
const SOURCE_DIR = path.join(WORKING_DIR, 'src');
const DIST_DIR = path.join(WORKING_DIR, 'dist');

module.exports = (env) => {
  env = env || {};
  const plugins = [];

  if (env.production) {
    plugins.push(new webpack.optimize.UglifyJsPlugin());
  }

  return {
    devtool: env.production ? void 0 : 'inline-source-map',
    entry: {
      'dragon-bst': path.join(SOURCE_DIR, 'dragon-bst.ts')
    },
    output: {
      path: DIST_DIR,
      filename: '[name].js',
      library: 'DragonBST',
      libraryTarget: 'umd'
    },
    resolve: {
      extensions: ['.ts', '.tsx', '.js']
    },
    module: {
      rules: [
        {test: /\.tsx?$/, loader: 'ts-loader'}
      ]
    },
    plugins: plugins
  };
};