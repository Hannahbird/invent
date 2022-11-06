import React from 'react';

import AdminHeader from '../components/AdminHeader';
import Auth from '../utils/auth';

const NoMatch = () => {
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };
  return (
    <>
      <AdminHeader />
      <div>
        <p>Oops, we couldn't find that page.</p>
      </div>
    </>
  );
};

export default NoMatch;
