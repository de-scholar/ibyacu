import axios from "axios";
import { REGISTER_NEW_USER, GET_ERRORS } from "./types";

export const registerNewUser = newUser => dispatch => {
  axios
    .post("/descholar/public/register-new-or-edit-existing-user", newUser)
    .then(res => {
      dispatch({
        type: REGISTER_NEW_USER,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};
