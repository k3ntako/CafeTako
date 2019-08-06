import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Marker, InfoWindow } from 'react-google-maps';

export default class Map extends Component{
  constructor(props){
    super(props);

    this.state = {
      markers: [],
      openInfoWindow: null,
    }
  }

  render(){
    const markers = this.props.locations.map(loc => {
      let infoWindow;
      if( this.state.openInfoWindow === loc.id ){
        infoWindow = <InfoWindow onCloseClick={() => this.setState({ openInfoWindow: null })}>
          <div>
            <Link to={`/chains/${loc.chain.id}/locations/${loc.id}`}>
              <strong>{loc.chain.name}</strong>
            </Link><br />
            { loc.name }<br />
            { loc.address }
          </div>
        </InfoWindow>
      }

      return <Marker key={loc.id}
        position={{ lat: loc.lat, lng: loc.lng }}
        onClick={() => this.setState({ openInfoWindow: loc.id })}>
        { infoWindow }
      </Marker>
    })

    return <>
      { markers }
    </>
  }
}
