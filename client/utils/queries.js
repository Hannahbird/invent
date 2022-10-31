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
    query company_departments() {
        deptartments {
            _id
            deptName
        }
    }
`

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
