import axios from 'axios';
import Alert from 'react-s-alert';
import { LOGIN_USER, LOGOUT_USER } from '../constants/ActionTypes';
/**
 * sign in action 
 * @param {string} userData
 * 
 * @return {string} token 
 */
export function LoggedInUser(user) {
  return {
    type: LOGIN_USER,
    user,
  };
}
export function LogOutUser() {
  return {
    type: LOGOUT_USER,
  };
}
export function SignIn(userData) {
  return dispatch =>
    axios
      .post('/v1/user/signin', userData)
      .then((res) => {
        dispatch(LoggedInUser(res.data.user));
        Alert.success(res.data.message, {
          position: 'top-right',
          offset: 100,
        });
        const token = res.data.user;
        localStorage.setItem('user', JSON.stringify(token));
        return true;
      })
      .catch((error) => {
        if (error) {
          Alert.error(error.response.data.message, {
            position: 'top-right',
            offset: 100,
          });
        }
        return false;
      });
}

export function SignOut() {
  return dispatch =>
    axios
      .get('/v1/user/signout')
      .then((res) => {
        dispatch(LogOutUser());
        Alert.success(res.data.message, {
          position: 'top-right',
          offset: 100,
        });
        localStorage.removeItem('user');
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
export function SignUpAction(userData) {
  return () => axios.post('/v1/user/signup', userData);
}

export function passwordReset(email) {
  return () =>
    axios
      .post('/v1/user/passwordreset', email)
      .then((res) => {
        Alert.success(res.data.message, {
          position: 'top-right',
          offset: 100,
        });
        return true;
      })
      .catch((error) => {
        if (error) {
          Alert.error(error.response.data.message, {
            position: 'top-right',
            offset: 100,
          });
          return false;
        }
      });
}
