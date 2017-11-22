import Alert from 'react-s-alert';
import axios from 'axios';
import {
  GET_ALL_GROUPS,
  GET_ALL_MESSAGE,
  GET_ALL_GROUP_MEMBERS,
  GET_ALL_READ,
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
 * @function getMessageAction
 *
 * @param  {object} groupMessage groupdata
 *
 * @return {object} - object of type GET_ALL_MESSAGE and groupMessage
 */
export function getMessageAction(groupMessage) {
  return {
    type: GET_ALL_MESSAGE,
    groupMessage,
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
 * @function readAction
 *
 * @param  {object} read read messages
 *
 * @return {object} - object of type GET_ALL_READ and read
 */
export function readAction(read) {
  return {
    type: GET_ALL_READ,
    read,
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
 * @function getMessges
 *
 * @param {string} groupid
 *
 * @return {void} group data
 */
export function getMessges(groupid) {
  return dispatch =>
    axios.get(`/api/v1/group/${groupid}/messages/`).then((response) => {
      dispatch(getMessageAction(response.data.messages));
      dispatch(readAction(response.data.usersRead));
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
 * @function addMembers
 *
 * @param {object} userDetails
 *
 * @return {object} userdatails
 */
export function addMembers(userDetails) {
  return dispatch =>
    axios
      .post('/api/v1/group/addmember', userDetails)
      .then((res) => {
        dispatch(getMembers(userDetails.groupId));
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
}
/**
 * @description make api call to add group
 *
 * @function addGroups
 *
 * @param {object} groupData
 *
 * @return {object} message
 */
export function addGroups(groupData) {
  return dispatch =>
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
}

/**
 * @description make api call to add message
 *
 * @function addMessage
 *
 * @param {object} messageData
 *
 * @return {object} message
 */
export function addMessage(messageData) {
  return dispatch =>
    axios
      .post('/api/v1/group/postmessage', messageData)
      .then((res) => {
        Alert.success(res.data.message, {
          position: 'top-right',
          offset: 100,
        });
        return dispatch(getMessges(messageData.groupId));
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
