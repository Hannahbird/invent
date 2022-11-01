import { useQuery } from '@apollo/client';
import Auth from '../utils/auth';

const SingleEvent = props => {
    //NOT READY OR DONE

    return (
        <div>
            <div className="card mb-3 col-6">
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
                    <select className="form-select" aria-label="Default select example">
                        <option selected>Completion Level</option>
                        <option value="1">Not Started</option>
                        <option value="2">In Progress</option>
                        <option value="3">Completed</option>
                    </select>
                </div>
            </div>
        </div>
        )
}

export default SingleEvent;