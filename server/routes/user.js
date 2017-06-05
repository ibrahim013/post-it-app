import express from 'express';

import * as firebase from 'firebase';

const apiRouter = express.Router();


// Inicializing firebase conection=======================================
const config = {
  apiKey: 'AIzaSyDKmzJrL64aEqNezKJ-dPcvPo74F_IAdn4',
  authDomain: 'postit-ace3a.firebaseapp.com',
  databaseURL: 'https://postit-ace3a.firebaseio.com',
  projectId: 'postit-ace3a',
  storageBucket: 'postit-ace3a.appspot.com',
  messagingSenderId: '211164425105'
}; firebase.initializeApp(config);

// SIGNUP ROUTE=========================================================
apiRouter.route('/user/signup')
.post((req, res) => {
  const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password;
  firebase.auth().createUserWithEmailAndPassword(email, password)
.then((user) => {
  firebase.database().ref('user').push({
    userName: username,
    eMail: email
  });
}).then(() => {
  res.json({ message: 'Success: User created.' });
})
.catch((error) => {
  res.json({ message: error.message });
});
});

// SIGNIN ROUTE=================================================================
apiRouter.route('/user/signin')
.post((req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  firebase.auth().signInWithEmailAndPassword(email, password)
.then(() => {
  res.send({ message: 'Signin Sucessful' });
})
.catch(() => {
  res.json({ message: 'You will need to signup' });
});
});

// CREATE GROUP ROUTE========================================================
apiRouter.route('/group')
.post((req, res) => {
  const email = req.body.email,
    groupname = req.body.groupname;

  firebase.auth().onAuthStateChanged(() => {
    const userC = firebase.auth().currentUser;
    if (userC !== null) {
      firebase.database().ref('group').child(groupname).push({
        GroupAdmin: email
      });
      res.send({ message: 'Group created Sucesfuly' });
    } else {
      res.send({ message: 'you must be logged in to create a group' });
    }
  });
});

// ADD MEMBER TO GROUP ROUTE===============================================
apiRouter.route('/group/groupid/user')
.post((req, res) => {
  const groupname = req.body.groupname;
  const groupmember = req.body.groupmember;
  firebase.auth().onAuthStateChanged(() => {
    const userC = firebase.auth().currentUser;
    if (userC !== null) {
      firebase.database().ref('user/group/').child(groupmember).push({
        groupName: groupname
      });
      res.send({ message: 'Group Member Created Sucessful' });
    }
  });
});
module.exports = apiRouter;
 