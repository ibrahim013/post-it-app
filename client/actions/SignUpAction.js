import axios from 'axios';

/**
 * userSignupRequest() returns user data
 * from firebase signup end points
 */
export default function SignUpAction(userData) {
  return dispatch => axios.post('/user/signup', userData);
}
