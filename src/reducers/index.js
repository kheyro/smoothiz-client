import { combineReducers } from 'redux';
import { auth } from './authentication';
import categories from './category';
import currentUser from './currentUser';

const rootReducer = combineReducers({ auth, categories, currentUser });

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
