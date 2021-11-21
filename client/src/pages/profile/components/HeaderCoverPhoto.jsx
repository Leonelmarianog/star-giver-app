import { Flex, Box, Image, Center, IconButton, useColorModeValue, Button } from '@chakra-ui/react';
import { useState } from 'react';
import { AiFillCamera } from 'react-icons/ai';
import ImageUploader from 'react-images-uploading';
import LoadingOverlay from '../../../components/common/LoadingOverlay';
import useAuthContext from '../../../contexts/auth/useAuthContext';
import useMembersContext from '../../../contexts/members/useMembersContext';
import useNotificationContext from '../../../contexts/notification/useNotificationContext';

const HeaderCoverPhoto = ({ id: memberId, coverPhoto, onImageUpload, isSubmitting }) => {
  const { user } = useAuthContext();
  const gradientColor = useColorModeValue('gray.100', 'gray.600');
  const CoverPhotoFallbackColor = useColorModeValue('purple.500', 'purple.200');
  const BackgroundImageFallbackColor = useColorModeValue('purple.200', 'purple.800');

  return (
    <>
      <LoadingOverlay appear={isSubmitting} />

      <Box position='relative' overflow='hidden'>
        <Box
          bg={
            coverPhoto
              ? `url('http://localhost:5000/${coverPhoto.replace('\\', '/')}')`
              : `${BackgroundImageFallbackColor}`
          }
          bgSize='cover'
          bgPos='center'
          bgRepeat='none'
          w='100%'
          h='56.25vw'
          minH='200px'
          maxH='350px'
          position='relative'
          top='0'
          left='0'
          style={{ filter: 'blur(10px)' }}
        />

        <Box
          position='absolute'
          top='0'
          bottom='0'
          left='0'
          right='0'
          bgGradient={`linear(to-t, ${gradientColor},  transparent)`}
        />

        <Center position='absolute' top='0' bottom='0' width='100%'>
          <Image
            src={coverPhoto && `http://localhost:5000/${coverPhoto}`}
            height='100%'
            width='100%'
            maxW='950px'
            objectFit='cover'
            fallback={
              <Box bgColor={CoverPhotoFallbackColor} height='100%' width='100%' maxW='950px' />
            }
          />
        </Center>

        {memberId === user.fkMemberId && (
          <Center position='absolute' top='5' width='100%'>
            <Flex w='950px' justify='flex-end' pr='5'>
              <Box display={['none', 'block']}>
                <Button leftIcon={<AiFillCamera />} colorScheme='purple' onClick={onImageUpload}>
                  Edit Cover Photo
                </Button>
              </Box>
              <Box display={['block', 'none']}>
                <IconButton icon={<AiFillCamera />} colorScheme='purple' onClick={onImageUpload} />
              </Box>
            </Flex>
          </Center>
        )}
      </Box>
    </>
  );
};

const HeaderCoverPhotoContainer = ({ id, coverPhoto }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { update } = useMembersContext();
  const { singleToast } = useNotificationContext();

  const handleSubmit = async (imageList) => {
    try {
      setIsSubmitting(true);

      const file = imageList[0].file;
      const formData = new FormData();
      formData.append('cover-photo', file);
      await update(id, formData);

      setIsSubmitting(false);
    } catch (error) {
      setIsSubmitting(false);

      singleToast('COVER_PHOTO_UPDATE_FAILURE', {
        title: error.message,
        description: 'Could not update cover photo, try again later.',
        status: 'error',
      });
    }
  };

  const handleUploaderErrors = (errors) => {
    if (Object.keys(errors).length > 0) {
      singleToast('FILE_UPLOAD_FAILURE', {
        title: 'Upload Failure',
        description: 'File format must be jpg or png and have a size of 1mb or less.',
        status: 'error',
      });
    }
  };

  return (
    <ImageUploader
      dataURLKey='data_url'
      acceptType={['jpg', 'png']}
      maxFileSize={1000000} // 1mb = 1000000 bytes
      onChange={handleSubmit}
      onError={handleUploaderErrors}
    >
      {(props) => (
        <HeaderCoverPhoto id={id} coverPhoto={coverPhoto} isSubmitting={isSubmitting} {...props} />
      )}
    </ImageUploader>
  );
};

export default HeaderCoverPhotoContainer;
