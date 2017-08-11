import axios from 'axios';

/**
 * userSigninRequest() returns user data
 * from firebase signin end points
 */
export function userSigninRequest(userData){
		return dispatch => {
		return axios.post('/user/signin',  userData)
	}
}