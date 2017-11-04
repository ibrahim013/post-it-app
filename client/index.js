import React from 'react';
import io from 'socket.io-client';
import thunk from 'redux-thunk';
import ReactDom from 'react-dom';
import { BrowserRouter as Router, browserHistory } from 'react-router-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import { LoggedInUser } from '../client/actions/UserAction';
import rootReducer from './reducer/RootReducer';
import AppRoute from './routes/routes';
import './scss/style.scss';

const socket = io();

socket.on('connection', (data) => {
  console.log(data);
});
socket.on('message Sent', (data) => {
  console.log(data);
});
const store = createStore(
  rootReducer,
  compose(applyMiddleware(thunk), window.devToolsExtension ? window.devToolsExtension() : f => f),
);
if (localStorage.user) {
  const user = JSON.parse(localStorage.user);
  store.dispatch(LoggedInUser(user));
}
ReactDom.render(
  <Provider store={store}>
    <Router history={browserHistory}>{AppRoute}</Router>
  </Provider>,
  document.getElementById('app'),
);
