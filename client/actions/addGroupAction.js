import ActionTypes from '../constants/actiontypes';
import database from '../../server/database';

export function addToGroup(groupname) {
  return dispatch => {
    dispatch(addToGroupRequestedAction());
    const guestsRef = database.ref('/group');
    guestsRef.push({
      name
    })
    .then(() => {
      dispatch(addToGroupFulfilledAction({ groupname }));
    })
    .catch((error) => {
      dispatch(addToInviteRejectedAction());
    });
  }
}


// function addToInviteRequestedAction() {
//   return {
//     type: ActionTypes.AddToInviteRequested
//   };
// }

// function addToInviteRejectedAction() {
//   return {
//     type: ActionTypes.AddToInviteRejected
//   }
// }

// function addToInviteFulfilledAction(guest) {
//   return {
//     type: ActionTypes.AddToInviteFulfilled,
//     guest
//   };
// }
