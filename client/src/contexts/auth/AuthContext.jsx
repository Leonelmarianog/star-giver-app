import { createContext } from 'react';
import useAuth from './useAuth';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const {
    signIn,
    signUp,
    signOut,
    refreshUser,
    user,
    isAuthenticated,
    requestStatus,
    isRefreshing,
    error,
  } = useAuth();

  return (
    <AuthContext.Provider
      value={{
        signIn,
        signUp,
        signOut,
        refreshUser,
        user,
        isAuthenticated,
        requestStatus,
        isRefreshing,
        error,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
