import React from 'react';
import { Button, Form } from 'antd';
import { withFormik, FormikErrors, FormikProps, Field } from 'formik';
import { validationSchema } from '@joe-airbnb/common';
import { InputField } from '../../shared/InputField';

export interface FormValues {
  email?: string;
  password?: string;
  confirmPassword: string;
}
interface Prop {
  submit: (value: any) => Promise<null>;
}

class C extends React.Component<FormikProps<FormValues> & Prop> {
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

const RegisterView = withFormik<Prop, FormValues>({
  validationSchema,
  validateOnChange: true,
  validateOnBlur: true,
  mapPropsToValues: () => ({ email: '', password: '', confirmPassword: '' }),
  handleSubmit: async (values, { props, setErrors }) => {
    const errors = await props.submit(values);
    if (errors) {
      setErrors(errors);
    }
  }
})(C);
export default RegisterView;
