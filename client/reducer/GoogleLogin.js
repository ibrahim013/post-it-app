import { GOOGLE_LOGIN } from '../constants/ActionTypes';

export default (state = [], action = {}) => {
  switch (action.type) {
    case GOOGLE_LOGIN: {
      return [action.confirm];
    }

    default:
      return state;
  }
};
