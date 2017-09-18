import * as firebase from 'firebase';
import express from 'express';
import config from '../../server/database';


const apiRouter = express.Router();
firebase.initializeApp(config);


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
          snapshot.forEach((child) => {
            const group = {
              groupid: child.key,
              groupname: child.val().groupname,
              Discription: child.val().Discription,
              GroupAdmin: child.val().GroupAdmin,

              // groupId: child.keys,
              // members: child.val().members.keys,
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
 * @param {string} email; 
 * @param {string} password;
 *
 * @returns {object} user token
 */
apiRouter.route('/user/signin')
  .post((req, res) => {
    const { email, password } = req.body;
    firebase.auth().signInWithEmailAndPassword(email, password).then(
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          user.getIdToken().then(token => res.status(200).json({ message: 'Sign In Successful', token }));
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
      }).then(() => res.status(201).send({ message: 'group created Sucessfuly' }))
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
apiRouter.route('/group/addmember')
  .post((req, res) => {
    const { groupname, displayName } = req.body;
    const users = [];
    const groups = [];
    const queryUser = firebase.database().ref('user').orderByKey();
    const queryGroup = firebase.database().ref('group').orderByValue();

    queryUser.once('value', (snapshot) => {
      snapshot.forEach((childSnapShot) => {
        const user = childSnapShot.val().displayName;
        users.push(user);
      });
    });
    queryGroup.once('value', (snapshot) => {
      snapshot.forEach((childSnapShot) => {
        const group = childSnapShot.val().groupname;
        groups.push(group);
      });
      const inGroup = groups.includes(`${groupname}`);
      const inUser = users.includes(`${displayName}`);
      if (!inUser) {
        return res.status(404).json('user not found');
      }
      if (!inGroup) {
        return res.status(404).json('Group not found');
      }
      firebase.database().ref(`group/${groupname}/`).child('members').push({
        displayname: displayName,

      });
    }).then(() => res.status(200).json('user added sucessfully')).catch((error) => {
      const errorCode = error.code;
      return res.status(401).json({ message: 'Somthing went wrong', errorCode });
    });
  });

/**
 * Route for sending messages.
 * @param {string} message; 
 * @param {string} piority; 
 * @param {string} groupname; 
 * @returns {Promise} 
 */
apiRouter.route('/group/postmessage')
  .post((req, res) => {
    const { message, piority, groupname } = req.body;
    const currentUser = firebase.auth().currentUser;
    const author = firebase.auth().currentUser.displayName;
    const dateCreated = new Date().toString();
    // const userId = firebase.auth().currentUser.uid;
    if (currentUser !== null) {
      firebase.database().ref(`group/${groupname}/`).child('message').push({
        GroupName: groupname,
        MessagePiority: piority,
        Message: message,
        DateCreated: dateCreated,
        Author: author,
      })
        .then(() => res.status(200).json({ message: 'group created Sucessfuly' }))
        .catch((error) => {
          const errorCode = error.code;
          return res.status(401).json({ message: 'Somthing went wrong', errorCode });
        });
    }
  });

/**
 * Route for Geting all groups a user belongs.
 * @param {object} req; request 
 * @param {object} res; response
 *
 * @returns {object} group list
 */
apiRouter.route('/group/:groupid/messages/')
  .get((req, res) => {
    const user = firebase.auth().currentUser;
    if (user) {
      const messages = [];
      firebase.database().ref(`/group/${req.params.groupid}/message`)
        .orderByKey().once('value', (snapshot) => {
          snapshot.forEach((childSnapShot) => {
            const message = {
              messageId: childSnapShot.key,
              messageText: childSnapShot.val().Message,
              author: childSnapShot.val().Author,
              priorityLevel: childSnapShot.val().MessagePiority,
              date: childSnapShot.val().DateCreated,
              // status: childSnapShot.val().status
            };
            messages.push(message);
            //   firebase.database().ref(`users/${user.uid}/groups/${req.params.groupId}/messages/${childSnapShot.key}/`)
            //     .update({
            //       status: 'Read'
            //     });
            //   firebase.database().ref(`readUsers/${childSnapShot.key}/${user.uid}`)
            //     .set({
            //       userId: user.uid,
            //       userName: user.displayName
            //     });
          });
        })
        .then(() => res.send({
          messages,
        }))
        .catch(error => res.status(500).send({
          message: `Error occurred ${error.message}`,
        }));
    }
  });

module.exports = apiRouter;
