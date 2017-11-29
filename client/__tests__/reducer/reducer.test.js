import mockAction from '../../__tests__/__mock__/ActionType.Mock';
import GroupReducer from '../../reducer/GroupReducer';
import MemberReducer from '../../reducer/MemberReducer';
import MessageReducer from '../../reducer/MessageReducer';

import users from '../../reducer/User';

// test user reducer
describe('User reducer', () => {
  describe('When LOGIN_USER action type is fired from an action', () => {
    it('should add the current user to store', () => {
      const state = [];
      const action = mockAction.CurrentUser;
      expect(users(state, action))
          .toEqual(
            [{ id: '-K4546778899000900', username: 'master' }],
          );
    });
  });
  describe('When No action type is fired from an action', () => {
    it('default state of user store returned', () => {
      const state = [];
      const action = {};
      expect(users(state, action))
          .toEqual({});
    });
  });
  describe('When GET_ALL_GROUP_MEMBERS action type is fired from an action', () => {
    it('should get all group members and add to store', () => {
      const state = [];
      const action = mockAction.GroupMembers;
      expect(MemberReducer(state, action))
          .toEqual(
            [...action.groupMembers],
          );
    });
  });
  describe('When ADD_NEW_MEMBER action type is fired from an action', () => {
    it('should add new member and add to store', () => {
      const state = [];
      const action = mockAction.AddNewMember;
      expect(MemberReducer(state, action))
            .toEqual(
              [...state, action.userDetails],
            );
    });
  });
  describe('When SET_GROUP_MESSAGES action type is fired from an action', () => {
    it('should add all message to store', () => {
      const state = [];
      const action = mockAction.SetGroup;
      expect(MessageReducer(state, action))
            .toEqual(
              [...action.groupMessages],
            );
    });
  });
  describe('When POST_NEW_MESSAGE action type is fired from an action', () => {
    it('should add all message to store', () => {
      const state = [];
      const action = mockAction.PostNewMessage;
      expect(MessageReducer(state, action))
            .toEqual(
              [...state, action.messageData],
            );
    });
  });
// Test group reducer
  describe('Group reducers', () => {
    it('should get all the group a member belong  to the store', () => {
      const state = [];
      const action = mockAction.GetGroup;
      expect(GroupReducer(state, action)).toEqual([...action.groupData]);
    });
    it('should add new group to the store', () => {
      const state = [];
      const action = mockAction.AddNewGroup;
      expect(GroupReducer(state, action)).toEqual([...state, action.groupDetail]);
    });
  });
});
