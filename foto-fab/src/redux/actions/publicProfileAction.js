import {
  PUBLIC_PROFILE,
  PUBLIC_PHOTO,
  PUBLIC_USERS_LIKED_PHOTOS,
  TOGGLE_PUBLIC_PROFILE_FETCHING_STATE,
  TOGGLE_PUBLIC_PHOTO_FETCHING_STATE,
  TOGGLE_PUBLIC_USERS_LIKED_PHOTO_FETCHING_STATE,
  PUBLIC_USER_COLLECTION,
  TOGGLE_PUBLIC_USER_COLLECTION_FETCHING_STATE,
} from "../actionType";
import axios from "axios";
import { key } from "../../config";

export const fetchPublicUser = (username) => async (dispatch) => {
  try {
    dispatch({ type: PUBLIC_PROFILE, payload: null });
    dispatch({ type: TOGGLE_PUBLIC_PROFILE_FETCHING_STATE });
    const { data } = await axios.get(
      `https://api.unsplash.com/users/${username}/?client_id=${key.ACCESS_KEY}`
    );
    console.log(data);
    dispatch({ type: PUBLIC_PROFILE, payload: data });
  } catch (err) {
    console.error(err.message);
  } finally {
    dispatch({ type: TOGGLE_PUBLIC_PROFILE_FETCHING_STATE });
  }
};

//fetch public user's photos
export const fetchPublicUserPhotos = (username, page_no) => async (
  dispatch
) => {
  try {
    dispatch({ type: TOGGLE_PUBLIC_PHOTO_FETCHING_STATE });
    const { data } = await axios.get(
      `https://api.unsplash.com/users/${username}/photos?page=${page_no}&client_id=${key.ACCESS_KEY}`
    );
    console.log(data);
    dispatch({ type: PUBLIC_PHOTO, payload: data });
  } catch (err) {
    console.error(err.message);
  } finally {
    dispatch({ type: TOGGLE_PUBLIC_PHOTO_FETCHING_STATE });
  }
};

export const fetchPublicUserLikedPhotos = (username, page_no) => async (
  dispatch
) => {
  try {
    dispatch({ type: TOGGLE_PUBLIC_USERS_LIKED_PHOTO_FETCHING_STATE });
    const { data } = await axios.get(
      `https://api.unsplash.com/users/${username}/likes?page=${page_no}&client_id=${key.ACCESS_KEY}`
    );
    console.log(data);
    dispatch({ type: PUBLIC_USERS_LIKED_PHOTOS, payload: data });
  } catch (err) {
    console.error(err.message);
  } finally {
    dispatch({ type: TOGGLE_PUBLIC_USERS_LIKED_PHOTO_FETCHING_STATE });
  }
};

export const fetchPublicUserCollections = (username) => async (dispatch) => {
  try {
    dispatch({ type: PUBLIC_USER_COLLECTION, payload: null });
    dispatch({ type: TOGGLE_PUBLIC_USER_COLLECTION_FETCHING_STATE });
    const { data } = await axios.get(
      `https://api.unsplash.com/users/${username}/collections?client_id=${key.ACCESS_KEY}`
    );
    console.log(data);
    dispatch({ type: PUBLIC_USER_COLLECTION, payload: data });
  } catch (err) {
    console.error(err.message);
  } finally {
    dispatch({ type: TOGGLE_PUBLIC_USER_COLLECTION_FETCHING_STATE });
  }
};
