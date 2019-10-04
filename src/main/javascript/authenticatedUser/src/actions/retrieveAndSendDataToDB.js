import axios from "axios";
import {
  GET_USER_DETAILS,
  GET_ERRORS,
  ADD_STORY,
  DELETE_STORY,
  ADD_DRAFT,
  GET_ALL_STORIES,
  GET_USER_BY_USER_ID
} from "./types";

export const getUserDetails = () => dispatch => {
  axios
    .get("/descholar/private/get-current-user")
    .then(res => {
      dispatch({
        type: GET_USER_DETAILS,
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
// export const getUserDetailsByUserId = userId => dispatch => {
//   axios
//     .get(`/descholar/private/get-user-from-db/${userId}`)
//     .then(res => {
//       dispatch({
//         type: GET_USER_BY_USER_ID,
//         payload: res.data
//       });
//     })
//     .catch(err => {
//       dispatch({
//         type: GET_ERRORS,
//         payload: err.response.data
//       });
//     });
// };

export const addStory = storyToAdd => dispatch => {
  axios
    .post("/descholar/private/posting/adding-new-kinyarwanda-story", storyToAdd)
    .then(res => {
      dispatch({
        type: ADD_STORY,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
  document.location.reload();
};

export const deleteStory = (storyTitle, storyId) => dispatch => {
  const confirmDelete = confirm(`Are you sure you want to delete ${storyTitle} ?\n
  This action cannot be undone, before clicking on ok button check well! `);

  if (confirmDelete) {
    axios
      .delete(`/descholar/private/deleting/${storyId}`)
      .then(res => {
        dispatch({
          type: DELETE_STORY,
          payload: res.data
        });
      })
      .catch(err => {
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        });
      });
  } else {
    //do nothing
  }
  document.location.reload();
};

export const addDraft = draftToAdd => dispatch => {
  axios
    .post("/descholar/private/posting/adding-new-draft", draftToAdd)
    .then(res => {
      dispatch({
        type: ADD_DRAFT,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
  document.location.reload();
};
export const getAllStories = () => dispatch => {
  axios
    .get("/descholar/public/get-all-stories")
    .then(res => {
      dispatch({
        type: GET_ALL_STORIES,
        payload: res.data
      });
      const stories = res.data;
      let listOfUsers = [];
      for (let i = 0; i < stories.length; i++) {
        axios
          .get(`/descholar/public/get-user-from-db/${stories[i].authorId}`)
          .then(res => {
            listOfUsers.push(res.data);
            dispatch({
              type: GET_USER_BY_USER_ID,
              payload: listOfUsers
            });
          })
          .catch(err => {
            dispatch({
              type: GET_ERRORS,
              payload: err.response.data
            });
          });
      }
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};
