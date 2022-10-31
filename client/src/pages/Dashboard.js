import React from 'react';

import { Navigate, useParams } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';

import EventList from '../components/EventList';
import Auth from '../utils/auth';


const Dashboard = () => {


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
                        <select className="form-select" aria-label="Default select example">
                            <option selected>Select Manager</option>
                            <option value="1">Jimmy</option>
                            <option value="2">John</option>
                            <option value="3">Jamal</option>
                        </select>
                        <div class="dropdown">
                            <button class="btn btn-secondary dropdown-toggle" type="button"
                                id="sampleDropdownMenu" data-bs-toggle="dropdown">
                                Select Department(s)
                            </button>
                            <div class="dropdown-menu">
                                <button class="dropdown-item" type="button">
                                    <input type="checkbox" />IT
                                </button>
                                <button class="dropdown-item" type="button">
                                    <input type="checkbox" />Finance
                                </button>
                                <button class="dropdown-item" type="button">
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
                        <select className="form-select" aria-label="Default select example">
                            <option selected>Select Manager</option>
                            <option value="1">Jimmy</option>
                            <option value="2">John</option>
                            <option value="3">Jamal</option>
                        </select>
                        <div class="dropdown">
                            <button class="btn btn-secondary dropdown-toggle" type="button"
                                id="sampleDropdownMenu" data-bs-toggle="dropdown">
                                Select Department(s)
                            </button>
                            <div class="dropdown-menu">
                                <button class="dropdown-item" type="button">
                                    <input type="checkbox" />IT
                                </button>
                                <button class="dropdown-item" type="button">
                                    <input type="checkbox" />Finance
                                </button>
                                <button class="dropdown-item" type="button">
                                    <input type="checkbox" />Department3
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard;