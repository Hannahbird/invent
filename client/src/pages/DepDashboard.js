import React from "react";
import DeptHeader from "../components/DeptHeader";
import DepartmentEventList from "../components/DepartmentEventList";
import Pusher from "pusher-js";
import Auth from "../utils/auth";
import { useQuery } from "@apollo/client";
import { QUERY_EVENTS } from "../utils/queries";

const DepDashboard = () => {
  var pusher = new Pusher("b4bd3ba699f2fde524c6", {
    cluster: "mt1",
  });
  console.log(Auth.getProfile().data.department._id.toString());
  var channel = pusher.subscribe(
    Auth.getProfile().data.department._id.toString()
  );
  var eventChannel = pusher.subscribe(
    Auth.getProfile().data.department.company
  );

  return (
    <>
      <DeptHeader />
      <div className="container">
        <div>
          <h2>Viewing your dashboard.</h2>
          <DepartmentEventList eventChannel={eventChannel} channel={channel} />
        </div>
      </div>
    </>
  );
};

export default DepDashboard;
