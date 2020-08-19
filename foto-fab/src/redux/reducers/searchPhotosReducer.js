import {
  SET_SEARCHED_PHOTO,
  DEL_PHOTOS,
  TOGGLE_SEARCHED_PHOTO_FETCHING_STATE,
  SEARCH_USER,
  DEL_USERS,
  DEL_COLLECTION,
  SEARCH_COLLECTION,
} from "../actionType";

const initialState = {
  photos: [],
  users: [],
  collections: [],
  isPhotoLoading: false,
};

export const searchPhotosReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case SET_SEARCHED_PHOTO: {
      console.log(payload);
      return { ...state, photos: [...state.photos, ...payload] };
    }
    case TOGGLE_SEARCHED_PHOTO_FETCHING_STATE: {
      return { ...state, isPhotoLoading: !state.isPhotoLoading };
    }
    case SEARCH_USER: {
      return { ...state, users: [...state.users, ...payload] };
    }
    case SEARCH_COLLECTION: {
      return { ...state, collections: [...state.collections, ...payload] };
    }
    case DEL_PHOTOS: {
      return { ...state, photos: [] };
    }
    case DEL_USERS: {
      return { ...state, users: [] };
    }
    case DEL_COLLECTION: {
      return { ...state, collections: [] };
    }
    default: {
      return state;
    }
  }
};

export default searchPhotosReducer;
