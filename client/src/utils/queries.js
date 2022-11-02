import { gql } from '@apollo/client';

export const QUERY_EVENTS = gql`
query events(){
    _id
    
}`;

export const QUERY_USER = gql`
  query user($username: String!) {
    user(username: $username) {
      _id
      username
      email
    }
  }
`;

export const QUERY_ME_BASIC = gql`
  {
    me {
      _id
      username
      email
      event
    }
  }
`;
