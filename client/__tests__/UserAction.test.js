import configureMockStore from 'redux-mock-store';
import moxios from 'moxios';
import expect from 'expect';
import thunk from 'redux-thunk';
import * as actions from '../actions/UserAction';
import * as types from '../constants/ActionTypes';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('user actions', () => {
  it('should create a login action', () => {
    const user = 'user';
    const expectedAction = {
      type: types.LOGIN_USER,
      user,
    };
    expect(actions.LoggedInUser(user)).toEqual(expectedAction);
  });
  it('should create a logout action', () => {
    const expectedAction = {
      type: types.LOGOUT_USER,
    };
    expect(actions.LogOutUser()).toEqual(expectedAction);
  });
});

describe('Sign up action', () => {
  const initialState = {
    email: '',
    password: '',
  };
  beforeEach(() => moxios.install());
  afterEach(() => moxios.uninstall());
  const store = mockStore(initialState);
  const userData = {
    email: 'lot2come@gmail.com',
    password: '123456',
  };

  const invalidUserData = {
    email: 'lot3@gmail.com',
  };

  it('contains a userLoginRequest function', () => {
    expect(typeof (actions.SignIn())).toBe('function');
  });

  it('should dispatch LOGIN_USER on successful sign in', (done) => {
    moxios.stubRequest('/v1/user/signin', {
      status: 201,
      response: {
        message: 'Sign in succesful.',
      },
    });
    const expectedActions = [
      { type: types.LOGIN_USER },
    ];
    store.dispatch(actions.SignIn(userData)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
    done();
  });

  it('should dispatch LOGIN_USER_ERROR on successful sign up', (done) => {
    moxios.stubRequest('/v1/user/signin', {
      status: 401,
      response: {
        message: 'Error.',
      },
    });
    const expectedActions = [
      { type: types.LOGIN_ERROR },
    ];
    store.dispatch(actions.SignIn(invalidUserData)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
    done();
  });
});
describe('Sign up action', () => {
  const initialState = {
    email: '',
    password: '',
    username: '',
  };
  beforeEach(() => moxios.install());
  afterEach(() => moxios.uninstall());
  const store = mockStore(initialState);
  const userData = {
    email: 'lot2come@gmail.com',
    password: '123456',
    username: 'ibrahim',
  };

  it('contains a userLoginRequest function', () => {
    expect(typeof (actions.SignUpAction())).toBe('function');
  });

  it('should return  on successful sign up', (done) => {
    moxios.stubRequest('/v1/user/signup', {
      status: 201,
      response: {
        message: 'Sign up succesful.',
      },
    });
    store.dispatch(actions.SignIn(userData)).then(() => {
    });
    done();
  });
});
describe('Sign out action', () => {
  const initialState = {
    email: '',
    password: '',
  };
  beforeEach(() => moxios.install());
  afterEach(() => moxios.uninstall());
  const store = mockStore(initialState);

  it('contains a user sign out function', () => {
    expect(typeof (actions.SignOut())).toBe('function');
  });

  it('should dispatch LOGOUT_USER on successful signout', (done) => {
    moxios.stubRequest('/v1/user/signout', {
      status: 201,
      response: {
        message: 'Sign out succesful.',
      },
    });
    const expectedActions = [
      { type: types.LOGOUT_USER },
    ];
    store.dispatch(actions.SignOut()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
    done();
  });
});
