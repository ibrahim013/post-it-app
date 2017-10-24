import * as firebase from 'firebase';
import config from '../../server/database';
import { LoggedInUser } from './UserAction';

// Group Added to Firebase
export default function googleLogin() {
  return (dispatch) => {
    firebase.initializeApp(config);
    const provider = new firebase.auth.GoogleAuthProvider();
    provider.addScope('profile');
    provider.addScope('email');
    return firebase.auth().signInWithPopup(provider).then((res) => {
      dispatch(LoggedInUser(res.user));
      firebase
        .database()
        .ref('user')
        .push({
          displayName: res.user.displayName,
          email: res.user.email,
          time: new Date().toString(),
        });
      // This gives you a Google Access Token.
      const token = res.credential.accessToken;
      console.log(token);
      // The signed-in user info.
      const user = res.user;
      localStorage.setItem('user', JSON.stringify(user));
      console.log(user);
      return true;
    });
  };
}

