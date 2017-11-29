import { combineReducers } from 'redux';
import groups from '../reducer/GroupReducer';
import googleLogin from './GoogleLogin';
import messages from '../reducer/MessageReducer';
import groupMembers from '../reducer/MemberReducer';
import read from '../reducer/ReadMessageReducer';
import user from '../reducer/User';

/**
 * @description combine all reducer
 *
 *
 */
const rootReducer = combineReducers({
  googleLogin,
  groups,
  messages,
  user,
  groupMembers,
  read,
});

export default rootReducer;
