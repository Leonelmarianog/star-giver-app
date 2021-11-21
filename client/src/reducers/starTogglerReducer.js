const starTogglerReducer = (state, action) => {
  const { type, payload } = action;

  if (type === 'INITIALIZE_STAR_AMOUNT') {
    return { ...state, starAmount: payload.starAmount, starAmountFallback: payload.starAmount };
  }

  if (type === 'INITIALIZE_IS_CLICKED') {
    return { ...state, isClicked: payload.isClicked, isClickedFallback: payload.isClicked };
  }

  if (type === 'UPDATE_STAR_AMOUNT_OPTIMISTIC') {
    return { ...state, starAmount: payload.starAmount, isClicked: payload.isClicked };
  }

  if (type === 'UPDATE_STAR_AMOUNT_ERROR') {
    return { ...state, starAmount: payload.starAmount, isClicked: payload.isClicked };
  }

  if (type === 'UPDATE_FALLBACKS') {
    return {
      ...state,
      starAmountFallback: payload.starAmountFallback,
      isClickedFallback: payload.isClickedFallback,
    };
  }

  return state;
};

export default starTogglerReducer;
