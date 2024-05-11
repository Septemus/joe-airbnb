import React from 'react';
import { Button, Form, Input } from 'antd';
import { withFormik, FormikErrors, FormikProps, Field } from 'formik';
import { validationSchema } from '@joe-airbnb/common';
import { InputField } from '../shared/InputField';

export interface FormValues {
  email?: string;
  password?: string;
  confirmPassword: string;
}
interface Prop {}

class RegisterView extends React.Component<FormikProps<FormValues>> {
  static mySubmit: (
    values: FormValues
  ) => Promise<FormikErrors<FormValues> | null> = async values => {
    console.log('this is register:', values);
    return null;
  };

  render() {
    const { handleSubmit } = this.props;
    return (
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600, margin: '0 auto' }}
        autoComplete="off"
        onSubmitCapture={handleSubmit}
      >
        <Field
          name="email"
          component={InputField}
        />
        <Field
          type="Password"
          name="password"
          component={InputField}
        />
        <Field
          type="Password"
          name="confirmPassword"
          component={InputField}
        />
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button
            type="primary"
            htmlType="submit"
          >
            Register
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

const Register = withFormik<Prop, FormValues>({
  validationSchema,
  validateOnChange: true,
  validateOnBlur: true,
  mapPropsToValues: () => ({ email: '', password: '', confirmPassword: '' }),
  handleSubmit: async (values, { props, setErrors }) => {
    const errors = await RegisterView.mySubmit(values);
    if (errors) {
      setErrors(errors);
    }
  }
})(RegisterView);
export default Register;
