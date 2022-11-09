import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Col } from 'react-bootstrap';
import Carousel from 'react-bootstrap/Carousel';
import LoggedOutHeader from '../components/LoggedOutHeader';

import Auth from '../utils/auth';

// const Header = () => {
//   const logout = (event) => {
//     event.preventDefault();
//     Auth.logout();
//   };

//   return (
//     <>
//       <LoggedOutHeader />
//       <div>
//         <>
//           <section className="about">
//             <div className="flex justify-center"></div>
//             <div className="row justify-content-center" id="about-container">
//               <Col lg={6} md={12}>
//                 <p>
//                   Welcom to InVent, an application designed to help you manage
//                   all of your minor and major events. Please log in to see the
//                   events you are currently managing. Don't have an account yet?
//                   No worries! Sign up to start planning!
//                 </p>
//                 <p>Happy planning!</p>
//               </Col>
//             </div>
//           </section>
//         </>
//       </div>
//     </>
//   );
// };

// export default Header;

function Header() {
  return (
    <>
      <LoggedOutHeader />
      <Carousel variant="dark">
        <Carousel.Item interval={1000}>
          <img
            className="d-block w-100"
            src="https://images.unsplash.com/photo-1508717272800-9fff97da7e8f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2671&q=80"
            alt="Welcome slide"
          />
          <Carousel.Caption>
            <h1>Welcome to InVent!</h1>
            <p>
              An application designed to help you manage all of your minor and
              major events. Please log in to see the events you are currently
              managing. Don't have an account yet? No worries! Sign up to start
              planning!
            </p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://images.unsplash.com/photo-1601820160212-b215773fe118?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1383&q=80"
            alt="Create and Account"
          />
          <Carousel.Caption>
            <h1>How to create an account</h1>
            <p>
              Creating an account is easy. We just need your username, email
              address, company name or sign up code provided by your
              administrator, and a password.
            </p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://images.unsplash.com/photo-1561912774-79769a0a0a7a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80"
            alt="Use InVent"
          />
          <Carousel.Caption>
            <h1>How to use InVent</h1>
            <p>
              Once logged in, you will be presented with the option to view your
              current events, create new events, spaces and departments. As the
              administrator, you can assign tasks to different departments. As a
              department you can see what is needed for the events you are
              involved with.
            </p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </>
  );
}

export default Header;
