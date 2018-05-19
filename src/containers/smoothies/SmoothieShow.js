import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { getSmoothie } from '../../actions/smoothie';

class SmoothieShow extends Component {
  componentDidMount() {
    this.props.getSmoothie(this.props.match.params.id);
  }
  closeModal = e => {
    e.stopPropagation();
    this.props.history.goBack();
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
                  {this.props.smoothie && this.props.smoothie.description}
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

const mapStateToProps = state => ({
  smoothie: state.smoothies.currentSmoothie,
});

export default connect(mapStateToProps, { getSmoothie })(SmoothieShow);
