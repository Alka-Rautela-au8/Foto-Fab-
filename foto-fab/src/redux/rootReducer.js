import { combineReducers } from "redux";
import photoReducer from "./reducers/fetchPhotosReducer";
import publicUserReducer from "./reducers/publicProfileReducer";
import randomPhotoReducer from "./reducers/randomPhotoReducer";
import searchPhotosReducer from "./reducers/searchPhotosReducer";
import { collectionReducer } from "./reducers/collectionPhotosReducer";
import { detailPhotoReducer } from "./reducers/detailPhotoReducer";
import { coordinateReducer } from "./reducers/coordinateReducer";
import userReducer from "./reducers/userReducer";
import currentUserReducer from "./reducers/currentUserReducer";
const rootReducer = combineReducers({
  photoState: photoReducer,
  publicUserState: publicUserReducer,
  randomPhotoState: randomPhotoReducer,
  searchPhotoState: searchPhotosReducer,
  collectionPhotos: collectionReducer,
  detailPhoto: detailPhotoReducer,
  locationState: coordinateReducer,
  userState: userReducer,
  currentUserState: currentUserReducer,
});

export default rootReducer;
