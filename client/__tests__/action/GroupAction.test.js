import configureMockStore from 'redux-mock-store';
import moxios from 'moxios';
import expect from 'expect';
import thunk from 'redux-thunk';
import * as actions from '../../actions/GroupAction';
import * as types from '../../constants/ActionTypes';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('group actions', () => {
  it('should get group messages', () => {
    const expectedAction = {
      type: types.SET_GROUP_MESSAGES,

    };
    expect(actions.setMessages()).toEqual(expectedAction);
  });
  describe('Get group action', () => {
    const initialState = {
      group: '',
    };
    beforeEach(() => moxios.install());
    afterEach(() => moxios.uninstall());
    const store = mockStore(initialState);

    it('contains a user getGroups function', () => {
      expect(typeof (actions.getGroups())).toBe('function');
    });

    it('should dispatch GetGroupAction on successful getting groups', (done) => {
      moxios.stubRequest('/api/v1/group/groups', {
        status: 200,
        response: {
          groupData: {
            groupId: '-KHJETY879435',
            groupname: 'final',
          },
        },
      });
      const groupData = {
        groupId: '-KHJETY879435',
        groupname: 'final',
      };
      const expectedActions = [
        {
          type: types.GET_ALL_GROUPS,
          groupData: {
            groupId: '-KHJETY879435',
            groupname: 'final',
          },
        },
      ];

      store.dispatch(actions.getGroups()).then(() => {
        expect(store.getGroupAction(groupData)).toEqual(expectedActions);
      });
      done();
    });
  });
  describe('get group member action', () => {
    const initialState = {
      members: 'master',
    };
    beforeEach(() => moxios.install());
    afterEach(() => moxios.uninstall());
    const store = mockStore(initialState);

    it('contains a group getMembers function', () => {
      expect(typeof (actions.getMembers())).toBe('function');
    });

    it('should dispatch getGroupMembers on successful getting members', (done) => {
      moxios.stubRequest('/api/v1/group/:-KHJETY879435/members/', {
        status: 200,
        response: {
          members: [{
            groupMembers: 'Musa',
          },
          {
            members: 'Issa',
          },
          {
            members: 'Inusa',
          }],
        },
      });
      const groupMembers = [{
        groupMembers: 'Musa',
      },
      {
        members: 'Issa',
      },
      {
        members: 'Inusa',
      }];
      const expectedActions = [
        {
          type: types.GET_ALL_GROUP_MEMBERS,
          groupMembers,
        }];
      store.dispatch(actions.getMembers()).then(() => {
        expect(store.getGroupMembers(groupMembers)).toEqual(expectedActions);
      });
      done();
    });
  });
  describe('get all messages', () => {
    const initialState = {
      members: 'master',
    };
    const groupid = {
      groupId: '-K234GHTJDKLSSL',
    };
    beforeEach(() => moxios.install());
    afterEach(() => moxios.uninstall());
    const store = mockStore(initialState);

    it('contains a group getAllMessages function', () => {
      expect(typeof (actions.getAllMessages(groupid))).toBe('function');
    });

    it('should dispatch getAllMessages on successful getting messages', (done) => {
      moxios.stubRequest('/api/v1/group/-KHJETY879435/messages/', {
        status: 200,
        response: {
          messages: {
            messageText: 'hello checking on you',
            Piority: 'Urgent',
          },
        },
      });
      const groupMessages = [{
        messageText: 'hello checking on you',
        Piority: 'Urgent',
      }];
      const expectedActions = [
        { type: types.GET_ALL_GROUP_MEMBERS,
          groupMessages,
        },
      ];
      store.dispatch(actions.getAllMessages(groupid)).then(() => {
        expect(store.setMessages(groupMessages)).toEqual(expectedActions);
      });
      done();
    });
  });
});

describe('post new message', () => {
  const initialState = [];
  const messageData = [{
    mesageId: 'K234GHTJDKLSSL',
    messageText: 'today is cool',
    PiorityLevel: 'Critical',
  }];
  beforeEach(() => moxios.install());
  afterEach(() => moxios.uninstall());
  const store = mockStore(initialState);

  it('contains a user postNewMessage function', () => {
    expect(typeof (actions.postMessage(messageData))).toBe('function');
  });

  it('should dispatch post message on successful posting messages', (done) => {
    moxios.stubRequest('/api/v1/group/postmessage', {
      status: 201,
      response: {
        messages: {
          message: 'message posted succesfully',
        },
      },
    });
    const expectedActions = [
      {
        type: types.POST_NEW_MESSAGE,
        messageData,
      },
    ];
    store.dispatch(actions.postMessage(messageData)).then(() => {
      expect(store.postNewMessage(messageData)).toEqual(expectedActions);
    });
    done();
  });
});

