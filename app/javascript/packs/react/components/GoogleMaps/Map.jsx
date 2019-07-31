import React, { Component } from 'react';
import { GoogleMap, Marker, withGoogleMap, withScriptjs } from 'react-google-maps';
import { getCoordinateFromAddress } from '../../utilities/googleMapsHelper';

class Map extends Component{
  constructor(props){
    super(props)

    this.state = {
      lat: null,
      lng: null,
    }
  }

  componentDidMount = () => {
    if( this.props.place ){
      this.setState({
        lat: this.props.place.geometry.location.lat(),
        lng: this.props.place.geometry.location.lng(),
      })
    }else if( this.props.address ){
      getCoordinateFromAddress( this.props.address ).then(response => {
        const place = response.results[0];

        this.setState({
          lat: place.geometry.location.lat,
          lng: place.geometry.location.lng,
        });
      });
    }else{
      console.error("No place or addressed passed in.");
    }
  }

  render(){
    const { lat, lng } = this.state;

    if( (!lat && lat !== 0) || (!lng && lng !== 0) ) return null;

    return <GoogleMap
      defaultZoom={17}
      defaultCenter={{ lat, lng }}
      options={{ mapTypeControl: false }}>

      {this.props.isMarkerShown && <Marker position={{ lat, lng }} />}
    </GoogleMap>
  }
}



const WrappedMap = withScriptjs(withGoogleMap(Map));

export default (props) => {
  return <WrappedMap
    {...props}
    isMarkerShown
    googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyAVyB_KRIJxSXmogxPxaEpzOmqXH1T3KLU"
    loadingElement={<div style={{ height: `100%` }} />}
    containerElement={<div style={{ height: `400px` }} />}
    mapElement={<div style={{ height: `100%` }} />} />
}
