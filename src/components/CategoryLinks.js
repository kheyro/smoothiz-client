import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { getCategories } from '../actions/category';

class CategoryLinks extends Component {
  componentDidMount() {
    this.props.getCategories();
  }
  render() {
    const categoryLink = this.props.categories.map(category => (
      <li key={category.id}>
        <Link to={{ pathname: `/categories/${category.id}` }}>
          {category.name}
        </Link>
      </li>
    ));
    return <ul>{categoryLink}</ul>;
  }
}

const mapStateToProps = state => ({
  categories: state.categories,
});

export default connect(mapStateToProps, { getCategories })(CategoryLinks);
