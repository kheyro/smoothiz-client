import actionTypes from '../actions/actionTypes';

export function auth(state = {}, action) {
  switch (action.type) {
    case actionTypes.AUTH_USER:
      return { ...state, error: '', authenticated: true };
    case actionTypes.UNAUTH_USER:
      return { ...state, authenticated: false };
    case actionTypes.AUTH_ERROR:
      return { ...state, error: action.payload };
    default:
      return state;
  }
}
