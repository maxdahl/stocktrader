export default `
  type Query {
    portfolios(userId: ID!): [Portfolio]!
    portfolio(userId: ID!, portfolioId: ID!): Portfolio!
  }

  type Portfolio {
    id: ID!
    owner: User!
    stock: Stock!
    amount: Int!
    originalPrice: Float!
    createdAt: String!
  }

  type Mutation {
    createPortfolio(data: CreatePortfolioInput!): Portfolio!
    updatePortfolio(id: ID!, userId: ID!, data: UpdatePortfolioInput!): Portfolio
    deletePortfolio(id: ID!, userId: ID!): Portfolio
  }

  input CreatePortfolioInput {
    owner: ID!
    stock: ID!
    amount: Int!
    originalPrice: Float!
  }

  input UpdatePortfolioInput {
    amount: Float
    buy: Boolean
  }
`;
