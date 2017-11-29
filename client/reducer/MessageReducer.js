import { SET_GROUP_MESSAGES, POST_NEW_MESSAGE } from '../constants/ActionTypes';
/**
 * @description updates message that belong to a group
 *
 * @function
 *
 * @param  {object} state = initialState of the reducer
 * @param  {object} action = {} the action type that is dispatched
 *
 * @return {object}  returns a group messages object
 */
export default (state = [], action = {}) => {
  switch (action.type) {
    case SET_GROUP_MESSAGES: {
      return [
        ...action.groupMessages,
      ];
    }
    case POST_NEW_MESSAGE: {
      return [
        ...state, action.messageData,
      ];
    }
    default:
      return state;
  }
};

