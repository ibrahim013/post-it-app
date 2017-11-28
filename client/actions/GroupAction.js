import Alert from 'react-s-alert';
import axios from 'axios';
import {
  GET_ALL_GROUPS,
  SET_GROUP_MESSAGES,
  GET_ALL_GROUP_MEMBERS,
  GET_ALL_READ,
  POST_NEW_MESSAGE,
  ADD_NEW_MEMBER,
  ADD_NEW_GROUP,
} from '../constants/ActionTypes';

/**
 * @description get all group in the store
 *
 * @function getGroupAction
 *
 * @param  {object} groupdata groupdata
 *
 * @return {object} - object of type GET_ALL_GROUPS and groupData
 */
export function getGroupAction(groupData) {
  return {
    type: GET_ALL_GROUPS,
    groupData,
  };
}
/**
 * @description get all message in the store
 *
 * @function setMessages
 *
 * @param  {object} groupMessage groupdata
 *
 * @return {object} - object of type SET_GROUP_MESSAGES and groupMessage
 */
export function setMessages(groupMessages) {
  return {
    type: SET_GROUP_MESSAGES,
    groupMessages,
  };
}
/**
 * @description get all group members in the store
 *
 * @function getGroupMembers
 *
 * @param  {object} groupMembers group members
 *
 * @return {object} - object of type GET_ALL_GROUP_MEMBERS and groupMembers
 */
export function getGroupMembers(groupMembers) {
  return {
    type: GET_ALL_GROUP_MEMBERS,
    groupMembers,
  };
}
/**
 * @description get all read message in the store
 *
 * @function updateReadStatus
 *
 * @param  {object} read read message status
 *
 * @return {object} - object of type GET_ALL_READ and read
 */
export function updateReadStatus(read) {
  return {
    type: GET_ALL_READ,
    read,
  };
}

/**
 * @description add post new message in the store
 *
 * @function readAction
 *
 * @param  {object} messageDate post messages
 *
 * @return {object} - object of type POST_NEW_MESSAGE and messageData
 */
export function postNewMessage(messageData) {
  return {
    type: POST_NEW_MESSAGE,
    messageData,
  };
}

/**
 * @description add new member to group
 *
 * @function addMember
 *
 * @param  {object} userDetails new member
 *
 * @return {object} - object of type ADD_NEW_MEMBER and userDetails
 */
export function addMember(userDetails) {
  return {
    type: ADD_NEW_MEMBER,
    userDetails,
  };
}

/**
 * @description add new group
 *
 * @function addGroup
 *
 * @param  {object} userDetails new member
 *
 * @return {object} - object of type ADD_NEW_MEMBER and userDetails
 */
export function addGroup(groupDetail) {
  return {
    type: ADD_NEW_GROUP,
    groupDetail,
  };
}
/**
 * @description make api call to get all groups from server
 *
 * @function getGroups
 *
 * @return {object} group data
 */
export function getGroups() {
  return dispatch =>
    axios
      .get('/api/v1/group/groups')
      .then((response) => {
        dispatch(getGroupAction(response.data.groups));
      })
      .catch((error) => {
        if (error) {
          Alert.error(error.response.data.message, {
            position: 'top-right',
            offset: 100,
          });
        }
      });
}
/**
 * @description make api call to get all group messages
 *
 * @function getAllMessages
 *
 * @param {string} groupid
 *
 * @return {void} group data
 */
export function getAllMessages(groupid) {
  return dispatch =>
    axios.get(`/api/v1/group/${groupid}/messages/`).then((response) => {
      dispatch(setMessages(response.data.messages));
      dispatch(updateReadStatus(response.data.usersRead));
    }).catch((error) => {
      if (error) {
        Alert.error(error.response.data.message, {
          position: 'top-right',
          offset: 100,
        });
      }
    });
}
/**
 * @description make api call to get all group members
 *
 * @function getMembers
 *
 * @param {string} groupid
 *
 * @return {object} member data
 */
export function getMembers(groupid) {
  return dispatch =>
    axios.get(`/api/v1/group/${groupid}/members/`).then((response) => {
      dispatch(getGroupMembers(response.data.members));
    }).catch((error) => {
      if (error) {
        Alert.error(error.response.data.message, {
          position: 'top-right',
          offset: 100,
        });
      }
    });
}
/**
 * @description make api call to get add member to group
 *
 * @function addMember
 *
 * @param {object} userDetail
 *
 * @return {object} userdatails
 */
export function addNewMember(userDetails) {
  return (dispatch) => {
    dispatch(addMember({
      displayName: userDetails.displayName,
    }));
    axios
      .post('/api/v1/group/addmember', userDetails)
      .then((res) => {
        Alert.success(res.data.message, {
          position: 'top-right',
          offset: 100,
        });
      })
      .catch((error) => {
        if (error) {
          Alert.error(error.response.data.message, {
            position: 'top-right',
            offset: 100,
          });
        }
      });
  };
}
/**
 * @description make api call to add group
 *
 * @function addNewGroup
 *
 * @param {object} groupData
 *
 * @return {object} message
 */
export function addNewGroup(groupData) {
  return (dispatch) => {
    dispatch(addGroup({
      groupname: groupData.groupName,
    }));
    axios
      .post('/api/v1/group', groupData)
      .then((res) => {
        dispatch(getGroups());
        Alert.success(res.data.message, {
          position: 'top-left',
          offset: 100,
        });
      })
      .catch((error) => {
        if (error) {
          Alert.error(error.response.data.message, {
            position: 'top-left',
            offset: 100,
          });
        }
      });
  };
}

/**
 * @description make api call to post new message
 *
 * @function postMessage
 *
 * @param {object} messageData
 *
 * @return {object} message
 */
export function postMessage(messageData) {
  return (dispatch) => {
    dispatch(postNewMessage({
      mesageId: messageData.groupId,
      messageText: messageData.message,
      PiorityLevel: messageData.piority,
      date: messageData.date,
    }));
    axios.post('/api/v1/group/postmessage', messageData)
      .then((res) => {
        Alert.success(res.data.message, {
          position: 'top-right',
          offset: 100,
        });
      })
      .catch((error) => {
        if (error) {
          Alert.error(error.response.data.message, {
            position: 'top-right',
            offset: 100,
          });
        }
      });
  };
}

