import configureMockStore from 'redux-mock-store';
import moxios from 'moxios';
import expect from 'expect';
import thunk from 'redux-thunk';
import mockLocalStorage from '../__tests__/__mock__/MockLocalStorage';
import * as actions from '../actions/UserAction';
import * as types from '../constants/ActionTypes';
import { userDetails,
   userSigninData, invalidUserSigninData, signInState, signUpState } from '../__tests__/__mock__/action.mock';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('Signin  Actions', () => {
  beforeEach(() => moxios.install());
  afterEach(() => moxios.uninstall());
  const store = mockStore(signInState);

  it('Should make a post request to sign in users', () => {
    moxios.stubRequest('/api/v1/user/signin', {
      status: 200,
      response: {
        message: 'Sign in succesful.',
        data: {
          user: { email: 'waleibrahim13@gmail.com',
            displayname: 'master' },
        },
      },
    });
    const expectedAction = {
      type: types.LOGIN_USER,
      user: {
        email: 'waleibrahim13@gmail.com',
        password: '12345678',
      },
    };
    expect(actions.loggedInUser(userSigninData)).toEqual(expectedAction);
  });
  it('Should dispatch appropraite action type if there is an unexpected error', () => {
    moxios.stubRequest('/api/v1/user/signin', {
      status: 400,
      response: {
        message: 'oops! something went wrong',
      },
    });
    const expectedAction = [{
      type: types.LOGIN_ERROR,
    }];
    store.dispatch(actions.signIn(invalidUserSigninData)).then(() => {
      expect(store.getActions()).toEqual(expectedAction);
    });
  });

  it('contains a userLoginRequest function', () => {
    expect(typeof (actions.signIn())).toBe('function');
  });

  it('should make a get request to logout action', () => {
    moxios.stubRequest('/api/v1/user/signout', {
      status: 200,
      response: {
        message: 'signed out successfully',
      },
    });
    const expectedAction = {
      type: types.LOGOUT_USER,
    };
    expect(actions.logOutUser()).toEqual(expectedAction);
  });
});

describe('Signup action', () => {
  beforeEach(() => moxios.install());
  afterEach(() => moxios.uninstall());
  const store = mockStore(signUpState);

  it('contains a userLoginRequest function', () => {
    expect(typeof (actions.signIn())).toBe('function');
  });

  it('Should make a post request to sign up users', (done) => {
    moxios.stubRequest('/api/v1/user/signup', {
      status: 201,
      response: {
        message: 'Sign up succesful proceed to login',
      },
    });
    const expectedActions = [];
    store.dispatch(actions.signUpAction(userDetails)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
    done();
  });
});

describe('Logout Action', () => {
  beforeEach(() => {
    moxios.install();
    mockLocalStorage.setItem('user', userDetails);
    mockLocalStorage.getItem('user');
  });
  afterEach(() => {
    moxios.uninstall();
    mockLocalStorage.removeItem('user');
  });
  const store = mockStore(signInState);

  it('contains a logout function', () => {
    expect(typeof (actions.signOut())).toBe('function');
  });

  // it('should dispatch LOGOUT_USER on successful logout', (done) => {
  //   moxios.stubRequest('/api/v1/user/signout', {
  //     status: 200,
  //     response: {
  //       message: 'signed out successfully',
  //     },
  //   });
  //   const expectedAction =
  //     { type: types.LOGOUT_USER };
  //   store.dispatch(actions.logOutUser());
  //   expect(store.getActions().type).toEqual(expectedAction);
  //   done();
  // });
});
describe('Forgot password action', () => {
  beforeEach(() => moxios.install());
  afterEach(() => moxios.uninstall());
  it('contains a forgotPassword function', () => {
    expect(typeof (actions.passwordReset())).toBe('function');
  });
});
