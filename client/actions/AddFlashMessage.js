import { ADD_FLASH_MESSAGE_SIGNUP, ADD_FLASH_MESSAGE_SIGNIN } from '../constants/ActionTypes';

export default function addFlashMessageSignup(message) {
  return {
    type: ADD_FLASH_MESSAGE_SIGNUP,
    message,
  };
}
export function addFlashMessageSignin(message) {
  return {
    type: ADD_FLASH_MESSAGE_SIGNIN,
    message,
  };
}
