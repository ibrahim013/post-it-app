import firebase from 'firebase';


const config = {
  apiKey: 'AIzaSyDKmzJrL64aEqNezKJ-dPcvPo74F_IAdn4',
  authDomain: 'postit-ace3a.firebaseapp.com',
  databaseURL: 'https://postit-ace3a.firebaseio.com',
  projectId: 'postit-ace3a',
  storageBucket: 'postit-ace3a.appspot.com',
  messagingSenderId: '211164425105'
};
firebase.initializeApp(config);
const database = firebase.database();

export default database;
