import { GET_ERRORS, GET_USER_DETAILS, ADD_STORY, DELETE_STORY, ADD_DRAFT, GET_ALL_STORIES, GET_USER_BY_USER_ID } from "../actions/types";

const initialState = {};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_ERRORS:
      return {
        ...state,
        error: action.payload
      };
    case GET_USER_DETAILS:
      return {
        ...state,
        userDetails: action.payload
      }
    case GET_USER_BY_USER_ID:
      return {
        ...state,
        returnedUser: action.payload
      }
    case ADD_STORY:
      return {
        ...state,
        addedStory: action.payload
      }
    case DELETE_STORY:
      return {
        ...state,
        deleteStoryInfo: action.payload
      }
    case ADD_DRAFT:
      return {
        ...state,
        addedDraft: action.payload
      }
    case GET_ALL_STORIES:
      return {
        ...state,
        allStories: action.payload
      }
    default:
      return state;
  }
}
