import { GET_ALL_GROUPS } from '../constants/ActionTypes';


export default function groupReducer(state = { groups: [] }, action) {
  switch (action.type) {
  case GET_ALL_GROUPS: {
    return Object.assign({}, state,
      { groupsData: action.data });
  }
  default:
    return state;
  }
}
