import React from "react";
import EventList from "../components/EventList";
import AdminHeader from "../components/AdminHeader";

import Auth from "../utils/auth";

const Dashboard = () => {

  const { data: { department: { company: { reserveCode } } } } = Auth.getProfile();
  const Url = (window.location.href).concat('reserve/').concat(reserveCode)
  

  console.log(Url);

  return (
    <div>
      <AdminHeader />
      <div className="container background">
        <div>
          <h2>{`Guests may request an event at `}<a href={Url} target='blank'>{Url}</a></h2>
          <EventList />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
