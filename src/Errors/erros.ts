import error from './errorsStatus';

const invalidCredentialsError = {
  status: error.NOT_FOUND,
  message: 'Invalid email address or password',
};

const badRequestError = {
  status: error.BAD_REQUEST,
  message: 'Invalid fields',
};

const conflictError = {
  status: error.CONFLICT,
  message: 'User already exists',
};

const invalidTokenError = {
  status: error.UNAUTHORIZED,
  message: 'Token must be a valid token',
};

const forbiddenError = {
  status: error.FORBIDDEN,
  message: 'Access Denied',
};

export default {
	invalidCredentialsError,
  badRequestError,
  conflictError,
  invalidTokenError,
  forbiddenError,
};