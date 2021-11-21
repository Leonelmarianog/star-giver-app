import { useContext } from 'react';
import { SearchContext } from './searchContext';

const useSearchContext = () => useContext(SearchContext);

export default useSearchContext;
