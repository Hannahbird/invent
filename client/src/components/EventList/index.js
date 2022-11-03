import React from 'react';
import DepartmentList from '../DepartmentList';
import { Link } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { QUERY_EVENTS, QUERY_COMPANY_DEPT } from '../../utils/queries';

//Modal styling from react-bootstrap
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

const EventList = () => {
  const { loading, data } = useQuery(QUERY_EVENTS, QUERY_COMPANY_DEPT);

  const events = data?.events || {};
  const departments = data?.departments || {};

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

          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Event Name</Form.Label>
              <Form.Control type="string" placeholder="Event Name" />
              <Form.Text className="text-muted">
                What is the Event's Name?.
              </Form.Text>
            </Form.Group>
          </Form>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Event Date</Form.Label>
              <Form.Control type="date" placeholder="Event Date" />
              <Form.Text className="text-muted">
                When will the event take place?.
              </Form.Text>
            </Form.Group>
          </Form>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Event Location</Form.Label>
              <Form.Select type="string" placeholder="Event Location">
                <option>Round Room</option>
                <option>Lake View Room</option>
              </Form.Select>
              <Form.Text className="text-muted">
                Which location will be used for this event?.
              </Form.Text>
            </Form.Group>
          </Form>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Select Departments Involved</Form.Label>
              {['checkbox'].map((type) => (
                <div key={`default-${type}`} className="mb-3">
                  <Form.Check type={type} id={`default-${type}`} label={`IT`} />
                </div>
              ))}
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={props.onHide}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }

  function Create() {
    const [modalShow, setModalShow] = React.useState(false);

    //EventList should have name, timeOf, dateOf, location
    //On each hover edit button
    //onMouseover opacity (like react portfolio)
    //edit bring up modal that contains editable name, timeOf, dateOf, location, description(readonly)
    //

    return (
      <>
        <Button variant="secondary" onClick={() => setModalShow(true)}>
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
        events.map((event) => (
          <div key={event._id} className="card mb-3 col-6">
            <div className="card-header">
              <p>{event.name}</p>
            </div>
            <div className="card-body row">
              {event.timeOf}
              {event.dateOf}
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
