import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const UserLinks = ({ userId }) => (
  <div>
    <ul>
      <li>
        <Link to={{ pathname: `/users/${userId}` }}>My Smoothies</Link>
      </li>
      <li>
        <Link to={{ pathname: `/users/${userId}/smoothies/liked` }}>
          Liked smoothies
        </Link>
      </li>
    </ul>
  </div>
);

UserLinks.propTypes = {
  userId: PropTypes.number,
};

UserLinks.defaultProps = {
  userId: '',
};

export default UserLinks;
