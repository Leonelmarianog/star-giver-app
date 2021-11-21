import RequestStatus from '../../enums/request-status';

const membersReducer = (state, action) => {
  const { type, payload } = action;

  if (type === 'LOAD_ALL_MEMBERS_BEGIN' || type === 'LOAD_BY_QUERY_BEGIN') {
    return {
      ...state,
      requestStatus: RequestStatus.LOADING,
      error: null,
    };
  }

  if (type === 'LOAD_ALL_MEMBERS_SUCCESS' || type === 'LOAD_BY_QUERY_SUCCESS') {
    return {
      ...state,
      members: payload.members,
      count: payload.count,
      requestStatus: RequestStatus.SUCCESS,
      error: null,
    };
  }

  if (type === 'LOAD_ALL_MEMBERS_FAILURE' || type === 'LOAD_BY_QUERY_FAILURE') {
    return {
      ...state,
      requestStatus: RequestStatus.FAILURE,
      error: payload.error,
    };
  }

  if (type === 'LOAD_MEMBER_BEGIN' || type === 'UPDATE_MEMBER_BEGIN') {
    return {
      ...state,
      requestStatus: RequestStatus.LOADING,
      error: null,
    };
  }

  if (type === 'LOAD_MEMBER_SUCCESS') {
    return {
      ...state,
      member: payload.member,
      requestStatus: RequestStatus.SUCCESS,
      error: null,
    };
  }

  if (type === 'LOAD_MEMBER_FAILURE' || type === 'UPDATE_MEMBER_FAILURE') {
    return {
      ...state,
      requestStatus: RequestStatus.FAILURE,
      error: payload.error,
    };
  }

  if (type === 'UPDATE_MEMBER_SUCCESS') {
    return {
      ...state,
      member: { ...state.member, ...payload.member },
      requestStatus: RequestStatus.SUCCESS,
      error: null,
    };
  }

  return state;
};

export default membersReducer;
