import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";
import DateTime from "../utils/dateTime/dateTime";
import Auth from "../utils/auth";
import { QUERY_EVENT, QUERY_EVENTTASKS } from "../utils/queries";
import { UPDATE_EVENT } from "../utils/mutations";
import { Card, Modal, Button, Form } from "react-bootstrap";
import { ArrowBarLeft } from 'react-bootstrap-icons';
import EditTaskModal from "../components/editTaskModal";
import CreateTaskModal from "../components/createTaskModal/index";
import dayjs from "dayjs";
import AdminHeader from '../components/AdminHeader';
import { Link } from 'react-router-dom';
import "../assets/css/SingleEvent.css";

const SingleEvent = (props) => {
  const { id: eventId } = useParams();
  const [showCreate, setShowCreate] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState({});

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

    const [updateEvent, { error }] = useMutation(UPDATE_EVENT);

    const [show, setShow] = useState(false);
    const handleClose = () => {
        setShow(false);
        setEditEvent({});
    };
    const handleShow = () => setShow(true);
    const [opaque, setOpaque] = useState(false);

    const handleMouseOver = (state) => {
        setOpaque(state);
    };

    const [editEvent, setEditEvent] = useState({});

    const handleChange = (event) => {
        const { name, value } = event.target;

        setEditEvent({
            ...editEvent,
            [name]: value,
        });

        /*eventData = { ...eventData, [name]: value };*/
    };

    const handleUpdateEvent = async (event) => {
        try {
            const { data } = await updateEvent({
                variables: { eventId: eventId, ...editEvent },
            });
            refetch();
        } catch (e) { }

        handleClose();
    };

    let eventData = data?.event || {};

    // set it up like this so it's sortable
    let rawTasks = [];
    if (taskData?.eventTasks) {
        rawTasks = [...taskData.eventTasks];
    }
    // const rawTasks = [...taskData.eventTasks];
    const tasks = rawTasks?.sort((a, b) => a.startTime - b.startTime);

    if (loading) {
        return <div>Loading...</div>;
    }

    //const loadEdit = (event) => {
    //    console.log(event.target);
    //    handleShow();
    //    setEditEvent({
    //        ...event[event.target.offsetParent.id],
    //    });
    //};

    const isUndefined = (String) => {
        if (typeof String === "undefined") {
            return true;
        }

        return false;
    };

    return (
        <div id="single-event-container">
            <AdminHeader />
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
                                    value={
                                        isUndefined(editEvent.contactName)
                                            ? eventData.contactName
                                            : editEvent.contactName
                                    }
                                    onChange={handleChange}
                                />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formContactInfo">
                                <Form.Label>Contact Info</Form.Label>
                                <Form.Control
                                    type="input"
                                    name="contactInfo"
                                    placeholder="Provide the best way to contact you"
                                    value={
                                        isUndefined(editEvent.contactInfo)
                                            ? eventData.contactInfo
                                            : editEvent.contactInfo
                                    }
                                    onChange={handleChange}
                                />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formEventName">
                                <Form.Label>Event Name/Description</Form.Label>
                                <Form.Control
                                    type="input"
                                    name="eventName"
                                    placeholder="Enter a brief name for your event"
                                    value={
                                        isUndefined(editEvent.eventName)
                                            ? eventData.eventName
                                            : editEvent.eventName
                                    }
                                    onChange={handleChange}
                                />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formContactInfo">
                                <Form.Label>Location</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="location"
                                    placeholder="Change the location"
                                    onChange={handleChange}
                                    value={eventData.location.locationName}
                                    disabled
                                />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formDateStart">
                                <Form.Label></Form.Label>
                                <DateTime
                                    className="form-control"
                                    name="eventDate"
                                    startDate={
                                        isUndefined(editEvent.eventStartDate)
                                            ? eventData.eventStartDate
                                            : editEvent.eventStartDate
                                    }
                                    endDate={
                                        isUndefined(editEvent.eventEndDate)
                                            ? eventData.eventEndDate
                                            : editEvent.eventEndDate
                                    }
                                    onChange={handleChange}
                                    stateMgr={setEditEvent}
                                    stateObj={editEvent}
                                />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formEventState">
                                <Form.Label>State</Form.Label>
                                <Form.Select
                                    className="form-control"
                                    name="eventState"
                                    value={
                                        isUndefined(editEvent.eventState)
                                            ? eventData.eventState
                                            : editEvent.eventState
                                    }
                                    onChange={handleChange}
                                >
                                    <option value="Pending">Pending</option>
                                    <option value="Planning">Planning</option>
                                    <option value="InProgress">In Progress</option>
                                    <option value="Complete">Complete</option>
                                    <option value="Cancelled">Cancelled</option>
                                </Form.Select>
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

      <CreateTaskModal
        eventData={eventData}
        refetch={refetch}
        showCreate={showCreate}
        setShowCreate={setShowCreate}
        taskRefetch={taskRefetch}
      />
      <EditTaskModal
        task={taskToEdit}
        taskRefetch={taskRefetch}
        showEdit={showEdit}
        setShowEdit={setShowEdit}
      />

            <div className="container">
                <Link
                    to={'/'}
                    className="btn go-back-btn">
                    <ArrowBarLeft size={30} />
                </Link>
                <div className="row">
                    <div className="col-4 event-wrapper">
                        <h1>Event</h1>
                        <div className="eventDataHolder">
                            <div>
                                <span className="single-event-name-label">Name: </span>
                                <span className="single-event-name">{eventData.eventName}</span>
                            </div>
                            <hr />
                            <div>
                                <span className="single-event-date-label">Date(s): </span>
                                <span className="single-event-date">
                                    {dayjs(eventData.eventStartDate).format("MMM DD")} -{" "}
                                    {dayjs(eventData.eventEndDate).format("MMM DD")}
                                </span>
                            </div>
                            <hr />
                            <div>
                                <span className="single-event-time-label">Time(s): </span>
                                <span className="single-event-time">
                                    {dayjs(eventData.eventStartDate).format("hh:mm A")} -{" "}
                                    {dayjs(eventData.eventEndDate).format("hh:mm A")}{" "}
                                </span>
                            </div>
                            <hr />
                            <div>
                                <span className="single-event-location-label">Location: </span>
                                <span className="single-event-location">
                                    {eventData.location.locationName}
                                </span>
                            </div>
                            <hr />
                            <div className="contactHolder">
                                <span className="single-event-contact-label">Contact: </span>
                                <span className="single-event-contactName">
                                    {eventData.contactName}
                                </span>
                                <span className="single-event-contactInfo">
                                    <a className="single-event-email" href={`mailto:${eventData.contactInfo}`}>{eventData.contactInfo}</a>
                                </span>
                            </div>
                            <hr />
                            <div className="eventStateHolder">
                                <span className="single-event-state-label">State: </span>
                                <span className="single-event-state">{eventData.eventState}</span>
                            </div>
                        </div>
                        <button
                            className="edit-event-btn btn btn-primary"
                            onClick={handleShow}
                        >
                            Edit Event
                        </button>
                        <button
                            className="add-task-btn btn btn-primary"
                            onClick={() => {
                                setShowCreate(true);
                            }}
                        >
                            Add Task
                        </button>
                    </div>

                    <div className="col-8 task-wrapper">
                        <h1>Tasks</h1>
                        {tasks.map((task) => (
                            <div key={task._id} className="card-body card task-card">
                                <div className="single-event-task-name">{task.description}</div>
                                <div className="single-event-task-dept"><span>Assigned to: </span>{task.department.deptName}</div>
                                <div className="single-event-task-time"><span>Duration: </span>{dayjs(task.startTime).format("hh:mm A")} - {dayjs(task.endTime).format("hh:mm A")}</div>
                                <button
                                    className="btn btn-primary"
                                    onClick={() => {
                                        setTaskToEdit(task);
                                        setShowEdit(true);
                                    }}
                                >
                                    Edit
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SingleEvent;