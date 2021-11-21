import { useReducer } from 'react';
import starsApi from '../api/starsApi';
import useAuthContext from '../contexts/auth/useAuthContext';
import useSingleToastWithId from './useSingleToastWithId';
import { getHttpStatusCodeClass } from '../utils/utils';
import HttpStatusCodeClasses from '../enums/http-status-code-classes';
import { ErrorMessages } from '../enums';

const starTogglerReducer = (state, action) => {
  const { type } = action;

  if (type === 'GIVE_STAR_OPTIMISTIC') {
    return { ...state, starAmount: state.starAmount + 1, isClicked: true, isLoading: true };
  }

  if (type === 'REMOVE_STAR_OPTIMISTIC') {
    return { ...state, starAmount: state.starAmount - 1, isClicked: false, isLoading: true };
  }

  if (type === 'REQUEST_SUCCESS') {
    return {
      ...state,
      starAmountFallback: state.starAmount,
      isClickedFallback: state.isClicked,
      isLoading: false,
    };
  }

  if (type === 'REQUEST_FAILURE') {
    return {
      ...state,
      starAmount: state.starAmountFallback,
      isClicked: state.isClickedFallback,
      isLoading: false,
    };
  }

  return state;
};

const useStarToggler = (memberToStarsGained) => {
  const { user } = useAuthContext();

  const starAmountInitial = memberToStarsGained ? memberToStarsGained.length : undefined;
  const isClickedInitial =
    memberToStarsGained &&
    memberToStarsGained.some((starGained) => starGained.fkMemberFromId === user.fkMemberId);

  const initialState = {
    starAmount: starAmountInitial,
    starAmountFallback: starAmountInitial,
    isClicked: isClickedInitial,
    isClickedFallback: isClickedInitial,
    isLoading: false,
  };

  const [{ starAmount, isClicked, isLoading }, dispatch] = useReducer(
    starTogglerReducer,
    initialState
  );
  const { displayToast, toastId } = useSingleToastWithId('STAR_BUTTON_TOAST');

  const toggleStar = async (id) => {
    try {
      if (isClicked && !isLoading) {
        dispatch({ type: 'REMOVE_STAR_OPTIMISTIC' });

        await starsApi.removeStar(id);

        dispatch({ type: 'REQUEST_SUCCESS' });
      } else if (!isClicked && !isLoading) {
        dispatch({ type: 'GIVE_STAR_OPTIMISTIC' });

        await starsApi.giveStar(id);

        dispatch({ type: 'REQUEST_SUCCESS' });
      }
    } catch (error) {
      const { statusCode, message } = error;

      dispatch({ type: 'REQUEST_FAILURE' });

      if (getHttpStatusCodeClass(statusCode) === HttpStatusCodeClasses.CLIENT_ERROR) {
        displayToast({
          id: toastId,
          title: message,
          description:
            'No cheating! W-What? Why even give you the option to do that? To show you this beautiful toast of course!',
          status: 'info',
          duration: 9000,
          isClosable: true,
          position: 'bottom-right',
        });
      }

      if (getHttpStatusCodeClass(statusCode) === HttpStatusCodeClasses.SERVER_ERROR) {
        displayToast({
          id: toastId,
          title: message,
          description: ErrorMessages.INTERNAL_SERVER_ERROR,
          status: 'info',
          duration: 9000,
          isClosable: true,
          position: 'bottom-right',
        });
      }
    }
  };

  return { starAmount, isClicked, toggleStar };
};

export default useStarToggler;
