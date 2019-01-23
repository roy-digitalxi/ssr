import constants from './constants';

export default {
  updateCurrent: currentIndex => ({
    type: constants.CURRENT_INDEX,
    payload: {
      currentIndex
    }
  })
};
