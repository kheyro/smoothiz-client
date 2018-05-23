import React from 'react';
import { Link } from 'react-router-dom';

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

export default UserLinks;
