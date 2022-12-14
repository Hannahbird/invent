import React, { useState } from "react";
import { QUERY_DEPT_EVENTS } from "../../utils/queries";
import { useQuery, useMutation } from "@apollo/client";
import dayjs from "dayjs";
import { Link } from "react-router-dom";

const DepartmentEventList = ({ channel, eventChannel }) => {
  const { loading, data, refetch } = useQuery(QUERY_DEPT_EVENTS);

  const events = data?.deptEvents || {};
  const [notifications, setNotifications] = useState({});
  const [updateNotifications, setUpdateNotifications] = useState({});
  if (loading) {
    return <div>Loading...</div>;
  }

  channel.bind("taskChange", function (data) {
    console.log(data);
    setNotifications({ ...notifications, [data.updated.eventId]: true });
    refetch();
  });
  channel.bind("newTask", function (data) {
    console.log(data);
    setNotifications({ ...notifications, [data.newTask.eventId]: true });
    console.log(notifications);
    refetch();
  });
  eventChannel.bind("updatedEvent", function (data) {
    if (
      events.map((event) => event._id).indexOf(data.updatedEvent._id) !== -1
    ) {
      refetch();
      setUpdateNotifications({
        ...updateNotifications,
        [data.updatedEvent._id]: true,
      });
    }
  });

  return (
    <div>
      {events.length ? (
        <h3>Your Current Events</h3>
      ) : (
        <h3>No Events Scheduled</h3>
      )}
      <div className="row">
        {events &&
          events.map((event) => (
            <div
              className="col-sm-12 col-md-6"
              onClick={() => {
                setNotifications({ ...notifications, [event._id]: false });
                setUpdateNotifications({
                  ...notifications,
                  [event._id]: false,
                });
              }}
            >
              <div
                key={event._id}
                className={`card ${
                  notifications[event._id] && "border border-danger"
                } ${updateNotifications[event._id] && "border border-warning"}`}
              >
                <Link to={`/depevent/${event._id}`}>
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

export default DepartmentEventList;
