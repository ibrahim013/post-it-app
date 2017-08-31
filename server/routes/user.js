import * as firebase from 'firebase';
import express from 'express';
import validateInput from '../../client/util/validation';
import database from '../database';

const apiRouter = express.Router();

// Data  Validation=====================================================


// GET GROUP ROUTE=========================================================
apiRouter.route('/group/getgroups')
  .get((req, res) => {
    const groupRef = firebase.database().ref('group');
    groupRef.once('value')
      .then(snapshot => res.send(snapshot.val()))
      .catch((err) => {
        const errorCode = err.code;
        const errorMessage = err.message;
        console.log(err);
      });
  });

// SIGNUP ROUTE=========================================================
apiRouter.route('/user/signup')
// create a user
  .post((req, res) => {
    const { errors, isValid } = validateInput(req.body);
    if (isValid) {
      res.status(200).json({ Success: true });
    } else {
      res.status(400).json(errors);
    }

    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;
    const time = Math.floor(Date.now() / 1000);
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(() => {
        firebase.database().ref('user').push({
          username,
          email,
          time
        });
      }).then(() => {
        res.status(200).json({ Success: true });
      })
      .catch((error) => {
        console.log({ message: error.message });
      });
  });

// SIGNIN ROUTE=================================================================
apiRouter.route('/user/signin')
  .post((req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    firebase.auth().signInWithEmailAndPassword(email, password);
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        user.getIdToken().then((token) => {
          res.status(200).send({ message: 'Sign In Successful', token });
        });
      }
    }, () => {
      res.status(400).send('An Error Occoured');
    });
  });

// Password Reset=================================================================
apiRouter.route('/user/passwordreset')
  .post((req, res) => {
    const auth = firebase.auth();
    const emailAddress = req.body.email;
    auth.sendPasswordResetEmail(emailAddress).then(() => {
 	console.log(`Password Reset Mail Sent to${emailAddress}`);
    }, (error) => {
      console.log(error);
    });
  });


// CREATE GROUP ROUTE=================================================================
apiRouter.route('/group')
  .post((req, res) => {
    const groupname = req.body.groupname;

    firebase.auth().onAuthStateChanged((User) => {
      const currentUser = firebase.auth().currentUser;
      const userEmail = firebase.auth().currentUser.email;
      if (currentUser !== null) {
        firebase.database().ref('/group').child(groupname).set({
          GroupAdmin: userEmail,
        });
        res.status(201).send({ message: 'group created Sucessfuly' });
      } else {
        res.status(500).send({ message: 'There was an error, please try again' });
      }
    });
  });


// ADD MEMBER TO GROUP ROUTE=================================================================
apiRouter.route('/group/groupid/user')
  .post((req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    const groupname = req.body.groupname;
    const groupmember = req.body.groupmember;

    firebase.auth().signInWithEmailAndPassword(email, password)
      .then((user) => {
        firebase.auth().onAuthStateChanged((user) => {
          const userC = firebase.auth().currentUser;

          if (userC !== null) {
            firebase.database().ref('user/group/').child(groupmember).push({


            });
          }
          res.send({ message: 'Group Created Sucessful' });
        });
      });
  });

// ADD MESSAGE TO GROUP=================================================================
apiRouter.route('/group/message')
  .post((req, res) => {
    const message = req.body.message;
    const piority = req.body.piority;
    const groupname = req.body.groupname;
    firebase.auth().onAuthStateChanged((User) => {
      const userC = firebase.auth().currentUser;
      const userId = firebase.auth().currentUser.uid;
      if (userC !== null) {
        firebase.database().ref(`${userId}/message/`).push({
          GroupName: groupname,
          MessagePiority: piority,
          Message: message,

        });
        res.status(201).send({ message: 'group created Sucessfuly' });
        console.log(
          { message: 'message sent successfuly ' }
        );
      } else {
        console.log({ message: 'you must be logged in to send messages' });
      }
    });
  });


module.exports = apiRouter;
