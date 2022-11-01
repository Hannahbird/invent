import React from 'react';
import DepartmentList from '../DepartmentList/index';
import { Link } from 'react-router-dom';

const EventList = ({ events, title }) => {
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
                            <DateTime className="form-control" />
                            <div className="dropdown">
                                <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown">
                                    Select Department(s)
                                </button>
                                <div className="dropdown-menu">
                                    <DepartmentList departments={ } />
                                </div>
                                <select className="form-select" aria-label="Default select example">
                                    <option selected>Completion Level</option>
                                    <option value="1">Not Started</option>
                                    <option value="2">In Progress</option>
                                    <option value="3">Completed</option>
                                </select>
                            </div>
                        </div>
                    </div>
                ))}
        </div>
    );
};

export default EventList;