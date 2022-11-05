import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import './App.css';

//component imports
import Header from './components/Header';
import Footer from './components/Footer';
import DepartmentList from './components/DepartmentList';
import EventList from './components/EventList';
import SpacesList from './components/SpacesList';

//pages imports
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import AdminDashboard from './pages/AdminDashboard';
import DepDashboard from './pages/DepDashboard';
import SingleEvent from './pages/SingleEvent';
import NoMatch from './pages/NoMatch';
import Reserve from './pages/Reserve'

import Pusher from 'pusher-js';
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
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});
// set up pusher connection
var pusher = new Pusher('b4bd3ba699f2fde524c6', {
  cluster: 'mt1',
});

var channel = pusher.subscribe('test-channel');

function App() {
  // pusher test
  channel.bind('test-event', function (data) {
    console.log(JSON.stringify(data));
  });
  return (
    <ApolloProvider client={client}>
      <Router>
        <div className="flex-column justify-flex-start min-100-vh">
          <Header />
          <div className="container">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/admindashboard" element={<AdminDashboard />} />
              <Route path="/depdashboard" element={<DepDashboard />} />
              <Route path="/events" element={<EventList />} />
              <Route path="/event" element={<SingleEvent />} />
              <Route path="/spaces" element={<SpacesList />} />
              <Route path="/departments" element={<DepartmentList />} />
              <Route path="*" element={<NoMatch />} />
            </Routes>
          </div>
          <Footer />
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
