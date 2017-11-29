import { GET_ALL_GROUPS, ADD_NEW_GROUP } from '../constants/ActionTypes';
/**
 * @description this reducer acts on get all groups
 *
 * @function
 *
 * @param  {object} state = initialState of the reducer
 * @param  {object} action = {} the action type that is dispatched
 *
 * @return {object}  returns an object of all group data
 */
export default (state = [], action = {}) => {
  switch (action.type) {
    case GET_ALL_GROUPS: {
      return [...action.groupData];
    }
    case ADD_NEW_GROUP: {
      return [...state, action.groupDetail];
    }
    default:
      return state;
  }
};
