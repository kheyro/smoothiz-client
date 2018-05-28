import axios from 'axios';
import actionTypes from './actionTypes';

const API_SERVER = 'http://localhost:3000';

export function createSmoothie(data) {
  console.log('ACTION', data);
  const config = {
    headers: {
      'Content-Type': 'multipart/form-data',
      authorization: localStorage.getItem('token'),
    },
  };
  const formData = new FormData();
  const smoothie = Object.assign({}, data, { pictures: {}, preview: '' });
  formData.append('pictures', data.pictures);
  formData.append('smoothie', JSON.stringify(smoothie));
  return dispatch =>
    axios
      .post(`${API_SERVER}/smoothies`, formData, config)
      .then(res => res)
      .catch(err => console.log(err));
}

export function getSmoothies(filter) {
  let url;
  if (filter && filter.type === 'category') {
    url = `/categories/${filter.id}/smoothies`;
  } else {
    url = '/smoothies';
  }
  return dispatch =>
    axios
      .get(`${API_SERVER}${url}`)
      .then(res =>
        dispatch({
          type: actionTypes.GET_SMOOTHIES,
          payload: res.data.smoothies,
        })
      )
      .catch(err => console.log(err));
}

export function getSmoothie(smoothieId) {
  return dispatch =>
    axios
      .get(`${API_SERVER}/smoothies/${smoothieId}`)
      .then(res =>
        dispatch({ type: actionTypes.GET_SMOOTHIE, payload: res.data.smoothie })
      )
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

export function deleteSmoothie(smoothieId) {
  return dispatch =>
    axios
      .delete(`${API_SERVER}/smoothies/${smoothieId}`, {
        headers: { authorization: localStorage.getItem('token') },
      })
      .then(res => res)
      .catch(err => console.log(err));
}

export function likeSmoothie(smoothieId) {
  return dispatch =>
    axios
      .get(`${API_SERVER}/smoothies/${smoothieId}/like`, {
        headers: { authorization: localStorage.getItem('token') },
      })
      .then(() => this.getSmoothie(smoothieId))
      .catch(err => console.log(err));
}

export function dislikeSmoothie(smoothieId) {
  return dispatch =>
    axios
      .get(`${API_SERVER}/smoothies/${smoothieId}/dislike`, {
        headers: { authorization: localStorage.getItem('token') },
      })
      .then(() => this.getSmoothie(smoothieId))
      .catch(err => console.log(err));
}

