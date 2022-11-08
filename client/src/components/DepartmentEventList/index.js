import React from "react";
import { QUERY_DEPT_EVENTS } from "../../utils/queries";
import { useQuery, useMutation } from "@apollo/client";
import dayjs from "dayjs";
import { Link } from "react-router-dom";
const DepartmentEventList = () => {
  const { loading, data } = useQuery(QUERY_DEPT_EVENTS);

  const events = data?.deptEvents || {};

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!events.length) {
    return (
      <>
        <h3>No Events Scheduled</h3>
      </>
    );
  }

  return (
    <div>
      <h3>Your Current Events</h3>
      {events &&
        events.map((event) => (
          <div className="col-sm-12 col-md-6">
            <div key={event._id} className="card">
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
  );
};

export default DepartmentEventList;
