import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Switch, Route } from 'react-router';

import Header from './containers/Header';
import Signup from './containers/auth/Signup';
import Signin from './containers/auth/Signin';
import Signout from './containers/auth/Signout';
import Features from './components/Features';
import UserSmoothies from './containers/user/UserSmoothies';
import RequireAuth from './containers/auth/RequireAuthentication';
import FormValidator from './components/FormValidator';

import './styles/styles.scss';

const App = () => (
  <div>
    <Header />
    <div className="container">
      <Switch>
        <Route path="/signin" component={Signin} />
        <Route path="/signup" component={Signup} />
        <Route path="/signout" component={Signout} />
        <Route path="/features" component={RequireAuth(Features)} />
        <Route path="/users/:id" component={UserSmoothies} />
        <Route path="/formvalidator" component={FormValidator} />
      </Switch>
    </div>
  </div>
);

export default App;
