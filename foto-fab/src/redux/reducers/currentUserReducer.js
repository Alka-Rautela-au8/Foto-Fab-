import {
  CURRENT_USERS_LIKED_PHOTOS,
  TOGGLE_CURRENT_USERS_LIKED_PHOTO_FETCHING_STATE,
  CURRENT_USER_COLLECTION,
  TOGGLE_CURRENT_USER_COLLECTION_FETCHING_STATE,
  DEL_PHOTOS,
  LIKE_PHOTO,
  UNLIKE_PHOTO,
  DATA_FETCHED,
  SHOW_CREATE_COLLECTION,
  SHOW_ADD_MODAL,
  LOGIN_MODAL,
  LOGOUT_MODAL,
  TIME_MODAL,
  SHOW_CREATION_TIME_MODAL,
  SHOW_EDIT_ALERT,
} from "../actionType";

const initialState = {
  likedPhotos: null,
  isLikedPhotoLoading: false,
  collections: null,
  isCollectionLoading: false,
  localLikes: JSON.parse(localStorage.getItem("localLikes")) || [],
  dataFetched: false,
  showModal: false,
  showAlert: false,
  showLogoutAlert: false,
  addModal: false,
  timeModal: false,
  creationTimeModal: false,
  editAlert: false,
};

const currentUserReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case CURRENT_USERS_LIKED_PHOTOS: {
      return { ...state, likedPhotos: payload };
    }
    case TOGGLE_CURRENT_USERS_LIKED_PHOTO_FETCHING_STATE: {
      return { ...state, isLikedPhotoLoading: !state.isLikedPhotoLoading };
    }
    case CURRENT_USER_COLLECTION: {
      return { ...state, collections: payload };
    }
    case TOGGLE_CURRENT_USER_COLLECTION_FETCHING_STATE: {
      return { ...state, isCollectionLoading: !state.isCollectionLoading };
    }

    case DEL_PHOTOS:
      return {
        ...state,
        likedPhotos: [],
      };

    case LIKE_PHOTO:
      let updatedPhoto = [...state.localLikes];
      updatedPhoto.push({ ...payload });
      const likeJSON = JSON.stringify(updatedPhoto);
      localStorage.setItem("localLikes", likeJSON);
      return { ...state, localLikes: updatedPhoto };

    case DATA_FETCHED:
      if (state.likedPhotos.length > 0) {
        console.log(state.likedPhotos);
        return { ...state, dataFetched: true };
      }
      return {
        ...state,
        dataFetched: false,
      };
    case UNLIKE_PHOTO:
      let newUpdate = state.localLikes.filter(
        (item) => item.id !== action.payload
      );
      let newArray = JSON.stringify(newUpdate);
      localStorage.localLikes = newArray;
      return {
        ...state,
        localLikes: newUpdate,
      };
    case SHOW_CREATE_COLLECTION:
      return {
        ...state,
        showModal: !state.showModal,
      };
    case SHOW_ADD_MODAL:
      return {
        ...state,
        addModal: !state.addModal,
      };
    case LOGIN_MODAL:
      return {
        ...state,
        showAlert: !state.showAlert,
      };
    case LOGOUT_MODAL:
      return {
        ...state,
        showLogoutAlert: !state.showLogoutAlert,
      };
    case TIME_MODAL:
      return {
        ...state,
        timeModal: !state.timeModal,
      };
    case SHOW_CREATION_TIME_MODAL:
      return {
        ...state,
        creationTimeModal: !state.creationTimeModal,
      };
    case SHOW_EDIT_ALERT:
      return {
        ...state,
        editAlert: !state.editAlert,
      };
    default: {
      return state;
    }
  }
};

export default currentUserReducer;
