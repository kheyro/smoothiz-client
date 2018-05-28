import axios from 'axios';
import Cookies from 'js-cookie';
import actionTypes from './actionTypes';
import history from '../../config/history';

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
    Cookies.remove('user');
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
  const config = { headers: { 'Content-Type': 'multipart/form-data' } };
  const formData = new FormData();
  const user = Object.assign({}, userInfo, { picture: '' });
  formData.append('picture', userInfo.picture);
  formData.append('user', JSON.stringify(user));

  return dispatch => {
    axios
      .post(`${API_SERVER}/signup`, formData, config)
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
  return () => {
    axios
      .get(`${API_SERVER}`, {
        headers: { authorization: localStorage.getItem('token') },
      })
      .then(response => console.log(response));
  };
}
