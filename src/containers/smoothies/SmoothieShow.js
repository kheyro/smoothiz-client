import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { history as historyPropTypes } from 'history-prop-types';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import moment from 'moment';

import { ButtonAction } from '../../styles/ui';
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
    const button = this.props.liked
      ? { action: this.dislike, icon: 'fas' }
      : { action: this.like, icon: 'far' };
    return (
      <ButtonAction onClick={button.action}>
        <FontAwesomeIcon icon={[button.icon, 'heart']} /> {counter}
      </ButtonAction>
    );
  };

  renderPicture = () => {
    const picture = this.props.smoothie.user.picture
      ? `${globals.API_SERVER}/profile/r/${this.props.smoothie.user.picture}`
      : `${globals.API_SERVER}/images/placeholder-profile-200x200.jpg`;
    const fullname = `${this.props.smoothie.user.firstname} 
    
    ${this.props.smoothie.user.firstname}`;
    return (
      <img className="rounded-circle w-100" src={picture} alt={fullname} />
    );
  };

  renderViews = () => (
    <span className="stats">
      <FontAwesomeIcon icon={['fas', 'eye']} /> {this.props.smoothie.views}
    </span>
  );

  renderMeta = () => {
    return (
      <div className="smoothie-meta d-flex flex-row pt-2">
        <div className="mr-2">{this.renderLikes()}</div>
        <div>{this.renderViews()}</div>
        <div className="ml-auto">
          {moment(this.props.smoothie.updated_at).format('MMM Do, YY')}
        </div>
      </div>
    );
  };

  renderIngredients = () => {
    return this.props.smoothie.quantities.map(qty => {
      const qtyUnit = `${qty.quantity} ${qty.unit.name}`;
      return (
        <div>
          <span>{qtyUnit}</span> of <span>{qty.ingredient.name}</span>
        </div>
      );
    });
  };

  render() {
    const fullname = `${this.props.smoothie.user.firstname} 
    ${this.props.smoothie.user.lastname}`;
    return (
      <div>
        <div className="modal-smoothie">
          <button
            aria-label="Close"
            className="close"
            onClick={this.closeModal}
          >
            <span aria-hidden="true">×</span>
          </button>
          <div className="modal fade show d-block" role="dialog" tabIndex="-1">
            <div
              className="modal-dialog modal-dialog-centered modal-lg"
              role="document"
            >
              <div className="modal-content flex-row">
                {this.props.smoothie &&
                  this.props.smoothie.pictures && (
                    <img
                      className="h-100 rounded-left"
                      src={`${globals.API_SERVER}/smoothie/r/${
                        this.props.smoothie.pictures
                      }`}
                      alt={this.props.smoothie.name}
                    />
                  )}
                <article className="d-flex flex-fill flex-column pr-3 pl-3 pb-3">
                  <header
                    className="d-flex flex-row justify-content-start align-items-center pt-3 pb-3"
                    style={{ borderBottom: '1px solid #efefef' }}
                  >
                    <div style={{ width: '40px' }}>{this.renderPicture()}</div>
                    <div className="ml-2">
                      <Link
                        to={{
                          pathname: `/users/${this.props.smoothie.user.id}`,
                        }}
                      >
                        {fullname}
                      </Link>
                    </div>
                  </header>
                  {this.renderMeta()}
                  <h1 className="modal-title pt-2 pb-2">
                    {this.props.smoothie && this.props.smoothie.name}
                  </h1>
                  <div className="description flex-fill text-justify">
                    <div className="d-grid ingredient mb-2">
                      <h5>You&apos;ll need...</h5>
                      {this.renderIngredients()}
                    </div>
                    <div>
                      <h5>How it&apos;s done!</h5>
                      {this.props.smoothie && this.props.smoothie.description}
                    </div>
                  </div>
                </article>
              </div>
            </div>
          </div>
          <div className="modal-backdrop fade show" role="presentation"/>
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
    user: PropTypes.shape({
      id: PropTypes.number,
      firstname: PropTypes.string,
      lastname: PropTypes.string,
      picture: PropTypes.string,
    }),
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
  smoothie: {
    user: {
      id: 0,
      firstname: '',
      lastname: '',
      picture: '',
    },
    quantities: [],
  },
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
