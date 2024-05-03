import React from 'react';
import { Button, Form, Input } from 'antd';
import { withFormik, FormikErrors, FormikProps } from "formik";


interface FormValues {
  username?: string;
  password?: string;
  confirmPassword?:string;
}
interface Prop {

}

class RegisterView extends React.Component<FormikProps<FormValues>>  {
  static mySubmit:(values: FormValues) => Promise<FormikErrors<FormValues> | null>=async ( values )=>{
    console.log(values)
    return null
  }

  render() {
    const { values, handleChange, handleBlur, handleSubmit } = this.props;
    return (
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600,margin:'0 auto' }}
        autoComplete="off"
        onSubmitCapture={handleSubmit}
      >
        <Form.Item
          label="Username"
          name="username"
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <Input 
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.username}
          />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password 
            value={values.password}
          />
        </Form.Item>

        <Form.Item
          label="Confirm Password"
          name="confirmPassword"
          rules={[{ required: true, message: 'Please confirm your password!' }]}
        >
          <Input.Password 
            value={values.confirmPassword}
          />
        </Form.Item>


        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Register
          </Button>
        </Form.Item>
      </Form>
    )
  }
  
}

const Register = withFormik<Prop, FormValues>({
  mapPropsToValues: () => ({ username: "", password: "",confirmPassword:"" }),
  handleSubmit: async (values, { props, setErrors }) => {
    const errors = await RegisterView.mySubmit(values);
    if (errors) {
      setErrors(errors);
    }
  }
})(RegisterView);
export default Register