import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Button } from 'reactstrap';

import { deleteSmoothie, editSmoothie } from '../../actions/smoothie';
import { getUser } from '../../actions/user';
import SmoothieForm from './SmoothieForm';

class SmoothieList extends Component {
  constructor() {
    super();
    this.state = {
      editData: {},
      modal: false,
    };
  }
  toggle = action => {
    if (action === 'close') this.setState({ editData: {} });
    this.setState({ modal: !this.state.modal });
  };
  editSmoothie(smoothieId) {
    const smoothie = this.props.currentUser.smoothies.find(
      smt => smt.id === smoothieId
    );
    const {
      id,
      name,
      description,
      recipe,
      visibility,
      categories,
      quantities,
    } = smoothie;
    // convert name_id to nameId
    for (let i = 0; i < categories.length; i += 1) {
      quantities[i].ingredientId = quantities[i].ingredient_id;
      quantities[i].unitId = quantities[i].unit_id;
      delete quantities[i].ingredient_id;
      delete quantities[i].unit_id;
    }
    const categoryIds = categories.map(category => category.id);
    this.setState({
      editData: {
        name,
        description,
        recipe,
        visibility,
        categoryIds,
        editingId: id,
        quantities,
      },
    });
    this.toggle();
  }
  deleteSmoothie(smoothieId) {
    this.props.deleteSmoothie(smoothieId).then(() =>
      this.props.getUser(this.props.auth.user.id)
    );
  }
  render() {
    return (
      <div>
        {this.props.auth.authenticated && (
          <Button color="danger" onClick={this.toggle}>
            Smoothiz
          </Button>
        )}
        <SmoothieForm
          toggle={this.toggle}
          modal={this.state.modal}
          editData={this.state.editData}
        />
        {this.props.smoothies &&
          this.props.smoothies.map(smoothie => (
            <div key={smoothie.id}>
              <h6>
                <Link to={{ pathname: `/smoothies/${smoothie.id}` }}>
                  {smoothie.name}
                </Link>
              </h6>
              {this.props.displayAction &&
                this.props.auth.authenticated &&
                this.props.auth.user.id === smoothie.user_id && (
                  <p>
                    <button onClick={() => this.editSmoothie(smoothie.id)}>
                      Edit
                    </button>
                    <button onClick={() => this.deleteSmoothie(smoothie.id)}>
                      Delete
                    </button>
                  </p>
                )}
            </div>
          ))}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  currentUser: state.currentUser,
  auth: state.auth,
});

export default connect(mapStateToProps, {
  editSmoothie,
  deleteSmoothie,
  getUser,
})(SmoothieList);
