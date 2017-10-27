import * as firebase from 'firebase';
import Alert from 'react-s-alert';
import axios from 'axios';
import config from '../../server/database';
import { LoggedInUser, LoggedInError } from './UserAction';

// Group Added to Firebase
export default function googleLogin() {
  return (dispatch) => {
    firebase.initializeApp(config);
    const provider = new firebase.auth.GoogleAuthProvider();
    return firebase
      .auth()
      .signInWithPopup(provider)
      .then((userData) => {
        axios.post('/v1/user/google', userData).then((res) => {
          dispatch(LoggedInUser(res.data.user));
          Alert.success(res.data.message, {
            position: 'top-right',
            offset: 100,
          });
          const user = res.data.user;
          localStorage.setItem('user', JSON.stringify(user));
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
      });
  };
}
