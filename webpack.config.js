const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: './index.js',
  mode: 'none',
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({ 
          fallback: 'style-loader',
          use: ['css-loader','sass-loader'],
        })
      }
    ]
  },
  node: { fs: 'empty' },
  plugins: [
    new ExtractTextPlugin({ filename: 'app.bundle.css' }),
  ],
  resolve: {
    extensions: [".js", ".scss"]
  }
};