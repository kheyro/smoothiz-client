import axios from 'axios';
import actionTypes from './actionTypes';

const API_SERVER = 'http://localhost:3000';

export function getCategories() {
  return dispatch =>
    axios
      .get(`${API_SERVER}/categories`)
      .then(res =>
        dispatch({
          type: actionTypes.GET_CATEGORIES,
          payload: res.data.categories,
        })
      )
      .catch(err => console.log(err));
}