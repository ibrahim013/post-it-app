import * as firebase from 'firebase';


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
      .then(() => res.json(
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
  const groupMembers = firebase.database().ref(`group/${groupId}/members`).orderByKey();
  registeredUsers.once('value', (snapshot) => {
    snapshot.forEach((childSnapShot) => {
      const user = childSnapShot.val().displayName;
      users.push(user);
    });
  });
  groupMembers.once('value', (snapshot) => {
    snapshot.forEach((childSnapShot) => {
      const groupmember = childSnapShot.val().displayname;
      groupMember.push(groupmember);
    });
  });
  createdGroups.once('value', (snapshot) => {
    snapshot.forEach((childSnapShot) => {
      const group = childSnapShot.val().groupname;
      groups.push(group);
    });
    const group = groups.includes(`${groupName}`);
    const user = users.includes(`${displayName}`);
    const member = groupMember.includes(`${displayName}`);
    if (!user) {
      return res.status(400).json({ message: 'user not found' });
    }
    if (!group) {
      return res.status(400).json({ message: 'Group not found' });
    }
    if (member) {
      return res.status(400).json({ message: 'This user is alredy a member of this group' });
    }
    firebase.database().ref(`group/${groupId}/`).child('members').push({
      displayName,

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
      .catch((error) => {
        const errorCode = error.code;
        return res.status(401).json({ message: 'Somthing went wrong', errorCode,
        });
      });
  }
};

/**
 * @description all user group a user belongs.
 * @param {object} req; request 
 * @param {object} res; response
 *
 * @returns {object} group list
 */

export const groupList = (req, res) => {
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
    }).then(() => res.status(201).json({ message: 'group created Sucessfuly',
    }))
      .catch((error) => {
        const errorCode = error.code;
        return res.status(401).json({ message: 'Somthing went wrong', errorCode });
      });
  }
};
