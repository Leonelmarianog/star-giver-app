import { RequestStatus } from '../../enums';

const AuthReducer = (state, action) => {
  const { type, payload } = action;

  if (type === 'SIGN_IN_BEGIN') {
    return {
      ...state,
      requestStatus: RequestStatus.LOADING,
      isAuthenticated: false,
      user: null,
      error: null,
    };
  }

  if (type === 'SIGN_IN_SUCCESS') {
    return {
      ...state,
      requestStatus: RequestStatus.SUCCESS,
      isAuthenticated: true,
      user: payload.user,
      error: null,
    };
  }

  if (type === 'SIGN_IN_FAILURE') {
    return {
      ...state,
      requestStatus: RequestStatus.FAILURE,
      isAuthenticated: false,
      user: null,
      error: payload.error,
    };
  }

  if (type === 'SIGN_OUT_BEGIN') {
    return {
      ...state,
      requestStatus: RequestStatus.LOADING,
      error: null,
    };
  }

  if (type === 'SIGN_OUT_SUCCESS') {
    return {
      ...state,
      requestStatus: RequestStatus.SUCCESS,
      isAuthenticated: false,
      user: null,
      error: null,
    };
  }

  if (type === 'SIGN_OUT_FAILURE') {
    return {
      ...state,
      requestStatus: RequestStatus.FAILURE,
      error: payload.error,
    };
  }

  if (type === 'REFRESH_USER_BEGIN') {
    return {
      ...state,
      requestStatus: RequestStatus.LOADING,
      isRefreshing: true,
      error: null,
    };
  }

  if (type === 'REFRESH_USER_SUCCESS') {
    return {
      ...state,
      requestStatus: RequestStatus.SUCCESS,
      isRefreshing: false,
      isAuthenticated: true,
      user: payload.user,
      error: null,
    };
  }

  if (type === 'REFRESH_USER_FAILURE') {
    return {
      ...state,
      requestStatus: RequestStatus.FAILURE,
      isRefreshing: false,
      isAuthenticated: false,
      user: null,
      error: payload.error,
    };
  }

  return state;
};

export default AuthReducer;
