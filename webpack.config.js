const path = require('path');

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
      path: './.env', // Path to .env file (this is the default) 
      safe: false, // load .env.example (defaults to "false" which does not use dotenv-safe) 
    }),
  ],
};

module.exports = webpackConfig;
