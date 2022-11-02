import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
<<<<<<< HEAD
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import "./App.css";
import AdminDashboard from "./pages/AdminDashboard";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Login from "./pages/Login";
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
=======
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import './App.css';
import AdminDashboard from './pages/AdminDashboard';
import Header from './components/Header';
import Footer from './components/Footer';

import Home from './pages/Home';
import Login from './pages/Login';
import * as bs from 'bootstrap/dist/css/bootstrap.css';

const httpLink = createHttpLink({
  uri: '/graphql',
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
>>>>>>> cristinas-branch
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
<<<<<<< HEAD
});
// set up pusher connection
var pusher = new Pusher("b4bd3ba699f2fde524c6", {
  cluster: "mt1",
=======
>>>>>>> cristinas-branch
});

var channel = pusher.subscribe("test-channel");

function App() {
<<<<<<< HEAD
  // pusher test
  channel.bind("test-event", function (data) {
    console.log(JSON.stringify(data));
  });
=======
>>>>>>> cristinas-branch
  return (
    <ApolloProvider client={client}>
      <Router>
        <div className="flex-column justify-flex-start min-100-vh">
          <Header />
          <div className="container">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/dashboard" element={<AdminDashboard />} />
              {/* <Route 
                path="/signup" 
                element={<Signup />} 
              /> */}
            </Routes>
          </div>
          <Footer />
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
