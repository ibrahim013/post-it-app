import React from 'react';
import io from 'socket.io-client';
import thunk from 'redux-thunk';
import ReactDom from 'react-dom';
import { BrowserRouter as Router, browserHistory } from 'react-router-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import { LoggedInUser } from '../client/actions/UserAction';
import { googleLogin } from '../client/actions/GoogleLogin';
import rootReducer from './reducer/rootreducer';
import AppRoute from './routes/routes';
import './css/style.scss';

const socket = io();

socket.on('connection', (data) => {
  console.log(data);
});
const store = createStore(
  rootReducer,
  compose(applyMiddleware(thunk), window.devToolsExtension ? window.devToolsExtension() : f => f),
);
if (localStorage.user || localStorage.GoogleLogin) {
  const user = JSON.parse(localStorage.user);
  const GoogleLogin = JSON.parse(localStorage.GoogleLogin);
  store.dispatch(LoggedInUser(user));
  store.dispatch(googleLogin(GoogleLogin));
}
ReactDom.render(
  <Provider store={store}>
    <Router history={browserHistory}>{AppRoute}</Router>
  </Provider>,
  document.getElementById('app'),
);
