import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";
import {
  QUERY_COMPANY_DEPTS,
  QUERY_EVENTS,
  QUERY_LOCATIONS,
} from "../../utils/queries";
import { ADD_EVENT } from "../../utils/mutations";
import "../../assets/css/EventList.css";
//Modal styling from react-bootstrap
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import DateTime from "../../utils/dateTime/dateTime";
import dayjs from "dayjs";

import AdminHeader from "../AdminHeader";

const EventList = () => {
  const { loading, error, data, refetch } = useQuery(QUERY_EVENTS);
  const { loading: locationLoading, data: locationData } =
    useQuery(QUERY_LOCATIONS);

  const [addEvent] = useMutation(ADD_EVENT);

  const [modalShow, setModalShow] = React.useState(false);

  const [newEvent, setNewEvent] = useState({
    eventName: "",
    contactName: "",
    contactInfo: "",
    eventStartDate: "",
    eventEndDate: "",
    location: "",
  });

  const locations = locationData?.locations || [];
  const events = data?.events || {};

  if (loading) {
    <><AdminHeader /> <div>Loading...</div></>
  }

  if (!events.length) {
    return (
      <>
        <AdminHeader />
        <h3>No Events Scheduled</h3>
      </>
    );
  }

  const handleChange = (event) => {
    const { name, value } = event.target;

    setNewEvent({
      ...newEvent,
      [name]: value,
    });
  };

  const handleNewEvent = async (event) => {
    event.preventDefault();
    console.log(newEvent);

    try {
      const { data } = await addEvent({
        variables: { ...newEvent },
      });
      setNewEvent({
        eventName: "",
        contactName: "",
        contactInfo: "",
        eventStartDate: "",
        eventEndDate: "",
        location: "",
      });
      refetch();
    } catch (e) { }

    setModalShow(false);
  };

  return (
    <div>
      <Modal
        show={modalShow}
        onHide={() => setModalShow(false)}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Form>
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              Create Events
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h4>Create Events</h4>
            <Form.Group className="mb-3">
              <Form.Label>Event Name</Form.Label>
              <Form.Control
                name="eventName"
                type="string"
                placeholder="Event Name"
                value={newEvent.eventName}
                onChange={handleChange}
              />
              <Form.Text className="text-muted">
                What is the Event's Name?
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Client Name</Form.Label>
              <Form.Control
                name="contactName"
                type="string"
                placeholder="Client Name"
                value={newEvent.contactName}
                onChange={handleChange}
              />
              <Form.Text className="text-muted">
                Who is the primary contact?
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Contact Info</Form.Label>
              <Form.Control
                name="contactInfo"
                type="string"
                placeholder="Client Contact"
                value={newEvent.contactInfo}
                onChange={handleChange}
              />
              <Form.Text className="text-muted">
                What is the primary contact information?
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3">
              <DateTime
                className="form-control"
                name="eventDate"
                stateMgr={setNewEvent}
                stateObj={newEvent}
                startDate={newEvent.eventStartDate}
                endDate={newEvent.eventEndDate}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Event Location</Form.Label>
              <Form.Select
                name="location"
                type="string"
                placeholder="Event Location"
                onChange={handleChange}
              >
                <option selected>Select Location</option>
                {locations.map((location) => (
                  <option value={location._id}>{location.locationName}</option>
                ))}
              </Form.Select>
              <Form.Text className="text-muted">
                Which location will be used for this event?
              </Form.Text>
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" type="submit" onClick={handleNewEvent}>
              Submit
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
      <>
        <Button variant="secondary" onClick={() => setModalShow(true)}>
          Create Events
        </Button>
      </>
      <h3>Your Current Events</h3>
      <div className="row">
        {events &&
          events.map((event) => (
            <div className="col-sm-12 col-md-6">
              <div key={event._id} className="card mt-3">
                <Link to={`/event/${event._id}`}>
                  <div className="card-header border-0 text-black">
                    <p>{event.eventName}</p>
                  </div>
                  <div className="card-body row text-black">
                    <div className="main-body">
                      <div className="main-body-meeting-info">
                        <div className="main-body-date">
                          <span className="main-body-dateDay">
                            {dayjs(event.eventStartDate).format("DD")}
                          </span>
                          <span className="main-body-dateMonth">
                            {dayjs(event.eventStartDate).format("MMM")}
                          </span>
                        </div>
                        <div className="main-body-event">
                          <span className="main-body-location">
                            {event.location.locationName}
                          </span>
                          <span className="main-body-time">
                            {dayjs(event.eventStartDate).format("hh:mm A")} -{" "}
                            {dayjs(event.eventEndDate).format("hh:mm A")}{" "}
                          </span>
                        </div>
                      </div>
                      <div className="main-body-contact">
                        <span>{event.contactName}</span>
                        <span>{event.contactInfo}</span>
                      </div>
                      <div className="main-body-eventState">
                        <span>Event Status: {event.eventState}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default EventList;
