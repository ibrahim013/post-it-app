import axios from 'axios';

/**
 * userSignupRequest() returns user data
 * from firebase signup end points
 * @param {string} userData
 * 
 * @return {promise} data
 */
export default function SignUpAction(userData) {
  return dispatch => axios.post('/user/signup', userData);
}
