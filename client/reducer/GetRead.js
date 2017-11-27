import { GET_ALL_READ } from '../constants/ActionTypes';

/**
 * @description this reducer acts on get read
 *
 * @function
 *
 * @param  {object} state = initialState of the reducer
 * @param  {object} action = {} the action type that is dispatched
 *
 * @return {object}  returns an array of  google user
 */
export default (state = [], action = {}) => {
  switch (action.type) {
    case GET_ALL_READ: {
      return [...action.read];
    }
    default:
      return state;
  }
};
