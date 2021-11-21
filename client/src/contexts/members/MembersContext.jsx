import { createContext } from 'react';
import useMembers from './useMembers';

export const MembersContext = createContext();

export const MembersProvider = ({ children }) => {
  const { members, count, member, requestStatus, error, findAll, findByQuery, findById, update } =
    useMembers();

  return (
    <MembersContext.Provider
      value={{
        members,
        count,
        member,
        requestStatus,
        error,
        findAll,
        findByQuery,
        findById,
        update,
      }}
    >
      {children}
    </MembersContext.Provider>
  );
};
