import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Col } from 'react-bootstrap';
import LoggedOutHeader from '../components/LoggedOutHeader';
import Carousel from '../components/Carousel';

import Auth from '../utils/auth';

const Header = () => {
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };

  return (
    <>
      <LoggedOutHeader />
      <div>
        <>
          <section className="about">
            <div className="flex justify-center">
              <Carousel />
            </div>
            <div className="row justify-content-center" id="about-container">
              <Col lg={6} md={12}>
                <p>
                  Welcom to InVent, an application designed to help you manage
                  all of your minor and major events. Please log in to see the
                  events you are currently managing. Don't have an account yet?
                  No worries! Sign up to start planning!
                </p>
                <p>Happy planning!</p>
              </Col>
            </div>
          </section>
        </>
      </div>
    </>
  );
};

export default Header;
