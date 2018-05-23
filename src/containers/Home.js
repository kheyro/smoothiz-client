import React, { Component } from 'react';
import { connect } from 'react-redux';

import { getSmoothies } from '../actions/smoothie';

import CategoryLinks from '../components/CategoryLinks';
import SmoothieList from '../containers/smoothies/SmoothieList';

class Home extends Component {
  componentDidMount() {
    this.props.getSmoothies();
  }
  render() {
    return (
      <div>
        <div className="row">
          <div className="col-3">
            <CategoryLinks />
          </div>
          <div className="col-9">
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

export default connect(mapStateToProps, { getSmoothies })(Home);
