import { useColorModeValue } from '@chakra-ui/color-mode';
import { Box } from '@chakra-ui/layout';
import Navbar from '../components/common/Navbar';
import { MembersProvider } from '../contexts/members/MembersContext';

const LayoutWithNavbar = ({ children }) => {
  const bgColor = useColorModeValue('purple.300', 'purple.800');

  return (
    <Box bgColor={bgColor}>
      <MembersProvider>
        <Navbar />
      </MembersProvider>
      {children}
    </Box>
  );
};

export default LayoutWithNavbar;
