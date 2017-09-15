import { combineReducers } from 'redux';
import Groups from '../reducer/GetGroupsReducer';
import FlashMessages from './FlashMessages';
import Messages from '../reducer/GetMessagesReducer';

const rootReducer = combineReducers({
  FlashMessages,
  Groups,
  Messages
});

export default rootReducer;
