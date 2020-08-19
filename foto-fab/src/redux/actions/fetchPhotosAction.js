import axios from "axios";
import {
  SET_PHOTOS,
  DEL_PHOTOS,
  TOGGLE_PHOTO_FETCHING_STATE,
} from "../actionType";
import { key } from "../../config";

export const emptyImages = () => async (dispatch) => {
  dispatch({ type: DEL_PHOTOS, payload: null });
};
export const fetchPopularPhotos = () => async (dispatch) => {
  try {
    dispatch({ type: SET_PHOTOS, payload: null });
    dispatch({ type: TOGGLE_PHOTO_FETCHING_STATE });
    const { data } = await axios.get(
      `https://api.unsplash.com/photos?&client_id=${key.ACCESS_KEY}`
    );
    console.log(data);
    dispatch({ type: SET_PHOTOS, payload: data });
  } catch (err) {
    console.error(err.message);
  } finally {
    dispatch({ type: TOGGLE_PHOTO_FETCHING_STATE });
  }
};

export const fetchImages = (page_no) => async (dispatch) => {
  try {
    dispatch({ type: TOGGLE_PHOTO_FETCHING_STATE });
    const { data } = await axios.get(
      `https://api.unsplash.com/photos?page=${page_no}&client_id=${key.ACCESS_KEY}`
    );
    console.log(data);
    dispatch({ type: SET_PHOTOS, payload: data });
  } catch (err) {
    console.error(err.message);
  } finally {
    dispatch({ type: TOGGLE_PHOTO_FETCHING_STATE });
  }
};
