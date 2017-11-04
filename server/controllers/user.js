import * as firebase from 'firebase';
import config from '../../server/database';

firebase.initializeApp(config);

/**
 * @description signing up a new user.
 * POST:/v1/user/signup
 * @param {object} req; request 
 * @param {object} res; response
 *
 * @returns {promise} signed user
 */

export const signUp = (req, res) => {
  const { displayName, email, password, phoneNumber } = req.body;
  req.check('email', 'Email is required').notEmpty();
  req.check('displayName', 'Username is required').notEmpty();
  req.check('email', 'Bad email format').isEmail();
  req.check('password', 'Password is required').notEmpty();
  req.check('password',
    'Password must be at least 6 character and contain number')
    .isLength({ min: 5 })
    .matches(/\d/);
  const time = new Date().toString();
  const errors = req.validationErrors();
  if (errors) {
    const message = errors[0].msg;
    res.status(400).json({ message });
  } else {
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
        const uid = firebase.auth().currentUser.uid;
        firebase
          .database()
          .ref(`user/${uid}`)
          .set({
            displayName,
            email,
            phoneNumber,
            uid,
            time,
          });
      })
      .then(() => res.status(200).json({ message: 'signup sucessful proceed to login' }))
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
        return res.status(500).json({ message: 'oops! somthing went wrong' });
      });
  }
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
};
export const googleLogin = (req, res) => {
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
};

/**
 * @description Sign in users.
 * POST:/v1/user/signin
 * @param {object} req; 
 * @param {object} res;
 *
 * @returns {object} user token
 */

export const signIn = (req, res) => {
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
};

/**
 * @description Signout Route.
 * GET:/v1/user/signout
 * @param {string} email; 
 *
 * @returns {Promise}
 */

export const signOut = (req, res) => {
  firebase
    .auth()
    .signOut()
    .then(() => res.status(200).json({ message: 'signed-out successfully.' }))
    .catch(() => res.status(500).json({ message: 'Network Error' }));
};

export const googleUpdate = (req, res) => {
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
};
