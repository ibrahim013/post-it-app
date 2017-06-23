import database from '../../server/database';
import firebase from 'firebase';


//Group Added to Firebase
export function groupAddedAction() {
  var myUserId = firebase.auth().currentUser.email;
firebase.database().ref('group/' + myUserId)
  }
