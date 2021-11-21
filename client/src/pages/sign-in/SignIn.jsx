import { Flex } from '@chakra-ui/react';
import SignInForm from './components/SignInForm';

const SignIn = () => (
  <Flex height='100vh' justifyContent='center' alignItems='center'>
    <SignInForm />
  </Flex>
);

export default SignIn;
