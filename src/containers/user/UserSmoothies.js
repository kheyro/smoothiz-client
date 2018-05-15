import React, { Component } from 'react';
import { connect } from 'react-redux';

import { FormValidator, FVDisplayError } from '../../../helpers/formValidator';
import { getCategories } from '../../actions/category';
import { createSmoothy } from '../../actions/smoothy';

class UserSmoothies extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      description: '',
      visibility: 0,
      recipe: '',
      categoryIds: [0],
      form: {},
    };
  }
  componentDidMount() {
    this.props.getCategories();
  }
  handleFormSubmit = e => {
    e.preventDefault();
    const form = validation.validate(this.state);
    this.setState({ form }, () => {
      if (this.state.form.isValid) {
        this.props.createSmoothy(this.state);
      }
    });
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
  addCategoryField = e => {
    e.preventDefault();
    this.setState({
      categoryIds: [...this.state.categoryIds, 0],
    });
  };
  removeCategoryField = (e, i) => {
    e.preventDefault();
    if (this.state.categoryIds.length > 1) {
      const { categoryIds } = this.state;
      categoryIds.splice(i, 1);
      this.setState({ categoryIds });
    }
  };
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
  render() {
    return (
      <div>
        <form onSubmit={this.handleFormSubmit}>
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
          <button type="submit" className="btn btn-info">
            Add Smoothy
          </button>
        </form>
      </div>
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

const mapStateToProps = state => ({ categories: state.categories });

export default connect(mapStateToProps, { getCategories, createSmoothy })(
  UserSmoothies
);
