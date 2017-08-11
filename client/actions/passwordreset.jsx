import database from '../../server/database'
import firebase from 'firebase';

/**
 * passwordreset() allow for user to 
 * reset firebase password
 */
export function passwordreset(){
let  auth = firebase.auth();
let emailAddress = firebase.auth().curentUser.email;

auth.sendPasswordResetEmail(emailAddress).then(function() {
  window.alert('Password Reset Mail Sent to' + emailAddress)
}, function(error) {
  window.alert(error)
});
}