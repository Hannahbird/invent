import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Col } from "react-bootstrap";
import Carousel from "react-bootstrap/Carousel";
import LoggedOutHeader from "../components/LoggedOutHeader";
import screen1 from "../assets/images/screen1.png";
import screen2 from "../assets/images/screen2.png";
import screen3 from "../assets/images/screen3.png";
import screen4 from "../assets/images/screen4.png";
import screen5 from "../assets/images/screen5.png";
import screen6 from "../assets/images/screen6.png";
import screen7 from "../assets/images/screen7.png";
import screen8 from "../assets/images/screen8.png";
import screen9 from "../assets/images/screen9.png";

import Auth from "../utils/auth";
import AdminHeader from "../components/AdminHeader";
const About = () => {
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };

  return (
    <>
      {Auth.loggedIn() ? <AdminHeader /> : <LoggedOutHeader />}
      <div>
        <>
          <section className="about">
            <div className="container" id="about-container">
              <section className="d-block">
                <h2 className="text-center">Getting Started</h2>
                <p>
                  When arriving to our site you will be met with the landing
                  page
                </p>
                <img src={screen1} alt="screen1" />
                <p>
                  As a new company admin, you will want to create a new user
                  account and provide a company name. Otherwise you can create
                  an account with the signup code your admin provides you.
                </p>
                <img src={screen2} alt="screen2" />
                <p>
                  Verify that all boxes are filled out before clicking submit
                </p>
                <p>
                  When creating your departments, we kept things simple. Just
                  enter the name and click submit and it will generate the codes
                  for your department users to sign up. Once they sign up with
                  the code, their dashboard will populate with the events and
                  tasks that they are assigned to.
                </p>
                <img src={screen3} alt="screen3" />
                <p></p>
                <p>
                  When creating your first Space you'll want to make sure the
                  name and capacity are filled out. If you have one you can also
                  provide a picture of the event space
                </p>
                <img src={screen5} alt="screen5" />
                <p>Here is an example of a completed event space:</p>
                <img src={screen6} alt="screen6" />
                <img src={screen4} alt="screen4" />
                <p>
                  When creating your first event, fill out all the boxes and
                  click submit. You will need to have created at least one Space
                  and at least one department. We do the rest! Once submitted
                  your new event will automatically be set into the planning
                  state
                </p>

                <p>
                  You can edit your event from your event dashboard. This is
                  where you can change the state of the event from planning to
                  in progress, complete, etc.
                </p>
                <img src={screen7} alt="screen7" />
                <p>
                  Once your event is created, you will want to start assigning
                  tasks to your departments. Within the task creator you can
                  provide a short description of duties for your assigned
                  department. Department users will be updated in real time!
                </p>
                <img src={screen8} alt="screen8" />
                <p>Example of an Event Task:</p>
                <img src={screen9} alt="screen9" />
                <p>
                  <br></br>
                  <br></br>
                  <br></br>
                </p>

                <h2 className="text-center">Happy planning!</h2>
              </section>
            </div>
          </section>
        </>
      </div>
    </>
  );
};

export default About;
