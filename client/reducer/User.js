import { LOGIN_USER, LOGOUT_USER,
  LOGOUT_ERROR } from '../constants/ActionTypes';

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
