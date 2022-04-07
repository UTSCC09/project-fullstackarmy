import { DocumentNode, gql } from '@apollo/client';

export const SIGN_IN: DocumentNode = gql`
  query Signin($username: String!, $password: String!) {
    signin(username: $username, password: $password) {
      userId
      token
      tokenExpiration
    }
  }
`;

export const SIGN_UP: DocumentNode = gql`
  mutation Signup($username: String!, $password: String!) {
    signup(username: $username, password: $password) {
      _id
      username
    }
  }
`;
