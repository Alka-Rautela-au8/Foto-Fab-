import {
  LOGOUT,
  UNSPLASH_LOGIN,
  SET_USER_PROFILE,
  TOGGLE_USER_PROFILE_GETTING_STATE,
  LIKE_A_PHOTO,
  LIKE_PHOTO,
  CREATE_A_NEW_COLLECTION,
  SHOW_CREATE_COLLECTION,
} from "../actionType";
import axios from "axios";
import { key } from "../../config";

export const unsplashLogin = (code) => async (dispatch) => {
  try {
    const { data } = await axios.post(
      `https://unsplash.com/oauth/token?&client_id=${key.ACCESS_KEY}&client_secret=${key.SECRET_KEY}&redirect_uri=${key.REDIRECT_URI}&code=${code}&grant_type=authorization_code`
    );
    console.log(data);
    dispatch({ type: UNSPLASH_LOGIN, payload: data });
  } catch (err) {
    console.log("login for enjoying more features");
  }
};

export const logOutUser = () => {
  return {
    type: LOGOUT,
  };
};

export const fetchCurrentUserProfile = (accessToken) => async (dispatch) => {
  try {
    dispatch({ type: TOGGLE_USER_PROFILE_GETTING_STATE });
    const { data } = await axios.get(
      `https://api.unsplash.com/me?&access_token=${accessToken}`
    );
    console.log(data);
    dispatch({ type: SET_USER_PROFILE, payload: data });
  } catch (err) {
    console.log("WELCOME");
  } finally {
    dispatch({ type: TOGGLE_USER_PROFILE_GETTING_STATE });
  }
};

//LIKE A PHOTO
export const likeAPhoto = (id, accessToken) => async () => {
  try {
    const { data } = await axios.post(
      `https://api.unsplash.com/photos/${id}/like?&access_token=${accessToken}`
    );
    console.log(data);
    // dispatch({ type: LIKE_A_PHOTO, payload: data });
  } catch (err) {
    alert("Rate limit exceeded");
  }
};
//unlike a photo
export const unlikeAPhoto = (id, accessToken) => async () => {
  try {
    const { data } = await axios.delete(
      `https://api.unsplash.com/photos/${id}/like?&access_token=${accessToken}`
    );
    console.log(data);
    // dispatch({ type: LIKE_A_PHOTO, payload: data });
  } catch (err) {
    alert("Rate limit exceeded");
  }
};

//local actions of user
// export const likePhoto = (photo) => {
//   console.log("ready to like");
//   return {
//     type: LIKE_PHOTO,
//     payload: photo,
//   };
// };

export const createANewCollection = (title, accessToken) => async (
  dispatch
) => {
  try {
    const { data } = await axios.post(
      `https://api.unsplash.com/collections/?title=${title}&access_token=${accessToken}`
    );
    dispatch({ type: CREATE_A_NEW_COLLECTION, payload: data });
    console.log(data);
  } catch (err) {
    alert("Please verify your email address for creating collection");
  }
};

//add photo to an existing collection
export const addPhotoToACollection = (
  collection_id,
  photo_id,
  accessToken
) => async () => {
  try {
    const { data } = await axios.post(
      `https://api.unsplash.com/collections/${collection_id}/add/?photo_id=${photo_id}&access_token=${accessToken}`
    );
    console.log(data);
  } catch (err) {
    alert("rate limit exceeded");
  }
};

export const editProfile = (first_name, last_name, bio, accessToken) => async (
  dispatch
) => {
  try {
    const { data } = await axios.put(
      `https://api.unsplash.com/me?&first_name=${first_name}&last_name=${last_name}&bio=${bio}&access_token=${accessToken}`
    );
    console.log(data);
    dispatch({ type: SET_USER_PROFILE, payload: data });
  } catch (err) {
    alert("rate limit exceeded");
  }
};
