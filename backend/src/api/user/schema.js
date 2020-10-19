export default `
  type Query {
    getUser: User
  }

  type User {
    id: ID!
    email: String!
    funds: Float!
    portfolio: [Portfolio]!
    createdAt: String!
  }

  type Mutation {
    createUser(email: String!, password: String!): User!
    updateUser(id: ID!, data: UpdateUserInput): User!
    login(email: String!, password: String!): User!
  }

  input UpdateUserInput {
    funds: Float
  }
`;
