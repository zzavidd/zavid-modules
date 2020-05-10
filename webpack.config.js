const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.join(__dirname, './dist'),
    filename: 'main.js',
    library: 'ZavidLibrary',
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react']
          }
        }
      }
    ]
  },
  target: 'node',
  plugins: [new CleanWebpackPlugin()],
  resolve: {
    extensions: ['.js']
  },
  stats: {
    entrypoints: false,
    children: false
  }
};
