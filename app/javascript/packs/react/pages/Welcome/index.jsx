import React, { Component } from "react";
import { connect } from 'react-redux';
import sessionReducer from '../../../redux/reducers/sessionReducer';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

import GoogleMaps from '../../components/GoogleMapsForm/Map';
import Location from '../../models/Location';
import LocationCard from './LocationCard';
import SearchBar from './SearchBar';

import styles from './index.module.css';

class WelcomePage extends Component{
  constructor(props){
    super(props);

    this.state = {
      place: null,
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

  onPlaceChanged = ( place ) => {
    this.setState({ place });
  }

  render(){
    const { searchResults, locations, place } = this.state;
    let lat = this.props.userLocation.lat;
    let lng = this.props.userLocation.lng;

    if( place ){
      lat = place.geometry.location.lat();
      lng = place.geometry.location.lng();
    }

    const locationsToMap = searchResults.length ? searchResults : locations;
    const showMap = locationsToMap && !!locationsToMap.length;
    const mapHTML = showMap && <GoogleMaps locations={locationsToMap} lat={lat || 0} lng={lng || 0}/>;


    return <Container>
      <h1 className={styles.brand}>CafeTako</h1>
      <SearchBar
        place={place}
        onPlaceChanged={this.onPlaceChanged}
        updateSearchResults={this.updateSearchResults} />
      { mapHTML }
      <Row className={styles.row}>
        { this.renderSearchResults() }
      </Row>
    </Container>
  }
}

const mapStateToProps = (state) => {
  return {
    userLocation: state.session.userLocation,
  }
}

export default connect(
  mapStateToProps,
  null
)(WelcomePage);
