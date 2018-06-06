import React from 'react';
import PropTypes from 'prop-types';

import globals from '../../../config/globals';
import { BoxWrapper } from '../../styles/ui';

const UserInfo = ({ user }) => {
  const profilePicture = user.picture
    ? `${globals.AWS_BUCKET}/profile/${user.picture}`
    : `${globals.API_SERVER}/images/placeholder-profile-200x200.jpg`;
  return (
    <BoxWrapper className="text-center">
      <div>
        <img
          className="rounded-circle w-75 mb-4"
          src={profilePicture}
          alt={user.firstname}
        />
      </div>
      <p>
        {user.firstname} {user.lastname}
      </p>
    </BoxWrapper>
  );
};

UserInfo.propTypes = {
  user: PropTypes.shape({
    picture: PropTypes.string,
    firstname: PropTypes.string,
    lastname: PropTypes.string,
  }),
};

UserInfo.defaultProps = {
  user: {},
};

export default UserInfo;
