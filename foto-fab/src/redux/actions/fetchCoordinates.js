import {
  FETCH_LOCATION_COORDINATES,
  TOGGLE_COORDINATE_FETCHING_STATE,
} from "../actionType";

import axios from "axios";

export const fetchLocation = (location) => async (dispatch) => {
  try {
    dispatch({ type: FETCH_LOCATION_COORDINATES, payload: null });
    dispatch({ type: TOGGLE_COORDINATE_FETCHING_STATE });
    const { data } = await axios.get(
      `https://www.mapquestapi.com/geocoding/v1/address?key=G3Sbuwj4Mgptl0S0KO2beiAvwa5fbDlA&location=${location}`
    );
    console.log(data.results[0].locations[0].displayLatLng);
    dispatch({
      type: FETCH_LOCATION_COORDINATES,
      payload: data.results[0].locations[0].displayLatLng,
    });
  } catch (err) {
    console.error(err.message);
  } finally {
    dispatch({ type: TOGGLE_COORDINATE_FETCHING_STATE });
  }
};
