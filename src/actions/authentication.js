import axios from 'axios';
import actionTypes from './actionTypes';

const API_SERVER = 'http://localhost:3000';

export function signinUser({email, password}) {
  // submit to server
  // - update auth state
  // - save token
  // redirect to right route
  // show error if bad

  return dispatch => {
    console.log(email, password)
    axios
      .post(`${API_SERVER}/signin`, { email, password })
      .then(response => {
        console.log(response);
      })
      .catch(error => console.log(error));
      // .then(res => res);
    // dispatch({ type: actionTypes.SIGNIN_USER });
  }

}
