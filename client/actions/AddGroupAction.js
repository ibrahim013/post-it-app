import axios from 'axios';


export default function addGroupAction(groupname) {
  return dispatch => axios.post('/group', groupname);
}