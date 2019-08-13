import { combineReducers } from 'redux';

import sessionReducer from './sessionReducer';
import googleMapsReducer from './googleMapsReducer';

const rootReducer = combineReducers({
  session: sessionReducer,
  googleMaps: googleMapsReducer,
});

export default rootReducer;
