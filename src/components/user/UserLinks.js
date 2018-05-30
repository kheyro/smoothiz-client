import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import { BoxLinkLi, BoxLinkUl } from '../../styles/ui';

const UserLinks = ({ userId }) => (
  <div className="mb-4">
    <BoxLinkUl>
      <BoxLinkLi>
        <Link to={{ pathname: `/users/${userId}` }}>My Smoothies</Link>
      </BoxLinkLi>
      <BoxLinkLi>
        <Link to={{ pathname: `/users/${userId}/smoothies/liked` }}>
          <span role="presentation">❤</span>️ Smoothies
        </Link>
      </BoxLinkLi>
    </BoxLinkUl>
  </div>
);

UserLinks.propTypes = {
  userId: PropTypes.number,
};

UserLinks.defaultProps = {
  userId: '',
};

export default UserLinks;
