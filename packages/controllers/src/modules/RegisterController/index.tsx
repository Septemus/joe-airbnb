import * as React from 'react';
import { graphql, ChildMutateProps } from '@apollo/client/react/hoc';
import { gql } from '@apollo/client';
// import gql from 'graphql-tag';
interface Props {
  children: (data: {
    submit: (value: any) => Promise<null>;
  }) => JSX.Element | null;
}
class C extends React.PureComponent<ChildMutateProps<Props, any, any>> {
  submit = async (value: any) => {
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
  mutation ($email: String!, $password: String!, $confirmPassword: String!) {
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
export const RegisterController = graphql(registerMutation)(C);
