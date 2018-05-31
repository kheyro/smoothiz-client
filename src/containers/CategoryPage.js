import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { getSmoothies } from '../actions/smoothie';

import SmoothieList from './smoothies/SmoothieList';

class CategoryPage extends Component {
  componentDidMount() {
    this.props.getSmoothies({
      type: 'category',
      id: this.props.match.params.id,
    });
  }

  render() {
    return (
      <div className="row">
        <div className="col">
          <h1>{this.props.currentCategory.name} Smoothies</h1>
          <SmoothieList smoothies={this.props.smoothies} />
        </div>
      </div>
    );
  }
}

CategoryPage.propTypes = {
  getSmoothies: PropTypes.func,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }),
  smoothies: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
      pictures: PropTypes.string,
      description: PropTypes.string,
      recipe: PropTypes.string,
      user_id: PropTypes.number,
      views: PropTypes.number,
      visibility: PropTypes.number,
    })
  ),
  currentCategory: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
  }),
};

CategoryPage.defaultProps = {
  getSmoothies: () => {},
  match: {},
  smoothies: [],
  currentCategory: {
    id: 0,
    name: '',
  },
};

const mapStateToProps = (state, ownProps) => {
  const category = state.categories.find(
    cat => cat.id === +ownProps.match.params.id
  );
  return {
    smoothies: state.smoothies.all,
    currentCategory: category,
  };
};

export default connect(mapStateToProps, { getSmoothies })(CategoryPage);
