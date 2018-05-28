import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { history as historyPropTypes } from 'history-prop-types';

import globals from '../../../config/globals';
import {
  getSmoothie,
  likeSmoothie,
  dislikeSmoothie,
} from '../../actions/smoothie';
import { getUser } from '../../actions/user';

class SmoothieShow extends Component {
  componentDidMount() {
    this.props.getSmoothie(this.props.match.params.id);
  }

  closeModal = e => {
    e.stopPropagation();
    this.props.history.goBack();
  };

  like = e => {
    e.preventDefault();
    this.props
      .likeSmoothie(this.props.match.params.id)
      .then(() => this.props.getUser(this.props.auth.user.id));
  };

  dislike = e => {
    e.preventDefault();
    this.props
      .dislikeSmoothie(this.props.match.params.id)
      .then(() => this.props.getUser(this.props.auth.user.id));
  };

  renderLikes = () => {
    const { smoothie } = this.props;
    const counter =
      smoothie && smoothie.likeUsers ? smoothie.likeUsers.length : 0;
    return <div>like: {counter}</div>;
  };

  renderLikeButton = () => {
    if (this.props.liked) {
      return <button onClick={this.dislike}>Dislike</button>;
    }
    return <button onClick={this.like}>Like</button>;
  };

  render() {
    return (
      <div tabIndex="-1">
        <div className="">
          <div
            className="modal fade show d-block"
            role="dialog"
            style={{ position: 'relative', zIndex: '1050' }}
            tabIndex="-1"
          >
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h1 className="modal-title">
                    {this.props.smoothie && this.props.smoothie.name}
                  </h1>
                  <button
                    aria-label="Close"
                    className="close"
                    onClick={this.closeModal}
                    type="button"
                  >
                    <span aria-hidden="true">×</span>
                  </button>
                </div>
                <div className="modal-body">
                  {this.props.smoothie &&
                    this.props.smoothie.pictures && (
                      <img
                        src={`${globals.API_SERVER}/smoothie/r/${
                          this.props.smoothie.pictures
                        }`}
                        alt={this.props.smoothie.name}
                      />
                    )}
                  {this.props.smoothie && this.props.smoothie.description}
                  {this.renderLikeButton()}
                  {this.renderLikes()}
                </div>
                <div className="modal-footer">Footer</div>
              </div>
            </div>
          </div>
          <div
            className="modal-backdrop fade show"
            onClick={this.closeModal}
            role="presentation"
          />
        </div>
      </div>
    );
  }
}

SmoothieShow.propTypes = {
  getSmoothie: PropTypes.func,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }),
  history: PropTypes.shape(historyPropTypes),
  likeSmoothie: PropTypes.func,
  dislikeSmoothie: PropTypes.func,
  getUser: PropTypes.func,
  auth: PropTypes.shape({
    authenticated: PropTypes.bool,
    user: PropTypes.shape({
      id: PropTypes.number,
    }),
  }),
  liked: PropTypes.bool,
  smoothie: PropTypes.shape({
    description: PropTypes.string,
    id: PropTypes.number,
    name: PropTypes.string,
    pictures: PropTypes.string,
    recipe: PropTypes.string,
    user_id: PropTypes.number,
    views: PropTypes.number,
    visibility: PropTypes.number,
    likeUsers: PropTypes.arrayOf(PropTypes.string),
  }),
};

SmoothieShow.defaultProps = {
  getSmoothie: () => {},
  likeSmoothie: () => {},
  dislikeSmoothie: () => {},
  getUser: () => {},
  match: {},
  history: {},
  auth: {},
  smoothie: {},
  liked: false,
};

const mapStateToProps = state => {
  const liked =
    state.auth.authenticated &&
    state.smoothies.currentSmoothie &&
    state.smoothies.currentSmoothie.likeUsers.some(
      user => user.user_id === state.auth.user.id
    );
  return {
    auth: state.auth,
    smoothie: state.smoothies.currentSmoothie,
    liked,
  };
};

export default connect(mapStateToProps, {
  getSmoothie,
  likeSmoothie,
  dislikeSmoothie,
  getUser,
})(SmoothieShow);
