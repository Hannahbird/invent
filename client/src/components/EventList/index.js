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

  const { loading: departmentLoading, data: departmentData } =
    useQuery(QUERY_COMPANY_DEPTS);

  const locations = locationData?.locations || [];
  const departments = departmentData?.departments || [];
  const events = data?.events || {};

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!events.length) {
    return (
      <>
        <AdminHeader />
        <h3>No Events Scheduled</h3>
        <Create />
      </>
    );
  }

  //Create Event Modal
  function AddEventsModal(props) {
    const [editDate, setEditDate] = useState({
      eventStartDate: Date(),
      eventEndDate: Date(),
    });
    const [addEvent] = useMutation(ADD_EVENT);
    const onFormSubmit = async (e) => {
      e.preventDefault();
      const formData = new FormData(e.target),
        formDataObj = Object.fromEntries(formData.entries());
      const reqObj = {
        ...formDataObj,
        eventDate: editDate.eventStartDate,
        eventStartDate: editDate.eventStartDate,
        eventEndDate: editDate.eventEndDate,
      };
      props.onHide();
      await addEvent({ variables: reqObj });
      refetch();
    };
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Form onSubmit={onFormSubmit}>
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
              />
              <Form.Text className="text-muted">
                What is the primary contact information?
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label></Form.Label>
              <DateTime
                className="form-control"
                name="eventDate"
                type="string"
                startDate={editDate.eventStartDate}
                endDate={editDate.eventEndDate}
                stateMgr={setEditDate}
                stateObj={editDate}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Event Location</Form.Label>
              <Form.Select
                name="location"
                type="string"
                placeholder="Event Location"
              >
                {locations.map((location) => (
                  <option value={location._id}>{location.locationName}</option>
                ))}
              </Form.Select>
              <Form.Text className="text-muted">
                Which location will be used for this event?
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Departments Needed</Form.Label>
              <Form.Select
                name="departments"
                type="string"
                placeholder="Departments Needed"
              >
                {departments.map((department) => {
                  if (department.deptName === "admin") {
                    return;
                  }
                  return (
                    <option value={department._id}>
                      {department.deptName}
                    </option>
                  );
                })}
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
    );
  }

  function Create() {
    const [modalShow, setModalShow] = React.useState(false);

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
      <div className="row">
        {events &&
          events.map((event) => (
            <div className="col-sm-12 col-md-6">
              <div key={event._id} className="card">
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
