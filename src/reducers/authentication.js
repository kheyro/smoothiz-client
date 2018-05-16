import actionTypes from '../actions/actionTypes';

export function auth(state = {}, action) {
  switch (action.type) {
    case actionTypes.AUTH_USER:
      return { ...state, error: '', authenticated: true, user: action.payload };
    case actionTypes.UNAUTH_USER:
      return { ...state, authenticated: false, user: {} };
    case actionTypes.AUTH_ERROR:
      return { ...state, error: action.payload };
    default:
      return state;
  }
}
