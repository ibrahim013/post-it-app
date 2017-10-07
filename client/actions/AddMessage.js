import axios from 'axios';

/**
 * 
 * @param {string} groupname 
 * 
 * @return {promise} groups
 */

export default function addMessage(messageData) {
  return () => (
    axios.post('/v1/group/postmessage', messageData)
  );
}
