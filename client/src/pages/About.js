import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Col } from 'react-bootstrap';
import Carousel from 'react-bootstrap/Carousel';
import LoggedOutHeader from '../components/LoggedOutHeader';

import Auth from '../utils/auth';

const About = () => {
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
            <div className="flex justify-center"></div>
            <div className="row justify-content-center" id="about-container">
              <Col lg={6} md={12}>
                <p>Instructions place holder</p>
                <p>Happy planning!</p>
              </Col>
            </div>
          </section>
        </>
      </div>
    </>
  );
};

export default About;
