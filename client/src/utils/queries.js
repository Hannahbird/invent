import { gql } from '@apollo/client';

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
  query events($username: String) {
    events {
      _id
    }
  }
`;

export const QUERY_EVENT = gql`
  query events($username: String) {
    events {
      _id
      eventName
      location
      eventDate
      eventState
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
`

export const QUERY_CHECK_EMAIL = gql`
  query checkEmail($email: String!) {
    checkEmail(email: $email) {
      available
    }
  } 
`


