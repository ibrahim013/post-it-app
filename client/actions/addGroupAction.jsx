import ActionTypes from '../constants/actiontypes';
import database from '../../server/database';
/**
 * addToGroup() sends newly group name
 * to firebase API group end point
 */
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


