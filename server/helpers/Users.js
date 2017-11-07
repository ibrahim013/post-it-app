import firebase from 'firebase';
import sendEmail from '../utilities/emailTranspoter';
import sendSms from '../utilities/smsTranspoter';
/**
* class userObject: controls all user function
* @class
*/

export default class userObject {
/**
* @description: This method check for passed in user
*
* @param {String} displayName
*
* @return {Object} response containing users details
*/
  static userDetail(displayName) {
    const users = [];
    const registeredUsers = firebase
      .database()
      .ref('user')
      .orderByKey();
    return registeredUsers
      .once('value', (snapshot) => {
        snapshot.forEach((childSnapShot) => {
          const addedUser = childSnapShot.val();
          users.push(addedUser);
        });
      })
      .then(() => {
        const user = users.find(userdetails =>
          userdetails.displayName === `${displayName}`);
        if (user !== undefined) {
          return user;
        }
        return false;
      });
  }
/**
* @description: This method check for the avaliability of a group
*
* @param {String} groupId
*
* @return {Boolen}
*/
  static userGroup(groupId) {
    const groups = [];
    const createdGroups = firebase
      .database()
      .ref('group')
      .orderByValue();
    return createdGroups
      .once('value', (snapshot) => {
        snapshot.forEach((childSnapShot) => {
          const groupKey = childSnapShot.key;
          groups.push(groupKey);
        });
      })
      .then(() => {
        const group = groups.includes(`${groupId}`);
        if (group) {
          return true;
        }
        return false;
      });
  }
/**
* @description: This method check for user existance in a perticuler group
*
* @param {string} displayName
* @param {string} groupId
*
* @return {Boolen}
*/
  static groupMember(groupId, displayName) {
    const groupMembers = [];
    const members = firebase
    .database()
    .ref(`group/${groupId}/members`)
    .orderByKey();
    return members.once('value', (snapshot) => {
      snapshot.forEach((childSnapShot) => {
        const groupMember = childSnapShot.val().displayName;
        groupMembers.push(groupMember);
      });
    })
      .then(() => {
        const member = groupMembers.includes(`${displayName}`);
        if (member) {
          return true;
        }
        return false;
      });
  }
/**
* @description: This method add user to a perticuler group
*
* @param {string} groupId
* @param {string} diaplayName
* @param {string} groupName
*
* @return {Boolen}
*/
  static addToGroup(groupId, displayName, groupName) {
    return userObject.userDetail(displayName).then((user) => {
      const addedUser = user.uid;
      const currentUser = firebase.auth().currentUser.uid;
      firebase.database().ref(`user/${addedUser}/group`)
      .push({
        groupName,
      });
      firebase.database().ref(`user/${currentUser}/group`)
      .push({
        groupName,
      });
      firebase.database().ref(`group/${groupId}/`)
      .child('members')
      .push({
        displayName: user.displayName,
        email: user.email,
        phoneNumber: user.phoneNumber,
      });
    }).then(() => true);
  }
/**
* @description: This method gets all group member in a group
*
* @param {string} groupId
*
* @return {Boolen}
*/
  static getGroupMembersEmail(groupId) {
    const userEmail = [];
    const memberEmail = firebase
      .database()
      .ref(`group/${groupId}/members`)
      .orderByKey();
    return memberEmail.once('value', (snapshot) => {
      snapshot.forEach((childSnapShot) => {
        const email = childSnapShot.val().email;
        userEmail.push(email);
      });
    }).then(() => userEmail);
  }
  static getGroupMembersPhoneNumber(groupId) {
    const phoneNumber = [];
    const memberPhone = firebase
      .database()
      .ref(`group/${groupId}/members`)
      .orderByKey();
    return memberPhone.once('value', (snapshot) => {
      snapshot.forEach((childSnapShot) => {
        const number = childSnapShot.val().phoneNumber;
        phoneNumber.push(number);
      });
    }).then(() => phoneNumber);
  }

/**
* @description: This method send email notification to members in a group
*
* @param {string} groupId
* @param {string} piority
* @param {string} groupName
*
* @return {Void} any
*/
  static sendNotification(groupId, piority, groupName) {
    userObject.getGroupMembersEmail(groupId).then((userEmail) => {
      if (`${piority}` === 'Critical') {
        sendEmail({ userEmail, groupName });
      }
    });
    userObject.getGroupMembersPhoneNumber(groupId).then((userNumber) => {
      if (`${piority}` === 'Critical' || `${piority}` === 'Urgent') {
        sendSms({ userNumber, groupName });
      }
    });
  }
}
