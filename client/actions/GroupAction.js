import Alert from 'react-s-alert';
import axios from 'axios';
import { GET_ALL_GROUPS, GET_ALL_MESSAGE, GET_ALL_GROUP_MEMBERS } from '../constants/ActionTypes';

/**
 * userSignupRequest() returns user data
 * @param {string} groupData
 * @return {promise}
 */

export function GetGroupAction(groupData) {
  return {
    type: GET_ALL_GROUPS,
    groupData,
  };
}
export function GetMessageAction(groupMessage) {
  return {
    type: GET_ALL_MESSAGE,
    groupMessage,
  };
}
export function GetGroupMembers(groupMembers) {
  return {
    type: GET_ALL_GROUP_MEMBERS,
    groupMembers,
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
      .get('/v1/group/groups')
      .then((response) => {
        dispatch(GetGroupAction(response.data.groups));
      })
      .catch();
}
export function getMessges(groupid) {
  return dispatch =>
    axios.get(`/v1/group/${groupid}/messages/`).then((response) => {
      dispatch(GetMessageAction(response.data.messages));
    });
}
export function getMembers(groupid) {
  return dispatch =>
    axios.get(`/v1/group/${groupid}/members/`).then((response) => {
      dispatch(GetGroupMembers(response.data.members));
    });
}
export function addMembers(userDetails) {
  return dispatch => axios.post('/v1/group/addmember', userDetails)
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

export function addGroups(groupData) {
  return dispatch =>
    axios.post('/v1/group', groupData)
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
 * @param {string} groupname 
 * 
 * @return {promise} groups
 */
export function addMessage(messageData) {
  return dispatch =>
    axios.post('/v1/group/postmessage', messageData).then((res) => {
      dispatch(getMessges(messageData.groupname));
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
