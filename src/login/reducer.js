import {} from './constants';

const initialState = {};

const loginReducer = (previousState = initialState, { type, payload }) => {
  let updated = Object.assign({}, previousState);
  switch (type) {
    default:
      return previousState;
  }
};

export default loginReducer;
