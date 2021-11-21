import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Center, VStack } from '@chakra-ui/react';
import useMembersContext from '../../contexts/members/useMembersContext';
import { MembersProvider } from '../../contexts/members/MembersContext';
import ProfileHeader from './components/ProfileHeader';
import ProfileInfo from './components/ProfileInfo';
import LoadingOverlay from '../../components/common/LoadingOverlay';
import RequestStatus from '../../enums/request-status';

const Profile = () => {
  const { member, findById, requestStatus, error } = useMembersContext();
  const { id: memberId } = useParams();

  useEffect(() => {
    findById(memberId);
  }, [findById, memberId]);

  if (requestStatus === RequestStatus.LOADING && !member) {
    return <LoadingOverlay appear={true} />;
  }

  if (requestStatus === RequestStatus.FAILURE && !member) {
    return <div style={{ marginTop: '64px' }}>{error.message}</div>;
  }

  return (
    <Box>
      <Box mt='64px' pb='10'>
        <VStack spacing='10'>
          <Box w='100%'>
            <ProfileHeader />
          </Box>

          <Center w='100%' px='10'>
            <ProfileInfo />
          </Center>
        </VStack>
      </Box>
    </Box>
  );
};

const ProfileContainer = () => (
  <MembersProvider>
    <Profile />
  </MembersProvider>
);

export default ProfileContainer;
