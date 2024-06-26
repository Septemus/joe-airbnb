import * as yup from 'yup';
import {
  registerConfirmPasswordValidation,
  registerPasswordValidation,
  registerUsernameValidation
} from './yupSchemas';
const validationSchema = yup.object().shape({
  email: registerUsernameValidation,
  password: registerPasswordValidation,
  confirmPassword: registerConfirmPasswordValidation
});
import capitalizeFirstLetter from './commonUtils/capitalizeFirstLetter';
export { validationSchema, capitalizeFirstLetter };
