import shortid from 'shortid';
import { ADD_FLASH_MESSAGE_SIGNUP,
  ADD_FLASH_MESSAGE_SIGNIN } from '../constants/ActionTypes';


export default (state = [], action = {}) => {
  switch (action.type) {
    case ADD_FLASH_MESSAGE_SIGNUP: {
      return [
        ...state, {
          id: shortid.generate(),
          type: action.message.type,
          text: action.message.text,
        },
      ];
    }
    case ADD_FLASH_MESSAGE_SIGNIN: {
      return [
        ...state, {
          id: shortid.generate(),
          type: action.message.type,
          text: action.message.text,
        },
      ];
    }
    default: return state;
  }
};
