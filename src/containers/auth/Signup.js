import React, { Component } from 'react';
import { connect } from 'react-redux';
import { signupUser } from '../../actions/authentication';
import { FormValidator, FVDisplayError } from '../../../helpers/formValidator';

class Signup extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      passwordConfirm: '',
      form: {},
    };
  }

  onFormSubmit = e => {
    e.preventDefault();
    const form = validation.validate(this.state);
    this.setState({ form });
    if (form.isValid) {
      this.props.signupUser({
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
            <FVDisplayError field={this.state.form.email} />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              className="form-control"
              id="password"
              name="password"
              onChange={this.handleChange}
              type="text"
              value={this.state.password}
            />
            <FVDisplayError field={this.state.form.password} />
          </div>
          <div className="form-group">
            <label htmlFor="passwordConfirm">Confirm Password</label>
            <input
              className="form-control"
              id="passwordConfirm"
              name="passwordConfirm"
              onChange={this.handleChange}
              type="text"
              value={this.state.passwordConfirm}
            />
            <FVDisplayError field={this.state.form.passwordConfirm} />
          </div>
          {this.renderAlert()}
          <button type="submit" className="btn btn-primary">Sign up</button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  errorMessage: state.auth.error,
});

const validation = new FormValidator([
  {
    fieldName: 'email',
    friendlyName: 'email',
    rules: ['isNotEmpty', 'isEmail'],
  },
  {
    fieldName: 'password',
    rules: ['isNotEmpty'],
  },
  {
    fieldName: 'passwordConfirm',
    friendlyName: 'password confirmation',
    rules: ['isNotEmpty', { equals: ['password'] }],
  },
]);

export default connect(mapStateToProps, { signupUser })(Signup);
