import React, { Component } from "react";

import LocationCard from './LocationCard';
import Location from '../../../../models/Location';

export default class WelcomePage extends Component{
  constructor(props){
    super(props);

    this.state = {
      locations: [],
    }
  }

  componentDidMount(){
    Location.getAll().
      then(locations => this.setState({
        locations
      }));
  }

  renderLocations(){
    if( !this.state.locations ){
      return null;
    }

    return this.state.locations.map(location => {
      return <LocationCard key={location.id} location={location} />
    })
  }

  render(){
    return <div className="page">
      <h1>Welcome</h1>
      { this.renderLocations() }
    </div>
  }
}
