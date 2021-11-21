import { useEffect } from 'react';
import {
  Box,
  Flex,
  Button,
  ButtonGroup,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Avatar,
  Icon,
  useColorMode,
  useColorModeValue,
  HStack,
  IconButton,
} from '@chakra-ui/react';
import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import { AiFillStar } from 'react-icons/ai';
import { Link, useHistory } from 'react-router-dom';
import useAuthContext from '../../contexts/auth/useAuthContext';
import useMembersContext from '../../contexts/members/useMembersContext';
import useNotificationContext from '../../contexts/notification/useNotificationContext';
import { ErrorMessages } from '../../enums';

const NavbarThemeToogler = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const IconColor = useColorModeValue('purple.500', 'purple.300');

  return (
    <IconButton
      icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
      onClick={toggleColorMode}
      rounded='full'
      w='0'
      color={IconColor}
      boxSize='10'
    />
  );
};

const NavbarLogo = () => {
  const starColorBase = useColorModeValue('purple.500', 'purple.200');
  const starColorHover = useColorModeValue('purple.600', 'purple.300');

  return (
    <Box color={starColorBase} transition='color 0.25s' _hover={{ color: starColorHover }}>
      <Link to='/' aria-label='Home'>
        <Icon as={AiFillStar} boxSize='50px' />
      </Link>
    </Box>
  );
};

const NavbarLinks = () => (
  <ButtonGroup variant='ghost' spacing='0' colorScheme='purple' size='lg'>
    <Button as={Link} height='100%' borderRadius='0' to='/members'>
      Members
    </Button>
  </ButtonGroup>
);

const NavbarMenu = () => {
  const { signOut, user } = useAuthContext();
  const { findById, member } = useMembersContext();
  const { singleToast } = useNotificationContext();
  const history = useHistory();

  useEffect(() => findById(user.fkMemberId), [findById, user.fkMemberId]);

  const handleSubmit = async () => {
    try {
      await signOut();
      history.push('/sign-in');
    } catch (error) {
      const { message } = error;
      singleToast('SIGN_OUT_FAILURE', {
        title: message,
        description: ErrorMessages.INTERNAL_SERVER_ERROR,
        status: 'error',
      });
    }
  };

  return (
    <Menu>
      <MenuButton as={Button} rounded='full' variant='link' minW='0'>
        <Avatar
          boxSize='10'
          src={member && member.profilePicture && `http://localhost:5000/${member.profilePicture}`}
        />
      </MenuButton>
      <MenuList>
        <MenuItem as={Link} to={`/members/${user.fkMemberId}`}>
          Profile
        </MenuItem>
        <MenuItem as={Link} to='/members' display={['block', 'none']}>
          Members
        </MenuItem>
        <MenuItem onClick={handleSubmit}>Sign Out</MenuItem>
      </MenuList>
    </Menu>
  );
};

const Navbar = () => {
  const bgColor = useColorModeValue('gray.100', 'gray.600');

  return (
    <Box
      bgColor={bgColor}
      position='fixed'
      top='0'
      left='0'
      width='100%'
      height='64px'
      zIndex='2'
      boxShadow='2xl'
    >
      <Flex height='100%' justify='center'>
        <Flex height='100%' maxW='1500px' justify='space-between' width='100%'>
          <Flex>
            <Flex justify='center' align='center' mx='4'>
              <NavbarLogo />
            </Flex>

            <Flex display={['none', 'flex']}>
              <NavbarLinks />
            </Flex>
          </Flex>

          <Flex justify='center' align='center' mr='4'>
            <HStack spacing='4'>
              <NavbarThemeToogler />
              <NavbarMenu />
            </HStack>
          </Flex>
        </Flex>
      </Flex>
    </Box>
  );
};

export default Navbar;
