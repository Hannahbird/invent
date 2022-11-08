const { gql } = require("apollo-server-express");
const { GraphQLScalarType, Kind } = require("graphql");

const dateScalar = new GraphQLScalarType({
  name: "Date",
  description: "Date custom scalar type",
  serialize(value) {
    return value.getTime(); // Convert outgoing Date to integer for JSON
  },
  parseValue(value) {
    return new Date(value); // Convert incoming integer to Date
  },
  parseLiteral(ast) {
    if (ast.kind === Kind.INT) {
      // Convert hard-coded AST string to integer and then to Date
      return new Date(parseInt(ast.value, 10));
    }
    // Invalid hard-coded value (not an integer)
    return null;
  },
});

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    department: Department
  }

  type Department {
    _id: ID
    deptName: String
    company: Company
    signUpLink: String
    teamMembers: [User]
  }

  type Company {
    _id: ID
    title: String
    companyEmail: String
  }

  type Location {
    _id: ID
    locationName: String
    company: Company
    capacity: Int
  }

  type EventTask {
    _id: ID
    department: Department
    description: String
    eventId: ID
    startTime: String
    endTime: String
  }

  type Event {
    _id: ID
    eventName: String
    location: Location
    departments: [Department]
    contactInfo: String
    contactName: String
    eventDate: Date
    eventStartDate: Date
    eventEndDate: Date
    eventState: String
  }
  scalar Date

  type Auth {
    token: ID!
    user: User
  }

  type Check {
    available: Boolean
  }

  type Query {
    me: User
    departments: [Department]
    department(deptId: String!): Department
    eventTasks(eventId: String!): [EventTask]
    events: [Event]
    deptEvents: [Event]
    event(eventId: String!): Event
    locations: [Location]
    checkEmail(email: String!): Check
    checkUsername(username: String!): Check
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(
      username: String!
      email: String!
      password: String!
      signUpCode: String
      newCompany: Boolean
      companyTitle: String
    ): Auth
    addDepartment(deptName: String!): Department
    updateUser(userId: ID!, email: String, deptId: ID): User
    updateDepartment(deptId: ID!, deptName: String!): Department
    addLocation(locationName: String!, capacity: Int!): Location
    updateLocation(
      locationName: String
      locationId: ID!
      capacity: Int
      active: Boolean
    ): Location
    deleteLocation(locationId: ID!): Location
    addEvent(
      eventName: String!
      location: ID!
      departments: [ID]
      contactInfo: String!
      contactName: String!
      eventDate: Date!
      eventStartDate: Date
      eventEndDate: Date
    ): Event
    updateEvent(
      eventId: ID!
      eventName: String
      contactInfo: String
      contactName: String
      eventDate: Date
      eventStartDate: Date
      eventEndDate: Date
      eventState: String
    ): Event
    deleteDepartment(deptId: ID!): Department
    addEventTask(
      description: String!
      department: ID!
      eventId: ID!
      startTime: String!
      endTime: String!
    ): EventTask
    updateEventTask(
      taskId: ID!
      description: String
      department: ID
      eventId: ID
      startTime: String
      endTime: String
    ): EventTask
    deleteEventTask(taskId: ID!): EventTask
  }
`;

module.exports = typeDefs;
