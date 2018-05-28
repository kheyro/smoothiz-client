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
      <div>
        <div className="row">
          <div className="col">
            <SmoothieList smoothies={this.props.smoothies} />
          </div>
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
};

CategoryPage.defaultProps = {
  getSmoothies: () => {},
  match: {},
  smoothies: [],
};

const mapStateToProps = state => ({
  smoothies: state.smoothies.all,
});

export default connect(mapStateToProps, { getSmoothies })(CategoryPage);
