import { Heading, Button, Text, Link, Stack, useColorModeValue } from '@chakra-ui/react';
import { Link as RouterLink, useHistory } from 'react-router-dom';
import { Formik, useFormikContext } from 'formik';
import * as Yup from 'yup';
import { ChakraFormikForm, Fieldset, SimpleInput, PasswordInput } from '../../../components/formik';
import useAuthContext from '../../../contexts/auth/useAuthContext';
import useNotificationContext from '../../../contexts/notification/useNotificationContext';
import { ErrorMessages, HttpStatusCodeClasses, SignUpValidation } from '../../../enums';
import { getHttpStatusCodeClass } from '../../../utils/utils';

const SignUpForm = () => {
  const { isValid, dirty, isSubmitting } = useFormikContext();
  const bgColor = useColorModeValue('gray.100', 'gray.600');
  const linkColor = useColorModeValue('purple.500', 'purple.200');

  return (
    <ChakraFormikForm
      display='flex'
      flexDirection='column'
      justifyContent='center'
      backgroundColor={bgColor}
      py='12'
      px='6'
      w='500px'
      minW='300px'
      minH='100vh'
    >
      <Heading mb='6'>Sign Up</Heading>

      <Stack spacing='3'>
        <Fieldset
          type='text'
          name='firstName'
          placeholder='First Name'
          label='First Name'
          required={true}
          Component={SimpleInput}
        />
        <Fieldset
          type='text'
          name='lastName'
          placeholder='Last Name'
          label='Last Name'
          required={true}
          Component={SimpleInput}
        />
        <Fieldset
          type='email'
          name='email'
          placeholder='example@email.com'
          label='Email'
          required={true}
          Component={SimpleInput}
        />
        <Fieldset
          type='password'
          name='password'
          placeholder='Password'
          label='Password'
          required={true}
          Component={PasswordInput}
        />
      </Stack>

      <Stack spacing='3' mt='6'>
        <Button
          colorScheme='purple'
          type='submit'
          disabled={!(isValid && dirty)}
          isLoading={isSubmitting}
        >
          Sign Up
        </Button>

        <Text textAlign='center'>
          Already have an account?&nbsp;
          <Link as={RouterLink} color={linkColor} to='/sign-in'>
            Sign In
          </Link>
        </Text>
      </Stack>
    </ChakraFormikForm>
  );
};

const SignUpFormContainer = () => {
  const { signUp } = useAuthContext();
  const history = useHistory();
  const { singleToast } = useNotificationContext();

  const attemptSignUpAndPageRedirect = async (signInData) => {
    await signUp(signInData);
    history.push('/');
  };

  // REMINDER: The Formik's "Formik" component doesn't let me change the "abortEarly" property which tells formik if it should stop validating errors as soon as it finds one.
  // If I want to show multiple validation erros per field, I need to tell Formik to NOT abort early, but this can't be done using the "Formik" component directly.
  // To solve this, instead of using the "ValidationSchema" prop I use the "Validate" prop which allows me to pass a validation function.
  // This function validates the Yup schema, which allows me to return a custom error object.
  // With this setup, I can show multiple errors per field, which is what I want.
  const asyncValidateSchema = (schema) => (values) =>
    schema
      .validate(values, { abortEarly: false, strict: false })
      .then(() => ({}))
      .catch(({ inner }) =>
        inner.reduce(
          (memo, { path, message }) => ({ ...memo, [path]: (memo[path] || []).concat(message) }),
          {}
        )
      );

  const handleSubmit = async (values, { setErrors }) => {
    try {
      await attemptSignUpAndPageRedirect(values);
    } catch (error) {
      const { statusCode, message, error: errors } = error;

      if (getHttpStatusCodeClass(statusCode) === HttpStatusCodeClasses.CLIENT_ERROR) {
        setErrors(errors);
      }

      if (getHttpStatusCodeClass(statusCode) === HttpStatusCodeClasses.SERVER_ERROR) {
        singleToast('SIGN_UP_FAILURE', {
          title: message,
          description: ErrorMessages.INTERNAL_SERVER_ERROR,
          status: 'error',
        });
      }
    }
  };

  const initialValues = { firstName: '', lastName: '', email: '', password: '' };

  // REMINDER: Looks terrible, maybe I can do it better
  const validationSchema = Yup.object({
    firstName: Yup.string(SignUpValidation.firstName.types.string)
      .required(SignUpValidation.firstName.required)
      .max(SignUpValidation.firstName.max.value, SignUpValidation.firstName.max.message),
    lastName: Yup.string(SignUpValidation.lastName.types.string)
      .required(SignUpValidation.lastName.required)
      .max(SignUpValidation.lastName.max.value, SignUpValidation.lastName.max.message),
    email: Yup.string(SignUpValidation.email.types.string)
      .email(SignUpValidation.email.types.email)
      .required(SignUpValidation.email.required)
      .max(SignUpValidation.email.max.value, SignUpValidation.email.max.message),
    password: Yup.string(SignUpValidation.password.types.string)
      .required(SignUpValidation.password.required)
      .min(SignUpValidation.password.min.value, SignUpValidation.password.min.message)
      .max(SignUpValidation.password.max.value, SignUpValidation.password.max.message),
  });

  return (
    <Formik
      initialValues={initialValues}
      validate={asyncValidateSchema(validationSchema)}
      onSubmit={handleSubmit}
    >
      <SignUpForm />
    </Formik>
  );
};

export default SignUpFormContainer;
