import { useCallback, useReducer } from 'react';
import AuthReducer from './authReducer';
import authApi from '../../api/authApi';
import usersApi from '../../api/usersApi';
import { RequestStatus } from '../../enums';

const initialState = {
  requestStatus: RequestStatus.LOADING,
  isRefreshing: true,
  isAuthenticated: false,
  user: null,
  error: null,
};

const useAuth = () => {
  const [state, dispatch] = useReducer(AuthReducer, initialState);

  const signIn = async (signInData) => {
    try {
      dispatch({ type: 'SIGN_IN_BEGIN' });

      const { user } = await authApi.signIn(signInData);

      dispatch({ type: 'SIGN_IN_SUCCESS', payload: { user } });
    } catch (error) {
      dispatch({ type: 'SIGN_IN_FAILURE', payload: { error } });

      throw error; // Formik needs the error object to show validation errors
    }
  };

  const signUp = async (signUpData) => {
    try {
      dispatch({ type: 'SIGN_UP_BEGIN' });

      const { user } = await authApi.signUp(signUpData);

      dispatch({ type: 'SIGN_UP_SUCCESS', payload: { user } });
    } catch (error) {
      dispatch({ type: 'SIGN_UP_FAILURE', payload: { error } });

      throw error; // Formik needs the error object to show validation errors
    }
  };

  const signOut = async () => {
    try {
      await authApi.signOut();

      dispatch({ type: 'SIGN_OUT_SUCCESS' });
    } catch (error) {
      dispatch({ type: 'SIGN_OUT_FAILURE', payload: { error } });

      throw error; // I don't really need to throw this one but I did anyways, the navbar handles it
    }
  };

  const refreshUser = useCallback(async () => {
    try {
      dispatch({ type: 'REFRESH_USER_BEGIN' });

      const user = await usersApi.findSelf();

      dispatch({ type: 'REFRESH_USER_SUCCESS', payload: { user } });
    } catch (error) {
      dispatch({ type: 'REFRESH_USER_FAILURE', payload: { error } });
    }
  }, []);

  return {
    ...state,
    signIn,
    signUp,
    signOut,
    refreshUser,
  };
};

export default useAuth;
