import React, { Component } from 'react';
import { connect } from 'react-redux';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import { signupUser } from '../../actions/authentication';
import { FormValidator, FVDisplayError } from '../../../helpers/formValidator';

import '../../../node_modules/react-datepicker/dist/react-datepicker.css';
import globals from '../../../config/globals';

class Signup extends Component {
  constructor() {
    super();
    this.state = {
      firstname: '',
      lastname: '',
      email: '',
      picture: {},
      birthday: moment(),
      password: '',
      passwordConfirm: '',
      form: {},
    };
  }

  onFormSubmit = e => {
    e.preventDefault();
    const modState = Object.assign({}, this.state, {
      birthday: this.state.birthday.format('YYYY-MM-DD'),
    });
    const form = validation.validate(modState);
    this.setState({ form });
    if (form.isValid) {
      const { firstname, lastname, email, password, picture } = this.state;
      this.props.signupUser({
        firstname,
        lastname,
        birthday: this.state.birthday.format('YYYY-MM-DD'),
        email,
        password,
        picture,
      });
    }
  };

  handleChange = e => {
    e.preventDefault();
    const { state } = this;
    if (Object.prototype.hasOwnProperty.call(e, '_isAMomentObject')) {
      state.birthday = e;
    } else if (e.target.name === 'picture') {
      [state.picture] = e.target.files;
    } else {
      state[e.target.name] = e.target.value;
    }
    this.setState(state);
  };

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
            <label htmlFor="picture">Picture</label>
            <input
              className="form-control"
              id="picture"
              name="picture"
              onChange={this.handleChange}
              type="file"
            />
            <FVDisplayError field={this.state.form.passwordConfirm} />
          </div>
          <div className="form-group">
            <label htmlFor="birthday">Birthday</label>
            <DatePicker
              className="form-control"
              dateFormat="MM/DD/YYYY"
              id="birthday"
              name="birthday"
              onChange={this.handleChange}
              selected={this.state.birthday}
            />
            <FVDisplayError field={this.state.form.birthday} />
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
              type="password"
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
              type="password"
              value={this.state.passwordConfirm}
            />
            <FVDisplayError field={this.state.form.passwordConfirm} />
          </div>
          {this.renderAlert()}
          <button type="submit" className="btn btn-primary mr-2">Sign up</button>
          <a
            className="btn btn-info"
            href={`${globals.API_SERVER}/auth/facebook`}
          >
            Signin with Facebook
          </a>
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
    fieldName: 'birthday',
    friendlyName: 'birthday',
    rules: ['isISO8601'],
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
