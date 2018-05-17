import axios from 'axios';
import actionTypes from './actionTypes';

const API_SERVER = 'http://localhost:3000';

export function getUser(userId) {
  return dispatch =>
    axios
      .get(`${API_SERVER}/users/${userId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      })
      .then(res => dispatch({ type: actionTypes.GET_USER, payload: res.data }))
      .catch(err => console.log(err));
}
