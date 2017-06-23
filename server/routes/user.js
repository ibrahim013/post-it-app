import express from 'express';
import * as firebase from "firebase";
const apiRouter = express.Router();
const morgan = require('morgan');
import database from '../database';


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
	console.log({ message: "Success: User created."});
				
		}).catch(function(error){
			console.log({ message: error.message});
		})

	});

//SIGNIN ROUTE=================================================================
	apiRouter.route('/user/signin')
	.post((req, res) => {
	let email = req.body.email,
		password = req.body.password;
	firebase.auth().signInWithEmailAndPassword(email, password)
	.then (user => {
		console.log({message: "Signin Sucessful"});
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
		let groupname = req.body.groupname;
	 		
		firebase.auth().onAuthStateChanged(User => {
			
			let userC = firebase.auth().currentUser;
			let userId = firebase.auth().currentUser.email;
    	
    	if(userC !== null){
      	 firebase.database().ref ("/group").child(groupname).push({
							GroupAdmin:userId
						})
      	 	console.log({message:"group created Sucessfuly"})
 		   }else{
 	      console.log({message:"you must be logged in to create a group"})
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