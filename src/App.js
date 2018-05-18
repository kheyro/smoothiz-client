import React, { Component } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Switch, Route } from 'react-router';

import Header from './containers/Header';
import Signup from './containers/auth/Signup';
import Signin from './containers/auth/Signin';
import Signout from './containers/auth/Signout';
import Features from './components/Features';
import UserSmoothies from './containers/user/UserSmoothies';
import SmoothieShow from './containers/smoothies/SmoothieShow';
import RequireAuth from './containers/auth/RequireAuthentication';
import FormValidator from './components/FormValidator';

import './styles/styles.scss';

class App extends Component {
  componentWillUpdate(nextProps) {
    const { location } = this.props;
    // set previousLocation if props.location is not modal
    if (
      nextProps.history.action !== "POP" &&
      (!location.state || !location.state.modal)
    ) {
      this.previousLocation = this.props.location;
    }
  }

  render() {
    const { location } = this.props;
    const isModal = !!(
      location.state &&
      location.state.modal &&
      this.previousLocation !== location
    );
    return (
      <div>
        <Header/>
        <div className="container">
          <Switch location={isModal ? this.previousLocation : location}>
            <Route path="/signin" component={Signin}/>
            <Route path="/signup" component={Signup}/>
            <Route path="/signout" component={Signout}/>
            <Route path="/features" component={RequireAuth(Features)}/>
            <Route path="/users/:id" component={UserSmoothies}/>
            <Route path="/formvalidator" component={FormValidator}/>
          </Switch>
          {isModal ? <Route path="/smoothies/:id" component={SmoothieShow} /> : null }
        </div>
      </div>
    );
  }
}

export default App;
