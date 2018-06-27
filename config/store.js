import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../src/reducers/index';
import StateLoader from '../src/reducers/stateLoader';

export default function configureStore(preloadedState) {
  const middlewares = [thunk];
  const middlewareEnhancer = applyMiddleware(...middlewares);

  const enhancers = [middlewareEnhancer];
  const composedEnhancers =
    (process.env.NODE_ENV !== 'production' &&
      window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__(...enhancers)) ||
    compose(...enhancers);

  const store = createStore(rootReducer, preloadedState, composedEnhancers);

  store.subscribe(() => {
    StateLoader.saveState(store.getState());
  });

  return store;
}
