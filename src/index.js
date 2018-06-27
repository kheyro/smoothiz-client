import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route } from 'react-router';
import configureStore from '../config/store';
import history from '../config/history';
import StateLoader from './reducers/stateLoader';

import App from './App';

// const token = localStorage.getItem('token');
// if (token) store.dispatch({ type: actionTypes.AUTH_USER });

const store = configureStore(StateLoader.loadState());

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Route component={App} />
    </Router>
  </Provider>,
  document.getElementById('root')
);
