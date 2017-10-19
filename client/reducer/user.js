import { LOGIN_USER, LOGOUT_USER } from '../constants/ActionTypes';

export default (state = [], action = {}) => {
  switch (action.type) {
    case LOGIN_USER: {
      return [action.user];
    }
    case LOGOUT_USER: {
      return [];
    }
    default:
      return state;
  }
};
