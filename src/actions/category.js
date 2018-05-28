import axios from 'axios';
import actionTypes from './actionTypes';
import globals from '../../config/globals';

export function getCategories() {
  return dispatch =>
    axios
      .get(`${globals.API_SERVER}/categories`)
      .then(res =>
        dispatch({
          type: actionTypes.GET_CATEGORIES,
          payload: res.data.categories,
        })
      )
      .catch(err => console.log(err));
}
