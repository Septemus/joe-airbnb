import * as React from 'react';
import { FieldProps } from 'formik';
import { Form, Input } from 'antd';
import { capitalizeFirstLetter } from '@joe-airbnb/common';
import { FormValues } from '../../Register';

const FormItem = Form.Item;
type inputSubs = 'Group' | 'Search' | 'TextArea' | 'Password' | 'OTP';
export const InputField: React.FC<FieldProps<any>> = ({
  field, // { name, value, onChange, onBlur }
  form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
  ...props
}: any) => {
  // debugger;
  const errorMsg = touched[field.name] && errors[field.name];
  const SelectedInput = props.type ? Input[props.type as inputSubs] : Input;
  return (
    <FormItem
      help={errorMsg}
      validateStatus={errorMsg ? 'error' : undefined}
      label={capitalizeFirstLetter(field.name)}
    >
      {
        <SelectedInput
          {...field}
          {...props}
        />
      }
    </FormItem>
  );
};
