import axios from 'axios';
import { GET_ALL_GROUPS, GET_ALL_MESSAGE, ADD_NEW_MEMBER, GET_ALL_GROUP_MEMBERS }
  from '../constants/ActionTypes';

/**
 * userSignupRequest() returns user data
 * @param {string} groupData
 * @return {promise}
 */

function GetGroupAction(groupData) {
  return {
    type: GET_ALL_GROUPS,
    groupData,
  };
}
function GetMessageAction(groupMessage) {
  return {
    type: GET_ALL_MESSAGE,
    groupMessage,
  };
}
function GetGroupMembers(groupMembers) {
  return {
    type: GET_ALL_GROUP_MEMBERS,
    groupMembers,
  };
}
// function MemberAddedAction() {
//   return {
//     type: ADD_NEW_MEMBER,
//   };
// }
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
export function addMembers(userDetails) {
  return dispatch => axios.post('/v1/group/addmember', userDetails).then();
}

export function addGroups(groupData) {
  return dispatch =>
    axios.post('/v1/groups', groupData).then(({ data }) => dispatch(GetGroupAction(data.groups)));
}

export function getMembers(groupid) {
  return dispatch =>
    axios.get(`/v1/group/${groupid}/members/`).then((response) => {
      dispatch(GetGroupMembers(response.data.members));
    });
}
