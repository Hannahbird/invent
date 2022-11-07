import { gql } from "@apollo/client";

// export const QUERY_USER = gql`
//     query user($username: String!) {
//         user(username: $username) {
//             _id
//             username
//             email
//             friendCount
//             friends {
//                 _id
//                 username
//             }
//             thoughts {
//                 _id
//                 thoughtText
//                 createdAt
//                 reactionCount
//             }
//         }
//     }
// `

export const QUERY_COMPANY_DEPTS = gql`
  query company_departments {
    departments {
      _id
      deptName
    }
  }
`;

export const QUERY_COMPANY_DEPT = gql`
  query company_department($deptId: String!) {
    department(deptId: $deptId) {
      _id
      deptName
      signUpLink
    }
  }
`;

export const QUERY_LOCATIONS = gql`
  query locations {
    locations {
      _id
      locationName
      capacity
    }
  }
`;

export const QUERY_LOCATIONS_BYCODE = gql`
  query locationsByCode($code: String!) {
    locationsByCode(code: $code) {
      locations: { 
        _id
        locationName
        capacity
      }
      company: {
        title
        companyEmail
      }
    }
  }
`;

export const QUERY_ME = gql`
  {
    me {
      _id
      username
      email
      department {
        _id
        deptName
        company {
          _id
          title
        }
      }
    }
  }
`;

export const QUERY_EVENTS = gql`
  query Events {
    events {
      _id
      eventName
      location {
        _id
        locationName
      }
      contactInfo
      contactName
      eventDate
      eventStartDate
      eventEndDate
      eventState
    }
  }
`;

export const QUERY_DEPT_EVENTS = gql`
  query deptEvents {
    deptEvents {
      _id
      eventName
      location {
        _id
        locationName
      }
      contactInfo
      contactName
      eventDate
      eventStartDate
      eventEndDate
      eventState
    }
  }
`;

export const QUERY_EVENT = gql`
  query Event($eventId: String!) {
    event(eventId: $eventId) {
      _id
      eventName
      location {
        _id
        locationName
        capacity
      }
      contactInfo
      contactName
      eventDate
      eventStartDate
      eventEndDate
      eventState
    }
  }
`;

export const QUERY_EVENTTASKS = gql`
  query eventTasks($eventId: String!) {
    eventTasks(eventId: $eventId) {
      _id
      description
      department {
        _id
        deptName
      }
      startTime
      endTime
    }
  }
`;

export const QUERY_ME_BASIC = gql`
  {
    me {
      _id
      username
      email
    }
  }
`;

export const QUERY_CHECK_USERNAME = gql`
  query checkUsername($username: String!) {
    checkUsername(username: $username) {
      available
    }
  }
`;

export const QUERY_CHECK_EMAIL = gql`
  query checkEmail($email: String!) {
    checkEmail(email: $email) {
      available
    }
  }
`;
