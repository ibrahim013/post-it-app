import axios from 'axios';
import { GET_ALL_GROUPS, GET_ALL_MESSAGE, ADD_NEW_MEMBER } from '../constants/ActionTypes';

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
function MemberAddedAction() {
  return {
    type: ADD_NEW_MEMBER,
  };
}
/**
 * 
 * @param {string} groupname 
 * 
 * @return {promise} groups
 */

export function addGroups(groupData) {
  return () => axios.post('/groups', groupData);
}

export function getGroups() {
  return dispatch => axios.get('/groups/group')
    .then(
      (response) => {
        dispatch(GetGroupAction(response.data.groups));
      },
    ).catch();
}
export function getMessges(groupid) {
  return dispatch => axios.get(`/group/${groupid}/messages/`)
    .then(
      (response) => {
        dispatch(GetMessageAction(response.data.messages));
      });
}
export function addMembers(userDetails) {
  return dispatch => axios.post('/group/addmember', userDetails).then(
    // () => {
    //   dispatch(MemberAddedAction());
    // },
  );
}
