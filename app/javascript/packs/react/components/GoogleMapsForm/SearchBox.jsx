import React, { Component } from 'react';
import { withScriptjs } from 'react-google-maps';
import StandaloneSearchBox from 'react-google-maps/lib/components/places/StandaloneSearchBox';
import Form from 'react-bootstrap/Form';

class SearchBox extends Component{
  constructor(props){
    super(props);

    this.searchBox = null;
  }

  onPlaceChanged = () => {
    this.props.onPlaceChanged(this.searchBox.getPlaces()[0]);
  }

  render(){
    return <StandaloneSearchBox
      ref={(ref) => this.searchBox = ref}
      onPlaceChanged={this.onPlaceChanged}
      bounds={
        new google.maps.LatLngBounds(
          new google.maps.LatLng(40.568660, -74.047492),
          new google.maps.LatLng(40.891690, -73.759341)
        )
      }>
        <Form.Control type="text" placeholder={this.props.placeholder || ""}/>
      </StandaloneSearchBox>
  }
}

const WrappedSearchBox = withScriptjs(SearchBox);

export default (props) => {
  return <WrappedSearchBox
    {...props}
    googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyAVyB_KRIJxSXmogxPxaEpzOmqXH1T3KLU"
    loadingElement={<div style={{ height: `100%` }} />}
    containerElement={<div style={{ height: `400px` }} />} />
}
