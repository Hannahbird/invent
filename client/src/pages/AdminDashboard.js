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
          <h5 className="display-6">{`Guests may request an event at `}<a href={Url} target='blank'>../reserve/{reserveCode}</a></h5>
          <EventList />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
