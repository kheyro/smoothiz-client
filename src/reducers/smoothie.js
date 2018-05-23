import actionTypes from '../actions/actionTypes';

function smoothies(state = {}, action) {
  switch (action.type) {
    case actionTypes.GET_SMOOTHIE:
      return Object.assign(
        {},
        { ...state },
        { currentSmoothie: action.payload }
      );
    case actionTypes.GET_SMOOTHIES:
      return Object.assign({}, { ...state }, { all: action.payload });
    default:
      return state;
  }
}

export default smoothies;
