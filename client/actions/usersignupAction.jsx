import axios from 'axios';

/**
 * userSignupRequest() returns user data
 * from firebase signup end points
 */
export function userSignupRequest(userData){
		return dispatch => {
		return axios.post('/user/signup',  userData);
	}
}