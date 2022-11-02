import React from 'react';
import DepartmentList from '../DepartmentList';
import DateTime from '../../utils/dateTime/dateTime';
import { Link } from 'react-router-dom';

const EventList = () => {
    const events = [{ name: "that event", _id: 1, timeOf: "10:00 PM", dept: "IT", completion: "Completed" }];

    if (!events.length) {
        return <h3>No Events Scheduled</h3>;
    }

    return (
        <div>
            <h3>Events</h3>
            {
                events &&
                events.map(event => (
                    <div key={event._id} className="card mb-3 col-6">
                        <div className="card-header">
                            <p>{event.name}</p>
                        </div>
                        <div className="card-body row">
                            {event.timeOf}
                            <DateTime className="form-control" />
                            {event.dept}
                            <select className="form-select" aria-label="Default select example">
                                <option selected>Completion Level</option>
                                <option value="1">Not Started</option>
                                <option value="2">In Progress</option>
                                <option value="3">Completed</option>
                            </select>
                            {event.completion}
                        </div>
                    </div>
                ))}
        </div>
    );
};

export default EventList;