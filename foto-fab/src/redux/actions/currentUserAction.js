import {
  CURRENT_USERS_LIKED_PHOTOS,
  TOGGLE_CURRENT_USERS_LIKED_PHOTO_FETCHING_STATE,
  CURRENT_USER_COLLECTION,
  TOGGLE_CURRENT_USER_COLLECTION_FETCHING_STATE,
  LIKE_PHOTO,
  UNLIKE_PHOTO,
  DATA_FETCHED,
  LOGIN_MODAL,
  SHOW_CREATE_COLLECTION,
  SHOW_ADD_MODAL,
  LOGOUT_MODAL,
  TIME_MODAL,
  SHOW_CREATION_TIME_MODAL,
  SHOW_EDIT_ALERT,
} from "../actionType";
import axios from "axios";
import { key } from "../../config";

export const fetchCurrentUserLikedPhotos = (username, page_no) => async (
  dispatch
) => {
  try {
    dispatch({ type: TOGGLE_CURRENT_USERS_LIKED_PHOTO_FETCHING_STATE });
    const { data } = await axios.get(
      `https://api.unsplash.com/users/${username}/likes?page=${page_no}&client_id=${key.ACCESS_KEY}`
    );
    console.log(data);
    dispatch({ type: CURRENT_USERS_LIKED_PHOTOS, payload: data });
  } catch (err) {
    console.error(err.message);
  } finally {
    dispatch({ type: TOGGLE_CURRENT_USERS_LIKED_PHOTO_FETCHING_STATE });
    dispatch({ type: DATA_FETCHED });
  }
};

export const fetchCurrentUserCollections = (username) => async (dispatch) => {
  try {
    dispatch({ type: CURRENT_USER_COLLECTION, payload: null });
    dispatch({ type: TOGGLE_CURRENT_USER_COLLECTION_FETCHING_STATE });
    const { data } = await axios.get(
      `https://api.unsplash.com/users/${username}/collections?client_id=${key.ACCESS_KEY}`
    );
    console.log(data);
    dispatch({ type: CURRENT_USER_COLLECTION, payload: data });
  } catch (err) {
    console.error(err.message);
  } finally {
    dispatch({ type: TOGGLE_CURRENT_USER_COLLECTION_FETCHING_STATE });
  }
};

export const likePictureLocally = (photo) => {
  console.log("liked Photos");
  return {
    type: LIKE_PHOTO,
    payload: photo,
  };
};

export const removePictureLocally = (id) => {
  console.log("unlike Photos");
  return {
    type: UNLIKE_PHOTO,
    payload: id,
  };
};

//SHOW CREATE COLLECTION MODAL
export const showCreateCollectionModal = () => {
  return {
    type: SHOW_CREATE_COLLECTION,
  };
};

export const showAlertModal = () => {
  return {
    type: LOGIN_MODAL,
  };
};

export const showLogoutModal = () => {
  return {
    type: LOGOUT_MODAL,
  };
};
export const showTimeModal = () => {
  return {
    type: TIME_MODAL,
  };
};

//Show add to collection modal
export const showAddToCollectionModal = () => {
  return {
    type: SHOW_ADD_MODAL,
  };
};

export const showCreationTimeModal = () => {
  return {
    type: SHOW_CREATION_TIME_MODAL,
  };
};
export const showEditAlert = () => {
  return {
    type: SHOW_EDIT_ALERT,
  };
};
