import configureMockStore from 'redux-mock-store';
import moxios from 'moxios';
import expect from 'expect';
import thunk from 'redux-thunk';
import * as actions from '../../actions/GroupAction';
import * as types from '../../constants/ActionTypes';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('group actions', () => {
  it('should get group message', () => {
    const expectedAction = {
      type: types.GET_ALL_MESSAGE,
    };
    expect(actions.getMessageAction()).toEqual(expectedAction);
  });
  it('should get group message', () => {
    const expectedAction = {
      type: types.GET_ALL_GROUP_MEMBERS,
    };
    expect(actions.getGroupMembers()).toEqual(expectedAction);
  });
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
        groups: {
          groupId: '-KHJETY879435',
          groupname: 'final',
        },
      },
    });
    const expectedActions = [
      { type: types.GET_ALL_GROUPS },
    ];
    store.dispatch(actions.getMessges()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
    done();
  });
});
describe('get member action', () => {
  const initialState = {
    members: 'master',
  };
  beforeEach(() => moxios.install());
  afterEach(() => moxios.uninstall());
  const store = mockStore(initialState);

  it('contains a user getMembers function', () => {
    expect(typeof (actions.getMembers())).toBe('function');
  });

  it('should dispatch GetGroupAction on successful getting groups', (done) => {
    moxios.stubRequest('/api/v1/group/-KHJETY879435/members/', {
      status: 200,
      response: {
        groups: {
          groupId: '-KHJETY879435',
          groupname: 'final',
        },
      },
    });
    const expectedActions = [
      {
        type: types.GET_ALL_GROUP_MEMBERS,
      }];
    store.dispatch(actions.getMembers()).then(() => {
      expect(store.getGroupMembers()).toEqual(expectedActions);
    });
    done();
  });
});
describe('add member action', () => {
  const initialState = {
    members: 'master',
  };
  const userDetails = {
    members: 'master',
  };
  beforeEach(() => moxios.install());
  afterEach(() => moxios.uninstall());
  const store = mockStore(initialState);

  it('contains a user getMembers function', () => {
    expect(typeof (actions.addMembers(userDetails))).toBe('function');
  });

  it('should dispatch GetGroupAction on successful getting groups', (done) => {
    moxios.stubRequest('/api/v1/group/-KHJETY879435/members/', {
      status: 200,
      response: {
        groups: {
          groupId: '-KHJETY879435',
          groupname: 'final',
        },
      },
    });
    const expectedActions = [
      { type: types.GET_ALL_GROUP_MEMBERS },
    ];
    store.dispatch(actions.addMembers()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
    done();
  });
});
describe('get member action', () => {
  const initialState = {
    groupName: '',
    description: '',
  };
  const groupData = {
    groupname: 'just test',
  };
  beforeEach(() => moxios.install());
  afterEach(() => moxios.uninstall());
  const store = mockStore(initialState);

  it('contains a user addGroups function', () => {
    expect(typeof (actions.addGroups(groupData))).toBe('function');
  });

  it('should dispatch GetGroupAction on successful getting groups', (done) => {
    moxios.stubRequest('/api/v1/group', {
      status: 200,
      response: {
        groups: {
          groupId: '-KHJETY879435',
          groupname: 'final',
        },
      },
    });
    const expectedActions = {
      type: types.GET_ALL_GROUPS,
      groupData,
    };
    store.dispatch(actions.addGroups(groupData)).then(() => {
      expect(store.getGroupAction()).toEqual(expectedActions);
    });
    done();
  });
});
describe('add member action', () => {
  const initialState = {
    members: 'master',
  };
  const userDetails = {
    members: 'master',
  };
  beforeEach(() => moxios.install());
  afterEach(() => moxios.uninstall());
  const store = mockStore(initialState);

  it('contains a user getMembers function', () => {
    expect(typeof (actions.addMembers(userDetails))).toBe('function');
  });

  it('should dispatch GetGroupAction on successful getting groups', (done) => {
    moxios.stubRequest('/api/v1/group/-KHJETY879435/members/', {
      status: 200,
      response: {
        groups: {
          groupId: '-KHJETY879435',
          groupname: 'final',
        },
      },
    });
    const expectedActions = [
      { type: types.GetMessageAction },
    ];
    store.dispatch(actions.addMembers()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
    done();
  });
});
