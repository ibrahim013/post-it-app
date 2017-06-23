import ActionTypes from '../constants/actiontypes';
import database from '../../server/database';

export function watchMembersAddedEvent(dispatch) {
  database.ref('/group').on('child_added', (snap) => {
    dispatch(getMemberAddedAction(snap.val()));
  });
}

function getMemberAddedAction(member) {
  return {
    type: ActionTypes.MemberAdded,
    member
  };
}