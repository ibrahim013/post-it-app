import database from '../../server/database';
import firebase from 'firebase';

export function addGroupAction() {
  var myUserId = firebase.auth().currentUser.email;
firebase.database().ref('group/' + myUserId)
  }
