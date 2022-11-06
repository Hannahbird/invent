import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';
import LandingPage from '../../pages/LandingPage';

import Auth from '../../utils/auth';

const Navigation = () => {
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };

  return (
    <header className="mb-4 py-2 flex-row header align-center">
      <div className="header flex-row justify-space-between-lg justify-flex-end align-left">
        <Link to="/">
          <h1>InVent</h1>
        </Link>
      </div>
      <div className="header container flex-row justify-space-between-lg justify-flex-end align-left">
        <nav>
          {Auth.loggedIn() ? (
            <a className="navigation" href="/" onClick={logout}>
              Logout
            </a>
          ) : (
            <LandingPage />
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navigation;
