import { GET_ALL_GROUP_MEMBERS, ADD_NEW_MEMBER } from '../constants/ActionTypes';

/**
 * @description this reducer acts on groupmembers
 *
 * @function
 *
 * @param  {object} state = initialState of the reducer
 * @param  {object} action = {} the action type that is dispatched
 *
 * @return {object}  returns an object of group members and userDetails
 */
export default (state = [], action = {}) => {
  switch (action.type) {
    case GET_ALL_GROUP_MEMBERS: {
      return [
        ...action.groupMembers,
      ];
    }
    case ADD_NEW_MEMBER: {
      return [
        ...state, action.userDetails,
      ];
    }
    default:
      return state;
  }
};
