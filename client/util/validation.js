import Validator from 'validator';
import isEmpty from 'lodash/isEmpty';

export default function validateInput(data) {
  const errors = {};

  if (Validator.isEmpty(data.displayName)) {
    errors.displayName = 'username is required';
  }
  if (Validator.isEmpty(data.email)) {
    errors.email = 'Email is invalid';
  }
  if (!Validator.isEmail(data.email)) {
    errors.email = 'Email is required';
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = 'Password is required';
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
}
