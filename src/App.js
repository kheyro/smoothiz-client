import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Switch, Route } from 'react-router';

import Header from './containers/Header';
import Signup from './containers/auth/Signup';
import Signin from './containers/auth/Signin';

import './styles/styles.scss';

const App = () => (
  <div>
    <Header />
    <Switch>
      <Route path="/signin" component={Signin} />
      <Route path="/signup" component={Signup} />
    </Switch>
  </div>
);

export default App;
