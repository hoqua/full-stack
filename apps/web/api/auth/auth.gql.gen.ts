import * as Types from '@full-stack/client/generated/graphql-types';

import { gql } from 'urql';
import * as Urql from 'urql';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type SignUpMutationVariables = Types.Exact<{
  args: Types.LoginInput;
}>;


export type SignUpMutation = { __typename?: 'Mutation', signUp: { __typename?: 'User', id: string, name?: string | null, email: string } };

export type LoginMutationVariables = Types.Exact<{
  args: Types.LoginInput;
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'User', id: string, name?: string | null, email: string } };


export const SignUpDocument = gql`
    mutation SignUp($args: LoginInput!) {
  signUp(signUpInput: $args) {
    id
    name
    email
  }
}
    `;

export function useSignUpMutation() {
  return Urql.useMutation<SignUpMutation, SignUpMutationVariables>(SignUpDocument);
};
export const LoginDocument = gql`
    mutation Login($args: LoginInput!) {
  login(loginInput: $args) {
    id
    name
    email
  }
}
    `;

export function useLoginMutation() {
  return Urql.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument);
};