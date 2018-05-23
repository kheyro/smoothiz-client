import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { FormValidator, FVDisplayError } from '../../../helpers/formValidator';
import { getCategories } from '../../actions/category';
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
      categoryIds: [0],
      form: {},
      modal: false,
      editingId: 0,
      error: { status: false, message: '' },
    };
  }
  componentDidMount() {
    this.props.getCategories();
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
      });
    }
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
});

export default withRouter(
  connect(mapStateToProps, {
    getCategories,
    createSmoothie,
    editSmoothie,
    getUser,
  })(SmoothieForm)
);
