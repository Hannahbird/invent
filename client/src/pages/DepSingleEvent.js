import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";
import DateTime from "../utils/dateTime/dateTime";
import Auth from "../utils/auth";
import { QUERY_EVENT, QUERY_EVENTTASKS } from "../utils/queries";
import { UPDATE_EVENT } from "../utils/mutations";
import { Card, Modal, Button, Form } from "react-bootstrap";
import EditTaskModal from "../components/editTaskModal";
import CreateTaskModal from "../components/createTaskModal/index";
import auth from "../utils/auth";
import dayjs from "dayjs";
import "../assets/css/SingleEvent.css";

function DepSingleEvent() {
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
  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <div className="container">
      <div className="row">
        <div className="col-4 event-wrapper">
          <div className="eventDataHolder">
            <div>
              <span className="single-event-name">{eventData.eventName}</span>
            </div>
            <div>
              <span className="single-event-date">
                {dayjs(eventData.eventStartDate).format("MMM DD")} -{" "}
                {dayjs(eventData.eventEndDate).format("MMM DD")}
              </span>
            </div>
            <div>
              <span className="single-event-time">
                {dayjs(eventData.eventStartDate).format("hh:mm A")} -{" "}
                {dayjs(eventData.eventEndDate).format("hh:mm A")}{" "}
              </span>
            </div>
            <div>
              <span className="single-event-location">
                {eventData.location.locationName}
              </span>
            </div>
            <div className="contactHolder">
              <span className="single-event-contactName">
                {eventData.contactName}
              </span>
              <span className="single-event-contactInfo">
                {eventData.contactInfo}
              </span>
            </div>
            <div>{eventData.eventState}</div>
          </div>
        </div>
        <div className="col-8 task-wrapper">
          <h3>Your Tasks</h3>
          {tasks.map((task) => (
            <div key={task._id} className="card-body border row">
              <div className="col-6">
                <div>{task.description}</div>
                <div>{task.department.deptName}</div>
                <div>
                  {dayjs(task.startTime).format("MMM DD")}{" "}
                  {dayjs(task.startTime).format("hh:mm A")}
                </div>
                <div>
                  {dayjs(task.endTime).format("MMM DD")}{" "}
                  {dayjs(task.endTime).format("hh:mm A")}
                </div>
              </div>
              <div className="col-6"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default DepSingleEvent;
