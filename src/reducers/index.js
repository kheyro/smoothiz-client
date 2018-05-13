import { combineReducers } from 'redux';
import { auth } from './authentication';
import categories from './category';

const rootReducer = combineReducers({ auth, categories });

/*
{
  auth: {
    authenticated: bool,
    error: string,
  },
  categories: [
    id: 1,
    name: string,
  ]
}
 */
export default rootReducer;
