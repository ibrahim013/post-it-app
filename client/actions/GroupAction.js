import Alert from 'react-s-alert';
import axios from 'axios';
import {
  GET_ALL_GROUPS,
  GET_ALL_MESSAGE,
  GET_ALL_GROUP_MEMBERS,
  GET_ALL_READ,
} from '../constants/ActionTypes';

/**
   * dispatches an action to get all groups
   * @param {any} groupdata
   */

export function getGroupAction(groupData) {
  return {
    type: GET_ALL_GROUPS,
    groupData,
  };
}
/**
   * dispatches an action to get all groups message
   * @param {any} groupdata
   */
export function getMessageAction(groupMessage) {
  return {
    type: GET_ALL_MESSAGE,
    groupMessage,
  };
}
/**
   * dispatches an action to get all group members
   * @param {any} groupdata
   */
export function getGroupMembers(groupMembers) {
  return {
    type: GET_ALL_GROUP_MEMBERS,
    groupMembers,
  };
}
/**
   * dispatches an action to show who saw messages
   * @param {any} read
   */
export function readAction(read) {
  return {
    type: GET_ALL_READ,
    read,
  };
}
/**
 *
 * @param {string} groupname
 *
 * @return {promise} groups
 */

export function getGroups() {
  return dispatch =>
    axios
      .get('/api/v1/group/groups')
      .then((response) => {
        dispatch(getGroupAction(response.data.groups));
      })
      .catch();
}
/**
 *
 * @param {object} groupid
 *
 * @return {promise} messages
 */
export function getMessges(groupid) {
  return dispatch =>
    axios.get(`/api/v1/group/${groupid}/messages/`).then((response) => {
      dispatch(getMessageAction(response.data.messages));
      dispatch(readAction(response.data.usersRead));
    });
}
/**
 *
 * @param {object} groupid
 *
 * @return {promise} members
 */
export function getMembers(groupid) {
  return dispatch =>
    axios.get(`/api/v1/group/${groupid}/members/`).then((response) => {
      dispatch(getGroupMembers(response.data.members));
    });
}
/**
 *
 * @param {object} userdetails
 *
 * @return {promise}
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
 *
 * @param {object} groupdata
 *
 * @return {promise} messages
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
 *
 * @param {object} groupName
 *
 * @return {promise}
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
