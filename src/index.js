import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route } from 'react-router';
import store from '../config/store';
import history from '../config/history';
import actionTypes from './actions/actionTypes';

import App from './App';

// const token = localStorage.getItem('token');
// if (token) store.dispatch({ type: actionTypes.AUTH_USER });

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Route component={App} />
    </Router>
  </Provider>,
  document.getElementById('root')
);
