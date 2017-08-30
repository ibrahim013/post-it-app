import axios from 'axios';

export default function SignIn(userData) {
  return dispatch => axios.post('/user/signin', userData)
    .then(response => console.log(response))
    .catch(error => console.log(error));
}

