const webpack = require('webpack');
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const isDevelopment = process.env.NODE_ENV === 'development'

module.exports = {
  entry: './index.js',
  mode: 'none',
  node: {
    fs: 'empty',
  },
  module: {
    rules: [
      {
        test: /\.s(a|c)ss$/,
        loader: [
          isDevelopment ? 'style-loader' : MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              modules: true,
              sourceMap: isDevelopment
            }
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: isDevelopment
            }
          }
        ]
      },
      // {
      //   test: /\.s(a|c)ss$/,
      //   exclude: /\.module.(s(a|c)ss)$/,
      //   loader: [
      //     isDevelopment ? 'style-loader' : MiniCssExtractPlugin.loader,
      //     'css-loader',
      //     {
      //       loader: 'sass-loader',
      //       options: {
      //         sourceMap: isDevelopment
      //       }
      //     }
      //   ]
      // },
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      }
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: isDevelopment ? '[name].css' : '[name].[hash].css',
      chunkFilename: isDevelopment ? '[id].css' : '[id].[hash].css'
    })
  ],
  resolve: {
    extensions: ['.js', '.jsx', '.scss']
  }
};