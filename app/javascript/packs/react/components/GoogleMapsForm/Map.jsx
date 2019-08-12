import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { BicyclingLayer, Rectangle, GoogleMap, Marker, withGoogleMap, withScriptjs } from 'react-google-maps';

import Markers from './Markers';
//react-google-maps offers bicycling layer but not transit layer
import TransitLayer from './TransitLayer';
import ToggleButtons from './ToggleButtons';

import Location from '../../models/Location';

const coordsExist = (lat, lng) => {
  return (lat === 0 || (lat && typeof lat === "number")) &&
    (lng === 0 || (lng && typeof lng === "number"));
}

class Map extends Component{
  constructor(props){
    super(props);

    const [ lat, lng ] = coordsExist(props.lat, props.lng) ?
      [ props.lat, props.lng ] : [ null, null ];

    this.state = {
      lat: lat,
      lng: lng,
      showTransit: false,
      showBicycle: false,
    }
  }

  static getDerivedStateFromProps(props, state){
    const areCoordsValid = coordsExist(props.lat, props.lng);
    if( areCoordsValid && props.lat !== state.lat || props.lng !== state.lng ){
      return {
        lat: props.lat,
        lng: props.lng,
      }
    }

    return null
  }

  componentDidMount = () => {
    const { lat, lng } = this.state;
    if( this.props.place && !coordsExist(lat, lng) ){
      this.setState({
        lat: this.props.place.geometry.location.lat(),
        lng: this.props.place.geometry.location.lng(),
      })
    }else if( !coordsExist(lat, lng) ){
      console.error("No place or addressed passed in.");
    }
  }

  toggleBicycle = () => {
    this.setState( prevState => ({ showBicycle: !prevState.showBicycle }) )
  }

  toggleTransit = () => {
    this.setState( prevState => ({ showTransit: !prevState.showTransit }) )
  }

  render(){
    const { lat, lng } = this.state;
    const { isMarkerShown, locations } = this.props;

    if( !coordsExist(lat, lng) ) return null;

    return <GoogleMap
      defaultZoom={17}
      center={{ lat, lng }}
      options={{ mapTypeControl: false }}>
      { this.state.showBicycle && <BicyclingLayer autoUpdate /> }
      <ToggleButtons
        showBicycle={this.state.showBicycle}
        showTransit={this.state.showTransit}
        toggleBicycle={this.toggleBicycle}
        toggleTransit={this.toggleTransit} />
      <TransitLayer showTransit={this.state.showTransit} />
      {isMarkerShown && <Marker position={{ lat, lng }} />}
      {locations && locations.length && <Markers locations={locations} />}
    </GoogleMap>
  }
}

Map.propTypes = {
  place: PropTypes.func,
  isMarkerShown: PropTypes.bool,
  locations: PropTypes.arrayOf(PropTypes.instanceOf(Location)),
  lat: PropTypes.number,
  lng: PropTypes.number,
  googleMapURL: PropTypes.string,
  loadingElement: PropTypes.element,
  containerElement: PropTypes.element,
  mapElement: PropTypes.element,
}

const WrappedMap = withScriptjs(withGoogleMap(Map));

export default (props) => {
  return <WrappedMap
    {...props}
    googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyAVyB_KRIJxSXmogxPxaEpzOmqXH1T3KLU"
    loadingElement={<div style={{ height: `100%` }} />}
    containerElement={<div style={{ height: `400px` }} />}
    mapElement={<div style={{ height: `100%` }} />} />
}
