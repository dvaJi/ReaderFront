import React from 'react';
import { Redirect } from 'react-router-dom';

import { useGlobalState } from 'state';

// Component
const AuthCheck = () => {
  const [user] = useGlobalState('user');
  return user ? (
    user.role === 'ADMIN' ? (
      <Redirect to={'/admincp/dashboard'} />
    ) : (
      <Redirect to={'/'} />
    )
  ) : (
    ''
  );
};

export default AuthCheck;
