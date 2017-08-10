import {SIGNED_IN, SIGNED_OUT} from './constants/actiontypes.js';

let user = {
    email: nul
} 

export default (state= user, action)=> {
switch(action.type){
    case SIGNED_IN:
    const {email} = action;
    user = {
        email
    }
    return user;
    default:
    return state;
}
}