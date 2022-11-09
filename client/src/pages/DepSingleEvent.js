import React from "react";
import { useParams } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";

import Auth from "../utils/auth";
import { QUERY_EVENT, QUERY_EVENTTASKS } from "../utils/queries";
import { ArrowBarLeft } from "react-bootstrap-icons";
import { Link } from "react-router-dom";
import auth from "../utils/auth";
import dayjs from "dayjs";
import "../assets/css/SingleEvent.css";
import Pusher from "pusher-js";
import DeptHeader from '../components/DeptHeader'
function DepSingleEvent() {
  var pusher = new Pusher("b4bd3ba699f2fde524c6", {
    cluster: "mt1",
  });

  var channel = pusher.subscribe(
    Auth.getProfile().data.department._id.toString()
  );
  const { id: eventId } = useParams();
  const { loading, data, refetch } = useQuery(QUERY_EVENT, {
    variables: { eventId: eventId },
  });
  const eventData = data?.event;
  const {
    loading: taskLoading,
    data: taskData,
    refetch: taskRefetch,
  } = useQuery(QUERY_EVENTTASKS, {
    variables: {
      eventId: eventId,
    },
  });
  //   set it up like this so it's sortable
  let rawTasks = [];
  if (taskData?.eventTasks) {
    rawTasks = [...taskData.eventTasks];
  }
  const tasks = rawTasks?.filter(
    (task) => task.department._id === auth.getProfile().data.department._id
  );
  //   pusher channels
  channel.bind("taskChange", function (data) {
    console.log(data);
    // check if the affected task id is any of this events task id
    if (tasks.map((task) => task._id).indexOf(data.updated._id) !== -1)
      taskRefetch();
  });
  channel.bind("newTask", function (data) {
    console.log(data);
    // check if the new task is in this event
    if (data.newTask.eventId === eventId) taskRefetch();
  });

  if (loading) {
    return (<><DeptHeader /><div>Loading...</div></>);
  }
  return (
    <><DeptHeader />
      <div className="container">
        <Link to={"/"} className="btn go-back-btn">
          <ArrowBarLeft size={30} />
        </Link>
        <div className="row">
          <div className=" col-12 col-md-4 event-wrapper">
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
                  <a
                    className="single-event-email"
                    href={`mailto:${eventData.contactInfo}`}
                  >
                    {eventData.contactInfo}
                  </a>
                </span>
              </div>
              <hr />
              <div className="eventStateHolder">
                <span className="single-event-state-label">State: </span>
                <span className="single-event-state">{eventData.eventState}</span>
              </div>
            </div>
          </div>
          <div className="col -12 col-md-8 task-wrapper">
            <h3>Your Tasks</h3>
            {tasks.map((task) => (
              <div key={task._id} className="card-body card task-card ">
                <div className="col-12">
                  <div className="single-event-task-name">{task.description}</div>

                  <div className="single-event-task-time">
                    <span>Start: </span>
                    {dayjs(task.startTime).format("MMM DD")}{" "}
                    {dayjs(task.startTime).format("hh:mm A")}
                    <br />
                    <span>Complete By: </span>
                    {dayjs(task.endTime).format("MMM DD")}{" "}
                    {dayjs(task.endTime).format("hh:mm A")}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default DepSingleEvent;
