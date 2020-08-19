import axios from "axios";
import {
  FETCH_A_RANDOM_PHOTO,
  TOGGLE_RANDOM_PHOTO_FETCHING_STATE,
} from "../actionType";
import { key } from "../../config";

export const fetchRandomPhotos = () => async (dispatch) => {
  try {
    dispatch({ type: FETCH_A_RANDOM_PHOTO, payload: null });
    dispatch({ type: TOGGLE_RANDOM_PHOTO_FETCHING_STATE });
    const { data } = await axios.get(
      `https://api.unsplash.com/photos/random?client_id=${key.ACCESS_KEY}`
    );
    console.log(data);
    dispatch({ type: FETCH_A_RANDOM_PHOTO, payload: data });
  } catch (err) {
    console.error(err.message);
  } finally {
    dispatch({ type: TOGGLE_RANDOM_PHOTO_FETCHING_STATE });
  }
};
