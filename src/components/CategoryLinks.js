import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import { BoxLinkLi, BoxLinkUl } from '../styles/ui';
import { getCategories } from '../actions/category';

class CategoryLinks extends Component {
  componentDidMount() {
    this.props.getCategories();
  }

  render() {
    const categoryLink = this.props.categories.map(category => (
      <BoxLinkLi key={category.id}>
        <Link to={{ pathname: `/categories/${category.id}` }}>
          {category.name}
        </Link>
      </BoxLinkLi>
    ));
    return (
      <div>
        <BoxLinkUl>{categoryLink}</BoxLinkUl>
      </div>
    );
  }
}

CategoryLinks.propTypes = {
  getCategories: PropTypes.func,
  categories: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
    })
  ),
};

CategoryLinks.defaultProps = {
  getCategories: () => {},
  categories: {},
};

const mapStateToProps = state => ({
  categories: state.categories,
});

export default connect(mapStateToProps, { getCategories })(CategoryLinks);
