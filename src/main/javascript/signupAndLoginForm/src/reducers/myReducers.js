import { GET_ERRORS, REGISTER_NEW_USER } from "../actions/types";

const initialState = {};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_ERRORS:
      return {
        ...state,
        error: action.payload
      };
    case REGISTER_NEW_USER:
      return {
        ...state,
        registeredUser: action.payload
      };
    default:
      return state;
  }
}
