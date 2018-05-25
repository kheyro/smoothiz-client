import actionTypes from '../actions/actionTypes';

function unit(state = [], action) {
  switch (action.type) {
    case actionTypes.GET_UNITS:
      return action.payload;
    default:
      return state;
  }
}

export default unit;
