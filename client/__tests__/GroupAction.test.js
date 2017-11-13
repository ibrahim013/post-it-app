import configureMockStore from 'redux-mock-store';
import moxios from 'moxios';
import expect from 'expect';
import thunk from 'redux-thunk';
import * as actions from '../actions/GroupAction';
import * as types from '../constants/ActionTypes';


const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('group actions', () => {
  it('should get all group', () => {
    const groupData = {
      groupName: 'final',
      description: 'for guys only',
      dateCrated: '11/10/2017, 7:23:28 AM',
      displayName: 'master',
    };
    const expectedAction = {
      type: types.GET_ALL_GROUPS,
      groupData,
    };
    expect(actions.getGroupAction([groupData])).toEqual(expectedAction);
  });
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
      { type: types.GET_ALL_GROUPS },
    ];
    store.dispatch(actions.getMembers()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
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
    members: 'master',
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
    const expectedActions = [
      { type: types.GET_ALL_GROUPS },
    ];
    store.dispatch(actions.addGroups(groupData)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
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
