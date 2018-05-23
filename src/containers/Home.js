import React, { Component } from 'react';
import CategoryLinks from '../components/CategoryLinks';

class Home extends Component {
  render() {
    return (
      <div>
        <div className="row">
          <div className="col-3">
            <CategoryLinks />
          </div>
          <div className="col-9">
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
