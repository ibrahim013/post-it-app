import * as firebase from 'firebase';
import Alert from 'react-s-alert';
import axios from 'axios';
import config from '../../server/database';
import { loggedInUser, loggedInError } from './UserAction';
import { GOOGLE_LOGIN } from '../constants/ActionTypes';

/**
   * dispatches google action
   * @param {any} google login user
   */
export function googleUser(GLogin) {
  return {
    type: GOOGLE_LOGIN,
    GLogin,
  };
}
/**
   * dispatches google login action
   * @param {any} user
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
          .post('/v1/user/google', userData)
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
            localStorage.setItem('GoogleLogin', JSON.stringify(isConfirmed));
            return true;
          });
      }).catch((error) => {
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
   * dispatches an action for google update
   * @param {any} user
   */
export function googleUpdate(number) {
  return (dispatch) => {
    axios
      .post('/v1/user/googleupdate', number).then((res) => {
        dispatch(googleLogin(res.data.isConfirmed));
        Alert.success(res.data.message, {
          position: 'top-right',
          offset: 100,
        });
        const isConfirmed = res.data.isConfirmed;
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
