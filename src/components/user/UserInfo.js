import React from 'react';
import globals from '../../../config/globals';

const UserInfo = ({ user }) => {
  const profilePicture = user.picture
    ? `${globals.API_SERVER}/profile/r/${user.picture}`
    : `${globals.API_SERVER}/images/placeholder-profile-200x200.jpg`;
  return (
    <div>
      <div>
        <img src={profilePicture} alt={user.firstname} />
      </div>
      <p>
        {user.firstname} {user.lastname}
      </p>
    </div>
  );
};

export default UserInfo;
