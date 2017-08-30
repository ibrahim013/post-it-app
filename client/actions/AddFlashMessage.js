import { ADD_FLASH_MESSAGE } from '../constants/ActionTypes';

export default function addFlashMessage(message) {
  return {
    type: ADD_FLASH_MESSAGE,
    message
  };
}
