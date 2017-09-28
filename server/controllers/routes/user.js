import * as firebase from 'firebase';
import express from 'express';
import config from '../../../server/database';
import '../routes/group';

const apiRouter = express.Router();
firebase.initializeApp(config);


/**
 * Route for signing up  a user.
 * @param {object} req; request 
 * @param {object} res; response
 *
 * @returns {promise} signed user
 */

apiRouter.route('/user/signup')
  // create a user
  .post((req, res) => {
    const { displayName, email, password } = req.body;
    const time = new Date().toString();
    firebase.auth().createUserWithEmailAndPassword(email, password).then(() => {
      firebase.auth().currentUser.updateProfile({
        displayName,
      });
    })
      .then(() => {
        firebase.database().ref('user').push({
          displayName,
          email,
          time,
        });
      })
      .then(() => res.status(200).json({ message: 'signup sucessful' }))
      .catch((error) => {
        const errorCode = error.code;
        res.status(401).json({ message: 'Somthing went wrong', errorCode });
      });
  });

/**
 * Sign in users.
 * @param {object} req; 
 * @param {object} res;
 *
 * @returns {object} user token
 */
apiRouter.route('/user/signin')
  .post((req, res) => {
    const { email, password } = req.body;
    firebase.auth().signInWithEmailAndPassword(email, password).then(
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          user.getIdToken().then(token => res.status(200).json({
            message: 'Sign In Successful', token }));
        }
      }),
    ).catch((error) => {
      const errorCode = error.code;
      return res.status(401).json({ message: 'Somthing went wrong', errorCode });
    });
  });
/**
 * Signout Route.
 * @param {string} email; 
 *
 * @returns {Promise}
 */
apiRouter.route('/signout')
  .get((req, res) => {
    firebase.auth().signOut()
      .then(() => res.status(200).send({ message: 'signed-out successfully.' }))
      .catch(() => res.status(404).send({ message: 'Network Error' }));
  });

/**
 * Route to reset user password.
 * @param {string} email; 
 *
 * @returns {Promise}
 */
apiRouter.route('/user/passwordreset')
  .post((req, res) => {
    const auth = firebase.auth();
    const emailAddress = req.body.email;
    auth.sendPasswordResetEmail(emailAddress)
      .then(() => res.status(200).send({
        message: `Password Reset Mail Sent to${emailAddress}` }))
      .catch((error) => {
        const errorCode = error.message;
        return res.status(401).json({ errorCode });
      });
  });

/**
 * Route to create user groups.
 * @param {string} groupname; 
 * @param {string} discription; 
 * @returns {Object} 
 */
apiRouter.route('/groups')
  .post((req, res) => {
    const { groupname, discription } = req.body;
    const dateCreated = new Date().toString();
    const currentUser = firebase.auth().currentUser;
    const userEmail = currentUser.email;
    const createdBy = currentUser.uid;
    const displayName = currentUser.displayName;
    if (currentUser !== null) {
      firebase.database().ref('group/').push({
        groupname,
        dateCreated,
        GroupAdmin: userEmail,
        createdBy,
        displayName,
        Discription: discription,
      }).then(() => res.status(201).send({ message: 'group created Sucessfuly',
      }))
        .catch((error) => {
          const errorCode = error.code;
          res.status(401).send({ message: 'Somthing went wrong', errorCode });
        });
    }
  });
apiRouter.route('/groups/group')
  .get((req, res) => {
    const user = firebase.auth().currentUser;
    if (user) {
      const groups = [];
      firebase.database().ref('/group')
        .orderByKey().once('value', (snapshot) => {
          snapshot.forEach((child) => {
            const group = {
              groupid: child.key,
              groupname: child.val().groupname,
              Discription: child.val().Discription,
              GroupAdmin: child.val().GroupAdmin,
            };
            groups.push(group);
          });
        })
        .then(() => res.send(
          { groups },
        ))
        .catch(error => res.status(500).send({
          message: `Error occurred ${error.message}`,
        }));
    } else {
      return res.status(403).send({
        message: 'You are not signed in right now!',
      });
    }
  });


module.exports = apiRouter;
