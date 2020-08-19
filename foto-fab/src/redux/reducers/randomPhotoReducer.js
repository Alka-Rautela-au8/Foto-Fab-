import {
  FETCH_A_RANDOM_PHOTO,
  TOGGLE_RANDOM_PHOTO_FETCHING_STATE,
} from "../actionType";

const initialState = {
  photo: null,
  isPhotoLoading: false,
};

export const randomPhotoReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case FETCH_A_RANDOM_PHOTO: {
      return { ...state, photo: payload };
    }
    case TOGGLE_RANDOM_PHOTO_FETCHING_STATE: {
      return { ...state, isPhotoLoading: !state.isPhotoLoading };
    }
    default: {
      return state;
    }
  }
};

export default randomPhotoReducer;
