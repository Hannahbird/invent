import React from 'react';

//import { Navigate, useParams } from 'react-router-dom';
//import { useQuery, useMutation } from '@apollo/client';
import { TempusDominus } from '@eonasdan/tempus-dominus';

//import EventList from '../components/EventList';
//import Auth from '../utils/auth';


const Dashboard = () => {
    new TempusDominus(document.getElementById('datetimepicker1'));

    return (
        <div>
            <div>
                <h2>
                    Users Admin Dashboard
                </h2>
            </div>

            <div>
                <div className="card mb-3">
                    <div className="card-header">
                        <p>EVENT NAME</p>
                    </div>
                    <div className="card-body row">
                        <form>
                            <div className="input-group date" id="datetimepicker1" data-target-input="nearest">
                                <input type="text" className="form-control datetimepicker-input" data-target="#datetimepicker1" />
                                <div className="input-group-append" data-target="#datetimepicker1" data-toggle="datetimepicker">
                                    <div className="input-group-text"><i className="fa fa-calendar"></i></div>
                                </div>
                            </div>
                        </form>
                        <select className="form-select" aria-label="Default select example">
                            <option selected>Completion Level</option>
                            <option value="1">Not Started</option>
                            <option value="2">In Progress</option>
                            <option value="3">Completed</option>
                        </select>
                        <div className="dropdown">
                            <button className="btn btn-secondary dropdown-toggle" type="button"
                                id="sampleDropdownMenu" data-bs-toggle="dropdown">
                                Select Department(s)
                            </button>
                            <div className="dropdown-menu">
                                <button className="dropdown-item" type="button">
                                    <input type="checkbox" />IT
                                </button>
                                <button className="dropdown-item" type="button">
                                    <input type="checkbox" />Finance
                                </button>
                                <button className="dropdown-item" type="button">
                                    <input type="checkbox" />Department3
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="card mb-3">
                    <div className="card-header">
                        <p>EVENT NAME</p>
                    </div>
                    <div className="card-body row">
                        <form>
                            <div className="input-group date">
                                <input type="date" className="form-control" />
                            </div>
                        </form>
                        <select className="form-select" aria-label="Default select example">
                            <option selected>Completion Level</option>
                            <option value="1">Not Started</option>
                            <option value="2">In Progress</option>
                            <option value="3">Completed</option>
                        </select>
                        <div className="dropdown">
                            <button className="btn btn-secondary dropdown-toggle" type="button"
                                id="sampleDropdownMenu" data-bs-toggle="dropdown">
                                Select Department(s)
                            </button>
                            <div className="dropdown-menu">
                                <button className="dropdown-item" type="button">
                                    <input type="checkbox" />IT
                                </button>
                                <button className="dropdown-item" type="button">
                                    <input type="checkbox" />Finance
                                </button>
                                <button className="dropdown-item" type="button">
                                    <input type="checkbox" />Department3
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;