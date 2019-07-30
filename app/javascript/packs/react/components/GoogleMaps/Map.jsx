import React from 'react';
import { GoogleMap, Marker, withGoogleMap, withScriptjs } from 'react-google-maps';

const Map = (props) => {
  const lat = props.place.geometry.location.lat();
  const lng = props.place.geometry.location.lng();

  return <GoogleMap
    defaultZoom={17}
    defaultCenter={{ lat, lng }}
    options={{ mapTypeControl: false }}>

    {props.isMarkerShown && <Marker position={{ lat, lng }} />}
  </GoogleMap>
}

export default withScriptjs(withGoogleMap(Map));
