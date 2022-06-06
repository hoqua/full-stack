import {gql} from "urql";

const GET_USER = gql`
  query GetUser ($args: UserWhereUniqueInput!){
    user(where: $args){
      name
      email
    }
  }
`
