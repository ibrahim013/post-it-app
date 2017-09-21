import * as firebase from 'firebase';
import config from '../../server/database';


// Group Added to Firebase
export default function googleLogin() {
  return dispatch => {
    firebase.initializeApp(config);
    const provider = new firebase.auth.GoogleAuthProvider();
    provider.addScope('profile');
      provider.addScope('email');
    return firebase.auth().signInWithPopup(provider)
  }
}

