import { memo } from 'react';
import {
  Flex,
  Box,
  Avatar,
  Heading,
  Stack,
  Skeleton,
  SkeletonCircle,
  Image,
  Text,
  Wrap,
  IconButton,
  Center,
  Button,
  Tooltip,
  useColorModeValue,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';
import useStarToggler from '../../../hooks/useStarToggler';

const MemberAvatar = ({ profilePicture }) => {
  const borderColor = useColorModeValue('gray.100', 'gray.600');

  return profilePicture !== undefined ? (
    <Avatar
      size='xl'
      borderWidth='2px'
      borderStyle='solid'
      borderColor={borderColor}
      src={profilePicture && `http://localhost:5000/${profilePicture}`}
    />
  ) : (
    <SkeletonCircle size='100' />
  );
};

const MemberName = ({ firstName, lastName }) =>
  firstName && lastName ? (
    <Heading size='md'>
      {firstName} {lastName}
    </Heading>
  ) : (
    <Skeleton height='20px' width='100%' />
  );

const MemberStars = ({ id, starsGained }) => {
  const { starAmount, isClicked, toggleStar } = useStarToggler(starsGained, id);
  const starColor = useColorModeValue('purple.500', 'purple.200');

  const iconButtonLabel = isClicked ? 'Remove Star' : 'Give Star';

  return (
    <>
      {typeof starAmount === 'number' ? (
        <Wrap spacing='2' align='center'>
          <Tooltip
            placement='top'
            hasArrow
            closeOnClick={false}
            label={iconButtonLabel}
            aria-label={iconButtonLabel}
          >
            <IconButton
              icon={isClicked ? <AiFillStar /> : <AiOutlineStar />}
              aria-label={iconButtonLabel}
              color={starColor}
              size='lg'
              variant='ghost'
              fontSize='2rem'
              onClick={() => toggleStar(id)}
            />
          </Tooltip>
          &nbsp;
          <Text>{starAmount}</Text>
        </Wrap>
      ) : (
        <Skeleton height='20px' width='100%' />
      )}
    </>
  );
};

const Member = ({ id, firstName, lastName, profilePicture, coverPhoto, starsGained }) => {
  const bgColor = useColorModeValue('gray.100', 'gray.600');
  const ImageFallbackColor = useColorModeValue('purple.500', 'purple.200');

  return (
    <Box bgColor={bgColor} rounded='6' boxShadow='2xl' w='full' maxW='270px' overflow='hidden'>
      <Box position='relative'>
        <Image
          position='absolute'
          src={coverPhoto && `http://localhost:5000/${coverPhoto}`}
          h='24'
          w='full'
          objectFit='cover'
          fallback={<Box bgColor={ImageFallbackColor} position='absolute' h='24' w='full'></Box>}
        />

        <Stack spacing='6' p='6' pt='12'>
          <Flex justify='center'>
            <MemberAvatar profilePicture={profilePicture} />
          </Flex>
          <Stack>
            <Center>
              <MemberName firstName={firstName} lastName={lastName} />
            </Center>
            <Center>
              <MemberStars id={id} starsGained={starsGained} />
            </Center>
          </Stack>
          <Center>
            <Button
              as={Link}
              to={`/members/${id}`}
              colorScheme='purple'
              isDisabled={id ? false : true}
            >
              Profile
            </Button>
          </Center>
        </Stack>
      </Box>
    </Box>
  );
};

export default memo(Member);
