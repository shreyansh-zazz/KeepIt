// eslint-disable-next-line no-unused-vars
const webpack = require('webpack')
const NodemonPlugin = require('nodemon-webpack-plugin')

const path = require('path')
const fs = require('fs')

const nodeModules = {}
fs.readdirSync('node_modules')
  .filter((x) => ['.bin'].indexOf(x) === -1)
  .forEach((mod) => {
    nodeModules[mod] = `commonjs ${mod}`
  })

module.exports = {
  entry: './api/server.js',
  target: 'node',
  output: {
    path: path.join(__dirname, 'build'),
    filename: 'server.js'
  },
  externals: nodeModules,
  module: {
    rules: [{
      test: /\.graphql?$/,
      exclude: [
        path.join(__dirname, 'build'),
        path.join(__dirname, 'node_modules')
      ],
      loader: 'webpack-graphql-loader'
    },
    {
      enforce: 'pre',
      test: /\.js$/,
      exclude: [
        path.join(__dirname, 'build'),
        path.join(__dirname, 'node_modules')
      ],
      loader: 'eslint-loader',
      options: {
        sourceMap: true,
        fix: true,
        // eslint-disable-next-line global-require
        formatter: require('eslint-friendly-formatter')
      }
    },
    {
      test: /\.js$/,
      exclude: [
        path.join(__dirname, 'build'),
        path.join(__dirname, 'node_modules')
      ],
      loader: 'babel-loader',
      options: { sourceMap: true }
    }]
  },
  plugins: [
    new NodemonPlugin()
  ],
  devtool: 'source-map'
}
