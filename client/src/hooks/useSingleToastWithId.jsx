import { useToast } from '@chakra-ui/react';

/**
 * @param {number} id
 */
const useSingleToastWithId = (id) => {
  const toast = useToast();

  /**
   * @param {import('@chakra-ui/react').UseToastOptions} options
   */
  const displayToast = (options) => {
    if (!toast.isActive(id)) {
      toast(options);
    }
  };

  return { displayToast, toastId: id };
};

export default useSingleToastWithId;
