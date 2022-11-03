import React, { useState } from 'react';
import DepartmentList from '../DepartmentList';
import { Link } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import { UPDATE_EVENT } from '../../utils/mutations';
import { QUERY_EVENTS } from '../../utils/queries';
import DateTime from '../../utils/dateTime/dateTime';

    //EventList should have name, timeOf, dateOf, location
    //On each hover edit button
    //onMouseover opacity (like react portfolio)
    //edit bring up modal that contains editable name, timeOf, dateOf, location, description(readonly)
    //

//Modal styling from react-bootstrap
import { Card, Modal, Button, Form } from 'react-bootstrap';

const EventList = () => {
    const { loading, data } = useQuery(QUERY_EVENTS);

    /*const [updateEvent, { error }] = useMutation(UPDATE_EVENT);*/
    /*const events = data?.events || {};*/

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

    const [show, setShow] = useState(false)
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [opaque, setOpaque] = useState(false);

    const handleMouseOver = (state) => {
        setOpaque(state);
    }

    const [editEvent, setEditEvent] = useState({
        eventName: '',
        location: '',
        eventDate: '',
        contactName: '',
        contactInfo: '',
        eventState: ''
    })

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

    const handleChange = (event) => {
        const { name, value } = event.target;

        setEditEvent({
            ...editEvent,
            [name]: value,
        });

        console.log(editEvent);
    };

    //const handleUpdateEvent = async (event) => {
    //    try {
    //        const { data } = await updateEvent({
    //            variables: { ...editEvent }
    //        });
    //    } catch (e) {
    //        console.log(error);
    //    }
    //}

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

    const loadEdit = event => {
        console.log(event.target);
        handleShow();
        setEditEvent({
            ...events[event.target.offsetParent.id]
        })
    }

    return (
        <div>
            <Create />
            <>
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>{loading ? "Loading event details" : "Edit Event"}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group className="mb-3" controlId="formContact">
                                <Form.Label>Name</Form.Label>
                                <Form.Control
                                    type="input"
                                    placeholder="Enter your name"
                                    name='contactName'
                                    value={editEvent.contactName}
                                    onChange={handleChange} />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formContactInfo">
                                <Form.Label>Contact Info</Form.Label>
                                <Form.Control
                                    type="input"
                                    name='contactInfo'
                                    placeholder="Provide the best way to contact you"
                                    value={editEvent.contactInfo}
                                    onChange={handleChange}
                                />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formEventName">
                                <Form.Label>Event Name/Description</Form.Label>
                                <Form.Control
                                    type="input"
                                    name='eventName'
                                    placeholder="Enter a brief name for your event"
                                    value={editEvent.eventName}
                                    onChange={handleChange}
                                />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formContactInfo">
                                <Form.Label>Location</Form.Label>
                                <Form.Control
                                    type="input"
                                    name='location'
                                    placeholder="Change the location"
                                    value={editEvent.location.locationName}
                                    onChange={handleChange}
                                />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formDate">
                                <Form.Label>Desired Date/Time</Form.Label>
                                <DateTime
                                    className="form-control"
                                    name='eventDate'
                                    value={editEvent.eventDate}
                                    onChange={handleChange} />
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                        <Button variant="primary">
                            Update
                        </Button>
                    </Modal.Footer>
                </Modal>
            </>
            <h3>Your Current Events</h3>
            {events &&
                events.map((event, index) => (
                    <div key={event._id} className={`card mb-3 col-6 ${opaque ? 'opacity-100' : 'opacity-50'}`} id={index} onClick={loadEdit} onMouseEnter={() => handleMouseOver(true)} onMouseLeave={() => handleMouseOver(false)}>
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
                    </div>
                ))}
        </div>
    );
};

export default EventList;
