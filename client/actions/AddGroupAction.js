import axios from 'axios';

/**
 * 
 * @param {string} groupname 
 * 
 * @return {promise} groups
 */

export default function addGroups(groupData) {
  return () => axios.post('/groups', groupData);
}
