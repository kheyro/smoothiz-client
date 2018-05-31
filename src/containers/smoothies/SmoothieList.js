import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Button } from 'reactstrap';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';

import globals from '../../../config/globals';
import { ButtonAction, CardTitleLink } from '../../styles/ui';
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
      pictures,
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
        editPictures: pictures,
      },
    });
    this.toggle();
  }

  deleteSmoothie(smoothieId) {
    this.props
      .deleteSmoothie(smoothieId)
      .then(() => this.props.getUser(this.props.auth.user.id));
  }

  render() {
    if (this.props.smoothies.length === 0) {
      return <div>Sorry... There is no smoothie yet...</div>;
    }
    return (
      <div>
        <SmoothieForm
          toggle={this.toggle}
          modal={this.state.modal}
          editData={this.state.editData}
        />
        {this.props.auth.authenticated &&
          this.props.displayAddButton && (
            <div className="mb-4">
              <Button color="danger" size="sm" onClick={this.toggle}>
                + Smoothiz
              </Button>
            </div>
          )}
        <div className="card-columns">
          {this.props.smoothies &&
            this.props.smoothies.map(smoothie => (
              <div key={smoothie.id} className="card">
                <img
                  className="card-img-top"
                  src={`${globals.API_SERVER}/smoothie/r/${smoothie.pictures}`}
                  alt={smoothie.name}
                />
                <div className="card-body">
                  <h5 className="card-title">
                    <CardTitleLink
                      to={{ pathname: `/smoothies/${smoothie.id}` }}>
                      {smoothie.name}
                    </CardTitleLink>
                  </h5>
                  <p className="card-text mb-2">{smoothie.description}</p>
                  {this.props.displayAction &&
                    this.props.auth.authenticated &&
                    this.props.auth.user.id === smoothie.user_id && (
                      <p className="card-action mb-0 text-right">
                        <ButtonAction
                          onClick={() => this.editSmoothie(smoothie.id)}
                        >
                          <FontAwesomeIcon icon={['fas', 'edit']} />
                          edit
                        </ButtonAction>
                        <ButtonAction
                          onClick={() => this.deleteSmoothie(smoothie.id)}
                        >
                          <FontAwesomeIcon icon={['fas', 'trash-alt']} />
                          delete
                        </ButtonAction>
                      </p>
                    )}
                </div>
                <div className="card-footer">
                  <small>
                    <span className="stats">
                      <FontAwesomeIcon icon={['fas', 'eye']} /> {smoothie.views}
                    </span>
                    <span className="stats">
                      <FontAwesomeIcon icon={['fas', 'heart']} /> {smoothie.likeUsers.length}
                    </span>
                    {smoothie.user && (
                      <span className="author">
                        <a href={`/users/${smoothie.user.id}`}>
                          {smoothie.user.firstname} {smoothie.user.lastname}
                        </a>
                      </span>
                    )}
                  </small>
                </div>
              </div>
            ))}
        </div>
      </div>
    );
  }
}

SmoothieList.propTypes = {
  deleteSmoothie: PropTypes.func,
  getUser: PropTypes.func,
  displayAction: PropTypes.bool,
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
};

SmoothieList.defaultProps = {
  deleteSmoothie: () => {},
  getUser: () => {},
  displayAction: false,
  auth: {},
  currentUser: {},
  smoothies: [],
};

const mapStateToProps = state => ({
  currentUser: state.currentUser,
  auth: state.auth,
});

export default connect(mapStateToProps, {
  editSmoothie,
  deleteSmoothie,
  getUser,
})(SmoothieList);
