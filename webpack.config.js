const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = [{
  name: 'battlefield',
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
}, {
  name: 'playground',
  devServer: {
    contentBase: path.join(__dirname, './pg'),
    port: 9000
  },
  entry: './pg/index.js',
  output: {
    path: path.join(__dirname, './dist'),
    filename: 'index.js',
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader',
        ],
      },
    ]
  },
  target: 'node',
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebPackPlugin({
      template: path.resolve(__dirname, 'pg/index.html'),
      filename: 'index.html'
    })
  ],
  resolve: {
    extensions: ['.js']
  },
}];