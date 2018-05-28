import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { fetchMessage } from '../actions/authentication';

class Features extends Component {
  componentWillMount() {
    this.props.fetchMessage();
  }

  render() {
    return (
      <div>
        <p>Hello</p>
      </div>
    );
  }
}

Features.propTypes = {
  fetchMessage: PropTypes.func,
};

Features.defaultProps = {
  fetchMessage: () => {},
};

export default connect(null, { fetchMessage })(Features);
