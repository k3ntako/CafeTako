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

  onPlaceChanged = (place) => {
    this.props.onAddressChange({
      address: place.formatted_address,
      lat: place.geometry.location.lat(),
      lng: place.geometry.location.lng(),
    });

    this.setState({ place });
  }



  render(){
    return <>
      <Form.Group>
        <Form.Label>Location Address</Form.Label>
        <SearchBox
          onPlaceChanged={this.onPlaceChanged}/>
      </Form.Group>
      <Form.Group>
        {this.state.place && <>
          <Form.Label>{ this.state.place.formatted_address }</Form.Label>
          <Map
            isMarkerShown
            place={this.state.place}
            locations={ this.props.locations || [] }/>
        </>}
      </Form.Group>
    </>
  }
}
