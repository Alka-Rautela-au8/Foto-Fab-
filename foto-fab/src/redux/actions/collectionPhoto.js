import {
  FETCH_COLLECTION_PHOTOS,
  TOGGLE_COLLECTION_PHOTOS_FETCHING_STATE,
} from "../actionType";
import axios from "axios";
import { key } from "../../config";

export const fetchCollectionPhotos = (id, page_no) => async (dispatch) => {
  try {
    dispatch({ type: TOGGLE_COLLECTION_PHOTOS_FETCHING_STATE });
    const { data } = await axios.get(
      `https://api.unsplash.com/collections/${id}/photos?page=${page_no}&client_id=${key.ACCESS_KEY}`
    );
    console.log(data);
    dispatch({ type: FETCH_COLLECTION_PHOTOS, payload: data });
  } catch (err) {
    console.error(err.message);
  } finally {
    dispatch({ type: TOGGLE_COLLECTION_PHOTOS_FETCHING_STATE });
  }
};
