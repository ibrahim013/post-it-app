import React from 'react';
import ReactDom from 'react-dom';
import {render} from 'react-dom';
import { Provider } from 'react-redux';
import {BrowserRouter}  from 'react-router-dom';
import {createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import App from './component/app';

import routes from './routes';
import createHistory from 'history/createBrowserHistory'

const history = createHistory()

const store = createStore(
(state = {} )=> state, applyMiddleware(thunk)
	);
ReactDom.render(
<Provider store={store}>
	<BrowserRouter history={history}>
	{routes}
	</BrowserRouter>
	</Provider>,document.getElementById('app'));
