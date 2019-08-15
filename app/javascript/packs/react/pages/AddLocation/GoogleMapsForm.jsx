import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';
import GoogleMaps from '../../components/GoogleMaps';
import SearchBox from '../../components/GoogleMaps/SearchBox';
import Location from '../../models/Location';


class GoogleMapsForm extends Component {
  constructor(props){
    super(props);
    this.state = {
      place: null,
    }
  }

  onPlacesChanged = (place) => {
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
          onPlacesChanged={this.onPlacesChanged}/>
      </Form.Group>
      <Form.Group>
        {this.state.place && <>
          <Form.Label>{ this.state.place.formatted_address }</Form.Label>
          <GoogleMaps
            isMarkerShown
            place={this.state.place}
            locations={ this.props.locations || [] }/>
        </>}
      </Form.Group>
    </>
  }
}

GoogleMaps.propTypes = {
  onAddressChange: PropTypes.func,
  locations: PropTypes.arrayOf(PropTypes.instanceOf(Location))
}

export default GoogleMapsForm;
