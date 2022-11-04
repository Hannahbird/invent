import React, { useState } from 'react';
import DepartmentList from '../DepartmentList';
import { Link } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import { UPDATE_EVENT } from '../../utils/mutations';
import { QUERY_EVENTS } from '../../utils/queries';

//EventList should have name, timeOf, dateOf, location
//On each hover edit button
//onMouseover opacity (like react portfolio)
//edit bring up modal that contains editable name, timeOf, dateOf, location, description(readonly)
//

//Modal styling from react-bootstrap
import { Card, Modal, Button, Form } from 'react-bootstrap';

const EventList = () => {
    const { loading, data } = useQuery(QUERY_EVENTS);

    const events = [{
        eventName: "Maxs Bday",
        location: {
            _id: "12345",
            locationName: "Chapel Hill"
        },
        eventDate: "11/3/2022 10:00 PM",
        contactName: "Max Kottong",
        contactInfo: "Max.kottong@gmail.com",
        eventState: "Not Started"
    }]

    const [opaque, setOpaque] = useState(false);

    const handleMouseOver = (state) => {
        setOpaque(state);
    }

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!events.length) {
        return (
            <>
                <h3>No Events Scheduled</h3>
                <Create />
            </>
        );
    }

    //Create Event Modal
    function AddEventsModal(props) {
        return (
            <Modal
                {...props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Create Events
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h4>Create Events</h4>
                    <p>
                        Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
                        dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta
                        ac consectetur ac, vestibulum at eros.
                    </p>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={props.onHide}>Save</Button>
                </Modal.Footer>
            </Modal>
        );
    }

    function Create() {
        const [modalShow, setModalShow] = React.useState(false);

        return (
            <>
                <Button variant="primary" onClick={() => setModalShow(true)}>
                    Create Events
                </Button>

                <AddEventsModal show={modalShow} onHide={() => setModalShow(false)} />
            </>
        );
    }

    return (
        <div>
            <Create />
            <h3>Your Current Events</h3>
            {events &&
                events.map((event, index) => (
                    <div key={event._id} className={`card mb-3 col-6 ${opaque ? 'opacity-100' : 'opacity-50'}`} id={index} onMouseEnter={() => handleMouseOver(true)} onMouseLeave={() => handleMouseOver(false)}>
                        <Link to={`/event/${event._id}`}>
                            <div className="card-header">
                                <p>{event.eventName}</p>
                            </div>
                            <div className="card-body row">
                                {event.eventDate}
                                <br />
                                {event.dept}
                                <br />
                                {event.completion}
                            </div>
                        </Link>
                    </div>
                ))}
        </div>
    );
};

export default EventList;
