import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { getSmoothie } from '../../actions/smoothie';

class SmoothieShow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: true,
    };
    console.log('called constructor?', this.props);
  }
  componentDidMount() {
    this.props.getSmoothie(this.props.match.params.id);
    console.log('called?', this.props);
  }
  render() {
    return (
      <div tabIndex="-1">
        <div className="">
          <div className="modal fade show" role="dialog" tabIndex="-1" className="d-block" style={{ position: 'relative', zIndex: '1050' }}>
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">{this.props.smoothie && this.props.smoothie.name}</h5>
                  <button type="button" className="close" aria-label="Close">
                    <span aria-hidden="true">×</span>
                  </button>
                </div>
                <div className="modal-body">
                  {this.props.smoothie && this.props.smoothie.description}
                </div>
                <div className="modal-footer">
                  Footer
                </div>
              </div>
            </div>
          </div>
          <div className="modal-backdrop fade show"></div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  smoothie: state.smoothies.currentSmoothie,
});

export default connect(mapStateToProps, { getSmoothie })(SmoothieShow);
