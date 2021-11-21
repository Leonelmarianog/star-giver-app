import { useState } from 'react';
import { useField } from 'formik';
import { InputGroup, Input, InputRightElement, Button } from '@chakra-ui/react';

const PasswordInput = (props) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [field] = useField(props);

  const handleClick = () => setIsPasswordVisible(!isPasswordVisible);

  return (
    <InputGroup size='md'>
      <Input pr='4.5rem' {...field} {...props} type={isPasswordVisible ? 'text' : 'password'} />
      <InputRightElement width='4.5rem'>
        <Button h='1.75rem' size='sm' onClick={handleClick}>
          {isPasswordVisible ? 'Hide' : 'Show'}
        </Button>
      </InputRightElement>
    </InputGroup>
  );
};

export default PasswordInput;
