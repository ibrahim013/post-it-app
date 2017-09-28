import * as firebase from 'firebase';
import express from 'express';

const apiRouter = express.Router();

/**
 * Route for Geting all groups a user belongs.
 * @param {object} req; request 
 * @param {object} res; response
 *
 * @returns {object} group list
 */




/**
 * Route for adding members to group.
 * @param {string} groupname; 
 * @param {string} groupmember; 
 * 
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
        return res.status(404).send('user not found');
      }
      if (!inGroup) {
        return res.status(404).send('Group not found');
      }
      firebase.database().ref(`group/${groupname}/`).child('members').push({
        displayname: displayName,

      });
    }).then(() => res.status(200).send('user added sucessfully'))
      .catch((error) => {
        const errorCode = error.code;
        return res.status(401).send({ message: 'Somthing went wrong', errorCode });
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
    const dateCreated = new Date().toString();
    if (currentUser !== null) {
      firebase.database().ref(`group/${groupname}/`).child('message').push({
        MessagePiority: piority,
        Message: message,
        DateCreated: dateCreated,
      })
        .then(() => res.status(200).json({ message: 'group created Sucessfuly',
        }))
        .catch((error) => {
          const errorCode = error.code;
          return res.status(401).json({ message: 'Somthing went wrong', errorCode,
          });
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
            };
            messages.push(message);
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

