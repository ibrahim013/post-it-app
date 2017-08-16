import { combineReducers } from 'redux';
import groups from './groups';
import authreducer from './authreducer'



const rootReducer = combineReducers({
    groups,
   
});

export default rootReducer;