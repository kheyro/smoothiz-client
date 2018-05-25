import actionTypes from '../actions/actionTypes';

function ingredient(state = [], action) {
  switch (action.type) {
    case actionTypes.GET_INGREDIENTS:
      return action.payload;
    default:
      return state;
  }
}

export default ingredient;
