import axios from 'axios';
import actionTypes from './actionTypes';
import globals from '../../config/globals';

export function getUser(userId) {
  return dispatch =>
    axios
      .get(`${globals.API_SERVER}/users/${userId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      })
      .then(res => dispatch({ type: actionTypes.GET_USER, payload: res.data }))
      .catch(err => console.log(err));
}
