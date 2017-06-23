import { combineReducers } from 'redux';
import {inviteReducer} from './invitereducer';
const rootReducer = combineReducers({
	invite: inviteReducer
});

export default rootReducer;