module.exports = {
  entry: './index.js',
  mode: 'none',
  module: {
    rules: [
      {
        test: /\.s(a|c)ss$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      }
    ]
  },
  node: { fs: 'empty' },
  resolve: {
    extensions: [".js", ".scss"]
  }
};