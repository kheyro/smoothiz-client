import React, { Component } from 'react';
import { connect } from 'react-redux';
import Cookies from 'js-cookie';

import { getUser } from '../../actions/user';
import { signinFromSocial } from '../../actions/authentication';

import SmoothieList from '../smoothies/SmoothieList';
import UserInfo from '../../components/user/UserInfo';

class UserSmoothies extends Component {
  constructor() {
    super();
  }
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
      <div>
        <div className="row">
          <div className="col-3">
            <UserInfo user={this.props.currentUser} />
          </div>
          <div className="col-9">
            <SmoothieList
              displayAction
              smoothies={this.props.currentUser.smoothies}
            />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  currentUser: state.currentUser,
});

export default connect(mapStateToProps, {
  getUser,
  signinFromSocial,
})(UserSmoothies);
