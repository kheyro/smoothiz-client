import axios from 'axios';
import actionTypes from './actionTypes';

const API_SERVER = 'http://localhost:3000';

export function createSmoothy(data) {
  return dispatch =>
    axios
      .post(`${API_SERVER}/smoothies`, data)
      .then(res => console.log(res))
      .catch(err => console.log(err));
}
