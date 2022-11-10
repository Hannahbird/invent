import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';
import LandingPage from '../../pages/LandingPage';
import i from '../../assets/images/i.png';

import Auth from '../../utils/auth';

const Header = () => {
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };

  return (
    <header className="mb-4 py-2 flex-row header align-center">
      <div className="header flex-row justify-space-between-lg justify-flex-end align-left">
        <Link to="/">
          <h1>
            <span id="in">in</span>Vent
          </h1>
        </Link>
      </div>
      <div className="header container flex-row justify-space-between-lg justify-flex-end align-left">
        <nav>
          <>
            <Link className="navigation" to="/login">
              Login
            </Link>{' '}
            ||{' '}
            <Link className="navigation" to="/signup">
              Signup
            </Link>{' '}
            ||{' '}
            <Link className="navigation" to="/about">
              {/* <img style={{ height: 50, width: 50 }} src={i} alt="Info" /> */}
              About
            </Link>
          </>
        </nav>
      </div>
    </header>
  );
};

export default Header;
