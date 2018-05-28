import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { FormValidator, FVDisplayError } from '../../../helpers/formValidator';
import globals from '../../../config/globals';
import { getCategories } from '../../actions/category';
import { getIngredients } from '../../actions/ingredient';
import { getUnits } from '../../actions/unit';
import { createSmoothie, editSmoothie } from '../../actions/smoothie';
import { getUser } from '../../actions/user';

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
  handleIngredientChange = (e, i, name) => {
    const ingredients = [...this.state.ingredients];
    ingredients[i][name] = e.target.value;
    this.setState({ ingredients });
  };
  renderIngredients() {
    return this.state.ingredients.map((ingredient, i) => (
      <div className="form-row">
        <div className="form-group col-4">
          <label htmlFor={`ingredient_ids_${i}`}>Ingredients</label>
          <select
            name={`ingredient_ids_${i}`}
            className="form-control"
            onChange={e => this.handleIngredientChange(e, i, 'ingredientId')}
            value={ingredient.ingredientId}
          >
            {this.props.ingredients.map(ingredient => (
              <option key={ingredient.id} value={ingredient.id}>
                {ingredient.name}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group col-2">
          <label htmlFor={`quantity_${i}`}>Qty</label>
          <input
            className="form-control"
            type="text"
            value={ingredient.quantity}
            name={`quantity_${i}`}
            onChange={e => this.handleIngredientChange(e, i, 'quantity')}
          />
        </div>
        <div className="form-group col-2">
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
        {this.state.ingredients.length > 1 && (
          <button
            className="btn btn-danger"
            onClick={e => this.removeIngredientField(e, i)}
          >
            -
          </button>
        )}
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
  renderCategoryIds() {
    return this.state.categoryIds.map((category, i) => (
      <div className="form-group">
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
        {this.state.categoryIds.length > 1 && (
          <button
            className="btn btn-danger"
            onClick={e => this.removeCategoryField(e, i)}
          >
            -
          </button>
        )}
        <FVDisplayError field={this.state.form.categoryIds} index={i} />
      </div>
    ));
  }
  removeCategoryField = (e, i) => {
    e.preventDefault();
    if (this.state.categoryIds.length > 1) {
      const { categoryIds } = this.state;
      categoryIds.splice(i, 1);
      this.setState({ categoryIds });
    }
  };
  removeIngredientField = (e, i) => {
    e.preventDefault();
    if (this.state.ingredients.length > 1) {
      const { ingredients } = this.state;
      ingredients.splice(i, 1);
      this.setState({ ingredients });
    }
  };
  handleInputChange = e => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  handleCatChange = (e, i) => {
    const categoryIds = [...this.state.categoryIds];
    categoryIds[i] = e.target.value;
    this.setState({ categoryIds });
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
  setError(status, message) {
    return this.setState({
      error: { status, message },
    });
  }
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
  renderPreviewError = () => {
    return (
      <div className="text-danger">
        {this.state.previewError && (
          <small>
            <em>{this.state.previewError}</em>
          </small>
        )}
      </div>
    );
  };
  renderPreviewPicture = () => {
    let picture;
    if (this.state.pictures instanceof File && this.state.preview) {
      picture = this.state.preview;
    } else if (this.state.editPictures && this.state.editingId > 0) {
      picture = `${globals.API_SERVER}/smoothie/r/${this.state.editPictures}`;
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
              <div className="preview w-100">
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
            <button onClick={this.addCategoryField} className="btn btn-info">
              Add Category
            </button>
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
            <div className="form-group">
              {this.renderIngredients()}
            </div>
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
            {!this.state.error.status && this.state.error.message !== '' && <div className="text-success"><small>{this.state.error.message}</small></div>}
          </div>
          <Button color="primary" onClick={this.handleFormSubmit}>
            {(this.state.editingId > 0 && 'Edit Smoothie') ||
            'Add Smoothie'}
          </Button>{' '}
          <Button color="secondary" onClick={this.toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}

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

const mapStateToProps = state => ({
  categories: state.categories,
  auth: state.auth,
  ingredients: state.ingredients,
  units: state.units,
});

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
