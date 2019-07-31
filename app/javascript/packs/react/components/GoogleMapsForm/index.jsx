import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';
import Map from './Map';
import SearchBox from './SearchBox';


export default class GoogleMapsForm extends Component {
  constructor(props){
    super(props);
    this.state = {
      place: null,
    }
  }

  onPlacesChanged = () => {
    const place = this.searchBox.getPlaces()[0];
    
    this.props.onAddressChange({
      address: place.formatted_address,
      lat: place.geometry.location.lat(),
      lng: place.geometry.location.lng(),
    });

    this.setState({ place });
  }

  onSearchBoxMounted = (ref) => {
    this.searchBox = ref;
  }

  render(){
    return <>
      <Form.Group>
        <Form.Label>Location Address</Form.Label>
        <SearchBox
          googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyAVyB_KRIJxSXmogxPxaEpzOmqXH1T3KLU"
          loadingElement={<div style={{ height: `100%` }} />}
          containerElement={<div style={{ height: `400px` }} />}
          onSearchBoxMounted={this.onSearchBoxMounted}
          onPlacesChanged={this.onPlacesChanged}/>
      </Form.Group>
      <Form.Group>
        {this.state.place && <>
          <Form.Label>{ this.state.place.formatted_address }</Form.Label>
          <Map
            isMarkerShown
            place={this.state.place} />
        </>}
      </Form.Group>
    </>
  }
}
