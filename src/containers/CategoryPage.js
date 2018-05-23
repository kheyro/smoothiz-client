import React, { Component } from 'react';
import { connect } from 'react-redux';

import { getSmoothies } from '../actions/smoothie';

import SmoothieList from './smoothies/SmoothieList';

class CategoryPage extends Component {
  componentDidMount() {
    this.props.getSmoothies({ type: 'category', id: this.props.match.params.id });
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

const mapStateToProps = state => ({
  smoothies: state.smoothies.all,
});

export default connect(mapStateToProps, { getSmoothies })(CategoryPage);
