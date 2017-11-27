import React from 'react';
import thunk from 'redux-thunk';
import ReactDom from 'react-dom';
import jwt from 'jsonwebtoken';
import { BrowserRouter as Router, browserHistory } from 'react-router-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import { loggedInUser } from '../client/actions/UserAction';
import rootReducer from './reducer/RootReducer';
import AppRoute from './routes/routes';
import './scss/style.scss';

const store = createStore(
  rootReducer,
  compose(applyMiddleware(thunk), window.devToolsExtension ? window.devToolsExtension() : f => f),
);

const token = jwt.decode(localStorage.getItem('token'));
if (token) {
  const date = token.exp;
  if (date < (Date.now() / 1000)) {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }
  if (localStorage.user) {
    const user = JSON.parse(localStorage.user);
    store.dispatch(loggedInUser(user));
  }
}
if (!token) {
  if (localStorage.user) {
    localStorage.removeItem('user');
  }
}
ReactDom.render(
  <Provider store={store}>
    <Router history={browserHistory}>{AppRoute}</Router>
  </Provider>,
  document.getElementById('app'),
);
