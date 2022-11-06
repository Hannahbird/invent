import React from 'react';
import { Col } from 'react-bootstrap';
import Auth from '../utils/auth';
import AdminDashboard from './AdminDashboard';
import DepDashboard from './DepDashboard';
import LandingPage from './LandingPage';
import { useQuery, useMutation } from '@apollo/client';
import {
  QUERY_COMPANY_DEPTS,
  QUERY_EVENTS,
  QUERY_LOCATIONS,
} from '../utils/queries';
import { useParams } from 'react-router-dom';

const Home = () => {
  const { department: admin } = useParams();

  const { loading, data } = useQuery(QUERY_COMPANY_DEPTS, {
    variables: {
      deptName: admin,
    },
  });

  const isAdmin = () => {
    if (admin === 'admin') {
      return true;
    } else {
      return false;
    }
  };
  console.log(isAdmin());
  return (
    <div>
      {Auth.loggedIn() ? (
        <>
          {/* <>{isAdmin() ? <AdminDashboard /> : <DepDashboard />}</> */}
          <AdminDashboard />
          {/* <DepDashboard /> */}
        </>
      ) : (
        <LandingPage />
        // <section className="about">
        //   <div className="row justify-content-center" id="about-container">
        //     <Col lg={6} md={12}>
        //       <p>
        //         Welcom to InVent, an application designed to help you manage all
        //         of your minor and major events. Please log in to see the events
        //         you are currently managing. Don't have an account yet? No
        //         worries! Sign up to start planning!
        //       </p>
        //       <p>Happy planning!</p>
        //     </Col>
        //   </div>
        // </section>
      )}
    </div>
  );
};

export default Home;
