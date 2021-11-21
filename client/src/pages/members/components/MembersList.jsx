import { useEffect } from 'react';
import { Flex, Box, SimpleGrid, chakra, Image } from '@chakra-ui/react';
import InfiniteScroll from 'react-infinite-scroll-component';
import useMembersContext from '../../../contexts/members/useMembersContext';
import useSearchContext from '../../../contexts/search/useSearchContext';
import { ErrorMessages, RequestStatus, Pagination } from '../../../enums';
import Member from './Member';
import WowLookNothingImage from '../../../media/images/wow-look-nothing.jpg';
import useNotificationContext from '../../../contexts/notification/useNotificationContext';

// IMPORTANT! Do NOT use the same "key" prop when rendering multiple lists of the same component conditionally
// This makes React think they are the same element just with different props
// When unmounting the list and mounting a new one, React will keep those elements that have the same "key" prop
// These elements only re-render, so if there is state initialized based on props, that state will not update unless a "useEffect" hook is used to update the state after the re-render
const MEMBERS_SKELETONS = Array.from({ length: Pagination.LIMIT }, (_, index) => ({
  id: `member_skeleton_${index + 1}`,
}));

export const MembersList = ({ members }) => (
  <SimpleGrid columns={[1, 2, 3]} spacing={10} justifyItems='center' alignItems='center' p='5'>
    {members
      ? members.map((member) => <Member key={member.id} {...member} />)
      : MEMBERS_SKELETONS.map((skeleton) => <Member key={skeleton.id} />)}
  </SimpleGrid>
);

const InfiniteScrollChakra = chakra(InfiniteScroll);

const InfiniteScrollEndMessage = () => (
  <Image
    src={WowLookNothingImage}
    alt='Wow, Look! Nothing!'
    borderRadius='md'
    w={[300, 400, 500]}
  />
);

const MembersListContainer = () => {
  const { members, count, requestStatus, error, findAll, findByQuery } = useMembersContext();
  const { searchValue, isSearching, didSearch } = useSearchContext();
  const { singleToast } = useNotificationContext();

  useEffect(() => {
    findAll(Pagination.LIMIT);
  }, [findAll]);

  // REMINDER: "MembersListContainer" renders multiple times, if I don't use an effect, I end up with multiple toast on screen and an error
  // I want a single toast per error, so I use an useEffect hook which triggers only when "requestStatus", or "error", or "singleToast" changes
  useEffect(() => {
    if (requestStatus === RequestStatus.FAILURE) {
      singleToast('LOAD_MEMBERS_FAILURE', {
        title: error.message,
        description: ErrorMessages.INTERNAL_SERVER_ERROR,
        status: 'error',
      });
    }
  }, [requestStatus, error, singleToast]);

  const handleInfiniteScroll = () => {
    if (didSearch) {
      return findByQuery(searchValue, members.length + Pagination.LIMIT);
    }

    findAll(members.length + Pagination.LIMIT);
  };

  // REMINDER: I wanted to show loading skeletons on two different cases
  // Case 1: On page load when there are no members in memory
  // Case 2: When the user loads members by making a request through the search bar
  // Why I need to do it like this? Because the "Infinite-Scroll-Component" doesn't have an option to show a "startMessage" on initial load of data
  if (!members || isSearching) {
    return <MembersList />;
  }

  return (
    <InfiniteScrollChakra
      dataLength={members.length}
      next={handleInfiniteScroll}
      hasMore={members.length !== count && !error}
      loader={<MembersList />}
      endMessage={
        <Flex pt={members.length > 0 && '10'}>
          <Box mx='auto'>
            <InfiniteScrollEndMessage />
          </Box>
        </Flex>
      }
    >
      <MembersList members={members} />
    </InfiniteScrollChakra>
  );
};

export default MembersListContainer;
