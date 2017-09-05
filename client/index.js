import React from 'react';
import ReactDom from 'react-dom';
import createHistory from 'history/createBrowserHistory';
import { BrowserRouter } from 'react-router-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import setAuthorizationToken from './util/setAuthorizationToken';
import rootReducer from './reducer/RootReducer';
import routes from './routes/routes';
import './css/style.scss';

const history = createHistory();

const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  )
);
setAuthorizationToken(localStorage.jwtToken);

ReactDom.render(
  <Provider store={store}>
    <BrowserRouter history={history}>
      {routes}
    </BrowserRouter>
  </Provider>, document.getElementById('app'));