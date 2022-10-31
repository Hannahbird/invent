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
