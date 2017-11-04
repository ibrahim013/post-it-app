import { combineReducers } from 'redux';
import Groups from '../reducer/GetGroupsReducer';
import GoogleLogin from './GoogleLogin';
import Messages from '../reducer/GetMessagesReducer';
import groupMembers from '../reducer/GetMembersReducer';
import read from '../reducer/GetRead';
import user from '../reducer/User';

const rootReducer = combineReducers({
  GoogleLogin,
  Groups,
  Messages,
  user,
  groupMembers,
  read,
});

export default rootReducer;
