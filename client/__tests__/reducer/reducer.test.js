import mockAction from '../../__tests__/__mock__/ActionType.Mock';
import group from '../../reducer/GetGroupsReducer';
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
});

// Test group reducer
describe('Group reducers', () => {
  describe('When GET_ALL_GROUP action type is fired from an action', () => {
    it('should get all the group a member belong  to the store', () => {
      const state = [];
      const action = mockAction.GetGroup;
      expect(group(state, action)).toEqual({ groupData: action.groupData });
    });
  });
});

