import axios from 'axios';

export default function SignIn(userData) {
  return dispatch => axios.post('/user/signin', userData)
    .then((res) => {
      const token = res.data.token;
      localStorage.setItem('jwtToken', token);
    });
}
