import React from 'react';
import DepartmentList from '../DepartmentList';
import { Link } from 'react-router-dom';

const EventList = () => {
  const events = [
    {
      name: 'that event',
      _id: 1,
      timeOf: '10:00 PM',
      dateOf: '11.10.2022',
      dept: 'IT',
      completion: 'Completed',
    },
    {
      name: 'that event',
      _id: 2,
      timeOf: '10:00 PM',
      dateOf: '11.10.2022',
      dept: 'IT',
      completion: 'Completed',
    },
  ];

  if (!events.length) {
    return <h3>No Events Scheduled</h3>;
  }

  return (
    <div>
      <h3>Your Current Events</h3>
      {events &&
        events.map((event) => (
          <div key={event._id} className="card mb-3 col-6">
            <div className="card-header">
              <p>{event.name}</p>
            </div>
            <div className="card-body row">
              Time of Event: {event.timeOf}
              <br />
              Departments Involved: {event.dept}
              <br />
              Completion Status: {event.completion}
            </div>
          </div>
        ))}
    </div>
  );
};

export default EventList;
