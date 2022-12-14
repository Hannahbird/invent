import React, { Component } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import "./App.css";

//component imports

import Footer from "./components/Footer";
import DepartmentList from "./components/DepartmentList";
import EventList from "./components/EventList";
import SpacesList from "./components/SpacesList";

//pages imports
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import About from "./pages/About";

import DepSingleEvent from "./pages/DepSingleEvent";
import SingleEvent from "./pages/SingleEvent";
import NoMatch from "./pages/NoMatch";
import Reserve from "./pages/Reserve";

import Pusher from "pusher-js";
import * as bs from "bootstrap/dist/css/bootstrap.css";

const httpLink = createHttpLink({
  uri: "/graphql",
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("id_token");
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export default class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <Router>
          <div className="flex-column justify-flex-start min-100-vh big-page-container">
            <div>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/gettingstarted" element={<About />} />
                <Route path="/events" element={<EventList />} />
                <Route path="/event/:id" element={<SingleEvent />} />
                <Route path="/depevent/:id" element={<DepSingleEvent />} />
                <Route path="/spaces" element={<SpacesList />} />
                <Route path="/reserve/:id" element={<Reserve />} />
                <Route path="/departments" element={<DepartmentList />} />
                <Route path="*" element={<NoMatch />} />
              </Routes>
            </div>

            <div id="footer-spacer"></div>
            <Footer />
          </div>
        </Router>
      </ApolloProvider>
    );
  }
}

// export default App;
