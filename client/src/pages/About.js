import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Col } from 'react-bootstrap';
import Carousel from 'react-bootstrap/Carousel';
import LoggedOutHeader from '../components/LoggedOutHeader';
import screen1 from '../assets/images/screen1.png';
import screen2 from '../assets/images/screen2.png';
import screen3 from '../assets/images/screen3.png';
import screen4 from '../assets/images/screen4.png';
import screen5 from '../assets/images/screen5.png';
import screen6 from '../assets/images/screen6.png';
import screen7 from '../assets/images/screen7.png';
import screen8 from '../assets/images/screen8.png';
import screen9 from '../assets/images/screen9.png';

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
                <p>
                  When arriving to our site you will be met with the landing
                  page
                </p>
                <img
                  style={{ height: 400, width: 850 }}
                  src={screen1}
                  alt="screen1"
                />
                <p>
                  As a new company admin, you will want to create a new user
                  account. Otherwise you can create an account with a signup
                  code.
                </p>
                <img
                  style={{ height: 650, width: 850 }}
                  src={screen2}
                  alt="screen2"
                />
                <p>
                  verify that all boxes are filled out before clicking submit
                </p>
                <p>
                  when creating your departments, we kept things simple. just
                  enter the name and click submit and it will generate the codes
                  for your department users
                </p>
                <img
                  style={{ height: 300, width: 850 }}
                  src={screen3}
                  alt="screen3"
                />
                <p></p>
                <img
                  style={{ height: 750, width: 850 }}
                  src={screen4}
                  alt="screen4"
                />
                <p>
                  When creating your first event, fill out all the boxes and
                  click submit. We do the rest! once submitted your new event
                  will automatically be set into the planning state
                </p>
                <p>
                  When creating your first Space you'll want to make sure the
                  name and capacity are filled out. If you have one you can also
                  provide a picture of the event space
                </p>
                <img
                  style={{ height: 850, width: 850 }}
                  src={screen5}
                  alt="screen5"
                />
                <p>Here is an example of a completed event space:</p>
                <img
                  style={{ height: 550, width: 850 }}
                  src={screen6}
                  alt="screen6"
                />
                <p>
                  You can edit your event from your event dashboard. this is
                  where you can change the state of the event from planning to
                  in progress, complete, etc.
                </p>
                <img
                  style={{ height: 1150, width: 850 }}
                  src={screen7}
                  alt="screen7"
                />
                <p>
                  Once your event if created youll want to start assigning tasks
                  to your departments. with out task creator you can provide a
                  short description for your assigned department
                </p>
                <img
                  style={{ height: 550, width: 850 }}
                  src={screen8}
                  alt="screen8"
                />
                <p>example of an event task:</p>
                <img
                  style={{ height: 200, width: 850 }}
                  src={screen9}
                  alt="screen9"
                />
                <p>
                  <br></br>
                  <br></br>
                  <br></br>
                </p>

                <h2>Happy planning!</h2>
              </Col>
            </div>
          </section>
        </>
      </div>
    </>
  );
};

export default About;
