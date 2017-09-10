import * as firebase from 'firebase';
import express from 'express';
import validateInput from '../../client/util/validation';
import database from '../../server/database';


const apiRouter = express.Router();

/**
 * Route for Geting all groups a user belongs.
 * @param {object} req; request 
 * @param {object} res; response
 *
 * @returns {object} group list
 */

apiRouter.route('/groups/group')
  .get((req, res) => {
    const user = firebase.auth().currentUser;
    if (user) {
      const groups = [];
      firebase.database().ref('/group')
        .orderByKey().once('value', (snapshot) => {
          snapshot.forEach((childSnapShot) => {
            const group = {
              // groupId: childSnapShot.val().groupInfo.groupId,
              groupname: childSnapShot.val()
            };
            groups.push(group);
          });
        })
        .then(() => {
          res.send({
            groups
          });
        })
        .catch((error) => {
          res.status(500).send({
            message: `Error occurred ${error.message}`,
          });
        });
    } else {
      res.status(403).send({
        message: 'You are not signed in right now!'
      });
    }
  });

/**
 * Route for Geting all groups a user belongs.
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
        displayName
      });
    })
      .then(() => {
        firebase.database().ref('user').push({
          displayName,
          email,
          time
        });
      })
      .then(() => {
        res.status(200).json({ message: 'signup sucessful' });
      })
      .catch((error) => {
        const errorCode = error.code;
        res.status(401).json({ message: 'Somthing went wrong', errorCode });
      });
  });

/**
 * Sign in users.
 * @param {string} email; 
 * @param {string} password;
 *
 * @returns {object} token
 */
apiRouter.route('/user/signin')
  .post((req, res) => {
    const { email, password } = req.body;
    firebase.auth().signInWithEmailAndPassword(email, password).then(
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          user.getIdToken().then((token) => {
            res.status(200).json({ message: 'Sign In Successful', token });
          });
        }
      })
    ).catch((error) => {
      const errorCode = error.code;
      res.status(401).json({ message: 'Somthing went wrong', errorCode });
    });
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
    auth.sendPasswordResetEmail(emailAddress).then(() => {
      res.status(201).send({ message: `Password Reset Mail Sent 
      to${emailAddress}` });
    })
      .catch((error) => {
        const errorCode = error.code;
        res.status(401).json({ message: 'Somthing went wrong', errorCode });
      });
  });

/**
 * Route to create user groups.
 * @param {string} groupname; 
 * @param {string} discription; 
 * @returns {Promise} 
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
      firebase.database().ref(`group/${groupname}`).push({
        groupname,
        dateCreated,
        GroupAdmin: userEmail,
        Discription: discription
      });
      firebase.database().ref(`group/${groupname}/members`)
        .child(createdBy).set({
          displayName
        })
        .then(() => {
          // firebase.database().ref(`users/${createdBy}/groups/`)
          //   .child(`${groupname}`).set({

          //     groupname,
          //     newMessage: false
          //   });
          res.status(201).send({ message: 'group created Sucessfuly' });
        })
        .catch((error) => {
          const errorCode = error.code;
          res.status(401).json({ message: 'Somthing went wrong', errorCode });
        });
    }
  });


/**
 * Route for adding members to group.
 * @param {string} groupname; 
 * @param {string} groupmember; 
 * @returns {Promise} 
 */
// apiRouter.route('/group/addmember')
//   .post((req, res) => {
//     const { groupname, groupmember } = req.body;
//     const users = [];
//     const queryUser = firebase.database().ref('user').orderByKey();
//     const queryGroup = firebase.database().ref('group').orderByValue();
//     queryUser.once('value')

//       .then((snapshot) => {
//         snapshot.forEach((childSnapshot) => {
//           const childData = childSnapshot.val();
//           const displayName = childData.displayName;

//           queryGroup.once('value').then(
//             (snapshot) => {
//               snapshot.forEach((childSnapshot) => {
//                 const groups = childSnapshot.val();

//                 console.log(displayName);
//               });
//             });
//         });
//       });
//   });
// // const key = childSnapshot.key;
// const createdGroup = childData.groupname;

// if (groupmember === displayName && groupname === createdGroup) {
//   // firebase.database().ref(`group/${groupname}`).child('members').set({
//   //   groupmember
//   // }
// );
//     })
//     // res.status(201).json({ Success: true });
//   });
//   console.log('i got here ');
// });


//   res.status(201).json({ Success: true });


/**
 * Route for sending messages.
 * @param {string} message; 
 * @param {string} piority; 
 * @param {string} groupname; 
 * @returns {Promise} 
 */
apiRouter.route('/group/message')
  .post((req, res) => {
    const { message, piority, groupname } = req.body;
    const currentUser = firebase.auth().currentUser;
    // const userId = firebase.auth().currentUser.uid;
    if (currentUser !== null) {
      firebase.database().ref(`group/${groupname}/`).child('message').push({
        GroupName: groupname,
        MessagePiority: piority,
        Message: message

      });
      res.status(201).send({ message: 'group created Sucessfuly' });
      console.log(
        { message: 'message sent successfuly ' }
      );
    } else {
      console.log({ message: 'you must be logged in to send messages' });
    }
  });


module.exports = apiRouter;
