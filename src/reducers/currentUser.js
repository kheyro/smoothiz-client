import actionTypes from '../actions/actionTypes';

function currentUser(state = {}, action) {
  switch (action.type) {
    case actionTypes.GET_USER:
      return action.payload;
    default:
      return state;
  }
}

export default currentUser;
