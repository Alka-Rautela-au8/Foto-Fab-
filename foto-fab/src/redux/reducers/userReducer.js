import {
  LOGOUT,
  UNSPLASH_LOGIN,
  SET_USER_PROFILE,
  CREATE_A_NEW_COLLECTION,
} from "../actionType";

const initialState = {
  accessTokenData: JSON.parse(localStorage.getItem("accessTokenData")) || null,
  userProfile: JSON.parse(localStorage.getItem("userProfile")) || null,
  newCollection: [],
};

const userReducer = (state = initialState, action) => {
  // let updatedLikes;
  // let updatedPhotoIndex;
  const { type, payload } = action;
  switch (type) {
    case LOGOUT:
      localStorage.removeItem("accessTokenData");
      localStorage.removeItem("userProfile");
      localStorage.removeItem("localLikes");
      return { ...state, accessTokenData: null, userProfile: null };

    case UNSPLASH_LOGIN:
      const userJSON = JSON.stringify(payload);
      localStorage.setItem("accessTokenData", userJSON);
      return { ...state, accessTokenData: payload };

    case SET_USER_PROFILE:
      const userProfileJSON = JSON.stringify(payload);
      localStorage.setItem("userProfile", userProfileJSON);
      return { ...state, userProfile: payload };

    case CREATE_A_NEW_COLLECTION:
      return { ...state, newCollection: [payload] };
    default:
      return state;
  }
};

export default userReducer;
