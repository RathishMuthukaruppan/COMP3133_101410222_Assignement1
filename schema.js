const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    username: String!
    email: String!
    created_at: String
    updated_at: String
  }

  type Employee {
    _id: ID!
    first_name: String!
    last_name: String!
    email: String!
    gender: String!
    designation: String!
    salary: Float!
    date_of_joining: String!
    department: String!
    employee_photo: String
    created_at: String
    updated_at: String
  }

  type AuthPayload {
    token: String!
    user: User!
  }

  type Query {
    login(usernameOrEmail: String!, password: String!): AuthPayload
    getAllEmployees: [Employee]
    searchEmployeeByEID(eid: ID!): Employee
    searchEmployeeByDesignationOrDepartment(designation: String, department: String): [Employee]
  }

  type Mutation {
    signup(username: String!, email: String!, password: String!): User
    addNewEmployee(
      first_name: String!,
      last_name: String!,
      email: String!,
      gender: String!,
      designation: String!,
      salary: Float!,
      date_of_joining: String!,
      department: String!,
      employee_photo: String
    ): Employee

    updateEmployeeByEID(
      eid: ID!,
      first_name: String,
      last_name: String,
      email: String,
      gender: String,
      designation: String,
      salary: Float,
      date_of_joining: String,
      department: String,
      employee_photo: String
    ): Employee

    deleteEmployeeByEID(eid: ID!): String
  }
`;

module.exports = typeDefs;
