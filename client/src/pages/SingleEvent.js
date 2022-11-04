import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import DepartmentList from '../components/DepartmentList';
import DateTime from '../utils/dateTime/dateTime';
import Auth from '../utils/auth';
import { QUERY_EVENT } from '../utils/queries';
import { Card, Modal, Button, Form } from 'react-bootstrap';

const SingleEvent = (props) => {
    const { id: eventId } = useParams();

    const { loading, data } = useQuery(QUERY_EVENT, {
        variables: {
            eventId: eventId,
        },
    });

    console.log(data);
    console.log(eventId);

    /*const [updateEvent, { error }] = useMutation(UPDATE_EVENT);*/
    const event = data?.event || {};

    const [show, setShow] = useState(false)
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [opaque, setOpaque] = useState(false);

    const handleMouseOver = (state) => {
        setOpaque(state);
    }

    const [editEvent, setEditEvent] = useState(event);

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

    if (loading) {
        return <div>Loading...</div>;
    }

    const loadEdit = event => {
        console.log(event.target);
        handleShow();
        setEditEvent({
            ...event[event.target.offsetParent.id]
        })
    }

    return (
        <div>
            <>
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>{loading ? "Loading event details" : "Edit Event" }</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group className="mb-3" controlId="formContact">
                                <Form.Label>Name</Form.Label>
                                <Form.Control
                                    type="input"
                                    placeholder="Enter your name"
                                    name='contactName'
                                    value={event.contactName}
                                    onChange={handleChange} />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formContactInfo">
                                <Form.Label>Contact Info</Form.Label>
                                <Form.Control
                                    type="input"
                                    name='contactInfo'
                                    placeholder="Provide the best way to contact you"
                                    value={event.contactInfo}
                                    onChange={handleChange}
                                />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formEventName">
                                <Form.Label>Event Name/Description</Form.Label>
                                <Form.Control
                                    type="input"
                                    name='eventName'
                                    placeholder="Enter a brief name for your event"
                                    value={event.eventName}
                                    onChange={handleChange}
                                />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formContactInfo">
                                <Form.Label>Location</Form.Label>
                                <Form.Control
                                    type="text"
                                    name='location'
                                    placeholder="Change the location"
                                    value={event.location.locationName}
                                    onChange={handleChange}
                                    disabled
                                />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formDate">
                                <Form.Label></Form.Label>
                                <DateTime
                                    className="form-control"
                                    name='eventDate'
                                    value={event.eventDate}
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

            <div className={`card mb-3 col-6 ${opaque ? 'opacity-100' : 'opacity-50'}`} onClick={loadEdit} onMouseEnter={() => handleMouseOver(true)} onMouseLeave={() => handleMouseOver(false)}>
                <div className="card-header">
                    <p>{event.eventName}</p>
                </div>
                <div className="card-body row">
                </div>
            </div>
        </div>
    );
};

export default SingleEvent;
