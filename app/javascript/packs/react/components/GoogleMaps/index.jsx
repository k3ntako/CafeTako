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

  componentDidUpdate = ( prevProps ) => {
    const shouldUpdate = Object.keys(prevProps.bounds).some( key => prevProps.bounds[key] !== this.props.bounds[key] );
    shouldUpdate && this.updateBounds();
  }

  updateBounds = () => {
    if( this.map && this.props.bounds ){
      const newBounds = new google.maps.LatLngBounds(
        this.props.bounds[0], this.props.bounds[1]
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
      defaultCenter={{ lat, lng }}
      defaultZoom={this.props.defaultZoom}
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
  defaultZoom: 17,
};

Map.propTypes = {
  lat: PropTypes.number.isRequired,
  lng: PropTypes.number.isRequired,
  defaultZoom: PropTypes.number.isRequired,
}

const WrappedMap = withGoogleMap(Map);

export default (props) => {
  return <WrappedMap
    {...props}
    loadingElement={<div />}
    containerElement={<div className={styles.mapContainer} />}
    mapElement={<div className={styles.map}/>} />
}
