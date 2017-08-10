const path = require('path');
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
            test: /\.jsx?/,
            exclude: /node_modules/,
            loader: 'babel-loader', 
			
      	 query: {
               presets: ['es2015', 'react']
                   }
            
         },
            
           {
            test: /\.css$/,
            loader: 'style-loader'
          }, 
          {
          test: /\.css$/,
          loader: 'css-loader',
          query: {
            modules: true,
            localIdentName: '[name]__[local]___[hash:base64:5]'
          }
           }
         ]
         },
  resolve: {
    extensions: ['*', '.js', '.jsx']
  },
}

module.exports = webpackConfig;