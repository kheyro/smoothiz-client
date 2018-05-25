import { combineReducers } from 'redux';
import { auth } from './authentication';
import categories from './category';
import currentUser from './currentUser';
import smoothies from './smoothie';
import units from './unit';
import ingredients from './ingredient';

const rootReducer = combineReducers({
  auth,
  categories,
  currentUser,
  smoothies,
  ingredients,
  units,
});

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
