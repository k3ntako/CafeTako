import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';
import { Marker } from 'react-google-maps';

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
      address: this.parsePlaceAddress( place.address_components ),
      lat: place.geometry.location.lat(),
      lng: place.geometry.location.lng(),
    });

    this.setState({ place });
  }

  parsePlaceAddress = (addressComponents) => {
    if( !addressComponents ) return null;

    let parsedAddress = {};
    const types = ["street_number", "route", "sublocality_level_1", "locality", "administrative_area_level_1", "country", "postal_code"];
    addressComponents.forEach(component => {
      const componentType = component.types.find(compType => !!types.includes(compType));
      parsedAddress[componentType] = component.short_name;
    });

    return {
      addressPart1: `${parsedAddress.street_number} ${parsedAddress.route}`.trim(),
      addressPart2: null,
      addressPart3: null,
      city: parsedAddress.sublocality_level_1 || parsedAddress.locality,
      state: parsedAddress.administrative_area_level_1,
      zipcode: String(parsedAddress.postal_code),
      country: parsedAddress.country,
    }
  }

  render(){
    const place = this.state.place;
    const lat = place && place.geometry.location.lat();
    const lng = place && place.geometry.location.lng();

    return <>
      <Form.Group>
        <Form.Label>Location Address</Form.Label>
        <SearchBox
          onPlacesChanged={this.onPlacesChanged}/>
      </Form.Group>
      <Form.Group>
        {place && <>
          <Form.Label>{ place.formatted_address }</Form.Label>
          <GoogleMaps lat={lat} lng={lng}>
            <Marker position={{ lat, lng }} />
          </GoogleMaps>
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
