import React, { Component } from 'react';
import { connect } from 'react-redux';
import { signupUser } from '../../actions/authentication';
import { FormValidator, FVDisplayError } from '../../../helpers/formValidator';

class Signup extends Component {
  constructor() {
    super();
    this.state = {
      firstname: '',
      lastname: '',
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
            <label htmlFor="firstName">First name</label>
            <input
              className="form-control"
              id="firstname"
              name="firstname"
              onChange={this.handleChange}
              type="text"
              value={this.state.firstname}
            />
            <FVDisplayError field={this.state.form.firstname} />
          </div>
          <div className="form-group">
            <label htmlFor="lastName">Last name</label>
            <input
              className="form-control"
              id="lastname"
              name="lastname"
              onChange={this.handleChange}
              type="text"
              value={this.state.lastname}
            />
            <FVDisplayError field={this.state.form.lastname} />
          </div>
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
    fieldName: 'firstname',
    friendlyName: 'first name',
    rules: ['isAlpha'],
  },
  {
    fieldName: 'lastname',
    friendlyName: 'last name',
    rules: ['isAlpha'],
  },
  {
    fieldName: 'email',
    friendlyName: 'email',
    rules: ['isRequired', 'isEmail'],
  },
  {
    fieldName: 'password',
    rules: ['isRequired'],
  },
  {
    fieldName: 'passwordConfirm',
    friendlyName: 'password confirmation',
    rules: ['isRequired', { equals: ['password'] }],
  },
]);

export default connect(mapStateToProps, { signupUser })(Signup);
