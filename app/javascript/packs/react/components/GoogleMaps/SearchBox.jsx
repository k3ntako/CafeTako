import React, { Component } from 'react';
import { connect } from 'react-redux';
import sessionReducer from '../../../redux/reducers/sessionReducer';
import PropTypes from 'prop-types';
import { withScriptjs } from 'react-google-maps';
import StandaloneSearchBox from 'react-google-maps/lib/components/places/StandaloneSearchBox';
import Form from 'react-bootstrap/Form';

class SearchBox extends Component{
  constructor(props){
    super(props);

    this.searchBox = null;
  }

  onPlacesChanged = () => {
    this.props.onPlacesChanged(this.searchBox.getPlaces()[0]);
  }

  render(){
    const userLocation = this.props.userLocation;
    let placeholder = this.props.placeholder || "";
    if( this.props.useUserLocation && userLocation ){
      const city = userLocation.newAddressComponents.sublocality_level_1;
      const state = userLocation.newAddressComponents.administrative_area_level_1;
      placeholder = `${city}, ${state}`;
    }

    return <StandaloneSearchBox
      ref={(ref) => this.searchBox = ref}
      onPlacesChanged={this.onPlacesChanged}
      bounds={
        new google.maps.LatLngBounds(
          new google.maps.LatLng(40.568660, -74.047492),
          new google.maps.LatLng(40.891690, -73.759341)
        )
      }>
        <Form.Control type="text" placeholder={placeholder}/>
      </StandaloneSearchBox>
  }
}

SearchBox.defaultProps = {
  useUserLocation: false,
}

SearchBox.propTypes = {
  placeholder: PropTypes.string,
  onPlacesChanged: PropTypes.func,
  googleMapURL: PropTypes.string,
  loadingElement: PropTypes.element,
  containerElement: PropTypes.element,
  useUserLocation: PropTypes.bool,
}

const mapStateToProps = (state) => {
  return {
    userLocation: state.googleMaps.userLocation,
  }
}

export default connect(
  mapStateToProps,
  null
)(SearchBox);
