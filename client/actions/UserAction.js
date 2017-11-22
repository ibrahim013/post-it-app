import axios from 'axios';
import Alert from 'react-s-alert';
import { LOGIN_USER, LOGOUT_USER, LOGIN_ERROR } from '../constants/ActionTypes';

/**
 * @description Set login user in the store
 *
 * @function loggedInUser
 *
 * @param  {object} user
 *
 * @return {object} - object of type LOGIN_USER and user
 */
export function loggedInUser(user) {
  return {
    type: LOGIN_USER,
    user,
  };
}
/**
 * @description Set login error in the store
 *
 * @function loggedInError
 *
 * @return {object} - object of type LOGIN_ERROR
 */
export function loggedInError() {
  return {
    type: LOGIN_ERROR,
  };
}
/**
 * @description Set logout user
 *
 * @function logOutUser
 *
 * @return {object} - object of type LOGIN_ERROR
 */
export function logOutUser() {
  return {
    type: LOGOUT_USER,
  };
}

/**
 * @description user sign in request
 *
 * @function signIn
 *
 * @param  {object} user userdata
 *
 * @return {boolean} - return boolean
 */
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
          Alert.error(error.response.data.message, {
            position: 'top-right',
            offset: 100,
          });
        }
        return false;
      });
}
/**
 * @description user sign out request
 *
 * @function signOut
 *
 * @return {void}
 */
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
          Alert.error(error.res.data.message, {
            position: 'top-right',
            offset: 100,
          });
        }
      });
}
/**
 * @description user sign up action
 *
 * @function signUpAction
 *
 * @param  {object} user userdata
 *
 * @return {boolean} - return boolean
 */
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
          Alert.error(error.res.data.message, {
            position: 'top-right',
            offset: 100,
          });
          return false;
        }
      });
}
/**
 * @description user sign up action
 *
 * @function passwordReset
 *
 * @param  {string} email userdata
 *
 * @return {boolean} - return boolean
 */
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
          Alert.error(error.res.data.message, {
            position: 'top-right',
            offset: 100,
          });
          return false;
        }
      });
}
