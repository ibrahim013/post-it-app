import { combineReducers } from 'redux';
import Groups from '../reducer/GetGroupsReducer';
import FlashMessages from './FlashMessages';
import Messages from '../reducer/GetMessagesReducer';
import groupMembers from '../reducer/GetMembersReducer';
import user from '../reducer/user';

const rootReducer = combineReducers({
  FlashMessages,
  Groups,
  Messages,
  user,
  groupMembers,
});
// const rootReducer = (state, action) => {
//   if (action.type === 'LOGOUT_USER') {
//     state = undefined;
//   }
//   return appReducer(state, action);
// };

export default rootReducer;
