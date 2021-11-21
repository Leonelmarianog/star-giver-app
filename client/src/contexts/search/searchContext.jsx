import { createContext } from 'react';
import useSearch from './useSearch';

export const SearchContext = createContext();

export const SearchProvider = ({ children }) => {
  const {
    searchValue,
    isSearching,
    didSearch,
    setSearchValue,
    setIsSearching,
    setDidSearch,
    resetSearchStatus,
  } = useSearch();

  return (
    <SearchContext.Provider
      value={{
        searchValue,
        isSearching,
        didSearch,
        setSearchValue,
        setIsSearching,
        setDidSearch,
        resetSearchStatus,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};
