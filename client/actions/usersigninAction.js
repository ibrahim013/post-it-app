import axios from 'axios';
import { USER_SIGN_IN } from '../constants/actiontypes';
/**
 * userSigninRequest() returns user data
 * from firebase signin end points
 */
// const userSignIn = userData =>({
// 	type:USER_SIGN_IN,
// 	userData
// })
export function userSigninRequest(userData){
		return dispatch => {
        return axios.post('/user/signin',  userData)
        // .then((
		// 	{userData})=> {
        //         console.log(userData)
		// 		dispatch(userSignIn(userData))
		// 	},({reponse})=> {
		// 		console.log(response.userData)
		// 	});
		
	}
}