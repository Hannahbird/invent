import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import DateTime from '../utils/dateTime/dateTime';
import Auth from '../utils/auth';
import { QUERY_EVENT } from '../utils/queries';
import { UPDATE_EVENT } from '../utils/mutations';
import { Card, Modal, Button, Form } from 'react-bootstrap';

const SingleEvent = (props) => {
  const { id: eventId } = useParams();

<<<<<<< HEAD
  const { loading, data } = useQuery(QUERY_EVENT, {
    variables: {
      _id: eventId,
    },
  });

  /*const [updateEvent, { error }] = useMutation(UPDATE_EVENT);*/
  /*const events = data?.events || {};*/

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [opaque, setOpaque] = useState(false);

  const handleMouseOver = (state) => {
    setOpaque(state);
  };

  const [editEvent, setEditEvent] = useState({
    eventName: '',
    location: '',
    eventDate: '',
    contactName: '',
    contactInfo: '',
    eventState: '',
  });

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
=======
    const { loading, data } = useQuery(QUERY_EVENT, {
        variables: {
            eventId: eventId
        },
    });

    const [updateEvent, { error }] = useMutation(UPDATE_EVENT, {
        variables: {
            eventId: eventId
        }
    });

    let eventData = data?.event || {};

    const [show, setShow] = useState(false)
    const handleClose = () => {
        setShow(false);
        setEditEvent({})
    }
    const handleShow = () => setShow(true);
    const [opaque, setOpaque] = useState(false);
>>>>>>> c2c332640059afe6e79efdf0cb4dd3afac8cbef2

  /*const event = data?.event || {};*/

<<<<<<< HEAD
  const event = { _id: 123, eventName: 'peepeepoopoo' };
=======
    const [editEvent, setEditEvent] = useState({});
>>>>>>> c2c332640059afe6e79efdf0cb4dd3afac8cbef2

  if (loading) {
    return <div>Loading...</div>;
  }

  const loadEdit = (event) => {
    console.log(event.target);
    handleShow();
    setEditEvent({
      ...event[event.target.offsetParent.id],
    });
  };

<<<<<<< HEAD
  return (
    <div>
      <>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>
              {loading ? 'Loading event details' : 'Edit Event'}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3" controlId="formContact">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="input"
                  placeholder="Enter your name"
                  name="contactName"
                  value={editEvent.contactName}
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formContactInfo">
                <Form.Label>Contact Info</Form.Label>
                <Form.Control
                  type="input"
                  name="contactInfo"
                  placeholder="Provide the best way to contact you"
                  value={editEvent.contactInfo}
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formEventName">
                <Form.Label>Event Name/Description</Form.Label>
                <Form.Control
                  type="input"
                  name="eventName"
                  placeholder="Enter a brief name for your event"
                  value={editEvent.eventName}
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formContactInfo">
                <Form.Label>Location</Form.Label>
                <Form.Control
                  type="text"
                  name="location"
                  placeholder="Change the location"
                  value={editEvent.location.locationName}
                  onChange={handleChange}
                  disabled
                />
              </Form.Group>
=======
        eventData = { ...eventData, [name]: value };

        console.log(eventData);
        console.log(editEvent);
    };

    const handleUpdateEvent = async (event) => {
        try {
            const { data } = await updateEvent({
                variables: { ...editEvent }
            });
        } catch (e) {
            console.log(error);
        }

        handleClose();
    }
>>>>>>> c2c332640059afe6e79efdf0cb4dd3afac8cbef2

              <Form.Group className="mb-3" controlId="formDate">
                <Form.Label></Form.Label>
                <DateTime
                  className="form-control"
                  name="eventDate"
                  value={editEvent.eventDate}
                  onChange={handleChange}
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary">Update</Button>
          </Modal.Footer>
        </Modal>
      </>

<<<<<<< HEAD
      <div
        className={`card mb-3 col-6 ${opaque ? 'opacity-100' : 'opacity-50'}`}
        onClick={loadEdit}
        onMouseEnter={() => handleMouseOver(true)}
        onMouseLeave={() => handleMouseOver(false)}
      >
        <div className="card-header">
          <p>{event.eventName}</p>
=======
    const isUndefined = (String) => {
        if (typeof String === "undefined") {
            return true;
        };

        return false;
    };

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
                                    value={isUndefined(editEvent.contactName) ? eventData.contactName : editEvent.contactName }
                                    onChange={handleChange} />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formContactInfo">
                                <Form.Label>Contact Info</Form.Label>
                                <Form.Control
                                    type="input"
                                    name='contactInfo'
                                    placeholder="Provide the best way to contact you"
                                    value={isUndefined(editEvent.contactInfo) ? eventData.contactInfo : editEvent.contactInfo }
                                    onChange={handleChange}
                                />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formEventName">
                                <Form.Label>Event Name/Description</Form.Label>
                                <Form.Control
                                    type="input"
                                    name='eventName'
                                    placeholder="Enter a brief name for your event"
                                    value={isUndefined(editEvent.eventName) ? eventData.eventName : editEvent.eventName }
                                    onChange={handleChange}
                                />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formContactInfo">
                                <Form.Label>Location</Form.Label>
                                <Form.Control
                                    type="text"
                                    name='location'
                                    placeholder="Change the location"
                                    onChange={handleChange}
                                    value={eventData.location.locationName}
                                    disabled
                                />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formDate">
                                <Form.Label></Form.Label>
                                <DateTime
                                    className="form-control"
                                    name='eventDate'
                                    value={isUndefined(editEvent.eventDate) ? eventData.eventDate : editEvent.eventDate }
                                    onChange={handleChange}
                                />
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Cancel
                        </Button>
                        <Button variant="primary" onClick={handleUpdateEvent}>
                            Update
                        </Button>
                    </Modal.Footer>
                </Modal>
            </>

            <div className={`card mb-3 col-6 ${opaque ? 'opacity-100' : 'opacity-50'}`} onClick={handleShow} onMouseEnter={() => handleMouseOver(true)} onMouseLeave={() => handleMouseOver(false)}>
                <div className="card-header">
                    <p>{eventData.eventName}</p>
                </div>
                <div className="card-body row">
                    {eventData.eventdate}
                    {eventData.location.locationName}
                    {eventData.contactName}
                    {eventData.contactInfo}
                    {eventData.eventState }
                </div>
            </div>
>>>>>>> c2c332640059afe6e79efdf0cb4dd3afac8cbef2
        </div>
        <div className="card-body row">
          <DateTime className="form-control" />
          <select className="form-select" aria-label="Default select example">
            <option selected>Completion Level</option>
            <option value="1">Not Started</option>
            <option value="2">In Progress</option>
            <option value="3">Completed</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default SingleEvent;
