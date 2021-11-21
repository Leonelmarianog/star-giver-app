import { useColorModeValue } from '@chakra-ui/react';
import { Box } from '@chakra-ui/layout';

const GlobalLayout = ({ children }) => {
  const bgColor = useColorModeValue('purple.300', 'purple.800');

  return <Box bgColor={bgColor}>{children}</Box>;
};

export default GlobalLayout;
