import axios from 'axios';
import actionTypes from './actionTypes';
import globals from '../../config/globals';

export function getIngredients() {
  return dispatch =>
    axios
      .get(`${globals.API_SERVER}/ingredients`)
      .then(res =>
        dispatch({
          type: actionTypes.GET_INGREDIENTS,
          payload: res.data.ingredients,
        })
      )
      .catch(err => console.log(err));
}