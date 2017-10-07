import * as firebase from 'firebase';
import config from '../../server/database';

firebase.initializeApp(config);


/**
 * @description signing up a new user.
 * POST:/user/signup
 * @param {object} req; request 
 * @param {object} res; response
 *
 * @returns {promise} signed user
 */

export const signUp = (req, res) => {
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
      return res.status(401).json({ message: 'Somthing went wrong', errorCode });
    });
};

/**
 * @description Sign in users.
 * POST:/user/signin
 * @param {object} req; 
 * @param {object} res;
 *
 * @returns {object} user token
 */

export const signIn = (req, res) => {
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
};

/**
 * @description Signout Route.
 * GET:/user/signout
 * @param {string} email; 
 *
 * @returns {Promise}
 */

export const signOut = (req, res) => {
  firebase.auth().signOut()
    .then(() => res.status(200).json({ message: 'signed-out successfully.' }))
    .catch(() => res.status(404).json({ message: 'Network Error' }));
};

/**
 * Route to reset user password.
 * @param {string} email; 
 *
 * @returns {Promise}
 */

export const passwordReset = (req, res) => {
  const auth = firebase.auth();
  const emailAddress = req.body.email;
  auth.sendPasswordResetEmail(emailAddress)
    .then(() => res.status(200).json({
      message: `Password Reset Mail Sent to${emailAddress}` }))
    .catch((error) => {
      const errorCode = error.message;
      return res.status(401).json({ errorCode });
    });
};
