import { VStack, Button, ButtonGroup } from '@chakra-ui/react';
import * as Yup from 'yup';
import useAuthContext from '../../../contexts/auth/useAuthContext';
import useMembersContext from '../../../contexts/members/useMembersContext';
import useNotificationContext from '../../../contexts/notification/useNotificationContext';
import { getHttpStatusCodeClass } from '../../../utils/utils';
import { Formik, useFormikContext } from 'formik';
import { ChakraFormikForm, Fieldset, SimpleInput } from '../../../components/formik';
import { ErrorMessages, profileDataValidation, HttpStatusCodeClasses } from '../../../enums';

const OccupationForm = ({ onClose }) => {
  const { isValid, dirty, isSubmitting } = useFormikContext();

  return (
    <ChakraFormikForm w='full'>
      <VStack spacing='4'>
        <Fieldset type='text' name='occupation' placeholder='Occupation' Component={SimpleInput} />
        <ButtonGroup alignSelf='flex-end'>
          <Button
            colorScheme='purple'
            type='submit'
            isLoading={isSubmitting}
            disabled={!(dirty && isValid)}
          >
            Save
          </Button>
          <Button colorScheme='purple' onClick={onClose}>
            Cancel
          </Button>
        </ButtonGroup>
      </VStack>
    </ChakraFormikForm>
  );
};

const OccupationFormContainer = ({ initialValues, onClose }) => {
  const { user } = useAuthContext();
  const { update } = useMembersContext();
  const { singleToast } = useNotificationContext();

  const attemptUpdateFieldAndCloseForm = async (fieldData) => {
    await update(user.fkMemberId, fieldData);
    onClose();
  };

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
      await attemptUpdateFieldAndCloseForm(values);
    } catch (error) {
      const { statusCode, message, error: errors } = error;

      if (getHttpStatusCodeClass(statusCode) === HttpStatusCodeClasses.CLIENT_ERROR) {
        setErrors(errors);
      }

      if (getHttpStatusCodeClass(statusCode) === HttpStatusCodeClasses.SERVER_ERROR) {
        singleToast('OCCUPATION_UPDATE_FAILURE', {
          title: message,
          description: ErrorMessages.INTERNAL_SERVER_ERROR,
          status: 'error',
        });
      }
    }
  };

  const validationSchema = Yup.object().shape({
    occupation: Yup.string(profileDataValidation.occupation.types.string).max(
      profileDataValidation.occupation.max.value,
      profileDataValidation.occupation.max.message
    ),
  });

  return (
    <Formik
      initialValues={initialValues}
      validate={asyncValidateSchema(validationSchema)}
      onSubmit={handleSubmit}
    >
      <OccupationForm onClose={onClose} />
    </Formik>
  );
};

export default OccupationFormContainer;
