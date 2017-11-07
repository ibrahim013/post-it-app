import * as firebase from 'firebase';
import config from '../../server/database';

firebase.initializeApp(config);

/**
 * class User: controls all user routes
 * @class
 */
export default class User {
  /**
 * @description signing up a new user.
 * POST:/api/v1/user/signup
 *
 * @param {object} req; request
 * @param {object} res; response
 *
 * @returns {object}  message
 */

  static signUp(req, res) {
    const { displayName, email, password, phoneNumber } = req.body;
    const time = new Date().toLocaleString();
    return firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        firebase.auth().currentUser.updateProfile({
          displayName,
          phoneNumber,
        });
      })
      .then(() => {
        const userId = firebase.auth().currentUser.uid;
        firebase
          .database()
          .ref(`user/${userId}`)
          .set({
            displayName,
            email,
            phoneNumber,
            userId,
            time,
          });
        res.status(200).json({ message: 'signup sucessful proceed to login' });
      })
      .catch((error) => {
        const errorCode = error.code;
        if (errorCode === 'auth/email-already-in-use') {
          return res.status(409).json({ message: 'email already in use' });
        }
        if (errorCode === 'auth/invalid-email') {
          return res.status(400).json({ message: 'invalid email' });
        }
        if (errorCode === 'auth/weak-password') {
          return res.status(400).json({ message: 'password strength is too week' });
        }
      });
  }

  /**
 * @description Sign in users.
 * POST: /api/v1/user/signin
 * @param {object} req;
 * @param {object} res;
 *
 * @returns {object} user token
 */

  static signIn(req, res) {
    const { email, password } = req.body;
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        firebase.auth().onAuthStateChanged((user) => {
          if (user) {
            res.status(200).json({
              message: 'Sign In Successful',
              user,
            });
          }
        });
      })
      .catch((error) => {
        const errorCode = error.code;
        if (errorCode === 'auth/invalid-email') {
          return res.status(400).json({ message: 'invalid email' });
        }
        if (errorCode === 'auth/user-not-found') {
          return res.status(400).json({ message: 'user does not exist' });
        }
        if (errorCode === 'auth/wrong-password') {
          return res.status(400).json({ message: 'wrong password' });
        }
        return res.status(500).json({ message: 'oops!! Somthing went wrong' });
      });
  /**
 *@description Route to reset user password.
 *
 * POST:/api/v1/user/passwordreset
 *
 * @param {string} email;
 *
 * @returns {Promise}
 */

  static passwordReset(req, res) {
    const auth = firebase.auth();
    const emailAddress = req.body.email;
    auth
      .sendPasswordResetEmail(emailAddress)
      .then(() =>
        res.status(200).json({
          message: `Password Reset Mail Sent to ${emailAddress}`,
        }),
      )
      .catch((error) => {
        const errorCode = error.code;
        if (errorCode === 'auth/invalid-email') {
          return res.status(400).json({ message: 'invalid email' });
        }
        if (errorCode === 'auth/user-not-found') {
          return res.status(400).json({ message: 'user not found' });
        }
        return res.status(400).json({ message: 'oops! somthing went wrong' });
      });
  }
  static googleLogin(req, res) {
    const userData = req.body;
    const credential = firebase.auth.GoogleAuthProvider.credential(userData.credential.idToken);
    firebase
      .auth()
      .signInWithCredential(credential)
      .then((user) => {
        const users = [];
        const alreadyRegistered = user.email;
        const registeredUsers = firebase
          .database()
          .ref('user')
          .orderByKey();
        registeredUsers.once('value', (snapshot) => {
          snapshot.forEach((childSnapShot) => {
            const addedUser = childSnapShot.val().email;
            users.push(addedUser);
          });
          const member = users.includes(`${alreadyRegistered}`);
          if (member) {
            return res.status(200).json({
              message: 'sign in sucessful',
              user,
              isConfirmed: true,
            });
          }
          return res.status(200).json({
            message: 'sign in sucessful',
            user,
            isConfirmed: false,
          });
        });
      })
      .catch(() => res.status(500).json({ message: 'oops! somthing went wrong' }));
  }

  /**
 * @description Signout Route.
 *
 * GET:/api/v1/user/signout
 * @param {object} req request;
 * @param {object} res response
 *
 * @returns {Promise}
 */

  static signOut(req, res) {
    firebase
      .auth()
      .signOut()
      .then(() => res.status(200).json({ message: 'signed-out successfully.' }))
      .catch(() => res.status(500).json({ message: 'Network Error' }));
  }

  static googleUpdate(req, res) {
    const { phoneNumber } = req.body;
    const displayName = firebase.auth().currentUser.displayName;
    const email = firebase.auth().currentUser.email;
    const time = new Date().toString();
    firebase
      .auth()
      .currentUser.updateProfile({
        phoneNumber,
      })
      .then(() => {
        const uid = firebase.auth().currentUser.uid;
        firebase
          .database()
          .ref(`user/${uid}`)
          .set({
            displayName,
            email,
            phoneNumber,
            time,
            uid,
          });
        res.status(201).json({
          message: 'update sucessful',
          isConfirmed: true,
        });
      })
      .catch(() => res.status(500).json({ message: 'oops! somthing went wrong' }));
  }
}
