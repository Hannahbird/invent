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

    type Query {
        me: User
        depts: [Department]
    }

    type Mutation {
        login(email: String!, password: String!): Auth
        addUser(username: String!, email: String!, password: String!, signUpCode: String, newCompany: Boolean, companyTitle: String): Auth
    }
`;

module.exports = typeDefs;