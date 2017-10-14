import * as firebase from 'firebase';
import sendEmail from '../utilities/emailTranspoter';

/**
 * @description get user group.
 * GET:/group/groups
 * @param {object} req; 
 * @param {object} res; 
 *
 *  @returns {Object} 
 */

export const userGroups = (req, res) => {
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
          };
          groups.push(group);
        });
      })
      .then(() => res.status(201).json(
        { groups },
      ))
      .catch(error => res.status(500).json({
        message: `Error occurred ${error.message}`,
      }));
  } else {
    return res.status(403).json({
      message: 'You are not signed in right now!',
    });
  }
};


/**
 * @description adding members to group.
 * POST:/group/addmember
 * @param {object} req; 
 * @param {object} res; 
 * 
 * @return {Promise}
 */

export const addMember = (req, res) => {
  const { groupName, displayName, groupId } = req.body;
  const users = [];
  const groups = [];
  const groupMember = [];
  const registeredUsers = firebase.database().ref('user').orderByKey();
  const createdGroups = firebase.database().ref('group').orderByValue();
  const groupMembers = firebase.database().ref(`group/${groupId}/members`)
    .orderByKey();
  registeredUsers.once('value', (snapshot) => {
    snapshot.forEach((childSnapShot) => {
      const user = {
        displayName: childSnapShot.val().displayName,
        email: childSnapShot.val().email,
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
  createdGroups.once('value', (snapshot) => {
    snapshot.forEach((childSnapShot) => {
      const group = childSnapShot.val().groupname;

      groups.push(group);
    });
    const group = groups.includes(`${groupName}`);
    const user = users.find(o => o.displayName === `${displayName}`);
    const member = groupMember.includes(`${displayName}`);
    if (!user) {
      return res.status(400).json({ message: 'user not found' });
    }
    if (!group) {
      return res.status(400).json({ message: 'Group not found' });
    }
    if (member) {
      return res.status(400).json({ message: 'This user is alredy a' +
       'member of this group' });
    }
    firebase.database().ref(`group/${groupId}/`).child('members').push({
      displayName: user.displayName,
      email: user.email,

    });
  }).then(() => res.status(200).json({ message: 'user added sucessfully' }))
    .catch((error) => {
      const errorCode = error.code;
      return res.status(400).json({ message: 'Somthing went wrong', errorCode });
    });
};

/**
 * @description message sending.
 * @param {object} req; 
 * @param {object} res; 
 *
 * @returns {Promise} 
 */

export const postMessage = (req, res) => {
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
      .then(() => {
        if (`${piority}` === 'critical') {
          const userEmail = [];
          const memberEmail = firebase.database().ref(`group/${groupname}/members`).orderByKey();
          memberEmail.once('value', (snapshot) => {
            snapshot.forEach((childSnapShot) => {
              const email = {
                email: childSnapShot.val().email,
              };
              userEmail.push(email);
              sendEmail({ userEmail, groupname });
              console.log(userEmail);
            });
          });
        }
      })
      .catch((error) => {
        const errorCode = error.code;
        return res.status(401).json({ message: 'Somthing went wrong', errorCode,
        });
      });
  }
};

/**
 * @description all group message.
 * @param {object} req; request 
 * @param {object} res; response
 *
 * @returns {object} group list
 */

export const messageList = (req, res) => {
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
};

/**
 * @description create user group.
 * POST:/group
 * @param {string} groupname; 
 * @param {string} discription; 
 * @returns {Object} 
 */

export const group = (req, res) => {
  const currentUser = firebase.auth().currentUser;
  const { groupname, discription } = req.body;
  if (currentUser !== null) {
    const dateCreated = new Date().toString();
    const userEmail = currentUser.email;
    const createdBy = currentUser.uid;
    const displayName = currentUser.displayName;
    firebase.database().ref('group/').push({
      groupname,
      dateCreated,
      GroupAdmin: userEmail,
      createdBy,
      displayName,
      Discription: discription,
    }).then(() => res.status(201).json({ message: 'group created Sucessfuly',
    }))
      .catch((error) => {
        const errorCode = error.code;
        return res.status(401).json({ message: 'Somthing went wrong', errorCode });
      });
  } else {
    res.status(401).json({ message: 'you must  be loged in to do this' });
  }
};
/**
 * @description all group message.
 * @param {object} req; request 
 * @param {object} res; response
 *
 * @returns {object} group list
 */

export const groupMember = (req, res) => {
  const user = firebase.auth().currentUser;
  if (user) {
    const members = [];
    firebase.database().ref(`/group/${req.params.groupid}/members`).orderByKey()
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
      .then(() => res.send({
        members,
      }))
      .catch(error => res.status(500).send({
        message: `Error occurred ${error.message}`,
      }));
  }
};
