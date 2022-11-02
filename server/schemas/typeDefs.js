const { gql } = require('apollo-server-express');

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
        checkEmail(email: String!): Check
        checkUsername(username: String!): Check
    }

    type Mutation {
        login(email: String!, password: String!): Auth
        addUser(username: String!, email: String!, password: String!, signUpCode: String, newCompany: Boolean, companyTitle: String): Auth
        addDepartment(deptName: String!): Department
        updateUser(userId: ID!, email: String, deptId: ID): User
        updateDepartment(deptId: ID!, deptName: String!): Department
        deleteDepartment(deptId: ID!): Department
    }
`;

module.exports = typeDefs;