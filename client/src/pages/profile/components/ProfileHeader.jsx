import { Flex, Box, useColorModeValue } from '@chakra-ui/react';
import useMembersContext from '../../../contexts/members/useMembersContext';
import HeaderBottom from './HeaderBottom';
import HeaderCoverPhoto from './HeaderCoverPhoto';

const ProfileHeader = () => {
  const { member } = useMembersContext();
  const bgColor = useColorModeValue('gray.100', 'gray.600');

  return (
    <Box bgColor={bgColor} pb='5' boxShadow='2xl'>
      <Box>
        <HeaderCoverPhoto {...member} />
      </Box>
      <Flex justify='center'>
        <HeaderBottom {...member} />
      </Flex>
    </Box>
  );
};

export default ProfileHeader;
