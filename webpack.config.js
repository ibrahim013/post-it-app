const path = require('path');
const port = parseInt(process.env.PORT, 10) || 3000;
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
      port: port
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
         }
      ]
   },
  resolve: {
    extensions: ['*', '.js', '.jsx']
  },
}

module.exports = webpackConfig;