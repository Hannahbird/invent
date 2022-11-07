import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";
import DateTime from "../utils/dateTime/dateTime";
import Auth from "../utils/auth";
import { QUERY_EVENT, QUERY_EVENTTASKS } from "../utils/queries";
import { UPDATE_EVENT } from "../utils/mutations";
import { Card, Modal, Button, Form } from "react-bootstrap";
import CreateTaskModal from "../components/createTaskModal/index";
import dayjs from 'dayjs';
import '../assets/css/SingleEvent.css';

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

    const [updateEvent, { error }] = useMutation(UPDATE_EVENT);

    const [show, setShow] = useState(false);
    const handleClose = () => {
        setShow(false);
        setEditEvent({})
    }
    const handleShow = () => setShow(true);
    const [opaque, setOpaque] = useState(false);

    const handleMouseOver = (state) => {
        setOpaque(state);
    };

    const [editEvent, setEditEvent] = useState({});

    const handleChange = (event) => {
        console.log(event);
        const { name, value } = event.target;

        setEditEvent({
            ...editEvent,
            [name]: value,
        });

        /*eventData = { ...eventData, [name]: value };*/
    };

    const handleUpdateEvent = async (event) => {
        console.log(editEvent);
        try {
            const { data } = await updateEvent({
                variables: { eventId: eventId, ...editEvent }
            });
            refetch();
        } catch (e) {
            console.log(error);
        }

        handleClose();
    }

    let eventData = data?.event || {};

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
        };

        return false;
    };

    console.log(eventData.eventStartDate);

    return (
        <div>
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
                                    value={isUndefined(editEvent.contactName) ? eventData.contactName : editEvent.contactName}
                                    onChange={handleChange} />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formContactInfo">
                                <Form.Label>Contact Info</Form.Label>
                                <Form.Control
                                    type="input"
                                    name='contactInfo'
                                    placeholder="Provide the best way to contact you"
                                    value={isUndefined(editEvent.contactInfo) ? eventData.contactInfo : editEvent.contactInfo}
                                    onChange={handleChange}
                                />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formEventName">
                                <Form.Label>Event Name/Description</Form.Label>
                                <Form.Control
                                    type="input"
                                    name='eventName'
                                    placeholder="Enter a brief name for your event"
                                    value={isUndefined(editEvent.eventName) ? eventData.eventName : editEvent.eventName}
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

                            <Form.Group className="mb-3" controlId="formDateStart">
                                <Form.Label></Form.Label>
                                <DateTime
                                    className="form-control"
                                    name='eventDate'
                                    startDate={isUndefined(editEvent.eventStartDate) ? eventData.eventStartDate : editEvent.eventStartDate}
                                    endDate={isUndefined(editEvent.eventEndDate) ? eventData.eventEndDate : editEvent.eventEndDate}
                                    onChange={handleChange}
                                    stateMgr={setEditEvent}
                                    stateObj={editEvent}
                                />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formEventState">
                                <Form.Label>State</Form.Label>
                                <Form.Select
                                    className="form-control"
                                    name='eventState'
                                    value={isUndefined(editEvent.eventState) ? eventData.eventState : editEvent.eventState}
                                    onChange={handleChange}>
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
                eventId={eventId}
                refetch={refetch}
                showCreate={showCreate}
                setShowCreate={setShowCreate}
                taskRefetch={taskRefetch}
            />

            <div className="container">
                <div className="row">
                    <div className="col-4 event-wrapper">
                        <button
                            className="edit-event-btn btn btn-primary"
                            onClick={handleShow}>
                            Edit Event
                        </button>
                        <button className="add-task-btn btn btn-primary"
                            onClick={() => {
                                setShowCreate(true);
                            }}>
                            Add Task
                        </button>

                        <div className="eventDataHolder">
                            <div>
                                <span className="single-event-name">{eventData.eventName}</span>
                            </div>
                            <div>
                                <span className="single-event-date">{dayjs(eventData.eventStartDate).format('MMM DD')} - {dayjs(eventData.eventEndDate).format('MMM DD')}</span>
                            </div>
                            <div>
                                <span className="single-event-time">{dayjs(eventData.eventStartDate).format('hh:mm A')} - {dayjs(eventData.eventEndDate).format('hh:mm A')} </span>
                            </div>
                            <div>
                                <span className="single-event-location">{eventData.location.locationName}</span>
                            </div>
                            <div className="contactHolder">
                                <span className="single-event-contactName">{eventData.contactName}</span>
                                <span className="single-event-contactInfo">{eventData.contactInfo}</span>
                            </div>
                            <div>
                                {eventData.eventState} >>> DROPDOWN
                            </div>
                        </div>
                    </div>
                    <div className="col-8 task-wrapper">
                        {tasks.map((task) => (
                            <div key={task._id} className="card-body">
                                <div>{task.description}</div>
                                <div>{task.department.deptName}</div>
                                <div>{task.startTime}</div>
                                <div>{task.endTime}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SingleEvent;
