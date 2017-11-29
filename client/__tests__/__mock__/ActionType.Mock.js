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
  AddNewGroup: {
    type: types.ADD_NEW_GROUP,
    groupDetail: {
      groupName: 'Andela25',
    },
  },
  GroupMembers: {
    type: types.GET_ALL_GROUP_MEMBERS,
    groupMembers: {
      groupName: 'Andela',
    },
  },
  AddNewMember: {
    type: types.ADD_NEW_MEMBER,
    userDetails: {
      displayName: 'Musa',
    },
  },
  SetGroup: {
    type: types.SET_GROUP_MESSAGES,
    groupMessages: {
      message: 'hello all',
      piority: 'Urgent',
    },
  },
  PostNewMessage: {
    type: types.POST_NEW_MESSAGE,
    messageData: {
      message: 'hello guys',
      piority: 'Urgent',
    },
  },
};


export default mockAction;
