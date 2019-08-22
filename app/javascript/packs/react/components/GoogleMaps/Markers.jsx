import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Marker } from 'react-google-maps';
import MarkerIcon from 'images/green_marker.png'

const SelectedMarkerIcon = {
    url: MarkerIcon,
    scaledSize: new google.maps.Size(27, 43)
};

import Location from '../../models/Location';

class Markers extends Component{
  constructor(props){
    super(props);

    this.state = {}
  }

  onSelectedLocationChange = ( locationId ) => {
    this.props.onSelectedLocationChange( locationId );

    const element = document.getElementById('location-' + locationId);
    if (element){
      element.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }

  render(){
    const { selectedLocation } = this.props;

    const markers = this.props.locations.map(loc => {
      let markerIcon = loc.id === selectedLocation ? SelectedMarkerIcon : null;

      return <Marker key={loc.id}
          icon={markerIcon}
          position={{ lat: loc.lat, lng: loc.lng }}
          onClick={() => this.onSelectedLocationChange(loc.id)} />
    })

    return <>
      { markers }
    </>
  }
}

Markers.propTypes = {
  locations: PropTypes.arrayOf(PropTypes.instanceOf(Location)),
}

export default Markers;
