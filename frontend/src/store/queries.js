import gql from "graphql-tag";

// Auth
export const SIGNIN_QUERY = gql`
  mutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      id
      email
      funds
      portfolio {
        id
        stock {
          id
        }
        amount
        originalPrice
      }
    }
  }
`;

export const SIGNUP_QUERY = null;

export const GET_USER_QUERY = gql`
  {
    getUser {
      id
      email
      funds
      portfolio {
        id
        stock {
          id
        }
        amount
        originalPrice
      }
    }
  }
`;

// User
export const UPDATE_USER = gql`
  mutation($id: ID!, $data: UpdateUserInput!) {
    updateUser(id: $id, data: $data) {
      email
      funds
    }
  }
`;

// Portfolio
export const UPDATE_PORTFOLIO = gql`
  mutation($id: ID!, $userId: ID!, $data: UpdatePortfolioInput!) {
    updatePortfolio(id: $id, userId: $userId, data: $data) {
      amount
    }
  }
`;

export const CREATE_PORTFOLIO = gql`
  mutation($data: CreatePortfolioInput!) {
    createPortfolio(data: $data) {
      id
      amount
      stock {
        id
      }
    }
  }
`;
