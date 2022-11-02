import React from 'react';
import { Col } from 'react-bootstrap';

const Home = () => {
  return (
    <section className="about">
      <div className="row justify-content-center" id="about-container">
        <Col lg={6} md={12}>
          <p>
            Welcom to InVent, an application designed to help you manage all of
            your minor and major events. Please log in to see the events you are
            currently managing. Don't have an account yet? No worries! Sign up
            to start planning!
          </p>
          <p>Happy planning!</p>
        </Col>
      </div>
    </section>
  );
};

export default Home;
