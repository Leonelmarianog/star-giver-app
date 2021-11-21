import { Stack, Flex, Box } from '@chakra-ui/react';
import { MembersProvider } from '../../contexts/members/MembersContext';
import { SearchProvider } from '../../contexts/search/searchContext';
import MembersList from './components/MembersList';
import SearchInput from './components/SearchInput';

// Have to add padding to each child instead of container otherwise box-shadow is cut off
const Members = () => {
  return (
    <SearchProvider>
      <MembersProvider>
        <Flex justify='center' align='center'>
          <Stack spacing='10' pt='28' pb='10' flexBasis='100%' maxW='1500px' align='center'>
            <Box px='10' w={['100%', '100%', '500px']}>
              <SearchInput />
            </Box>
            <Box w='100%' px='5'>
              <MembersList />
            </Box>
          </Stack>
        </Flex>
      </MembersProvider>
    </SearchProvider>
  );
};

export default Members;
