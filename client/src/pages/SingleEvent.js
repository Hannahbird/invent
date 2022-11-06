import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";
import DateTime from "../utils/dateTime/dateTime";
import Auth from "../utils/auth";
import { QUERY_EVENT, QUERY_EVENTTASKS } from "../utils/queries";
import { UPDATE_EVENT } from "../utils/mutations";
import { Card, Modal, Button, Form } from "react-bootstrap";
import CreateTaskModal from "../components/createTaskModal/index";
const SingleEvent = (props) => {
  const { id: eventId } = useParams();
  const [showCreate, setShowCreate] = useState(false);
  const {
    loading: taskLoading,
    data: taskData,
    refetch: taskRefetch,
  } = useQuery(QUERY_EVENTTASKS, {
    variables: {
      eventId: eventId,
    },
  });
  const { loading, data, refetch } = useQuery(QUERY_EVENT, {
    variables: {
      eventId: eventId,
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
    eventName: "",
    location: "",
    eventDate: "",
    contactName: "",
    contactInfo: "",
    eventState: "",
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

  /*const event = data?.event || {};*/

  const event = { _id: 123, eventName: "peepeepoopoo" };
  // set it up like this so it's sortable
  let rawTasks = [];
  if (taskData?.eventTasks) {
    rawTasks = [...taskData.eventTasks];
  }
  // const rawTasks = [...taskData.eventTasks];
  const tasks = rawTasks?.sort((a, b) => a.startTime - b.startTime);
  console.log(tasks);
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

  return (
    <div>
      <>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>
              {loading ? "Loading event details" : "Edit Event"}
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

      <div
        className={`card mb-3 col-6 ${opaque ? "opacity-100" : "opacity-50"}`}
        onClick={loadEdit}
        onMouseEnter={() => handleMouseOver(true)}
        onMouseLeave={() => handleMouseOver(false)}
      >
        <div className="card-header">
          <p>{event.eventName}</p>
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
      <CreateTaskModal
        eventId={eventId}
        refetch={refetch}
        showCreate={showCreate}
        setShowCreate={setShowCreate}
        taskRefetch={taskRefetch}
      />
      <Button
        onClick={() => {
          setShowCreate(true);
        }}
      >
        Add Task
      </Button>
      <div>
        <h2>Task List</h2>
        {tasks.map((task) => {
          return (
            <div className="card-body">
              <div>{task.description}</div>
              <div>{task.department.deptName}</div>
              <div>{task.startTime}</div>
              <div>{task.endTime}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SingleEvent;
