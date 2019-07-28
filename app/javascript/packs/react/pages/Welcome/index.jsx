import React, { Component } from "react";
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'

import LocationCard from './LocationCard';
import Location from '../../../../models/Location';

import styles from './index.module.css';

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
    return <Container>
      <h1>Cafes!</h1>
      <Row>
        { this.renderLocations() }
      </Row>
    </Container>
  }
}
