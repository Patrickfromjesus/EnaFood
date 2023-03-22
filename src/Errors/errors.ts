import error from './errorsStatus';

const invalidCredentialsError = {
  status: error.NOT_FOUND,
  message: 'Invalid email address or password',
};

const invalidProductError = {
  status: error.BAD_REQUEST,
  message: 'Invalid product',
};

const badRequestError = {
  status: error.BAD_REQUEST,
  message: 'Invalid fields',
};

const conflictError = {
  status: error.CONFLICT,
  message: 'User already exists',
};

const conflictCartError = {
  status: error.CONFLICT,
  message: 'Cart already exists',
};


const invalidTokenError = {
  status: error.UNAUTHORIZED,
  message: 'Token must be a valid token',
};

export default {
	invalidCredentialsError,
  badRequestError,
  conflictError,
  invalidTokenError,
  invalidProductError,
  conflictCartError,
};
