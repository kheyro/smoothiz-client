import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { signoutUser } from '../../actions/authentication';

class Signout extends Component {
  componentWillMount() {
    this.props.signoutUser();
  }

  render() {
    return <div>Sorry to see you go...</div>;
  }
}

Signout.propTypes = {
  signoutUser: PropTypes.func,
};

Signout.defaultProps = {
  signoutUser: () => {},
};

export default connect(null, { signoutUser })(Signout);
