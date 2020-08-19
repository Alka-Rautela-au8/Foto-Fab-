import {
  FETCH_COLLECTION_PHOTOS,
  DEL_PHOTOS,
  TOGGLE_COLLECTION_PHOTOS_FETCHING_STATE,
} from "../actionType";

const initialState = {
  collectionPhotos: [],
  isCollectionPhotoLoading: false,
};

export const collectionReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case FETCH_COLLECTION_PHOTOS:
      return {
        ...state,
        collectionPhotos: [...state.collectionPhotos, ...payload],
      };

    case DEL_PHOTOS:
      return {
        ...state,
        collectionPhotos: [],
      };

    case TOGGLE_COLLECTION_PHOTOS_FETCHING_STATE:
      return {
        ...state,
        isCollectionPhotoLoading: !state.isCollectionPhotoLoading,
      };

    default: {
      return state;
    }
  }
};
