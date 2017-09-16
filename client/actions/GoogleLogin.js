import * as firebase from 'firebase';
import config from '../../server/database';


// Group Added to Firebase
export default function googleLogin() {
  firebase.initializeApp(config);
  const provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth().signInWithPopup(provider)
    .then(response => Promise.all([
      firebase.database().ref('user').push({
        displayName: response.user.displayName,
        email: response.user.email,
        time: (new Date()).toString(),
      }),
    ]).then(() => {
      localStorage.setItem(response.credential.accessToken);
      this.props.history.push('/dashboard');
    })
      .catch(() => {
      }));
}

