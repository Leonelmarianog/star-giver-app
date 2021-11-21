import { useToast } from '@chakra-ui/react';
import { createContext, useCallback } from 'react';

export const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const toast = useToast();

  const singleToast = useCallback(
    (id, options) => {
      if (!toast.isActive(id)) {
        toast({
          id: id,
          duration: 9000,
          isClosable: true,
          position: 'bottom-right',
          ...options,
        });
      }
    },
    [toast]
  );

  return (
    <NotificationContext.Provider value={{ singleToast }}>{children}</NotificationContext.Provider>
  );
};
