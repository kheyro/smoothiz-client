import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import PropTypes from 'prop-types';
import { FormValidator, FVDisplayError } from '../../../helpers/formValidator';
import globals from '../../../config/globals';
import { getCategories } from '../../actions/category';
import { getIngredients } from '../../actions/ingredient';
import { getUnits } from '../../actions/unit';
import { createSmoothie, editSmoothie } from '../../actions/smoothie';
import { getUser } from '../../actions/user';

const validation = new FormValidator([
  {
    fieldName: 'categoryIds',
    friendlyName: 'Category',
    rules: ['isSelected'],
  },
  {
    fieldName: 'name',
    rules: ['isRequired'],
  },
]);

class SmoothieForm extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      description: '',
      visibility: 0,
      recipe: '',
      pictures: {},
      editPictures: '',
      preview: '',
      previewError: '',
      categoryIds: [0],
      ingredients: [
        {
          ingredientId: 1,
          quantity: 0,
          unitId: 1,
        },
      ],
      form: {},
      modal: false,
      editingId: 0,
      error: { status: false, message: '' },
    };
  }

  componentDidMount() {
    this.props.getCategories();
    this.props.getUnits();
    this.props.getIngredients();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.editData && nextProps.editData.editingId > 0) {
      this.setState({
        name: nextProps.editData.name,
        description: nextProps.editData.description,
        visibility: nextProps.editData.visibility,
        recipe: nextProps.editData.recipe,
        categoryIds: nextProps.editData.categoryIds,
        editingId: nextProps.editData.editingId,
        ingredients: nextProps.editData.quantities,
        editPictures: nextProps.editData.editPictures,
      });
    }
  }

  setError(status, message) {
    return this.setState({
      error: { status, message },
    });
  }

  resetForm() {
    document.forms['add-smoothie'].reset();
    this.setState({
      name: '',
      description: '',
      recipe: '',
      form: {},
      editingId: 0,
      categoryIds: [0],
      editPictures: '',
      pictures: {},
      ingredients: [
        {
          ingredientId: 1,
          quantity: 0,
          unitId: 1,
        },
      ],
      error: { status: false, message: '' },
    });
  }

  addIngredientField = e => {
    e.preventDefault();
    this.setState({
      ingredients: [
        ...this.state.ingredients,
        {
          quantity: 0,
          ingredientId: 1,
          unitId: 1,
        },
      ],
    });
  };

  addCategoryField = e => {
    e.preventDefault();
    this.setState({
      categoryIds: [...this.state.categoryIds, 0],
    });
  };

  handleFormSubmit = e => {
    e.preventDefault();
    const form = validation.validate(this.state);
    this.setState({ form }, () => {
      if (this.state.form.isValid) {
        if (this.state.editingId > 0) {
          this.props.editSmoothie(this.state).then(res => {
            if (res.status === 200) {
              // call action to refresh store
              this.props.getUser(this.props.auth.user.id);
              return this.setError(false, 'Changes successfully saved');
            }
            return this.setError(true, 'An error appeared while saving');
          });
        } else {
          this.props.createSmoothie(this.state).then(res => {
            if (res.status === 201) {
              this.resetForm();
              // call action to refresh store
              this.props.getUser(this.props.auth.user.id);
              return this.setError(false, 'Smoothie successfully added');
            }
            return this.setError(true, 'An error appeared while saving');
          });
        }
      }
    });
  };

  handleCatChange = (e, i) => {
    const categoryIds = [...this.state.categoryIds];
    categoryIds[i] = e.target.value;
    this.setState({ categoryIds });
  };

  handleInputChange = e => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  removeIngredientField = (e, i) => {
    e.preventDefault();
    if (this.state.ingredients.length > 1) {
      const { ingredients } = this.state;
      ingredients.splice(i, 1);
      this.setState({ ingredients });
    }
  };

  removeCategoryField = (e, i) => {
    e.preventDefault();
    if (this.state.categoryIds.length > 1) {
      const { categoryIds } = this.state;
      categoryIds.splice(i, 1);
      this.setState({ categoryIds });
    }
  };

  handleIngredientChange = (e, i, name) => {
    const ingredients = [...this.state.ingredients];
    ingredients[i][name] = e.target.value;
    this.setState({ ingredients });
  };

  toggle = () => {
    this.resetForm();
    this.props.toggle('close');
  };

  handlePictureChange = e => {
    this.setState({
      pictures: '',
      preview: '',
      previewError: '',
    });
    const pictures = e.target.files[0];
    // check file extension
    const checkFile = /(jpe?g|png)$/;
    if (
      !checkFile.test(pictures.type) ||
      !checkFile.test(pictures.name.split('.').pop())
    ) {
      return this.setState({
        previewError: 'Invalid file! Allowed file types: .png, .jpg, .jpeg',
      });
    }
    const reader = new FileReader();
    reader.onloadend = () => {
      this.setState({
        pictures,
        preview: reader.result,
      });
    };
    reader.onerror = () =>
      this.setState({
        previewError: `${reader.error}. An error occurred, please try again...`,
      });
    return reader.readAsDataURL(pictures);
  };

  handlePictureClick = e => {
    e.preventDefault();
    document.getElementById('pictures').click();
  };

  renderCategoryIds() {
    return this.state.categoryIds.map((category, i) => (
      <div className="form-row" key={category}>
        <div className="col-8">
          <label htmlFor={`category_ids_${i}`} className="sr-only">
            Category
          </label>
          <select
            className="form-control"
            id={`category_ids_${i}`}
            name="category_ids"
            onChange={e => this.handleCatChange(e, i)}
            value={category}
          >
            <option value="0">Select Category</option>
            {this.renderCategory()}
          </select>
        </div>
        <div className="col-2">
          {this.state.categoryIds.length > 1 && (
            <button
              className="btn btn-danger"
              onClick={e => this.removeCategoryField(e, i)}
            >
              -
            </button>
          )}
        </div>
        <FVDisplayError field={this.state.form.categoryIds} index={i} />
      </div>
    ));
  }

  renderCategory() {
    const { categories } = this.props;
    if (Object.keys(categories).length > 0) {
      return categories.map(category => (
        <option value={category.id} key={category.id}>
          {category.name}
        </option>
      ));
    }
    return '';
  }

  renderIngredients() {
    return this.state.ingredients.map((ingredient, i) => (
      <div className="form-row" key={ingredient.ingredientId}>
        <div className="col-4">
          <label htmlFor={`ingredient_ids_${i}`}>Ingredients</label>
          <select
            name={`ingredient_ids_${i}`}
            className="form-control"
            onChange={e => this.handleIngredientChange(e, i, 'ingredientId')}
            value={ingredient.ingredientId}
          >
            {this.props.ingredients.map(ing => (
              <option key={ing.id} value={ing.id}>
                {ing.name}
              </option>
            ))}
          </select>
        </div>
        <div className="col-2">
          <label htmlFor={`quantity_${i}`}>Qty</label>
          <input
            className="form-control"
            type="text"
            value={ingredient.quantity}
            name={`quantity_${i}`}
            onChange={e => this.handleIngredientChange(e, i, 'quantity')}
          />
        </div>
        <div className="col-2">
          <label htmlFor={`unit_ids_${i}`}>Units</label>
          <select
            name={`unit_ids_${i}`}
            className="form-control"
            value={ingredient.unitId}
            onChange={e => this.handleIngredientChange(e, i, 'unitId')}
          >
            {this.props.units.map(unit => (
              <option key={unit.id} value={unit.id}>
                {unit.name}
              </option>
            ))}
          </select>
        </div>
        <div className="col-2 d-flex align-items-end">
          {this.state.ingredients.length > 1 && (
            <button
              className="btn btn-danger"
              onClick={e => this.removeIngredientField(e, i)}
            >
              -
            </button>
          )}
        </div>
      </div>
    ));
  }

  renderPreviewError = () => (
    <div className="text-danger">
      {this.state.previewError && (
        <small>
          <em>{this.state.previewError}</em>
        </small>
      )}
    </div>
  );

  renderPreviewPicture = () => {
    let picture;
    if (this.state.pictures instanceof File && this.state.preview) {
      picture = this.state.preview;
    } else if (this.state.editPictures && this.state.editingId > 0) {
      picture = `${globals.AWS_BUCKET}/smoothie/${this.state.editPictures}`;
    }
    return (
      <Fragment>
        {picture && (
          <img alt="Smoothie preview" className="w-100" src={picture} />
        )}
      </Fragment>
    );
  };

  render() {
    return (
      <Modal
        isOpen={this.props.modal}
        toggle={this.toggle}
        className={this.props.className}
      >
        <ModalHeader toggle={this.toggle}>Modal title</ModalHeader>
        <ModalBody>
          <form onSubmit={this.handleFormSubmit} id="add-smoothie">
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                className="form-control"
                name="name"
                onChange={this.handleInputChange}
                type="text"
                value={this.state.name}
              />
              <FVDisplayError field={this.state.form.name} />
            </div>
            <div className="form-group">
              <label htmlFor="description">Description</label>
              <input
                className="form-control"
                name="description"
                onChange={this.handleInputChange}
                type="text"
                value={this.state.description}
              />
            </div>
            <div className="form-group">
              <div className="preview w-100 rounded mb-3">
                {this.renderPreviewPicture()}
              </div>
              <label htmlFor="pictures" className="sr-only">
                Pictures
              </label>
              <input
                accept="image/*,.png,.jpg,.jpeg"
                className="d-none"
                id="pictures"
                name="pictures"
                onChange={this.handlePictureChange}
                type="file"
              />
              {this.renderPreviewError()}
              <button
                className="btn btn-info"
                onClick={this.handlePictureClick}
              >
                Add picture
              </button>
            </div>
            <div className="form-group">
              <label htmlFor="recipe">Recipe</label>
              <textarea
                className="form-control"
                name="recipe"
                onChange={this.handleInputChange}
                value={this.state.recipe}
              />
            </div>
            {this.renderCategoryIds()}
            <div className="form-group">
              <button onClick={this.addCategoryField} className="btn btn-info">
                Add Category
              </button>
            </div>
            <div className="form-group">
              <label htmlFor="visibility">Visibility</label>
              <select
                className="form-control"
                name="visibility"
                onChange={this.handleInputChange}
                value={this.state.visibility}
              >
                <option value="0">Public</option>
                <option value="1">Private</option>
              </select>
            </div>
            <div className="form-group">{this.renderIngredients()}</div>
            <button onClick={this.addIngredientField} className="btn btn-info">
              Add Ingredient
            </button>
          </form>
        </ModalBody>
        <ModalFooter>
          <div className="d-inline-block">
            {this.state.error.status &&
              this.state.error.message && (
                <div className="text-danger">
                  <small>{this.state.error.message}</small>
                </div>
              )}
            {!this.state.error.status &&
              this.state.error.message !== '' && (
                <div className="text-success">
                  <small>{this.state.error.message}</small>
                </div>
              )}
          </div>
          <Button color="primary" onClick={this.handleFormSubmit}>
            {(this.state.editingId > 0 && 'Edit Smoothie') || 'Add Smoothie'}
          </Button>{' '}
          <Button color="secondary" onClick={this.toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}

const mapStateToProps = state => ({
  categories: state.categories,
  auth: state.auth,
  ingredients: state.ingredients,
  units: state.units,
});

SmoothieForm.propTypes = {
  getCategories: PropTypes.func,
  getUnits: PropTypes.func,
  getUser: PropTypes.func,
  getIngredients: PropTypes.func,
  createSmoothie: PropTypes.func,
  editSmoothie: PropTypes.func,
  toggle: PropTypes.func,
  editData: PropTypes.shape({
    name: PropTypes.string,
    description: PropTypes.string,
    visibility: PropTypes.number,
    editingId: PropTypes.number,
    recipe: PropTypes.string,
    categoryIds: PropTypes.arrayOf(PropTypes.number),
    editPictures: PropTypes.string,
    quantities: PropTypes.arrayOf(
      PropTypes.shape({
        unitId: PropTypes.number,
        quantity: PropTypes.number,
        ingredientId: PropTypes.number,
      })
    ),
  }),
  ingredients: PropTypes.arrayOf(
    PropTypes.shape({
      unitId: PropTypes.number,
      quantity: PropTypes.number,
      ingredientId: PropTypes.number,
    })
  ),
  units: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
    })
  ),
  categories: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
    })
  ),
  className: PropTypes.string,
  modal: PropTypes.bool,
  auth: PropTypes.shape({
    user: PropTypes.shape({
      id: PropTypes.number,
    }),
  }),
};

SmoothieForm.defaultProps = {
  getCategories: () => {},
  getUnits: () => {},
  getUser: () => {},
  getIngredients: () => {},
  createSmoothie: () => {},
  editSmoothie: () => {},
  toggle: () => {},
  editData: {},
  ingredients: [],
  units: [],
  className: '',
  modal: false,
  categories: [],
  auth: {},
};

export default withRouter(
  connect(mapStateToProps, {
    getCategories,
    getUnits,
    getIngredients,
    createSmoothie,
    editSmoothie,
    getUser,
  })(SmoothieForm)
);
