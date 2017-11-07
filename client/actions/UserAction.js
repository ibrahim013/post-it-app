import axios from 'axios';
import Alert from 'react-s-alert';
import { LOGIN_USER, LOGOUT_USER, LOGIN_ERROR } from '../constants/ActionTypes';
/**
 * sign in action
 * @param {string} userData
 *
 * @return {string} token
 */
export function loggedInUser(user) {
  return {
    type: LOGIN_USER,
    user,
  };
}
export function loggedInError() {
  return {
    type: LOGIN_ERROR,
  };
}
export function logOutUser() {
  return {
    type: LOGOUT_USER,
  };
}
export function signIn(userData) {
  return dispatch =>
    axios
      .post('/api/v1/user/signin', userData)
      .then((res) => {
        dispatch(loggedInUser(res.data.user));
        Alert.success(res.data.message, {
          position: 'top-right',
          offset: 100,
        });
        const token = res.data.user;
        localStorage.setItem('user', JSON.stringify(token));
        return true;
      })
      .catch((error) => {
        dispatch(loggedInError());
        if (error) {
          Alert.error('oops! something went wrong', {
            position: 'top-right',
            offset: 100,
          });
        }
        return false;
      });
}

export function signOut() {
  return dispatch =>
    axios
      .get('/api/v1/user/signout')
      .then((res) => {
        dispatch(logOutUser());
        Alert.success(res.data.message, {
          position: 'top-right',
          offset: 100,
        });
        localStorage.removeItem('user');
        localStorage.removeItem('GoogleLogin');
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
export function signUpAction(userData) {
  return () =>
    axios
      .post('/api/v1/user/signup', userData)
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

export function passwordReset(email) {
  return () =>
    axios
      .post('/api/v1/user/passwordreset', email)
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
