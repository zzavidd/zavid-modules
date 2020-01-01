const webpack = require('webpack');
const path = require('path');

module.exports = {
  entry: './index.js',
  mode: 'none',
  node: {
    fs: 'empty',
  },
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: [
          // Creates `style` nodes from JS strings
          'style-loader',
          // Translates CSS into CommonJS
          'css-loader',
          // Compiles Sass to CSS
          'sass-loader',
        ],
      },
    ],
  },
};