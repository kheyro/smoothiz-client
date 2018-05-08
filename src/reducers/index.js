import { combineReducers } from 'redux';
import { auth } from './authentication';

const rootReducer = combineReducers(
  { auth }
);
/*
{
  auth : {
    authenticated: bool,
    error: string,
  }
}
 */
export default rootReducer;
