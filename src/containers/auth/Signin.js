import React, { Component } from 'react';
import { connect } from 'react-redux';

import { signinUser } from '../../actions/authentication';

class Signin extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
    };
  }

  onFormSubmit = e => {
    e.preventDefault();
    this.props.signinUser({
      email: this.state.email,
      password: this.state.password,
    });
  };

  handleChange = e =>
    this.setState({
      [e.target.name]: e.target.value,
    });

  renderAlert() {
    if (this.props.errorMessage) {
      return (
        <div className="alert alert-danger">
          <strong>Oops!</strong> {this.props.errorMessage}
        </div>
      );
    }

    return '';
  }

  render() {
    return (
      <div>
        <form onSubmit={this.onFormSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              className="form-control"
              id="email"
              name="email"
              onChange={this.handleChange}
              type="text"
              value={this.state.email}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              className="form-control"
              id="password"
              name="password"
              onChange={this.handleChange}
              type="password"
              value={this.state.password}
            />
          </div>
          {this.renderAlert()}
          <button type="submit" className="btn btn-primary">Sign in</button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  errorMessage: state.auth.error,
});

export default connect(mapStateToProps, { signinUser })(Signin);
