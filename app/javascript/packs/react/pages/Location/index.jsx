import React, { Component } from "react";
import { Link, withRouter } from 'react-router-dom';
import Container from 'react-bootstrap/Container';

import GoogleMaps from '../../components/GoogleMapsForm/Map';
import Reviews from './Reviews';
import Location from '../../models/Location';

class LocationPage extends Component{
  constructor(props){
    super(props);

    this.state = {
      location: null
    }
  }

  componentDidMount(){
    const params = this.props.match.params;
    Location.get( params.chainId, params.id ).
      then(location => this.setState({
        location
      }));
  }

  renderLocation(){
    const location = this.state.location;
    if( !location ){
      return null
    }

    return <>
      <h3>{location.name}</h3>
      <div>{location.address}</div>
    </>
  }

  render(){
    const params = this.props.match.params;
    const { location } = this.state;

    if( !location ){
      return null;
    }

    return <Container>
      {this.renderLocation()}
      <h3>
        <Link to={`${location.locationURL}/review`}>Add a Review</Link>
      </h3>
      <GoogleMaps
        address={location.address}
        lat={ location.lat }
        lng={ location.lng } />
      <h3>Reviews</h3>
      <Reviews reviews={location && location.reviews} />
    </Container>
  }
}

export default withRouter(LocationPage);
