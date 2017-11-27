import * as firebase from 'firebase';
import config from '../../server/database';
import userObject from '../helpers/Users';
import jwt from 'jsonwebtoken';

require('dotenv').config()

firebase.initializeApp(config);

/**
 * @description this class controls all user routes
 *
 * @class user
 */
export default class User {
/**
 * @description this method allows a new user to sign up.
 * POST:/api/v1/user/signup
 *
 * @method signUp
 *
 * @param {object} req; request
 * @param {object} res; response
 *
 * @returns {object}  response containing a message
 */
  static signUp(req, res) {
    const { displayName, email, password, phoneNumber } = req.body;
    const time = new Date().toLocaleString();
    userObject
    .userDetail(`${displayName}`).then((registeredUsers) => {
      if (registeredUsers) {
        res.status(409).send({ message: 'username already exist' });
      } else {
        firebase
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
      res.status(201).json({ message: 'signup sucessful proceed to login' });
    });
      }
    })
     .catch((error) => {
        const errorCode = error.code;
        if (errorCode === 'auth/email-already-in-use') {
          return res.status(409).send({ message: 'email already in use' });
        }
        if (errorCode === 'auth/invalid-email') {
          return res.status(400).send({ message: 'invalid email' });
        }
        if (errorCode === 'auth/weak-password') {
          return res.status(400).send({
            message: 'password strength is too week' });
        }
      });
  }

/**
 * @description  This method allow a users to sign in.
 * POST: /api/v1/user/signin
 *
 * @method signIn
 *
 * @param {object} req request
 * @param {object} res response
 *
 * @returns {object} response contaning a login user details
 */
  static signIn(req, res) {
    const { email, password } = req.body;
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        firebase.auth().onAuthStateChanged((user) => {
          if (user) {
            const token = jwt.sign({
              user,
            }, process.env.JWT_SECERT, { expiresIn: '48h' });
            res.status(200).json({
              message: 'Sign In Successful',
              user,
              token,
            });
          }
        });
      })
      .catch((error) => {
        const errorCode = error.code;
        if (errorCode === 'auth/invalid-email') {
          res.status(400).send({ message: 'invalid email or password' });
        }
        if (errorCode === 'auth/user-not-found') {
          return res.status(400).send({
            message: 'user not found or account may have being disabled' });
        }
        if (errorCode === 'auth/wrong-password') {
          return res.status(400).send({ message: 'invalid email or password' });
        }
        return res.status(500).send({ message: 'oops!! Somthing went wrong' });
      });
  }
/**
 * @description This method allow users to resetpassword.
 * POST:/api/v1/user/passwordreset
 *
 * @method passwordReset
 *
 * @param {object} req request
 * @param {object} res response
 *
 * @returns {object} this return a message object to user
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
          return res.status(400).send({ message: 'invalid email' });
        }
        if (errorCode === 'auth/user-not-found') {
          return res.status(400).send({ message: 'user not found' });
        }
        return res.status(500).send({ message: 'oops! somthing went wrong' });
      });
  }
/**
 * @description This method allow users to signin using google.
 * POST:/api/v1/user/googlelogin
 *
 * @method googleLogin
 *
 * @param {object} req request
 * @param {object} res response
 *
 * @returns {object} response contaning a login user details
 */
  static googleLogin(req, res) {
    const userData = req.body;
    const credential = firebase.auth.GoogleAuthProvider.credential(
      userData.credential.idToken);
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
      .catch(() => res.status(500).json({
        message: 'oops! somthing went wrong' }));
  }
/**
 * @description This method allow users to signout.
 * POST:/api/v1/user/signout
 *
 * @method signOut
 *
 * @param {object} req request
 * @param {object} res response
 *
 * @returns {object} response contaning message object
 */
  static signOut(req, res) {
    firebase
      .auth()
      .signOut()
      .then(() => res.status(200).json({ message: 'signed out successfully.' }))
      .catch(() => res.status(500).json({ message: 'Network Error' }));
  }
/**
 * @description This method allow users signin with google ubdate login details.
 * POST:/api/v1/user/googlelupdate
 *
 * @method googleUpdate
 *
 * @param {object} req request
 * @param {object} res response
 *
 * @returns {object} response contaning message object
 */
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
      .catch(() => res.status(500).json({
        message: 'oops! somthing went wrong' }));
  }
}
