import { GET_ALL_MESSAGE } from '../constants/ActionTypes';
/**
 * @description this reducer acts get message
 *
 * @function
 *
 * @param  {object} state = initialState of the reducer
 * @param  {object} action = {} the action type that is dispatched
 *
 * @return {object}  returns a group message object
 */
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
