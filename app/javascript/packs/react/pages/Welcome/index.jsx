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
      searched: false,
    }
  }

  componentDidMount(){
    Location.getAll().
      then(locations => this.setState({
        locations
      }));
  }

  renderDefaultLocations(){
    if( !this.state.locations || !this.state.locations.length ){
      return null;
    }

    return this.state.locations.map(location => {
      return <LocationCard key={location.id} location={location} />
    })
  }

  renderSearchResults(){
    if( this.state.searched && (!this.state.searchResults || !this.state.searchResults.length) ){
      return <div className={styles.noResults}>
        <h3>No Results</h3>
      </div>
    }else if( !this.state.searchResults || !this.state.searchResults.length ){
      return this.renderDefaultLocations();
    }

    return this.state.searchResults.map(location => {
      return <LocationCard key={location.id} location={location} />
    })
  }

  updateSearchResults = ( results ) => {
    this.setState({ searchResults: results, searched: true });
  }

  render(){
    return <Container>
      <h1 className={styles.brand}>CafeTako</h1>
      <SearchBar
        updateSearchResults={this.updateSearchResults} />
      <Row className={styles.row}>
        { this.renderSearchResults() }
      </Row>
    </Container>
  }
}
