import { combineReducers } from 'redux';
import Groups from '../reducer/GetGroupsReducer';
import GoogleLogin from './GoogleLogin';
import Messages from '../reducer/GetMessagesReducer';
import groupMembers from '../reducer/GetMembersReducer';
import user from '../reducer/user';

const rootReducer = combineReducers({
  GoogleLogin,
  Groups,
  Messages,
  user,
  groupMembers,
});

export default rootReducer;
