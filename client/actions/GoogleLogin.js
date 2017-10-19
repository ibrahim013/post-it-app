import * as firebase from 'firebase';
import config from '../../server/database';


// Group Added to Firebase
export default function googleLogin() {
  return () => {
    firebase.initializeApp(config);
    const provider = new firebase.auth.GoogleAuthProvider();
    return firebase.auth().signInWithPopup(provider);
  };
}

