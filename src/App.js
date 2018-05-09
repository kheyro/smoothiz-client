import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Switch, Route } from 'react-router';

import Header from './containers/Header';
import Signup from './containers/auth/Signup';
import Signin from './containers/auth/Signin';
import Signout from './containers/auth/Signout';
import Features from './components/Features';
import RequireAuth from './containers/auth/RequireAuthentication';

import './styles/styles.scss';

const App = () => (
  <div>
    <Header />
    <Switch>
      <Route path="/signin" component={Signin} />
      <Route path="/signup" component={Signup} />
      <Route path="/signout" component={Signout} />
      <Route path="/features" component={RequireAuth(Features)} />
    </Switch>
  </div>
);

export default App;
