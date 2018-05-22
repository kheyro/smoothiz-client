import axios from 'axios';
import actionTypes from './actionTypes';
import history from '../../config/history';
import Cookies from 'js-cookie';

const API_SERVER = 'http://localhost:3000';

export function authError(error) {
  return {
    type: actionTypes.AUTH_ERROR,
    payload: error,
  };
}

export function signinFromSocial() {
  const cookiedToken = Cookies.get('token');
  const cookiedUser = JSON.parse(Cookies.get('user'));
  if (cookiedToken && cookiedUser) {
    localStorage.setItem('token', cookiedToken);
    Cookies.remove('token');
    return { type: actionTypes.AUTH_USER, payload: cookiedUser };
  }
  return false;
}

export function signinUser({ email, password }) {
  return dispatch => {
    axios
      .post(`${API_SERVER}/signin`, { email, password })
      .then(response => {
        dispatch({ type: actionTypes.AUTH_USER, payload: response.data.user });
        // localStorage.setItem('user', JSON.stringify(response.data.user));
        localStorage.setItem('token', response.data.token);
        history.push('/features');
      })
      .catch(() => dispatch(authError('Bad login info')));
  };
}

export function signoutUser() {
  localStorage.removeItem('token');
  // localStorage.removeItem('user');
  return { type: actionTypes.UNAUTH_USER };
}

export function signupUser(userInfo) {
  return dispatch => {
    axios
      .post(`${API_SERVER}/signup`, userInfo)
      .then(response => {
        dispatch({ type: actionTypes.AUTH_USER, payload: response.data.user });
        // localStorage.setItem('user', JSON.stringify(response.data.user));
        localStorage.setItem('token', response.data.token);
        history.push('/features');
      })
      .catch(error => dispatch(authError(error.response.data.error)));
  };
}

export function fetchMessage() {
  return dispatch => {
    axios
      .get(`${API_SERVER}`, {
        headers: { authorization: localStorage.getItem('token') },
      })
      .then(response => console.log(response));
  }
}
