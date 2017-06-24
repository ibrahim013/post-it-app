import database from '../../server/database';
import firebase from 'firebase';

export function addGroupAction() {
  const groupsReference = db.ref(`/users/${userId}/groups/`);
        groupsReference.once('value', (snapshot) => {
          const groupKeys = [];
          console.log (groupKays)
      })
  }
