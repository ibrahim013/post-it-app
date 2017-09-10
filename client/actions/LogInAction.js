import jwtDecode from 'jwt-decode';
import axios from 'axios';
import setAuthorizationToken from '../util/setAuthorizationToken';

/**
 * sign in action 
 * @param {string} userData
 * 
 * @return {string} token 
 */
export default function SignIn(userData) {
  return dispatch => axios.post('/user/signin', userData)
    .then((res) => {
      const token = res.data.token;
      localStorage.setItem('jwtToken', token);
      setAuthorizationToken(token);
      console.log(jwtDecode(token));
    });
}
