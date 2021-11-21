import {
  Heading,
  Button,
  Text,
  Link,
  Alert,
  AlertIcon,
  Stack,
  useColorModeValue,
} from '@chakra-ui/react';
import { Link as RouterLink, useHistory } from 'react-router-dom';
import { Formik, useFormikContext } from 'formik';
import * as Yup from 'yup';
import { ChakraFormikForm, SimpleInput, PasswordInput } from '../../../components/formik';
import useAuthContext from '../../../contexts/auth/useAuthContext';
import useNotificationContext from '../../../contexts/notification/useNotificationContext';
import { ErrorMessages, HttpStatusCodeClasses } from '../../../enums';
import { getHttpStatusCodeClass } from '../../../utils/utils';

export const SignInForm = () => {
  const { isValid, dirty, errors, isSubmitting } = useFormikContext();
  const bgColor = useColorModeValue('gray.100', 'gray.600');
  const linkColor = useColorModeValue('purple.500', 'purple.200');

  return (
    <ChakraFormikForm
      display='flex'
      flexDirection='column'
      bgColor={bgColor}
      p='12'
      rounded='6'
      w='400px'
      minW='300px'
      boxShadow='2xl'
    >
      <Heading mb='6'>Sign In</Heading>

      <Stack spacing='3'>
        <SimpleInput type='email' name='email' placeholder='Email' isRequired={true} />
        <PasswordInput name='password' placeholder='Password' isRequired={true} />
      </Stack>

      {errors.authentication && (
        <Alert status='error' mt='6'>
          <AlertIcon />
          {errors.authentication}
        </Alert>
      )}

      <Stack spacing='3' display='flex' alignItems='center' mt='6'>
        <Button
          colorScheme='purple'
          type='submit'
          disabled={!(dirty && isValid)}
          isLoading={isSubmitting}
        >
          Sign In
        </Button>

        <Text>
          Don't have an account yet?&nbsp;
          <Link as={RouterLink} color={linkColor} to='/sign-up'>
            Sign Up
          </Link>
        </Text>
      </Stack>
    </ChakraFormikForm>
  );
};

const SignInFormContainer = () => {
  const { signIn } = useAuthContext();
  const history = useHistory();
  const { singleToast } = useNotificationContext();

  const attemptSignInAndPageRedirect = async (signInData) => {
    await signIn(signInData);
    history.push('/');
  };

  const handleSubmit = async (values, { setErrors }) => {
    try {
      await attemptSignInAndPageRedirect(values);
    } catch (error) {
      const { statusCode, message, error: errors } = error;

      if (getHttpStatusCodeClass(statusCode) === HttpStatusCodeClasses.CLIENT_ERROR) {
        setErrors({
          authentication: errors,
        });
      }

      if (getHttpStatusCodeClass(statusCode) === HttpStatusCodeClasses.SERVER_ERROR) {
        singleToast('SIGN_IN_FAILURE', {
          title: message,
          description: ErrorMessages.INTERNAL_SERVER_ERROR,
          status: 'error',
        });
      }
    }
  };

  const initialValues = { email: '', password: '' };

  // REMINDER: I don't need to specify anything more here, I only care that the fields are required and are of the specified type
  // I only tell the user one of these was invalid, but not which one.
  const validationSchema = Yup.object({
    email: Yup.string().email().required(),
    password: Yup.string().required(),
  });

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      <SignInForm />
    </Formik>
  );
};

export default SignInFormContainer;
