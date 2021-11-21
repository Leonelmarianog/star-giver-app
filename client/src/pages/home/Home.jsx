import {
  Flex,
  Stack,
  Heading,
  Icon,
  ScaleFade,
  SlideFade,
  useColorModeValue,
} from '@chakra-ui/react';
import { AiFillStar } from 'react-icons/ai';

const TITLE_TRANSITION_OPTIONS = {
  enter: { delay: 0.1 },
};
const LOGO_TRANSITION_OPTIONS = {
  enter: { delay: 0.15 },
};

const Logo = () => {
  const iconColor = useColorModeValue('purple.500', 'purple.300');

  return <Icon as={AiFillStar} boxSize={['200px', '2xs', 'xs', 'md']} color={iconColor} />;
};

const Title = () => {
  const textColor = useColorModeValue('purple.500', 'purple.300');

  return (
    <Stack spacing='4'>
      <Heading fontSize={['4xl', '4xl', '6xl']} fontWeight='bold' color={textColor}>
        Star Giver,
      </Heading>
      <Heading fontSize={['2xl', '2xl', '4xl']} color='gray.100'>
        Give stars to your favorite users!
      </Heading>
    </Stack>
  );
};

const Home = () => (
  <Flex justify='center' height='100vh'>
    <Stack
      spacing={['10', '10', '2']}
      direction={['column', 'column', 'row']}
      pt={['120px', '120px', '64px']}
      px='10'
    >
      <Flex justify='center' align='center'>
        <SlideFade in={true} transition={TITLE_TRANSITION_OPTIONS}>
          <Title />
        </SlideFade>
      </Flex>
      <Flex justify='center' align='center'>
        <ScaleFade in={true} transition={LOGO_TRANSITION_OPTIONS}>
          <Logo />
        </ScaleFade>
      </Flex>
    </Stack>
  </Flex>
);

export default Home;
