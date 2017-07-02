import { getGroupsDB, addGroup } from '../modeles/firebase';
import actiontypes from '../constants/actiontypes';

export const loadGroups = () => {
 return dispatch => {
  dispatch({
   type: actiontypes.LOAD_GROUP_REQUEST
  })
  getGroupsDB()
   .then(groups => {
    dispatch({
     type: actiontypes.LOAD_GROUP_SUCCESS,
     payload: groups.val()
    })
   })
   .catch(error => {
    dispatch({
     type: actiontypes.LOAD_GROUP_FAILED,
     payload: error
    })
   })
 }
}
export const createGroup = (name) => {
 return dispatch => {
  dispatch({
   type: actiontypes.ADD_GROUP_REQUEST
  })
  addGroup(name)
   .then(res => {
    loadGroups()(dispatch) //refresh the data to keep up-to-date
    dispatch({
     type: actiontypes.ADD_GROUP_SUCCESS
    })
   })
   .catch(error => {
    dispatch({
     type: actiontypes.ADD_GROUP_FAILED,
     payload: error
    })
   })
 }
}