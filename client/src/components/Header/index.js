import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import Auth from '../../utils/auth';

const Header = () => {
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };

  return (
    <header className="mb-4 py-2 flex-row align-center">
      <div className="container header flex-row justify-space-between-lg justify-center align-left">
        <Link to="/">
          <h1>InVent</h1>
        </Link>

        <nav className="text-center">
          {/* {Auth.loggedIn() ? ( */}
          <>
            <Link to="/events">Events</Link>
            <Link to="/spaces">Spaces</Link>
            <Link to="/departments">Departments</Link>
            <a href="/" onClick={logout}>
              Logout
            </a>
          </>
          ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/signup">Signup</Link>
          </>
          {/* )} */}
        </nav>
      </div>
    </header>
  );
};

export default Header;
