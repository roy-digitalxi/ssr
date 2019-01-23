import constants from './constants';

const INITIAL_STATE = {
  currentIndex: 0
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case constants.CURRENT_INDEX:
      return {
        ...state,
        currentIndex: action.payload.currentIndex
      };

    default:
      return state;
  }
};
