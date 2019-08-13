import React, { Component } from 'react';
import { connect, Provider } from 'react-redux';
import store from '../redux/store/store';
import sessionReducer from '../redux/reducers/sessionReducer';
import googleMapsReducer from '../redux/reducers/googleMapsReducer';
import { withScriptjs } from "react-google-maps"
import User from './models/User';
import { parsePlace } from './utilities/googleMapsHelper';

import Routes from './Routes';

export default class App extends Component{
  constructor(props){
    super(props);

    this.state = {}
  }

  componentDidMount(){
    User.currentUser().then(user => {
      sessionReducer.Methods.setCurrentUser(store.dispatch)(user);
    });

    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(this.reverseGeocode, this.onError);
    } else {
      console.warn('geolocation not found in navigator');
      googleMapsReducer.Methods.setUserLocationAsDefault(store.dispatch)();
    }

  }

  reverseGeocode = (position) => {
    const location = {
      lat: position.coords.latitude,
      lng: position.coords.longitude,
    }

    const geocoder = new google.maps.Geocoder;

    geocoder.geocode({ location }, function(results, status) { //, region: { country: "US" }
      if (status === 'OK') {
        if (results[0]) {
          const place = parsePlace( results[0] );

          googleMapsReducer.Methods.setUserLocation(store.dispatch)(place);
        } else {
          console.warn('No results found');
          googleMapsReducer.Methods.setUserLocationAsDefault(store.dispatch)();
        }
      } else {
        console.error('Geocoder failed due to: ' + status);
        googleMapsReducer.Methods.setUserLocationAsDefault(store.dispatch)();
      }
    });
  }

  onError = (err) => {
    googleMapsReducer.Methods.setUserLocationAsDefault(store.dispatch)();
    console.error(err.message);
  }

  render(){
    return <Provider store={store}>
      <Routes />
    </Provider>
  }
}
