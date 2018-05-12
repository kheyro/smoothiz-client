import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

class Header extends Component {
  constructor() {
    super();
    this.user = JSON.parse(localStorage.getItem('user'));
  }
  renderLinks() {
    if (this.props.authenticated) {
      return [
        <li className="nav-item">
          <Link
            className="nav-link"
            to={{ pathname: `/users/${this.user.id}` }}
          >
            My Account
          </Link>
        </li>,
        <li className="nav-item">
          <Link className="nav-link" to="/signout">
            Sign Out
          </Link>
        </li>,
      ];
    }
    return [
      <li className="nav-item" key={1}>
        <Link className="nav-link" to="/signin">
          Sign In
        </Link>
      </li>,
      <li className="nav-item" key={2}>
        <Link className="nav-link" to="/signup">
          Sign Up
        </Link>
      </li>,
    ];
  }

  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <Link className="navbar-brand" to="/">
          Healthy Smoothie
        </Link>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link" to="/">
                Home
              </Link>
            </li>
            {this.renderLinks()}
          </ul>
        </div>
      </nav>
    );
  }
}

const mapStateToProps = state => ({
  authenticated: state.auth.authenticated,
});

export default connect(mapStateToProps, null)(Header);
