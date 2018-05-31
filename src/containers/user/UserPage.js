import React, { Component } from 'react';
import { connect } from 'react-redux';
import Cookies from 'js-cookie';
import PropTypes from 'prop-types';

import { getUser } from '../../actions/user';
import { signinFromSocial } from '../../actions/authentication';

import * as layout from '../../styles/layout';
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
    const fullname = `${this.props.currentUser.firstname} 
    ${this.props.currentUser.lastname}`;
    return (
      <div className="row">
        <layout.SidebarLeft>
          <UserInfo user={this.props.currentUser} />
          {this.props.auth.authenticated && (
            <UserLinks userId={this.props.auth.user.id} />
          )}
        </layout.SidebarLeft>
        <layout.SidebarContent>
          <h1>{`${fullname} Smoothies`}</h1>
          <SmoothieList
            displayAddButton
            displayAction
            smoothies={
              /\/smoothies\/liked/.test(this.props.location.pathname)
                ? this.props.currentUser.likeSmoothies
                : this.props.currentUser.smoothies
            }
          />
        </layout.SidebarContent>
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
