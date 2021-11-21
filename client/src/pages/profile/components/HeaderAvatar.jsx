import { Avatar, IconButton, useColorModeValue } from '@chakra-ui/react';
import { useState } from 'react';
import { AiFillCamera } from 'react-icons/ai';
import ImageUploader from 'react-images-uploading';
import LoadingOverlay from '../../../components/common/LoadingOverlay';
import useAuthContext from '../../../contexts/auth/useAuthContext';
import useMembersContext from '../../../contexts/members/useMembersContext';
import useNotificationContext from '../../../contexts/notification/useNotificationContext';

const HeaderAvatar = ({ id, profilePicture, onImageUpload, isSubmitting }) => {
  const { user } = useAuthContext();
  const avatarBorderColor = useColorModeValue('gray.100', 'gray.600');

  return (
    <>
      <LoadingOverlay appear={isSubmitting} />

      <Avatar
        src={profilePicture && `http://localhost:5000/${profilePicture}`}
        boxSize='200px'
        borderWidth='5px'
        borderStyle='solid'
        borderColor={avatarBorderColor}
      >
        {id === user.fkMemberId && (
          <IconButton
            icon={<AiFillCamera />}
            colorScheme='purple'
            rounded='full'
            size='lg'
            position='absolute'
            right='2'
            bottom='2'
            onClick={onImageUpload}
          />
        )}
      </Avatar>
    </>
  );
};

const HeaderAvatarContainer = ({ id, profilePicture }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { update } = useMembersContext();
  const { singleToast } = useNotificationContext();

  const handleSubmit = async (imageList) => {
    try {
      setIsSubmitting(true);

      const file = imageList[0].file;
      const formData = new FormData();
      formData.append('profile-picture', file);
      await update(id, formData);

      setIsSubmitting(false);
    } catch (error) {
      setIsSubmitting(false);

      singleToast('PROFILE_PICTURE_UPDATE_FAILURE', {
        title: error.message,
        description: 'Could not update profile picture, try again later.',
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
        <HeaderAvatar
          id={id}
          profilePicture={profilePicture}
          isSubmitting={isSubmitting}
          {...props}
        />
      )}
    </ImageUploader>
  );
};

export default HeaderAvatarContainer;
