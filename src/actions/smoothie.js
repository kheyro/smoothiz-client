import axios from 'axios';
import actionTypes from './actionTypes';

const API_SERVER = 'http://localhost:3000';

export function createSmoothy(data) {
  return dispatch =>
    axios
      .post(`${API_SERVER}/smoothies`, data, {
        headers: { authorization: localStorage.getItem('token') },
      })
      .then(res => res)
      .catch(err => console.log(err));
}

export function getSmoothies() {
  return dispatch =>
    axios
      .get(`${API_SERVER}/smoothies`)
      .then(res => res)
      .catch(err => console.log(err));
}

export function editSmoothie(data) {
  return dispatch =>
    axios
      .patch(`${API_SERVER}/smoothies/${data.editingId}`, data, {
        headers: { authorization: localStorage.getItem('token') },
      })
      .then(res => res)
      .catch(err => console.log(err));
}
