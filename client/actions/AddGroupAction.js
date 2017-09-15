import axios from 'axios';

/**
 * 
 * @param {string} groupname 
 * 
 * @return {promise} groups
 */

export default function addGroupAction(groupname) {
  return dispatch => axios.post('/group', groupname);
}