import { useContext } from 'react';
import { MembersContext } from './MembersContext';

const useMembersContext = () => useContext(MembersContext);

export default useMembersContext;
