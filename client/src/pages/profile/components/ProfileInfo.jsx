import {
  Box,
  Text,
  Heading,
  VStack,
  HStack,
  IconButton,
  useColorModeValue,
  useDisclosure,
} from '@chakra-ui/react';
import { AiFillEdit } from 'react-icons/ai';
import useAuthContext from '../../../contexts/auth/useAuthContext';
import useMembersContext from '../../../contexts/members/useMembersContext';
import BioForm from './BioForm';
import OccupationForm from './OccupationForm';

const BioInfo = () => {
  const { user } = useAuthContext();
  const { member } = useMembersContext();
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <VStack spacing='4'>
      <HStack>
        <Heading>Bio</Heading>
        {!isOpen && user.fkMemberId === member.id && (
          <IconButton icon={<AiFillEdit />} rounded='full' colorScheme='purple' onClick={onOpen} />
        )}
      </HStack>
      {!isOpen && <Text>{member.bio || 'No bio yet'}</Text>}
      {isOpen && (
        <BioForm initialValues={{ bio: member.bio ? member.bio : '' }} onClose={onClose} />
      )}
    </VStack>
  );
};

const OccupationInfo = () => {
  const { user } = useAuthContext();
  const { member } = useMembersContext();
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <VStack spacing='4'>
      <HStack>
        <Heading>Occupation</Heading>
        {!isOpen && user.fkMemberId === member.id && (
          <IconButton icon={<AiFillEdit />} rounded='full' colorScheme='purple' onClick={onOpen} />
        )}
      </HStack>
      {!isOpen && <Text>{member.occupation || 'No Ocuppation yet'}</Text>}
      {isOpen && (
        <OccupationForm
          initialValues={{ occupation: member.occupation ? member.occupation : '' }}
          onClose={onClose}
        />
      )}
    </VStack>
  );
};

const ProfileInfo = () => {
  const bgColor = useColorModeValue('gray.100', 'gray.600');

  return (
    <Box bgColor={bgColor} rounded='2xl' p='6' boxShadow='2xl' w='100%' maxW='900px'>
      <VStack spacing='6'>
        <Box w='full'>
          <BioInfo />
        </Box>

        <Box w='full'>
          <OccupationInfo />
        </Box>
      </VStack>
    </Box>
  );
};

export default ProfileInfo;
