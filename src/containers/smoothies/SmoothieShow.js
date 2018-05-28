import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { getSmoothie, likeSmoothie, dislikeSmoothie } from '../../actions/smoothie';
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
    this.props.likeSmoothie(this.props.match.params.id).then(() =>
      this.props.getUser(this.props.auth.user.id)
    );
  };
  dislike = e => {
    e.preventDefault();
    this.props.dislikeSmoothie(this.props.match.params.id).then(() =>
      this.props.getUser(this.props.auth.user.id)
    );
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
                    this.props.smoothie.picture && (
                      <img
                        src={this.props.smoothie.picture}
                        alt={this.props.smoothie.name}
                      />
                    )}
                  {this.props.smoothie && this.props.smoothie.description}
                  {
                    this.props.liked &&
                    <button onClick={this.dislike}>dislike</button> ||
                    <button onClick={this.like}>Like</button>
                  }
                  <p>like: {this.props.smoothie && this.props.smoothie.likeUsers && this.props.smoothie.likeUsers.length || 0}</p>
                </div>
                <div className="modal-footer">Footer</div>
              </div>
            </div>
          </div>
          <div className="modal-backdrop fade show" onClick={this.closeModal}></div>
        </div>
      </div>
    );
  }
}

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
