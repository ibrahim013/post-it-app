const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
var isCoverage = process.env.NODE_ENV === 'coverage';
var webpackConfig = {
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
      port: 3000
   },
  
   module: {
     
      loaders: [
         {
            test: /\.jsx?$/,
            exclude: /node_modules/,
            loader: 'babel-loader', 
			
      	 query: {
               presets: ['es2015', 'react']
                   }
            
         },
            
         {
            test: /\.css$/,
            use: ['style-loader', 'css-loader']
          }, 
          // {
          // test: /\.css$/,
          // loader: 'css-loader',
          // query: {
          //   modules: true,
          //   localIdentName: '[name]__[local]___[hash:base64:5]'
          // }
          //  },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          // resolve-url-loader may be chained before sass-loader if necessary
          use: ['css-loader', 'sass-loader'],
        }),
      },
         ]
         },
  resolve: {
    extensions: ['*', '.js', '.jsx']
  },
  plugins: [
    new ExtractTextPlugin({
      filename: 'style.css',
      allChunks: true
    })
  ]
}

module.exports = webpackConfig;