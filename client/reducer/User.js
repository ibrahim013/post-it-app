import { LOGIN_USER, LOGOUT_USER,
  LOGOUT_ERROR } from '../constants/ActionTypes';

/**
 * @description this reducer act on login user
 *
 * @function
 *
 * @param  {object} state = initialState of the reducer
 * @param  {object} action = {} the action type that is dispatched
 *
 * @return {object}  returns logged in user
 */
export default (state = [], action = {}) => {
  switch (action.type) {
    case LOGIN_USER: {
      return [action.user];
    }
    case LOGOUT_USER: {
      return [];
    }
    case LOGOUT_ERROR: {
      return {};
    }
    default:
      return state;
  }
};
