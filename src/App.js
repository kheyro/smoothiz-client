import React, { Component } from 'react';
import { Switch, Route } from 'react-router';

import Header from './containers/Header';
import Home from './containers/Home';
import Signup from './containers/auth/Signup';
import Signin from './containers/auth/Signin';
import Signout from './containers/auth/Signout';
import Features from './components/Features';
import UserSmoothies from './containers/user/UserPage';
import SmoothieShow from './containers/smoothies/SmoothieShow';
import RequireAuth from './containers/auth/RequireAuthentication';
import FormValidator from './components/FormValidator';

import './styles/styles.scss';

class App extends Component {
  componentWillUpdate(nextProps) {
    const { location } = this.props;
    if (nextProps.history.action !== 'POP') {
      this.previousLocation = this.props.location;
    }
  }
  previousLocation = this.props.location;

  render() {
    const { location } = this.props;
    const isModal = location.pathname.match(/\/smoothies\/\d+$/); // Unsafe: look for more accurate test as match returns an array
    return (
      <div>
        <Header />
        <div className="container">
          <Switch location={isModal ? this.previousLocation : location}>
            <Route exact path="/" component={Home} />
            <Route path="/signin" component={Signin} />
            <Route path="/signup" component={Signup} />
            <Route path="/signout" component={Signout} />
            <Route path="/features" component={RequireAuth(Features)} />
            <Route path="/users/:id" component={UserSmoothies} />
            <Route path="/formvalidator" component={FormValidator} />
          </Switch>
          <Route path="/smoothies/:id" component={SmoothieShow} />
        </div>
      </div>
    );
  }
}

export default App;
