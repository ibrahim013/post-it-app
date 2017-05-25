import express from 'express';
import * as firebase from "firebase";
const apiRouter = express.Router();
const morgan = require('morgan');

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



// SIGNUP ROUTE=========================================================
apiRouter.route('/user/signup')
	//create a user
	.post((req, res) => {
	let username = req.body.username,
		email = req.body.email,
		password = req.body.password;
	firebase.auth().createUserWithEmailAndPassword(email, password)
	.then(user =>{
		firebase.database().ref("user").push({
		username:username,
		email:email,
		password:password
		});
		
		}).then(function() {
	res.json({ message: "Success: User created."});
				
		}).catch(function(error){
			res.json({ message: error.message});
		})

	});

//SIGNIN ROUTE=================================================================
	apiRouter.route('/user/signin')
	.post((req, res) => {
	let email = req.body.email,
		password = req.body.password;
	firebase.auth().signInWithEmailAndPassword(email, password)
	.then (user => {
		res.send({message: "Signin Sucessful"});
	})
	.catch(function(error) {
  // Handle Errors here.=======================================================
  let errorCode = error.code;
  let errorMessage = error.message;
  // ...
})
});


//CREATE GROUP ROUTE=================================================================
apiRouter.route('/group')
	.post((req, res) => {
		let email = req.body.email,
			password = req.body.password;
			groupname = req.body.groupname;
	 		
		firebase.auth().onAuthStateChanged(user => {
			
			let userC = firebase.auth().currentUser;
    	
    	if(userC !== null){
      	 firebase.database().ref ("group").child(groupname).push({
							GroupAdmin:email
							
						})
 		   }else{
 	      res.send({message:"you must be logged in to create a group"})
   		 }
		});
			
	});		

	
 //ADD MEMBER TO GROUP ROUTE=================================================================
apiRouter.route('/group/groupid/user')
	.post((req, res) => {
		let email = req.body.email,
			password = req.body.password,
			groupname = req.body.groupname,
			groupmember = req.body.groupmember;
	  		
		firebase.auth().signInWithEmailAndPassword(email, password)
			.then(user => {
				firebase.auth().onAuthStateChanged((user) => {
					let userC = firebase.auth().currentUser;
						
					if(userC !== null){
						firebase.database().ref ("user/group/").child(groupmember).push({
							
														
						})
						
					}
					res.send({message: "Group Created Sucessful"})
				})
			
			})
			
	});		






module.exports = apiRouter;