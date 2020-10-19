export default `
  type Query {
    getStocks: [Stock]!
  }

  type Stock {
    id: ID!
    name: String!
    price: Float!
    createdAt: String!
  }

  type Mutation {
    randomizeStocks: [Stock]!
  }
`;
