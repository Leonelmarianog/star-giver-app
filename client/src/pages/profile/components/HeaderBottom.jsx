import { Box, Button, Stack } from '@chakra-ui/react';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';
import HeaderAvatar from './HeaderAvatar';
import HeaderInfo from './HeaderInfo';
import useStarToggler from '../../../hooks/useStarToggler';

const HeaderBottom = ({ id, profilePicture, firstName, lastName, starsGained, starsGiven }) => {
  const { isClicked, starAmount, toggleStar } = useStarToggler(starsGained);

  return (
    <Stack
      spacing='4'
      maxW='900px'
      direction={['column', 'column', 'row']}
      flexGrow='1'
      justify='space-between'
      px='5'
    >
      <Stack spacing='4' direction={['column', 'column', 'row']}>
        <Box mt={['-100px', '-100px', '-50px']} alignSelf='center'>
          <HeaderAvatar id={id} profilePicture={profilePicture} />
        </Box>

        <HeaderInfo
          firstName={firstName}
          lastName={lastName}
          starsGained={starAmount}
          starsGiven={starsGiven && starsGiven.length}
        />
      </Stack>

      <Box alignSelf='center'>
        <Button
          colorScheme='purple'
          rightIcon={isClicked ? <AiFillStar /> : <AiOutlineStar />}
          onClick={() => toggleStar(id)}
        >
          {isClicked ? 'Remove a star from this member' : 'Give a star to this member'}
        </Button>
      </Box>
    </Stack>
  );
};

export default HeaderBottom;
