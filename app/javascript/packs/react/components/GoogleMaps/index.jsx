import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { BicyclingLayer, GoogleMap, withGoogleMap } from 'react-google-maps';

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
      { this.props.children }
    </GoogleMap>
  }
}

Map.defaultProps = {
  zoom: 17,
};

Map.propTypes = {
  lat: PropTypes.number.isRequired,
  lng: PropTypes.number.isRequired,
  zoom: PropTypes.number.isRequired,
}

const WrappedMap = withGoogleMap(Map);

export default (props) => {
  return <WrappedMap
    {...props}
    loadingElement={<div />}
    containerElement={<div className={styles.mapContainer} />}
    mapElement={<div className={styles.map}/>} />
}
