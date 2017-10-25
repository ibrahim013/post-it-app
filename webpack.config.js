const path = require('path');
const webpack = require('webpack');

require('dotenv').config();
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const Dotenv = require('dotenv-webpack');

const webpackConfig = {
  entry:
      './client/index.js',
  output: {
    path: path.join(__dirname, 'public'),
    publicPath: '/',
    filename: 'bundle.js',
  },
  externals: {
    cheerio: 'window',
    'react/lib/ExecutionEnvironment': true,
    'react/lib/ReactContext': true,
  },
  devServer: {
    contentBase: './server',
    inline: true,
    hot: true,
    port: 3000,
  },
  node: {
    fs: 'empty',
  },

  module: {

    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'react'],
        },

      },

      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'sass-loader'],
        }),
      },
    ],
  },
  resolve: {
    extensions: ['*', '.js', '.jsx'],
  },
  plugins: [
    new ExtractTextPlugin({
      filename: 'style.css',
      allChunks: true,
    }),
    new Dotenv({
      path: './.env',
      safe: false,
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
      },
    }),
    // new webpack.optimize.UglifyJsPlugin(),
    // new webpack.optimize.AggressiveMergingPlugin(),
  ],
};

module.exports = webpackConfig;
