import React from 'react';

const UserInfo = ({ user }) => (
  <div>
    <p>
      {user.firstname} {user.lastname}
    </p>
  </div>
);

export default UserInfo;
