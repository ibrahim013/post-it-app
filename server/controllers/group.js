import * as firebase from 'firebase';
import sendEmail from '../utilities/emailTranspoter';
import sendSms from '../utilities/smsTranspoter';
/**
 * @description get user group.
 * GET:/v1/group/groups
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
 * POST:/v1/group/addmember
 * @param {object} req; 
 * @param {object} res; 
 * 
 * @return {Promise}
 */

export const addMember = (req, res) => {
  const { groupName, displayName, groupId } = req.body;
  const dateCreated = new Date().toString();
  const users = [];
  const groups = [];
  const groupMember = [];
  const registeredUsers = firebase
    .database()
    .ref('user')
    .orderByKey();
  const createdGroups = firebase
    .database()
    .ref('group')
    .orderByValue();
  const groupMembers = firebase
    .database()
    .ref(`group/${groupId}/members`)
    .orderByKey();
  registeredUsers.once('value', (snapshot) => {
    snapshot.forEach((childSnapShot) => {
      const user = {
        displayName: childSnapShot.val().displayName,
        email: childSnapShot.val().email,
        phoneNumber: childSnapShot.val().phoneNumber,
        uid: childSnapShot.val().uid,
      };
      users.push(user);
    });
  });
  groupMembers.once('value', (snapshot) => {
    snapshot.forEach((childSnapShot) => {
      const groupmember = childSnapShot.val().displayName;
      groupMember.push(groupmember);
    });
  });
  createdGroups
    .once('value', (snapshot) => {
      snapshot.forEach((childSnapShot) => {
        const group = childSnapShot.val().groupname;
        groups.push(group);
      });
      const group = groups.includes(`${groupName}`);
      const user = users.find(userdetails => userdetails.displayName === `${displayName}`);
      const member = groupMember.includes(`${displayName}`);
      if (!user) {
        return res.status(400).json({ message: 'User not found' });
      }
      if (!group) {
        return res.status(400).json({ message: 'Group not found' });
      }
      if (member) {
        return res.status(400).json({
          message: 'This user is already a member of this group',
        });
      }
      const addedUser = user.uid;
      firebase
        .database()
        .ref(`user/${addedUser}/group`)
        .push({
          groupname: groupName,
          dateCreated,
        });
      const currentUser = firebase.auth().currentUser.uid;
      firebase
        .database()
        .ref(`user/${currentUser}/group`)
        .push({
          groupname: groupName,
          dateCreated,
        });
      firebase
        .database()
        .ref(`group/${groupId}/`)
        .child('members')
        .push({
          displayName: user.displayName,
          email: user.email,
          phoneNumber: user.phoneNumber,
        });
    })
    .then(() => res.status(201).json({ message: 'user added sucessfully' }))
    .catch(() => res.status(400).json({ message: 'oops! Somthing went wrong' }));
};

/**
 * @description posting of message.
 * POST:/v1/group/postmessage
 * @param {object} req; 
 * @param {object} res; 
 *
 * @returns {Promise} 
 */

export const postMessage = (req, res) => {
  const { message, piority, groupname } = req.body;
  const currentUser = firebase.auth().currentUser;
  const displayName = currentUser.displayName;
  const dateCreated = new Date().toString();
  if (currentUser !== null) {
    firebase
      .database()
      .ref(`group/${groupname}/`)
      .child('message')
      .push({
        MessagePiority: piority,
        Message: message,
        DateCreated: dateCreated,
        Author: displayName,
      })
      .then(() =>
        res.status(201).json({
          message: 'Message Posted Sucessfuly',
        }),
      )
      .then(() => {
        if (`${piority}` === 'Critical') {
          const userEmail = [];
          const memberEmail = firebase
            .database()
            .ref(`group/${groupname}/members`)
            .orderByKey();
          memberEmail.once('value', (snapshot) => {
            snapshot.forEach((childSnapShot) => {
              const email = {
                email: childSnapShot.val().email,
              };
              userEmail.push(email);
              sendEmail({ userEmail, groupname });
            });
          });
        }
        if (`${piority}` === 'Critical' || `${piority}` === 'Urgent') {
          const user = [];
          const phoneNumber = [];
          const users = firebase
            .database()
            .ref(`group/${groupname}/members`)
            .orderByKey();
          users.once('value', (snapshot) => {
            snapshot.forEach((childSnapShot) => {
              const displayName = {
                displayName: childSnapShot.val().displayName,
              };
              user.push(displayName);
              const number = childSnapShot.val().phoneNumber;
              phoneNumber.push(number);
              sendSms({ phoneNumber, groupname });
            });
            req.app.io.emit('message Sent', {
              user,
            });
            console.log(user);
          });
        }
      })
      .catch(() => res.status(401).json({ message: 'oops! Somthing went wrong' }));
  }
};
/**
 * @description retuning group message.
 * GET:/v1/group/:groupid/messages
 * @param {object} req; request 
 * @param {object} res; response
 *
 * @returns {object} mesage list
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
 * POST:/v1/group
 * @param {string} groupname; 
 * @param {string} discription; 
 * @returns {Object} 
 */

export const group = (req, res) => {
  const { groupname, discription } = req.body;
  const currentUser = firebase.auth().currentUser;
  const uid = currentUser.uid;
  if (currentUser !== null) {
    const dateCreated = new Date().toString();
    const userEmail = currentUser.email;
    const displayName = currentUser.displayName;
    const groupKey = firebase
      .database()
      .ref(`user/${uid}/group`)
      .push({
        groupname,
        dateCreated,
      }).key;
    firebase
      .database()
      .ref(`group/${groupKey}`)
      .set({
        groupname,
        dateCreated,
        GroupAdmin: userEmail,
        userEmail,
        displayName,
        Discription: discription,
      })
      .then(() =>
        res.status(201).json({
          message: 'group created Sucessfuly',
        }),
      )
      .catch(() => res.status(401).json({ message: 'oops! Somthing went wrong' }));
  } else {
    res.status(401).json({ message: 'you must  be loged in to do this' });
  }
};
/**
 * @description retuning all group members.
 * GET:/v1/group/:groupid/members
 * @param {object} req; request 
 * @param {object} res; response
 *
 * @returns {object} member list
 */

export const groupMember = (req, res) => {
  const user = firebase.auth().currentUser;
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
};
