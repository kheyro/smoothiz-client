import actionTypes from '../actions/actionTypes';

function category(state = [], action) {
  switch (action.type) {
    case actionTypes.GET_CATEGORIES:
      return action.payload;
    default:
      return state;
  }
}

export default category;
