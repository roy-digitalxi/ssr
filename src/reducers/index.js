import { combineReducers } from 'redux';

const appReducer = combineReducers({
  root: {}
});

const rootReducer = (state, action) => {
  return appReducer(state, action);
};

export default rootReducer;
