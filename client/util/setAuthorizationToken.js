import axios from 'axios';

export default function setAuthorizationToken(token) {
  if (token) {
    axios.defaults.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete axios.defaults.common['Authorization'];
  }
}
