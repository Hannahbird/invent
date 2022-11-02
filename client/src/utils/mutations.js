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
`

export const ADD_USER = gql`
    mutation addUser(
        $username: String!
        $email: String!
        $password: String!
        $signUpCode: String
        $newCompany: Boolean
        $companyTitle: String) {
        addUser(
            username: $username
            email: $email
            password: $password
            signUpCode: $signUpCode
            newCompany: $newCompany
            companyTitle: $companyTitle) {
                token
                user {
                    _id
                    username
                    department {
                        _id
                        company
                    }
                } 
            }
    }
`

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
`

export const ADD_DEPARTMENT = gql`
    mutation addDepartment($deptName: String!) {
        addDepartment(deptName: $deptName) {
            _id
            deptName
            signUpLink
        }
    }
`

export const UPDATE_DEPARTMENT = gql`
    mutation updateDepartment($deptId: ID!, $deptName: String!) {
        updateDepartment(deptId: $deptId, deptName: $deptName) {
            _id
            deptName
            SignUpLink
        }
    }
`

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
`
