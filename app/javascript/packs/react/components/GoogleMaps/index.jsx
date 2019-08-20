import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { BicyclingLayer, GoogleMap, withGoogleMap } from 'react-google-maps';

//react-google-maps offers bicycling layer but not transit layer
import TransitLayer from './TransitLayer';
import ToggleButtons from './ToggleButtons';

import Location from '../../models/Location';
import styles from './index.module.css';

class Map extends Component{
  constructor(props){
    super(props);

    this.state = {
      showTransit: false,
      showBicycle: false,
    }
    this.map = null;
  }

  componentDidMount = () => {
    this.updateBounds();
  }

  componentDidUpdate = () => {
    this.updateBounds();
  }

  updateBounds = () => {
    if( this.map && this.props.bounds ){
      const newBounds = new google.maps.LatLngBounds(
        {
          lat: this.props.bounds.minLat,
          lng: this.props.bounds.minLng,
        },
        {
          lat: this.props.bounds.maxLat,
          lng: this.props.bounds.maxLng,
        }
      );
      this.map.fitBounds(newBounds);
    }
  }

  toggleBicycle = () => {
    this.setState( prevState => ({ showBicycle: !prevState.showBicycle }) )
  }

  toggleTransit = () => {
    this.setState( prevState => ({ showTransit: !prevState.showTransit }) )
  }

  render(){
    const { lat, lng } = this.props;

    return <GoogleMap
      ref={(ref) => this.map = ref}
      defaultZoom={this.props.zoom}
      defaultCenter={{ lat, lng }}
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
