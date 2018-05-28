import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends Component {
  renderLinks() {
    if (this.props.auth.authenticated) {
      return (
        <Fragment>
          <li className="nav-item">
            <Link
              className="nav-link"
              to={{ pathname: `/users/${this.props.auth.user.id}` }}
            >
              My Smoothies
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/signout">
              Sign Out
            </Link>
          </li>
        </Fragment>
      );
    }
    return (
      <Fragment>
        <li className="nav-item">
          <Link className="nav-link" to="/signin">
            Sign In
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/signup">
            Sign Up
          </Link>
        </li>
      </Fragment>
    );
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

Header.propTypes = {
  auth: PropTypes.shape({
    authenticated: PropTypes.bool,
    user: PropTypes.shape({
      id: PropTypes.number,
    }),
  }),
};

Header.defaultProps = {
  auth: {},
};

const mapStateToProps = state => ({
  auth: state.auth,
});

export default connect(mapStateToProps, null)(Header);
