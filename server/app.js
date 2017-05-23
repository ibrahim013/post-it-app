const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const index = require('./routes/user');


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

app.get('/', function(req, res) {
	res.send('welcome to the home page!');
	console.log(ref);
});




// API MIDDLEWARE ============================================================


app.use('/api', index);
app.listen(8000);
console.log('Runing on port 8000');