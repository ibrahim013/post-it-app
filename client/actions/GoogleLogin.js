import * as firebase from 'firebase';
import Alert from 'react-s-alert';
import axios from 'axios';
import config from '../../server/database';
import { LoggedInUser, LoggedInError } from './UserAction';
import { GOOGLE_LOGIN } from '../constants/ActionTypes';

// Group Added to Firebase
export function googleLogin(GLogin) {
  return {
    type: GOOGLE_LOGIN,
    GLogin,
  };
}

export function GoogleLogin() {
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
            dispatch(LoggedInUser(res.data.user));
            dispatch(googleLogin(res.data.isConfirmed));
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
        dispatch(LoggedInError());
        if (error) {
          Alert.error(error.res.data.message, {
            position: 'top-right',
            offset: 100,
          });
        }
        return false;
      });
  };
}

export function GoogleUpdate(number) {
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
        dispatch(LoggedInError());
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
