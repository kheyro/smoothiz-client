import React, { Component } from 'react';

class Signup extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
    };
    this.handleChange = this.handleChange.bind(this);
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
          <div>
            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              onChange={this.handleChange}
              type="text"
              value={this.state.email}
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              id="password"
              name="password"
              onChange={this.handleChange}
              type="text"
              value={this.state.password}
            />
          </div>
          <button type="submit">Sign up</button>
        </form>
      </div>
    );
  }
}

export default Signup;
