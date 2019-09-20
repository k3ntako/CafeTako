const Types = {
  SET_USER_LOCATION: 'SET_USER_LOCATION',
  SET_USER_LOCATION_AS_DEFAULT: 'SET_USER_LOCATION_AS_DEFAULT',
};

const DEFAULT_PLACE = {
  geometry: {
    location: {
      lat: () => 40.758071,
      lng: () => -73.985418,
    }
  },
  newAddressComponents: {
    administrative_area_level_1: "NY",
    country: "US",
    postal_code: "10036",
    route: "Broadway",
    street_number: "1540",
    sublocality_level_1: "Manhattan",
  }
};

const initialState = {
  defaultPlace: DEFAULT_PLACE,
  userLocation: null
};

const googleMapsReducer = (state = initialState, action) => {
  switch (action.type) {
    case Types.SET_USER_LOCATION:
      return Object.assign({}, state, {
        userLocation: action.userLocation
      })
    case Types.SET_USER_LOCATION_AS_DEFAULT:
      return Object.assign({}, state, {
        userLocation: DEFAULT_PLACE,
      })
    default:
      return state
  }
}

googleMapsReducer.Methods = {
  setUserLocation: (dispatch) => {
    return (userLocation) => {
      return dispatch({
        type: Types.SET_USER_LOCATION,
        userLocation: userLocation,
      })
    }
  },
  setUserLocationAsDefault: (dispatch) => {
    return (userLocation) => {
      return dispatch({
        type: Types.SET_USER_LOCATION_AS_DEFAULT,
      })
    }
  },
}

export default googleMapsReducer;
