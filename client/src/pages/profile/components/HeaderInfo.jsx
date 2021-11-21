import { Text, Heading, VStack } from '@chakra-ui/react';

const HeaderInfo = ({ firstName, lastName, starsGained, starsGiven }) => {
  return (
    <VStack justify='center'>
      <Heading>
        {firstName} {lastName}
      </Heading>
      <VStack align='flex-start'>
        <Text fontWeight='bold'>Stars Gained: {starsGained}</Text>
        <Text fontWeight='bold'>Stars Given: {starsGiven}</Text>
      </VStack>
    </VStack>
  );
};

export default HeaderInfo;
