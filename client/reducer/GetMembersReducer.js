import { GET_ALL_GROUP_MEMBERS } from '../constants/ActionTypes';

/**
 * @description this reducer acts on groupmembers
 *
 * @function
 *
 * @param  {object} state = initialState of the reducer
 * @param  {object} action = {} the action type that is dispatched
 *
 * @return {object}  returns an object of group members
 */
export default (state = [], action = {}) => {
  switch (action.type) {
    case GET_ALL_GROUP_MEMBERS: {
      return [
        ...action.groupMembers,
      ];
    }
    default:
      return state;
  }
};
