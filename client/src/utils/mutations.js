import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
        department {
          _id
          company {
            _id
          }
        }
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser(
    $username: String!
    $email: String!
    $password: String!
    $signUpCode: String
    $newCompany: Boolean
    $companyTitle: String
  ) {
    addUser(
      username: $username
      email: $email
      password: $password
      signUpCode: $signUpCode
      newCompany: $newCompany
      companyTitle: $companyTitle
    ) {
      token
      user {
        _id
        username
        department {
          _id
          company {
            _id
            title
          }
        }
      }
    }
  }
`;

export const UPDATE_USER = gql`
  mutation updateUser($userId: ID!, $email: String, $deptId: ID) {
    updateUser(userId: $userId, email: $email, deptId: $deptId) {
      _id
      username
      email
      department {
        _id
        deptName
      }
    }
  }
`;

export const ADD_DEPARTMENT = gql`
  mutation addDepartment($deptName: String!) {
    addDepartment(deptName: $deptName) {
      _id
      deptName
      signUpLink
    }
  }
`;

export const UPDATE_DEPARTMENT = gql`
  mutation updateDepartment($deptId: ID!, $deptName: String!) {
    updateDepartment(deptId: $deptId, deptName: $deptName) {
      _id
      deptName
    }
  }
`;

export const DELETE_DEPARTMENT = gql`
  mutation Mutation($deptId: ID!) {
    deleteDepartment(deptId: $deptId) {
      _id
      deptName
      teamMembers {
        _id
        username
      }
    }
  }
`;

export const ADD_EVENTTASK = gql`
  mutation addEventTask(
    $description: String!
    $department: ID!
    $eventId: ID!
    $startTime: String
    $endTime: String
  ) {
    addEventTask(
      description: $description
      department: $department
      eventId: $eventId
      startTime: $startTime
      endTime: $endTime
    ) {
      _id
      description
      department {
        deptName
      }
      eventId {
        eventName
      }
    }
  }
`;

export const UPDATE_EVENTTASK = gql`
  mutation updateEventTask(
    $taskId: ID!
    $description: String
    $department: ID
    $eventId: ID
    $startTime: String
    $endTime: String
  ) {
    updateEventTask(
      taskId: $taskId
      description: $description
      department: $department
      eventId: $eventId
      startTime: $startTime
      endTime: $endTime
    ) {
      _id
      description
      department {
        deptName
      }
      eventId {
        eventName
      }
      startTime
      endTime
    }
  }
`;
export const DELETE_EVENTTASK = gql`
  mutation deleteEventTask($taskId: ID!) {
    deleteEventTask(taskId: taskId) {
      _id
    }
  }
`;
export const ADD_EVENT = gql`
  mutation Mutation(
    $contactName: String!
    $eventDate: Date!
    $eventName: String!
    $location: ID!
    $contactInfo: String!
  ) {
    addEvent(
      contactName: $contactName
      eventDate: $eventDate
      eventName: $eventName
      location: $location
      contactInfo: $contactInfo
    ) {
      _id
      eventName
      location {
        _id
        locationName
      }
      contactInfo
      contactName
      eventDate
      eventState
    }
  }
`;
export const ADD_LOCATION = gql`
  mutation Mutation($locationName: String!, $capacity: Int!) {
    addLocation(locationName: $locationName, capacity: $capacity) {
      _id
      locationName
      capacity
      company {
        _id
        title
      }
    }
  }
`;
export const UPDATE_LOCATION = gql`
  mutation Mutation(
    $locationId: ID!
    $locationName: String
    $capacity: Int
    $active: Boolean
  ) {
    updateLocation(
      locationId: $locationId
      locationName: $locationName
      capacity: $capacity
      active: $active
    ) {
      _id
      locationName
      capacity
    }
  }
`;
export const DELETE_LOCATION = gql`
  mutation Mutation($locationId: ID!) {
    deleteLocation(locationId: $locationId) {
      _id
      locationName
      capacity
    }
  }
`;
//if you want to delete a location send update location the id and active = false
export const UPDATE_EVENT = gql`
  mutation Mutation($eventId: ID!, $contactName: String, $eventName: String) {
    updateEvent(
      eventId: $eventId
      contactName: $contactName
      eventName: $eventName
    ) {
      _id
      eventName
      location {
        _id
        locationName
      }
      contactInfo
      contactName
      eventDate
    }
  }
`;
