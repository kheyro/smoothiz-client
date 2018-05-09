import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

export default function(ComposedComponent) {
  class Authentication extends Component {
    static contextTypes = {
      router: PropTypes.object,
    };
    componentWillMount() {
      this.checkAuth(this.props.authenticated);
    }

    componentWillUpdate(nextProps) {
      this.checkAuth(!nextProps.authenticated);
    }

    checkAuth(isAuthenticated) {
      if (!isAuthenticated) this.context.router.history.push('/');
    }

    render() {
      return <ComposedComponent {...this.props} />;
    }
  }
  const mapStateToProps = state => ({
    authenticated: state.auth.authenticated,
  });

  return connect(mapStateToProps)(Authentication);
}
