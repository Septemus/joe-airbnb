import * as yup from 'yup';
import {
  invalidEmail,
  passwordNotLongEnough,
  passwordNotMatch,
  usernameNotLongEnough
} from '../errorMessages';

export const registerPasswordValidation = yup
  .string()
  .min(3, passwordNotLongEnough)
  .max(255)
  .required();
export const registerUsernameValidation = yup
  .string()
  .min(3, usernameNotLongEnough)
  .max(255)
  .email(invalidEmail)
  .required();
export const registerConfirmPasswordValidation = yup
  .string()
  .oneOf([yup.ref('password')], passwordNotMatch);
