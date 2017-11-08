import * as firebase from 'firebase';
import userObject from '../helpers/Users';

/**
 * @description get user group.
 * GET: /api/v1/group/groups
<<<<<<< HEAD
=======
 *
>>>>>>> 29aaf09b9e7854e426fd84f18e914076ffd42628
 * @param {object} req;
 * @param {object} res;
 *
 *  @returns {Object}
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
              groupname: child.val().groupname,
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
    } else {
      return res.status(403).json({
        message: 'You are not signed in right now!',
      });
    }
  });
};

/**
 * @description adding members to group.
 * POST:/api/v1/group/addmember
<<<<<<< HEAD
=======
 *
>>>>>>> 29aaf09b9e7854e426fd84f18e914076ffd42628
 * @param {object} req;
 * @param {object} res;
 *
 * @return {Promise}
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
 * @description posting of message.
 * POST:/api/v1/group/postmessage
 *
 * @param {object} req;
 * @param {object} res;
 *
 * @returns {Promise}
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
                userObject.sendNotification(`${groupId}`, `${piority}`, `${groupName}`);
                return res.status(201).json({
                  message: 'Message Posted Sucessfuly',
                });
              });
          } else {
            res.status(400).json({ message: 'this is not a group' });
          }
        })
        .catch(() => res.status(401).json({ message: 'oops! Somthing went wrong' }));
    }
  } else {
    res.status(401).json({ message: 'you are not signed in' });
  }
};
/**
 * @description retuning group message.
 * GET:/api/v1/group/:groupid/messages
 *
 * @param {object} req; request
 * @param {object} res; response
 *
 * @returns {object} message list
 */

export const messageList = (req, res) => {
  const user = firebase.auth().currentUser;
  const displayName = user.displayName;
  const readTime = new Date().toString();
  if (user) {
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
      const readMessage = usersRead.find(seen => seen.displayName === `${displayName}`);
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
 * @description create user group.
 * POST:/api/v1/group
 *
 * @param {string} groupname;
 * @param {string} discription;
 *
 * @returns {Object}
 */

export const group = (req, res) => {
  const { groupName, description } = req.body;
  firebase.auth().onAuthStateChanged((user) => {
    if (user !== null) {
      userObject.userGroupName(groupName).then((result) => {
        if (result) {
          res.status(409).json({ message: 'group name already exist' });
        } else {
          userObject.createGroup(`${groupName}`, `${description}`)
          .then((response) => {
            if (response) {
              res.status(201).json({
                message: 'group created Sucessfuly',
              });
            }
          });
        }
      }).catch(() => res.status(500).json({ message: 'oops! Somthing went wrong' }));
    } else {
      res.status(401).json({ message: 'you must  be loged in to do this' });
    }
  });
};

/**
 * @description retuning all group members.
 * GET:/api/v1/group/:groupid/members
 * @param {object} req; request
 * @param {object} res; response
 *
 * @returns {object} member list
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
