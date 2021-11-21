const REQUIRED_MESSAGE = 'This field is required';
const TYPE_STRING_MESSAGE = 'This field must be a string';
const TYPE_EMAIL_MESSAGE = 'This field must be an email';
const IMAGES_MESSAGE = 'File format must be jpg or png and have a size of 1mb or less';
const AUTHENTICATION_MSSAGE = 'Invalid username or password';

const createMaxMessage = (max) => `This field must be less than ${max} characters long`;
const createMinMessage = (min) => `This field must be at least ${min} characters long`;

const SignUpValidation = Object.freeze({
  firstName: {
    required: REQUIRED_MESSAGE,
    types: {
      string: TYPE_STRING_MESSAGE,
    },
    max: {
      value: 50,
      message: createMaxMessage(50),
    },
  },
  lastName: {
    required: REQUIRED_MESSAGE,
    types: {
      string: TYPE_STRING_MESSAGE,
    },
    max: {
      value: 50,
      message: createMaxMessage(50),
    },
  },
  email: {
    required: REQUIRED_MESSAGE,
    types: {
      string: TYPE_STRING_MESSAGE,
      email: TYPE_EMAIL_MESSAGE,
    },
    max: {
      value: 60,
      message: createMaxMessage(60),
    },
  },
  password: {
    required: REQUIRED_MESSAGE,
    types: {
      string: TYPE_STRING_MESSAGE,
    },
    max: {
      value: 16,
      message: createMaxMessage(16),
    },
    min: {
      value: 8,
      message: createMinMessage(8),
    },
  },
});

const SignInValidation = Object.freeze({
  authentication: AUTHENTICATION_MSSAGE,
});

const profileDataValidation = Object.freeze({
  profileImages: IMAGES_MESSAGE,
  bio: {
    types: {
      string: TYPE_STRING_MESSAGE,
    },
    max: {
      value: 1000,
      message: createMaxMessage(1000),
    },
  },
  occupation: {
    types: {
      string: TYPE_STRING_MESSAGE,
    },
    max: {
      value: 100,
      message: createMaxMessage(100),
    },
  },
});

export { SignUpValidation, SignInValidation, profileDataValidation };
