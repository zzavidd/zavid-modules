const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const Dotenv = require('dotenv-webpack');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const path = require('path');

const common = {
  devtool: 'source-map',
  resolve: {
    extensions: ['.tsx', '.ts', '.js']
  },
  target: 'node'
};

module.exports = [
  {
    name: 'production',
    entry: './_dist/index.js',
    output: {
      path: path.join(__dirname, './_dist/build'),
      filename: 'main.js',
      library: 'ZavidLibrary',
      libraryTarget: 'umd',
      umdNamedDefine: true
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env', '@babel/preset-react']
            }
          }
        },
        { test: /\.tsx?$/, loader: 'ts-loader' }
      ]
    },
    plugins: [new CleanWebpackPlugin()],
    ...common
  },
  {
    name: 'development',
    devServer: {
      contentBase: path.join(__dirname, './app'),
      port: 9000
    },
    entry: './app/index.tsx',
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: 'babel-loader'
        },
        {
          test: /\.scss$/,
          use: ['style-loader', 'css-loader', 'sass-loader']
        },
        { test: /\.tsx?$/, loader: 'ts-loader' },
        { test: /\.js$/, loader: 'source-map-loader' }
      ]
    },
    plugins: [
      new CleanWebpackPlugin(),
      new Dotenv({ path: './config.env' }),
      new HtmlWebPackPlugin({
        template: path.resolve(__dirname, 'app/index.html'),
        filename: 'index.html'
      })
    ],
    ...common
  }
];