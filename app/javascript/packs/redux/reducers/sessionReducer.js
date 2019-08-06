const Types = {
  SET_CURRENT_USER: 'SET_CURRENT_USER',
  SET_USER_LOCATION: 'SET_USER_LOCATION',
};

const initialState = {
  currentUser: null,
  userLocation: {
    lat: 40.758071,
    lng: -73.985418,
  }
};

const sessionReducer = (state = initialState, action) => {
  switch (action.type) {
    case Types.SET_CURRENT_USER:
      return Object.assign({}, state, {
        currentUser: action.currentUser
      })
    case Types.SET_USER_LOCATION:
      return Object.assign({}, state, {
        userLocation: action.userLocation
      })
    default:
      return state
  }
}

sessionReducer.Methods = {
  setCurrentUser: (dispatch) => {
    return (currentUser) => {
      return dispatch({
        type: Types.SET_CURRENT_USER,
        currentUser: currentUser,
      })
    }
  },
  setUserLocation: (dispatch) => {
    return (userLocation) => {
      return dispatch({
        type: Types.SET_USER_LOCATION,
        userLocation: userLocation,
      })
    }
  },
}

export default sessionReducer;
