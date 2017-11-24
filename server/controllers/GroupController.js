import * as firebase from 'firebase';
import userObject from '../helpers/Users';
import capitalizeFirstLetter from '../helpers/Utilities';

/**
 * @description this metho get group a user belong to.
 * GET: /api/v1/group/groups
 *
 * @method userGroups
 *
 * @param {object} req request
 * @param {object} res response
 *
 * @returns {object} return all user group object
 */
export const userGroups = (req, res) => {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      const uid = firebase.auth().currentUser.uid;
      const groups = [];
      firebase
        .database()
        .ref(`user/${uid}/group`)
        .orderByKey()
        .once('value', (snapshot) => {
          snapshot.forEach((child) => {
            const group = {
              groupid: child.key,
              groupname: child.val().groupName,
            };
            groups.push(group);
          });
        })
        .then(() => res.status(201).json({ groups }))
        .catch(error =>
          res.status(500).json({
            message: `Error occurred ${error.message}`,
          }),
        );
    }
  });
};

/**
 * @description this method allow adding of members to  a group.
 * POST:/api/v1/group/addmember
 *
 * @method addmember
 *
 * @param {object} req request
 * @param {object} res response
 *
 * @return {object} response containing a message object
 */
export const addMember = (req, res) => {
  const { groupName, displayName, groupId } = req.body;
  const currentUser = firebase.auth().currentUser;
  if (currentUser) {
    userObject
      .userDetail(`${displayName}`)
      .then((registeredUser) => {
        if (!registeredUser) {
          return res.status(400).json({ message: 'User not found' });
        }
        userObject.userGroup(`${groupId}`).then((registeredGroups) => {
          if (!registeredGroups) {
            return res.status(400).json({ message: 'group not found' });
          }
        });
        userObject.groupMember(`${groupId}`, `${displayName}`)
        .then((groupMember) => {
          if (groupMember) {
            return res.status(400).json({
              message: 'This user is already a member of this group',
            });
          }
          userObject.addToGroup(`${groupId}`, `${displayName}`, `${groupName}`)
          .then((response) => {
            if (response) {
              return res.status(201).json({
                message: 'user added sucessfully',
              });
            }
          });
        });
      })
      .catch(() =>
        res.status(500).json({
          message: 'oops! Somthing went wrong',
        }),
      );
  } else {
    res.status(401).json({
      message: 'you need to be loged in to perform this action',
    });
  }
};

/**
 * @description This method allow user to post messages to group.
 * POST:/api/v1/group/postmessage
 *
 * @method postMessage
 *
 * @param {object} req request
 * @param {object} res response
 *
 * @returns {object} response containing a message object
 */
export const postMessage = (req, res) => {
  const { message, piority, groupId, groupName } = req.body;
  const currentUser = firebase.auth().currentUser;
  if (currentUser) {
    const displayName = currentUser.displayName;
    const dateCreated = new Date().toLocaleString();
    if (currentUser !== null) {
      userObject
        .userGroup(`${groupId}`)
        .then((confirmGroup) => {
          if (confirmGroup) {
            firebase
              .database()
              .ref(`group/${groupId}/`)
              .child('message')
              .push({
                MessagePiority: piority,
                Message: message,
                DateCreated: dateCreated,
                Author: displayName,
              })
              .then(() => {
                userObject.sendNotification(`${groupId}`, `${piority}`,
                 `${groupName}`);
                return res.status(201).json({
                  message: 'Message Posted Sucessfuly',
                });
              });
          } else {
            res.status(400).json({ message: 'this is not a group' });
          }
        })
        .catch(
          () => res.status(401).json({ message: 'oops! Somthing went wrong' }));
    }
  } else {
    res.status(401).json({ message: 'you are not signed in' });
  }
};
/**
 * @description This method returns group messages.
 * GET:/api/v1/group/:groupid/messages
 *
 * @method messageList
 *
 * @param {object} req request
 * @param {object} res response
 *
 * @returns {object} response containing a message list object
 */
export const messageList = (req, res) => {
  const user = firebase.auth().currentUser;
  if (user) {
    const displayName = user.displayName;
    const readTime = new Date().toString();
    const usersRead = [];
    const memberdisplayName = firebase
      .database()
      .ref(`/group/${req.params.groupid}/views`)
      .orderByKey();
    memberdisplayName.once('value', (snapshot) => {
      snapshot.forEach((childSnapShot) => {
        const userName = {
          displayName: childSnapShot.val().displayName,
        };
        usersRead.push(userName);
      });
      const readMessage = usersRead.find(seen =>
        seen.displayName === `${displayName}`);
      if (!readMessage) {
        firebase
          .database()
          .ref(`/group/${req.params.groupid}`)
          .child('views')
          .push({
            displayName,
            readTime,
            read: true,
          });
      }
    });
    const messages = [];
    firebase
      .database()
      .ref(`/group/${req.params.groupid}/message`)
      .orderByKey()
      .once('value', (snapshot) => {
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
      .then(() =>
        res.send({
          messages,
          usersRead,
        }),
      )
      .catch(() =>
        res.status(500).send({
          message: 'oops! Somthing went wrong',
        }),
      );
  }
};

/**
 * @description This method allow users to create user group.
 * POST:/api/v1/group
 *
 * @method group
 *
 * @param {object} req request
 * @param {object} res response
 *
 * @returns {Object}response containing a message object
 */
export const createGroup = (req, res) => {
  const { groupName, description } = req.body;
  firebase.auth().onAuthStateChanged((user) => {
    if (user !== null) {
      userObject.userGroupName(capitalizeFirstLetter(`${groupName}`))
      .then((result) => {
        if (result) {
          res.status(409).json({ message: 'group name already exist' });
        } else {
          const groupIdentity = capitalizeFirstLetter(`${groupName}`);
          userObject.createGroup(`${groupIdentity}`, `${description}`)
          .then((response) => {
            if (response) {
              res.status(201).json({
                message: 'group created Sucessfuly',
              });
            }
          });
        }
      }).catch(
        () => res.status(500).json({ message: 'oops! Somthing went wrong' }));
    } else {
      res.status(401).json({ message: 'you must  be loged in to do this' });
    }
  });
};

/**
 * @description This method allow retuning  of all group members.
 * GET:/api/v1/group/:groupid/members
 *
 * @method groupMember
 *
 * @param {object} req; request
 * @param {object} res; response
 *
 * @returns {object} response containing member list object
 */
export const groupMember = (req, res) => {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      const members = [];
      firebase
        .database()
        .ref(`/group/${req.params.groupid}/members`)
        .orderByKey()
        .once('value', (snapshot) => {
          snapshot.forEach((childSnapShot) => {
            const member = {
              memberId: childSnapShot.key,
              displayName: childSnapShot.val().displayName,
              email: childSnapShot.val().email,
            };
            members.push(member);
          });
        })
        .then(() =>
          res.send({
            members,
          }),
        )
        .catch(() =>
          res.status(500).send({
            message: 'oops! Somthing went wrong',
          }),
        );
    }
  });
};
