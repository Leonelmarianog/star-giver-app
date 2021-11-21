import { Input } from '@chakra-ui/react';
import { useField } from 'formik';

const SimpleInput = (props) => {
  const [field] = useField(props);

  return <Input {...field} {...props} />;
};

export default SimpleInput;
