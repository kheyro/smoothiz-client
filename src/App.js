import React, { Component, Fragment } from 'react';
import { Switch, Route } from 'react-router';
import PropTypes from 'prop-types';
import fontawesome from '@fortawesome/fontawesome';
import brands from '@fortawesome/fontawesome-free-brands';
import solid from '@fortawesome/fontawesome-free-solid';

import Header from './containers/Header';
import Home from './containers/Home';
import Signup from './containers/auth/Signup';
import Signin from './containers/auth/Signin';
import Signout from './containers/auth/Signout';
import Features from './components/Features';
import CategoryPage from './containers/CategoryPage';
import UserSmoothies from './containers/user/UserPage';
import SmoothieShow from './containers/smoothies/SmoothieShow';
import RequireAuth from './containers/auth/RequireAuthentication';

import './styles/styles.scss';

fontawesome.library.add(brands, solid);

class App extends Component {
  componentWillUpdate(nextProps) {
    const { location } = this.props;
    if (nextProps.history.action !== 'POP') {
      this.previousLocation = location;
    }
  }

  previousLocation = this.props.location;

  render() {
    const { location } = this.props;
    const isModal = location.pathname.match(/\/smoothies\/\d+$/); // Unsafe: look for more accurate test as match returns an array
    return (
      <Fragment>
        <Header />
        <div className="container">
          <Switch location={isModal ? this.previousLocation : location}>
            <Route exact path="/" component={Home} />
            <Route path="/signin" component={Signin} />
            <Route path="/signup" component={Signup} />
            <Route path="/signout" component={Signout} />
            <Route path="/features" component={RequireAuth(Features)} />
            <Route path="/users/:id" component={UserSmoothies} />
            <Route path="/categories/:id" component={CategoryPage} />
          </Switch>
          <Route path="/smoothies/:id" component={SmoothieShow} />
        </div>
      </Fragment>
    );
  }
}

App.propTypes = {
  location: PropTypes.objectOf(PropTypes.string),
};

App.defaultProps = {
  location: '/',
};

export default App;
