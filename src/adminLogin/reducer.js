import {} from './constants';

const initialState = {};

const adminLoginReducer = (previousState = initialState, { type, payload }) => {
  let updated = Object.assign({}, previousState);
  switch (type) {
    default:
      return previousState;
  }
};

export default adminLoginReducer;
