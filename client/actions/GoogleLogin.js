import * as firebase from 'firebase';
import Alert from 'react-s-alert';
import axios from 'axios';
import config from '../../server/database';
import { loggedInUser, loggedInError } from './UserAction';
import { GOOGLE_LOGIN } from '../constants/ActionTypes';

/**
 * @description set google user to the store
 *
 * @function googleUser
 *
 * @param  {object} GLogin google user
 *
 * @return {object} - object of type GOOGLE_LOGIN and GLogin
 */
export function googleUser(GLogin) {
  return {
    type: GOOGLE_LOGIN,
    GLogin,
  };
}
/**
 * @description make api call to sign in with google
 *
 * @function googleLogin
 *
 * @return {boolean} boolean
 */
export function googleLogin() {
  firebase.initializeApp(config);
  return (dispatch) => {
    const provider = new firebase.auth.GoogleAuthProvider();
    return firebase
      .auth()
      .signInWithPopup(provider)
      .then((userData) => {
        axios
          .post('/api/v1/user/google', userData)
          .then((res) => {
            dispatch(loggedInUser(res.data.user));
            dispatch(googleUser(res.data.isConfirmed));
            Alert.success(res.data.message, {
              position: 'top-right',
              offset: 100,
            });
            const user = res.data.user;
            const isConfirmed = res.data.isConfirmed;
            localStorage.setItem('user', JSON.stringify(user));
            localStorage.setItem('token', res.data.token);
            localStorage.setItem('GoogleLogin', JSON.stringify(isConfirmed));
          });
      }).then(() => true)
      .catch((error) => {
        dispatch(loggedInError());
        if (error) {
          Alert.error('oops somthing went wrong!!', {
            position: 'top-right',
            offset: 100,
          });
        }
        return false;
      });
  };
}
/**
 * @description make api call to ubdate google record
 *
 * @function googleUpdate
 *
 * @param {string} number
 *
 * @return {boolean} return boolean
 */
export function googleUpdate(number) {
  return (dispatch) => {
    axios
      .post('/api/v1/user/googleupdate', number).then((response) => {
        dispatch(googleUser(response.data.isConfirmed));
        Alert.success(response.data.message, {
          position: 'top-right',
          offset: 100,
        });
        const isConfirmed = response.data.isConfirmed;
        localStorage.setItem('GoogleLogin', JSON.stringify(isConfirmed));
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
  };
}
