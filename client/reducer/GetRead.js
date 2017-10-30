import { GET_ALL_READ } from '../constants/ActionTypes';

export default (state = [], action = {}) => {
  switch (action.type) {
    case GET_ALL_READ: {
      return [...action.read];
    }
    default:
      return state;
  }
};
