import React, { useState } from "react";

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
import Accordian from "react-bootstrap/Accordion";
import EventCard from "./EventCard";
import AdminHeader from "../AdminHeader";
import Auth from "../../utils/auth";
import Pusher from "pusher-js";
const EventList = () => {
  // pusher init
  var pusher = new Pusher("b4bd3ba699f2fde524c6", {
    cluster: "mt1",
  });
  var channel = pusher.subscribe(Auth.getProfile().data._id.toString());
  const companyTitle =
    Auth.getProfile().data.department.company.title || "your company";
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
  // refetch on ;ending event submit
  channel.bind("eventReq", function (data) {
    refetch();
  });
  if (loading) {
    <>
      <AdminHeader /> <div>Loading...</div>
    </>;
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
    } catch (e) {}

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
        <Form onSubmit={handleNewEvent}>
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
                required
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
                required
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
                required
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
                required
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
            <Button variant="secondary" type="submit">
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
      <h3>
        {events.length
          ? `Current Events for ${companyTitle}`
          : "No events yet..."}
      </h3>
      <Accordian flush defaultActiveKey={["0"]}>
        <Accordian.Item eventKey="0">
          <Accordian.Header>
            Planning: (
            {events.length &&
              events.filter((event) => event.eventState === "Planning").length}
            )
          </Accordian.Header>
          <Accordian.Body>
            <div className="row">
              {events.length &&
                events
                  .filter((event) => event.eventState === "Planning")
                  .map((event) => <EventCard event={event} />)}
            </div>
          </Accordian.Body>
        </Accordian.Item>
        <Accordian.Item eventKey="2">
          <Accordian.Header>
            Pending: (
            {events.length &&
              events.filter((event) => event.eventState === "Pending").length}
            )
          </Accordian.Header>
          <Accordian.Body>
            <div className="row">
              {events.length &&
                events
                  .filter((event) => event.eventState === "Pending")
                  .map((event) => <EventCard event={event} />)}
            </div>
          </Accordian.Body>
        </Accordian.Item>
        <Accordian.Item eventKey="3">
          <Accordian.Header>
            In Progress: (
            {events.length &&
              events.filter((event) => event.eventState === "InProgress")
                .length}
            )
          </Accordian.Header>
          <Accordian.Body>
            <div className="row">
              {events.length &&
                events
                  .filter((event) => event.eventState === "InProgress")
                  .map((event) => <EventCard event={event} />)}
            </div>
          </Accordian.Body>
        </Accordian.Item>
        <Accordian.Item eventKey="4">
          <Accordian.Header>
            Completed: (
            {events.length &&
              events.filter((event) => event.eventState === "Complete").length}
            )
          </Accordian.Header>
          <Accordian.Body>
            <div className="row">
              {events.length &&
                events
                  .filter((event) => event.eventState === "Complete")
                  .map((event) => <EventCard event={event} />)}
            </div>
          </Accordian.Body>
        </Accordian.Item>
        <Accordian.Item eventKey="5">
          <Accordian.Header>
            Cancelled: (
            {events.length &&
              events.filter((event) => event.eventState === "Cancelled").length}
            )
          </Accordian.Header>
          <Accordian.Body>
            <div className="row">
              {events.length &&
                events
                  .filter((event) => event.eventState === "Cancelled")
                  .map((event) => <EventCard event={event} />)}
            </div>
          </Accordian.Body>
        </Accordian.Item>
      </Accordian>
    </div>
  );
};

export default EventList;
