import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { getSmoothies } from '../actions/smoothie';

import * as layout from '../styles/layout';
import CategoryLinks from '../components/CategoryLinks';
import SmoothieList from '../containers/smoothies/SmoothieList';

class Home extends Component {
  componentDidMount() {
    this.props.getSmoothies();
  }

  render() {
    return (
      <div className="row">
        <layout.SidebarLeft>
          <CategoryLinks />
        </layout.SidebarLeft>
        <layout.SidebarContent>
          <SmoothieList smoothies={this.props.smoothies} />
        </layout.SidebarContent>
      </div>
    );
  }
}

Home.propTypes = {
  getSmoothies: PropTypes.func,
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

Home.defaultProps = {
  getSmoothies: () => {},
  smoothies: [],
};

const mapStateToProps = state => ({
  smoothies: state.smoothies.all,
});

export default connect(mapStateToProps, { getSmoothies })(Home);
