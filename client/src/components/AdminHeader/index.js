import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';

import Auth from '../../utils/auth';

const Header = () => {
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };

  return (
    <header className="mb-4 py-2 flex-row header align-center">
      <div className="header">
        <Link to="/">
          <h1><span id='in'>in</span>Vent</h1>
        </Link>
      </div>
      <div className="container flex-row justify-space-between-lg justify-flex-end align-left">
        <nav>
          {Auth.loggedIn() ? (
            <>
              <Link className="navigation" to="/">
                Events
              </Link>{' '}
              ||{' '}
              <Link className="navigation" to="/spaces">
                Spaces
              </Link>{' '}
              ||{' '}
              <Link className="navigation" to="/departments">
                Departments
              </Link>{' '}
              ||{' '}
              <a className="navigation" href="/" onClick={logout}>
                Logout
              </a>
            </>
          ) : (
            <>
              <Link className="navigation" to="/login">
                Login
              </Link>{' '}
              ||{' '}
              <Link className="navigation" to="/signup">
                Signup
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
