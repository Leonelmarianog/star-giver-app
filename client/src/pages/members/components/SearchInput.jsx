import { Box, Input, Button, Stack, chakra, useColorModeValue } from '@chakra-ui/react';
import useMembersContext from '../../../contexts/members/useMembersContext';
import useSearchContext from '../../../contexts/search/useSearchContext';
import { Pagination } from '../../../enums';
import RequestStatus from '../../../enums/request-status';

const ChakraForm = chakra('form');

const SearchInput = ({ searchValue, setSearchValue, requestStatus, handleSubmit }) => {
  const bgColor = useColorModeValue('gray.100', 'gray.600');

  return (
    <Box bgColor={bgColor} p='6' rounded='6' boxShadow='2xl'>
      <ChakraForm onSubmit={(event) => handleSubmit(event)}>
        <Stack spacing='4' direction={['column', 'row']} align='center' justify='center'>
          <Input
            placeholder='Search by First or Last Name'
            value={searchValue}
            onChange={(event) => setSearchValue(event.target.value)}
            isDisabled={requestStatus === RequestStatus.LOADING}
          />
          <Button
            colorScheme='purple'
            type='submit'
            isDisabled={requestStatus === RequestStatus.LOADING}
          >
            Search
          </Button>
        </Stack>
      </ChakraForm>
    </Box>
  );
};

const SearchInputContainer = () => {
  const { searchValue, setSearchValue, setIsSearching, setDidSearch } = useSearchContext();
  const { findByQuery, requestStatus } = useMembersContext();

  const handleSubmit = async (event) => {
    event.preventDefault();

    setIsSearching(true);
    setDidSearch(true);
    await findByQuery(searchValue, Pagination.LIMIT);
    setIsSearching(false);
  };

  return (
    <>
      <SearchInput
        searchValue={searchValue}
        setSearchValue={setSearchValue}
        requestStatus={requestStatus}
        handleSubmit={handleSubmit}
      />
    </>
  );
};

export default SearchInputContainer;
