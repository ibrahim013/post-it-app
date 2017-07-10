import axios from 'axios';

export function userSigninRequest(data){
		return dispatch => {
		return axios.post('/user/signin',  data)
	}
}