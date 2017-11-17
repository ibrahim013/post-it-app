import * as types from '../../constants/ActionTypes';

const mockAction = {
  CurrentUser: {
    type: types.LOGIN_USER,
    user: { id: '-K4546778899000900', username: 'master' },
  },
  GetGroup: {
    type: types.GET_ALL_GROUPS,
    groupData: {
      groupName: 'Andela',
      createdby: 'master',
    },
  },
};


export default mockAction;
