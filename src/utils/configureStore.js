import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware, { END } from 'redux-saga';

import rootReducer from '../reducers';

const sagaMiddleware = createSagaMiddleware();

const configureStore = (initialState, options = { logger: true }) => {
  const middleware = [sagaMiddleware];

  if (process.env.NODE_ENV !== 'production' && options.logger) {
    const { createLogger } = require('redux-logger');
    const logger = createLogger({ collapsed: true });
    middleware.push(logger);
  }

  const store = createStore(
    rootReducer,
    initialState,
    applyMiddleware(...middleware)
  );

  store.runSaga = sagaMiddleware.run;

  store.close = () => store.dispatch(END);

  return store;
};

export default configureStore;
