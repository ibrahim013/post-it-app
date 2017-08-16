import axios from 'axios';
import { USER_SIGN_IN } from '../constants/actiontypes';
/**
 * userSigninRequest() returns user data
 * from firebase signin end points
 */
const userSignIn = userData =>({
	type: USER_SIGN_IN,
	userData
})
export function userSigninRequest(userData){
	// console.log('I got here')
	return dispatch => (
		axios.post('/user/signin',  userData)).then((
			{ data })=> {
				console.log(data);
				dispatch(userSignIn(data))
			},({reponse})=> {
				// console.log(response.userData)
			})
}