import axios from 'axios';
import { GET_ALL_GROUPS } from '../constants/actiontypes';

const addGroupsToState = data => ({
    type: GET_ALL_GROUPS,
    data
});

export function getAllGroups() {
    return dispatch => (
        axios.get('/group/getgroups')
    ).then(({ data }) => {
        dispatch(addGroupsToState(data))
    }, ({ response }) => {
        console.log(response.data)
    });
}