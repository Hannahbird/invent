import React from 'react';
import Login from './Login';
import EventList from '../components/EventList';

import Auth from '../utils/auth';
import { useQuery } from '@apollo/client';
import { QUERY_EVENTS } from '../utils/queries';

const Home = () => {
  const { loading, data } = useQuery(QUERY_EVENTS);
  //   const { data: userData } = useQuery(QUERY_ME_BASIC);
  const events = data?.thoughts || [];

  const loggedIn = Auth.loggedIn();

  return (
    <maim>
      <div className="flex-row">
        {loggedIn && (
          <div className="col-12 mb-3">
            <Login />
          </div>
        )}
      </div>
      <div className={`col-12 mb-3 ${loggedIn && 'col-lg-8'}`}>
        {loading ? (
          <div>Loading...</div>
        ) : (
          <EventList events={events} title="Your current events:" />
        )}
      </div>
    </maim>
  );
};

export default Home;
