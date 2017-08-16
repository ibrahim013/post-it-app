import axios from 'axios';
import {GET_ALL_GROUP_MESSAGES,
     DELETE_GROUP_MESSAGES, 
     ADD_GROUP_MESSAGES } from 'constants/actiontypes'; 

     const addMessages = data => ({
       type: ADD_GROUP_MESSAGES,
       data 
     });
    export function addGroupMessage(){
        return dispatch => (
            axios.post ('/group/messages')
        ).then (({data})=> {
            dispatch(addMessages(data))
        }, ({ response }) => {
            console.log(reponse.data)});
    }