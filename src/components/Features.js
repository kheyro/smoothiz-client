import React, { Component } from 'react';
import { connect } from 'react-redux';
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

export default connect(null, { fetchMessage })(Features);
