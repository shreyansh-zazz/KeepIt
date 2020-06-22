// eslint-disable-next-line no-unused-vars
const webpack = require('webpack');
const NodemonPlugin = require('nodemon-webpack-plugin'); // Ding

const path = require('path');
const fs = require('fs');

const nodeModules = {};
fs.readdirSync('node_modules')
  .filter((x) => ['.bin'].indexOf(x) === -1)
  .forEach((mod) => {
    nodeModules[mod] = `commonjs ${mod}`;
  });

module.exports = {
  entry: './api/server.js',
  target: 'node',
  output: {
    path: path.join(__dirname, 'build'),
    filename: 'server.js',
  },
  externals: nodeModules,
  module: {
    rules: [
      { test: /\.graphql?$/, loader: 'webpack-graphql-loader' },
      {
        enforce: 'pre',
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'eslint-loader',
        options: {
          fix: true,
          // default value
          formatter: 'stylish',
        },
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
    ],
  },
  plugins: [
    new NodemonPlugin(), // Dong
  ],
};
