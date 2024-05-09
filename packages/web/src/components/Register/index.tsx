import React from 'react';
import { Button, Form, Input } from 'antd';
import { withFormik, FormikErrors, FormikProps } from 'formik';
import * as yup from 'yup';
import { validationSchema } from '@joe-airbnb/common';

interface FormValues {
  email?: string;
  password?: string;
  confirmPassword: string;
}
interface Prop {}

class RegisterView extends React.Component<FormikProps<FormValues>> {
  static mySubmit: (
    values: FormValues
  ) => Promise<FormikErrors<FormValues> | null> = async values => {
    console.log(values);
    return null;
  };

  render() {
    const { values, handleChange, handleBlur, handleSubmit, touched, errors } =
      this.props;
    return (
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600, margin: '0 auto' }}
        autoComplete="off"
        onSubmitCapture={handleSubmit}
      >
        <Form.Item
          label="Email"
          help={touched.email && errors.email ? errors.email : ''}
          validateStatus={touched.email && errors.email ? 'error' : undefined}
        >
          <Input
            name="email"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.email}
          />
        </Form.Item>

        <Form.Item
          label="Password"
          help={touched.password && errors.password ? errors.password : ''}
          validateStatus={
            touched.password && errors.password ? 'error' : undefined
          }
        >
          <Input.Password
            name="password"
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </Form.Item>

        <Form.Item
          help={
            touched.confirmPassword && errors.confirmPassword
              ? errors.confirmPassword
              : ''
          }
          validateStatus={
            touched.confirmPassword && errors.confirmPassword
              ? 'error'
              : undefined
          }
          label="Confirm Password"
        >
          <Input.Password
            name="confirmPassword"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.confirmPassword}
          />
        </Form.Item>

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
