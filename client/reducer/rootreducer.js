import { combineReducers } from 'redux';
import Groups from '../reducer/GetGroupsReducer';
import FlashMessages from './FlashMessages';
import Messages from '../reducer/GetMessagesReducer';
import groupMembers from '../reducer/GetMembersReducer';

const rootReducer = combineReducers({
  FlashMessages,
  Groups,
  Messages,
  groupMembers,
});

export default rootReducer;
