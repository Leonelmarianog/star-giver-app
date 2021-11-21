import { useCallback, useReducer } from 'react';
import membersApi from '../../api/membersApi';
import RequestStatus from '../../enums/request-status';
import membersReducer from './membersReducer';

const initialState = {
  members: null,
  member: null,
  count: 0,
  requestStatus: RequestStatus.LOADING,
  error: null,
};

const useMembers = () => {
  const [state, dispatch] = useReducer(membersReducer, initialState);

  const findAll = useCallback(async (limit, offset) => {
    try {
      dispatch({ type: 'LOAD_ALL_MEMBERS_BEGIN' });

      const { results: members, count } = await membersApi.findAll(limit, offset);

      dispatch({ type: 'LOAD_ALL_MEMBERS_SUCCESS', payload: { members, count } });
    } catch (error) {
      dispatch({ type: 'LOAD_ALL_MEMBERS_FAILURE', payload: { error } });
    }
  }, []);

  const findByQuery = useCallback(async (query, limit, offset) => {
    try {
      dispatch({ type: 'LOAD_BY_QUERY_BEGIN' });

      const { results: members, count } = await membersApi.findByQuery(query, limit, offset);

      dispatch({ type: 'LOAD_BY_QUERY_SUCCESS', payload: { members, count } });
    } catch (error) {
      dispatch({ type: 'LOAD_BY_QUERY_FAILURE', payload: { error } });
    }
  }, []);

  const findById = useCallback(async (id) => {
    try {
      dispatch({ type: 'LOAD_MEMBER_BEGIN' });

      const member = await membersApi.findById(id);

      dispatch({ type: 'LOAD_MEMBER_SUCCESS', payload: { member } });
    } catch (error) {
      dispatch({ type: 'LOAD_MEMBER_FAILURE', payload: { error } });
    }
  }, []);

  const update = useCallback(async (id, formData) => {
    try {
      dispatch({ type: 'UPDATE_MEMBER_BEGIN' });

      const member = await membersApi.update(id, formData);

      dispatch({ type: 'UPDATE_MEMBER_SUCCESS', payload: { member } });
    } catch (error) {
      dispatch({ type: 'UPDATE_MEMBER_FAILURE', payload: { error } });
      throw error;
    }
  }, []);

  return { ...state, findAll, findByQuery, findById, update };
};

export default useMembers;
