import axios from 'axios';
import actionTypes from './actionTypes';
import globals from '../../config/globals';

export function getUnits() {
  return dispatch =>
    axios
      .get(`${globals.API_SERVER}/units`)
      .then(res =>
        dispatch({
          type: actionTypes.GET_UNITS,
          payload: res.data.units,
        })
      )
      .catch(err => console.log(err));
}
