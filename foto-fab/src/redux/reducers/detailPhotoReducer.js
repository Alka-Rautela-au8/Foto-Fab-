import {
  FETCH_A_PHOTO,
  TOGGLE_SINGLE_PHOTO_FETCHING_STATE,
  GET_IMAGE_STATISTICS,
} from "../actionType";

const initialState = {
  photo: null,
  isPhotoLoading: false,
  stat: null,
};
export const detailPhotoReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case FETCH_A_PHOTO:
      return {
        ...state,
        photo: payload,
      };
    case TOGGLE_SINGLE_PHOTO_FETCHING_STATE:
      return {
        ...state,
        isPhotoLoading: !state.isPhotoLoading,
      };
    case GET_IMAGE_STATISTICS: {
      return { ...state, stat: payload };
    }
    default:
      return state;
  }
};
