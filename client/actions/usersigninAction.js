import axios from 'axios';

export function userSigninRequest(userData){
		return dispatch => {
		return axios.post('/user/signin',  userData);
	}
}