const Types = {
  SET_CURRENT_USER: 'SET_CURRENT_USER',
};

const initialState = {
  currentUser: null,
};

const sessionReducer = (state = initialState, action) => {
  switch (action.type) {
    case Types.SET_CURRENT_USER:
      return Object.assign({}, state, {
        currentUser: action.currentUser
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
        me: currentUser,
      })
    }
  },
}

export default sessionReducer;
