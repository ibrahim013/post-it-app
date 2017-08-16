import {USER_SIGN_IN, USER_SIGN_OUT} from '../constants/actiontypes.js';
import { isEmpty } from 'lodash';

const initialState = {
   isAuthenticated :false,
   user:{}
 };


export default (state= initialState, action={})=> {
switch(action.type){
    case USER_SIGN_IN:
    return{
        isAuthenticated: !isEmpty(action.user),
        user: action.userData
    };
   case USER_SIGN_OUT:
   return{
    isAuthenticated: false,
    user:{}
   };
default: return state;
}
}