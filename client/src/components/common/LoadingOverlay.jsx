import { Center, Spinner, Portal } from '@chakra-ui/react';
import { useEffect } from 'react';

const LoadingOverlay = ({ appear }) => {
  useEffect(() => {
    if (appear) {
      document.body.style.overflow = 'hidden';
    }

    return () => (document.body.style.overflow = 'unset');
  }, [appear]);

  return (
    appear && (
      <Portal>
        <Center
          position='fixed'
          top='0'
          left='0'
          bottom='0'
          right='0'
          bgColor='blackAlpha.600'
          zIndex='3'
          overflow='hidden'
        >
          <Spinner boxSize='150px' thickness='4px' emptyColor='gray.200' color='purple.500' />
        </Center>
      </Portal>
    )
  );
};

export default LoadingOverlay;
