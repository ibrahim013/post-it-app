import express from 'express';
import * as firebase from "firebase";
const apiRouter = express.Router();
const morgan = require('morgan');
import database from '../database';
import Validator from 'validator';
import isEmpty from 'lodash/isEmpty';

//Data  Validation=====================================================
function validateInput(data){
	let errors={};
	
if (Validator.isEmpty(data.username)){
	errors.username ='This field is required';
}
if (Validator.isEmpty(data.email)){
	errors.email ='Email is invalid';
}
if (!Validator.isEmail(data.email)){
	errors.email ='This field is required';
}

if (Validator.isEmpty(data.password)){
	errors.password ='This field is required';
}

	return {
		errors,
		isValid: isEmpty(errors)
	}
}

// GET GROUP ROUTE=========================================================
apiRouter.route('/group/getgroups')
	.get((req, res) => {
	const groupRef = firebase.database().ref('group');
	groupRef.on('value', (snapshot) => {
		return res.send(snapshot.val());
	})
})

// SIGNUP ROUTE=========================================================
apiRouter.route('/user/signup')
	//create a user
	.post((req, res) => {
	
		const {errors, isValid } = validateInput(req.body);
		if (isValid){
			res.status(200).json({Success:true});
			
		}
		else {
			res.status(400).json(errors);
		}

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
		console.log({ message: "Success: User created."});
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
		res.send(user);
	})
	.catch(function(error) {
  // Handle Errors here.=======================================================
  let errorCode = error.code;
  let errorMessage = error.message;
  // ...
})
});
//Realtime Listener
firebase.auth().onAuthStateChanged(firebaseUser => {
	if(firebaseUser){
		console.log(firebaseUser);
	}
	else{
		console.log('No one is logged in');
	}
});

//Password Reset=================================================================
	apiRouter.route('/user/passwordreset')
	.post((req, res) => {
	let auth = firebase.auth(),
	emailAddress = req.body.email;
	auth.sendPasswordResetEmail(emailAddress).then(function() {
 	console.log('Password Reset Mail Sent to' + emailAddress)
}, function(error) {
  console.log(error)
});
})
	

//CREATE GROUP ROUTE=================================================================
apiRouter.route('/group')
	.post((req, res) => {
		let groupname = req.body.groupname;
	 		
		firebase.auth().onAuthStateChanged(User => {
			
			let userC = firebase.auth().currentUser;
			let userId = firebase.auth().currentUser.email;
    	
    	if(userC !== null){
      	 firebase.database().ref ("group").child(groupname).push({
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

//ADD MESSAGE TO GROUP=================================================================
apiRouter.route('/group/message')
	.post((req, res) => {
		let message = req.body.message;
		let piority = req.body.piority;	
		let groupname = req.body.groupname;
		firebase.auth().onAuthStateChanged(User => {
			
			let userC = firebase.auth().currentUser;
			let userId = firebase.auth().currentUser.uId;
    	if(userC !== null){
      	 firebase.database().ref ("message").push({
							SentBy: userId,
							GroupName:groupname,
							MessagePiority: piority,
							Message: message

						})
      	 	console.log(
				   {message:"message sent successfuly "}
					)
 		   }else{
 	      console.log({message:"you must be logged in to send messages"})
   		 }
		});
			
	});	


module.exports = apiRouter;