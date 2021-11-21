import { useCallback, useState } from 'react';

const useSearch = () => {
  const [searchValue, setSearchValue] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [didSearch, setDidSearch] = useState(false);

  const resetSearchStatus = useCallback(() => setDidSearch(false), []);

  return {
    searchValue,
    isSearching,
    didSearch,
    setSearchValue,
    setIsSearching,
    setDidSearch,
    resetSearchStatus,
  };
};

export default useSearch;
