import { GET_ALL_GROUP_MEMBERS } from '../constants/ActionTypes';


export default (state = [], action = {}) => {
  switch (action.type) {
    case GET_ALL_GROUP_MEMBERS: {
      return [
        ...action.groupMembers,
      ];
    }
    default:
      return state;
  }
};
