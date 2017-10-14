import { GET_ALL_MESSAGE } from '../constants/ActionTypes';


export default (state = [], action = {}) => {
  switch (action.type) {
    case GET_ALL_MESSAGE: {
      return [
        ...action.groupMessage,
      ];
    }
    default:
      return state;
  }
};
