import React from 'react';
import { QUERY_DEPT_EVENTS } from '../../utils/queries';
import { useQuery, useMutation } from '@apollo/client';

const DepartmentEventList = () => {
  const { loading, data } = useQuery(QUERY_DEPT_EVENTS);

  const events = data?.deptEvents || {};

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!events.length) {
    return (
      <>
        <h3>No Events Scheduled</h3>
      </>
    );
  }

  return (
    <div>
      <h3>Your Current Events</h3>
      {events &&
        events.map((event) => (
          <div key={event._id} className="card mb-3 col-6">
            <div className="card-header">
              <p>{event.eventName}</p>
            </div>
            <div className="card-body row">
              {event.eventDate}
              <br />
              {event.location.locationName}
              <br />
              {event.contactName}
              {event.contactInfo}
              {event.eventState}
            </div>
          </div>
        ))}
    </div>
  );
};

export default DepartmentEventList;
