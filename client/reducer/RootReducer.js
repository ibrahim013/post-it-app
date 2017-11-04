import { combineReducers } from 'redux';
import groups from '../reducer/GetGroupsReducer';
import googleLogin from './GoogleLogin';
import messages from '../reducer/GetMessagesReducer';
import groupMembers from '../reducer/GetMembersReducer';
import read from '../reducer/GetRead';
import user from '../reducer/User';

const rootReducer = combineReducers({
  googleLogin,
  groups,
  messages,
  user,
  groupMembers,
  read,
});

export default rootReducer;
