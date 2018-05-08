import React, { Component } from 'react';

class Signup extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      passwordConfirm: '',
    };
  }

  onFormSubmit = e => {
    e.preventDefault();
  };

  handleChange = e =>
    this.setState({
      [e.target.name]: e.target.value,
    });

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
              type="text"
              value={this.state.password}
            />
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
          </div>
          <button type="submit" className="btn btn-primary">Sign up</button>
        </form>
      </div>
    );
  }
}

export default Signup;
