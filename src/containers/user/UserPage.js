import React, { Component } from 'react';
import { connect } from 'react-redux';
import Cookies from 'js-cookie';
import PropTypes from 'prop-types';

import { getUser } from '../../actions/user';
import { signinFromSocial } from '../../actions/authentication';

import SmoothieList from '../smoothies/SmoothieList';
import UserInfo from '../../components/user/UserInfo';
import UserLinks from '../../components/user/UserLinks';

class UserPage extends Component {
  componentDidMount() {
    this.props.getUser(this.props.match.params.id);
    // if comes from redirection social signin
    if (Cookies.get('token')) {
      this.props.signinFromSocial();
    }
  }

  componentDidUpdate(prevProps) {
    // Fix issue if user navigate between user page
    if (prevProps.match.params.id !== this.props.match.params.id)
      this.props.getUser(this.props.match.params.id);
  }

  render() {
    return (
      <div className="row">
        <div className="col-3">
          <UserInfo user={this.props.currentUser} />
          {this.props.auth.authenticated && (
            <UserLinks userId={this.props.auth.user.id} />
          )}
        </div>
        <div className="col-9">
          <SmoothieList
            displayAction
            smoothies={
              /\/smoothies\/liked/.test(this.props.location.pathname)
                ? this.props.currentUser.likeSmoothies
                : this.props.currentUser.smoothies
            }
          />
        </div>
      </div>
    );
  }
}

UserPage.propTypes = {
  getUser: PropTypes.func,
  signinFromSocial: PropTypes.func,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }),
  location: PropTypes.objectOf(PropTypes.string),
  auth: PropTypes.shape({
    authenticated: PropTypes.bool,
    user: PropTypes.shape({
      id: PropTypes.number,
    }),
  }),
  currentUser: PropTypes.shape({
    id: PropTypes.number,
    username: PropTypes.string,
    firstname: PropTypes.string,
    lastname: PropTypes.string,
    picture: PropTypes.string,
    smoothies: PropTypes.arrayOf(
      PropTypes.shape({
        description: PropTypes.string,
        id: PropTypes.number,
        name: PropTypes.string,
        pictures: PropTypes.string,
        recipe: PropTypes.string,
        user_id: PropTypes.number,
        views: PropTypes.number,
        visibility: PropTypes.number,
      })
    ),
    likeSmoothies: PropTypes.arrayOf(
      PropTypes.shape({
        description: PropTypes.string,
        id: PropTypes.number,
        name: PropTypes.string,
        pictures: PropTypes.string,
        recipe: PropTypes.string,
        user_id: PropTypes.number,
        views: PropTypes.number,
        visibility: PropTypes.number,
      })
    ),
  }),
};

UserPage.defaultProps = {
  getUser: () => {},
  signinFromSocial: () => {},
  match: {},
  location: {},
  auth: {},
  currentUser: {},
};

const mapStateToProps = state => ({
  auth: state.auth,
  currentUser: state.currentUser,
});

export default connect(mapStateToProps, {
  getUser,
  signinFromSocial,
})(UserPage);
