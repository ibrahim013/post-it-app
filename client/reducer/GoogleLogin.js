import { GOOGLE_LOGIN } from '../constants/ActionTypes';

/**
 * @description google Login reducer
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
    case GOOGLE_LOGIN: {
      return [action.GLogin];
    }
    default:
      return state;
  }
};
