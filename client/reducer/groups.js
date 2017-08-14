import _ from 'lodash';
import { GET_ALL_GROUPS } from '../constants/actiontypes';

let initialState ={
	groups:[]
}
export default (state = initialState, action) =>{
	let newState =_.merge ({ }, state)
	switch(action.type){
		case GET_ALL_GROUPS: 
			return action.data
		default:
		return state
	}
}