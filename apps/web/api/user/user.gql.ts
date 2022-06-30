import { gql } from 'urql'

const GET_USER = gql`
  query GetUser($args: UserWhereUniqueInput!) {
    user(where: $args) {
      name
      email
    }
  }
`

const GET_USERS = gql`
  query GetUsers {
    users {
      id
      name
      email
    }
  }
`
