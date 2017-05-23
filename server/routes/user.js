var express = require('express');
var apiRouter = express.Router();
const morgan = require('morgan');

// Inicializing firebase conection
var admin	= require('firebase-admin');
var serviceAccount = require("../serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://postit-ace3a.firebaseio.com"
});
//Exterblish Database Connection
var db = admin.database();
var usersRef = db.ref("user");

apiRouter.use(function(req, res, next) {
	console.log("someone just came to the app");
	// this is where we authenticate users
	next();
})
apiRouter.get('/', function(req, res) {
	res.json({ message: 'woah check out this json'});
});


apiRouter.route('/user/signup')
	
	//create a user
	.post(function(req, res) {
		var user = {};
		user.firstName = req.body.fname;
		user.lastName =req.body.lname;
		user.email = req.body.email;
				usersRef.push({
			first_name: req.body.fname,
			last_name: req.body.lname,
			email: req.body.email,
			
		}).then(function() {

				res.json({ message: "Success: User created."});
		}).catch(function(error){
			res.json({ message: error.message});
		})

	})


module.exports = apiRouter;