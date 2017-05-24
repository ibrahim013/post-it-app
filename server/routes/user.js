import express from 'express';
const apiRouter = express.Router();
const morgan = require('morgan');
import * as firebase from "firebase";

// Inicializing firebase conection=======================================
  var config = {
    apiKey: "AIzaSyDKmzJrL64aEqNezKJ-dPcvPo74F_IAdn4",
    authDomain: "postit-ace3a.firebaseapp.com",
    databaseURL: "https://postit-ace3a.firebaseio.com",
    projectId: "postit-ace3a",
    storageBucket: "postit-ace3a.appspot.com",
    messagingSenderId: "211164425105"
  };
  firebase.initializeApp(config);

//Exterblish Database Connection=====================================
apiRouter.use((req, res, next) => {
	console.log("someone just came to the app");
	// this is where we authenticate users
	next();
})
apiRouter.get('/',(req, res) => {
	res.json({ message: 'woah check out this json'});
});

// SIGNUP ROUTE=========================================================
apiRouter.route('/user/signup')
	//create a user
	.post((req, res) => {
	let firstName = req.body.firstname,
		lastName =req.body.lastname,
		email = req.body.email,
		password = req.body.password;
	firebase.auth().createUserWithEmailAndPassword(email, password)
	.then(user =>{
		firebase.database().ref("user").push({
		firstname:firstName,
		lastname:lastName,
		email:email,
		password:password
		});
		
		}).then(function() {
	res.json({ message: "Success: User created."});
				
		}).catch(function(error){
			res.json({ message: error.message});
		})

	});
//SIGNIN ROUTE=============================================================
	apiRouter.route('/user/signin')


			
		








module.exports = apiRouter;