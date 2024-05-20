import * as React from 'react';
import { graphql, ChildMutateProps } from '@apollo/client/react/hoc';
import { gql } from '@apollo/client';
import { RegisterMutationVariables, RegisterMutation } from '@/gql/graphql';
// import gql from 'graphql-tag';
interface Props {
  children: (data: {
    submit: (value: RegisterMutationVariables) => Promise<null>;
  }) => JSX.Element | null;
}
class C extends React.PureComponent<
  ChildMutateProps<Props, RegisterMutation, RegisterMutationVariables>
> {
  submit = async (value: RegisterMutationVariables) => {
    console.log('register', value);
    const response = await this.props.mutate({
      variables: value
    });
    console.log('response: ', response);
    return null;
  };
  render() {
    return this.props.children({ submit: this.submit });
  }
}
const registerMutation = gql`
  mutation Register(
    $email: String!
    $password: String!
    $confirmPassword: String!
  ) {
    register(
      email: $email
      password: $password
      confirmPassword: $confirmPassword
    ) {
      ... on Success {
        result
        message
      }
      ... on Error {
        path
        message
      }
    }
  }
`;
export const RegisterController = graphql<
  Props,
  RegisterMutation,
  RegisterMutationVariables
>(registerMutation)(C);
