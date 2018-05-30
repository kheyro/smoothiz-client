import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import * as layout from '../../styles/layout';
import globals from '../../../config/globals';
import { FormValidator, FVDisplayError } from '../../../helpers/formValidator';
import { signinUser } from '../../actions/authentication';

const validation = new FormValidator([
  {
    fieldName: 'email',
    friendlyName: 'email',
    rules: ['isRequired', 'isEmail'],
  },
  {
    fieldName: 'password',
    rules: ['isRequired'],
  },
]);

class Signin extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      form: {},
    };
  }

  onFormSubmit = e => {
    e.preventDefault();
    const form = validation.validate(this.state);
    this.setState({ form });
    if (form.isValid) {
      this.props.signinUser({
        email: this.state.email,
        password: this.state.password,
      });
    }
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
      <layout.Centered>
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
            <FVDisplayError field={this.state.form.email} />
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
            <FVDisplayError field={this.state.form.password} />
          </div>
          {this.renderAlert()}
          <button type="submit" className="btn btn-primary mr-2">
            Sign in
          </button>
          <a
            className="btn btn-info"
            href={`${globals.API_SERVER}/auth/facebook`}
          >
            Signin with Facebook
          </a>
        </form>
      </layout.Centered>
    );
  }
}

const mapStateToProps = state => ({
  errorMessage: state.auth.error,
});

Signin.propTypes = {
  signinUser: PropTypes.func,
  errorMessage: PropTypes.string,
};

Signin.defaultProps = {
  signinUser: () => {},
  errorMessage: '',
};

export default connect(mapStateToProps, { signinUser })(Signin);
