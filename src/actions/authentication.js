import axios from 'axios';
import history from '../../config/history';
import actionTypes from './actionTypes';

const API_SERVER = 'http://localhost:3000';

export function authError(error) {
  return {
    type: actionTypes.AUTH_ERROR,
    payload: error,
  };
}

export function signinUser({ email, password }) {
  return dispatch => {
    axios
      .post(`${API_SERVER}/signin`, { email, password })
      .then(response => {
        dispatch({ type: actionTypes.AUTH_USER });
        localStorage.setItem('token', response.data.token);
        history.push('/');
      })
      .catch(() => dispatch(authError('Bad login info')));
  };
}

export function signoutUser() {
  localStorage.removeItem('token');
  return { type: actionTypes.UNAUTH_USER };
}
