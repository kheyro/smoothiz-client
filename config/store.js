import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../src/reducers/index';
import StateLoader from '../src/reducers/stateLoader';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const stateLoader = new StateLoader();

const store = createStore(
  rootReducer,
  stateLoader.loadState(),
  composeEnhancers(applyMiddleware(thunk))
);

store.subscribe(() => {
  stateLoader.saveState(store.getState());
});

export default store;
