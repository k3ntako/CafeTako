import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { BicyclingLayer, Rectangle, GoogleMap, Marker, withGoogleMap, withScriptjs } from 'react-google-maps';

import Markers from './Markers';
//react-google-maps offers bicycling layer but not transit layer
import TransitLayer from './TransitLayer';
import ToggleButtons from './ToggleButtons';

import Location from '../../models/Location';
import styles from './index.module.css';

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
    if( ( props.lat !== state.lat || props.lng !== state.lng ) && areCoordsValid ){
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

  onCenterChange = ( lat, lng ) => {
    if( (lat || lat === 0) && (lng || lng === 0) ){
      this.props.onCenterChange( lat, lng );
    }
  }

  render(){
    const { lat, lng } = this.state;
    const { isMarkerShown, locations } = this.props;

    if( !coordsExist(lat, lng) ) return null;

    return <GoogleMap
      defaultZoom={this.props.zoom}
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
      {locations && locations.length && <Markers
        onPositionChange={this.onCenterChange}
        locations={locations}
        markersProps={this.props.markersProps}/>}
    </GoogleMap>
  }
}

Map.defaultProps = {
  zoom: 17,
};

Map.propTypes = {
  // place: PropTypes.func,
  isMarkerShown: PropTypes.bool,
  locations: PropTypes.arrayOf(PropTypes.instanceOf(Location)),
  lat: PropTypes.number,
  lng: PropTypes.number,
  zoom: PropTypes.number.isRequired,
  googleMapURL: PropTypes.string,
  loadingElement: PropTypes.element,
  containerElement: PropTypes.element,
  mapElement: PropTypes.element,
}

const WrappedMap = withGoogleMap(Map);

export default (props) => {
  return <WrappedMap
    {...props}
    loadingElement={<div />}
    containerElement={<div className={styles.mapContainer} />}
    mapElement={<div className={styles.map}/>} />
}
