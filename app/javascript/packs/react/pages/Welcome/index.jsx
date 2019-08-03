import React, { Component } from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

import Location from '../../models/Location';
import LocationCard from './LocationCard';
import SearchBar from './SearchBar';

import styles from './index.module.css';

export default class WelcomePage extends Component{
  constructor(props){
    super(props);

    this.state = {
      locations: [],
      searchResults: [],
    }
  }

  componentDidMount(){
    Location.getAll().
      then(locations => this.setState({
        locations
      }));
  }

  renderLocations(){
    if( !this.state.locations || !this.state.locations.length ){
      return null;
    }

    return this.state.locations.map(location => {
      return <LocationCard key={location.id} location={location} />
    })
  }

  renderSearchResults(){
    if( !this.state.searchResults || !this.state.searchResults.length ){
      return null;
    }

    return this.state.searchResults.map(location => {
      return <LocationCard key={location.id} location={location} />
    })
  }

  updateSearchResults = ( results ) => {
    this.setState({ searchResults: results });
  }

  render(){
    return <Container>
      <SearchBar updateSearchResults={this.updateSearchResults}/>
      <Row>
        { this.renderSearchResults() }
      </Row>
      <h1>Cafes!</h1>
      <Row>
        { this.renderLocations() }
      </Row>
    </Container>
  }
}
