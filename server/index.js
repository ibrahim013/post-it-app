const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const index = require('./routes/user');
const port = parseInt(process.env.PORT, 10) || 3000;
const compiler = webpack(webpackConfig);
import path from 'path';
import webpack from 'webpack';
import webpackmiddleware from 'webpack-dev-middleware';

import webpackConfig from '../webpack.config';

app.use(webpackmiddleware(compiler));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json()); 

app.use(function(req, res, next) {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Methods', 'GET, POSTS');
	res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, \
		content-type, Authorization');
	next();
});

app.use(morgan('dev'));  // log all requests to the console

app.get('/*', (req, res)=> {
	res.sendFile(path.join(__dirname, './index.html'));
	
});



// API MIDDLEWARE ============================================================


app.use('/api', index);
app.listen(port);
