import axios from 'axios';
import Cookies from 'js-cookie';
import actionTypes from './actionTypes';
import history from '../../config/history';
import globals from '../../config/globals';

export function authError(error) {
  return {
    type: actionTypes.AUTH_ERROR,
    payload: error,
  };
}

export function signinFromSocial(token, userId) {
  // const cookiedToken = Cookies.get('token');
  // const cookiedUser = JSON.parse(Cookies.get('user'));
  const user = { id: +userId, firstname: '', lastname: '' };
  if (token) {
    localStorage.setItem('token', token);
    // Cookies.remove('token');
    // Cookies.remove('user');
    return { type: actionTypes.AUTH_USER, payload: user };
  }
  return false;
}

export function signinUser({ email, password }) {
  return dispatch => {
    axios
      .post(`${globals.API_SERVER}/signin`, { email, password })
      .then(response => {
        dispatch({ type: actionTypes.AUTH_USER, payload: response.data.user });
        // localStorage.setItem('user', JSON.stringify(response.data.user));
        localStorage.setItem('token', response.data.token);
        history.push(`/users/${response.data.user.id}`);
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
      .post(`${globals.API_SERVER}/signup`, formData, config)
      .then(response => {
        dispatch({ type: actionTypes.AUTH_USER, payload: response.data.user });
        // localStorage.setItem('user', JSON.stringify(response.data.user));
        localStorage.setItem('token', response.data.token);
        history.push('/features');
      })
      .catch(error => dispatch(authError(error.response.data.error)));
  };
}
