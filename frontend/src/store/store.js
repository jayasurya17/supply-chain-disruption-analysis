import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import logger from 'redux-logger';
import createSagaMiddleware from 'redux-saga';

import { reducers, sagas } from './features';

export default function configureStore(initialState) {
  const sagaMiddleware = createSagaMiddleware();

  const middlewares = [sagaMiddleware];

  if (process.env.NODE_ENV !== 'production') {
    middlewares.push(logger);
  }

  const composeEnhancers = composeWithDevTools({});
  const store = createStore(
    reducers,
    initialState,
    composeEnhancers(
      applyMiddleware(
        ...middlewares,
      ),
    ),
  );

  let sagaTask = sagaMiddleware.run(sagas);

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('./features', () => {
      /* eslint-disable-next-line */
      const { reducers, sagas } = require('./features');

      store.replaceReducer(reducers);
      sagaTask.cancel();
      sagaTask.done.then(() => {
        sagaTask = sagaMiddleware.run(sagas);
      });
    });
  }
  return store;
}
