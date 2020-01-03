module.exports = {
  entry: './index.js',
  mode: 'none',
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader',
        ],
      }
    ],
  },
  node: {
    fs: 'empty',
  }
};