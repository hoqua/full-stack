import { gql } from 'urql'

const SIGN_UP = gql`
  mutation SignUp($args: LoginInput!) {
    signUp(signUpInput: $args) {
      id
      name
      email
    }
  }
`

const LOGIN = gql`
  mutation Login($args: LoginInput!) {
    login(loginInput: $args) {
      id
      name
      email
    }
  }
`
