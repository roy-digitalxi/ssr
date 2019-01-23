const initialState = {
  msg: ''
};

const socketReducer = (previousState = initialState, { type, payload }) => {
  let updated = Object.assign({}, previousState);
  switch (type) {
    case 'message':
      console.log('hit socket reducer: ', payload);
      return updated;

    default:
      return previousState;
  }
};

export default socketReducer;
