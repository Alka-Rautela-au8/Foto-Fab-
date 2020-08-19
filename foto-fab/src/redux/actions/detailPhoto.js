import {
  FETCH_A_PHOTO,
  TOGGLE_SINGLE_PHOTO_FETCHING_STATE,
  GET_IMAGE_STATISTICS,
} from "../actionType";
import axios from "axios";
import { key } from "../../config";

export const fetchDetailPhotos = (id) => async (dispatch) => {
  try {
    dispatch({ type: TOGGLE_SINGLE_PHOTO_FETCHING_STATE });
    const { data } = await axios.get(
      `https://api.unsplash.com/photos/${id}/?client_id=${key.ACCESS_KEY}`
    );
    console.log(data);
    dispatch({ type: FETCH_A_PHOTO, payload: data });
  } catch (err) {
    console.error(err.message);
  } finally {
    dispatch({ type: TOGGLE_SINGLE_PHOTO_FETCHING_STATE });
  }
};

export const fetchStatistics = (id) => async (dispatch) => {
  try {
    const { data } = await axios.get(
      `https://api.unsplash.com/photos/${id}/statistics?&client_id=${key.ACCESS_KEY}`
    );
    console.log(data);
    dispatch({ type: GET_IMAGE_STATISTICS, payload: data });
  } catch (err) {
    console.error(err.message);
  }
};
