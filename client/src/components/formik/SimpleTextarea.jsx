import { Textarea } from '@chakra-ui/react';
import { useField } from 'formik';

const SimpleTextarea = (props) => {
  const [field] = useField(props);

  return <Textarea {...field} {...props} />;
};

export default SimpleTextarea;
