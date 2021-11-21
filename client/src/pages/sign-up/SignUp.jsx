import { Flex, Box } from '@chakra-ui/react';
import SignUpForm from './components/SignUpForm';

const SignUp = () => (
  <Flex minHeight='100vh'>
    <Box mx='auto'>
      <SignUpForm />
    </Box>
  </Flex>
);

export default SignUp;
