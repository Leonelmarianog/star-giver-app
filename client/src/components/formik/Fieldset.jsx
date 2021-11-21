import { useState } from 'react';
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  List,
  ListItem,
  ListIcon,
} from '@chakra-ui/react';
import { useField } from 'formik';
import { WarningIcon } from '@chakra-ui/icons';

const ValidationErrorList = ({ errors }) => (
  <List spacing={3}>
    {Array.isArray(errors) &&
      errors.map((error, index) => (
        <ListItem key={`validation_error_${index}`} as={FormErrorMessage}>
          <ListIcon as={WarningIcon} />
          {error}
        </ListItem>
      ))}
  </List>
);

const FieldSet = ({ Component, label, ...props }) => {
  const { id, name, required } = props;

  const [field, meta] = useField(props);
  const [didFocus, setDidFocus] = useState(false);

  const hasErrors = Array.isArray(meta.error);
  const wasTouched = meta.touched; // input was visited (clicked in and out of the input)
  const isTyping = didFocus && field.value.length > 2; // user is currently introducing characters into the input

  const handleFocus = () => setDidFocus(true);

  return (
    <FormControl isInvalid={hasErrors && (isTyping || wasTouched)} isRequired={required}>
      <FormLabel htmlFor={id || name}>{label}</FormLabel>
      <Component {...props} onFocus={handleFocus} />
      <List spacing={3}>{hasErrors && <ValidationErrorList errors={meta.error} />}</List>
    </FormControl>
  );
};

export default FieldSet;
