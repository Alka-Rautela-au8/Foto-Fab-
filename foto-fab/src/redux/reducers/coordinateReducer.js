import {
  FETCH_LOCATION_COORDINATES,
  TOGGLE_COORDINATE_FETCHING_STATE,
} from "../actionType";

const initialState = {
  location: null,
  isLocationFetching: false,
};

export const coordinateReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case FETCH_LOCATION_COORDINATES:
      return { ...state, location: payload };
    case TOGGLE_COORDINATE_FETCHING_STATE:
      return { ...state, isLocationFetching: !state.isLocationFetching };
    default: {
      return state;
    }
  }
};
