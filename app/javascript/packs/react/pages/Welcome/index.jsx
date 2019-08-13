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
    this.fetchLocationsForUserLocation();
  }

  componentDidUpdate(){
    this.fetchLocationsForUserLocation();
  }

  fetchLocationsForUserLocation(){
    if( !this.state.searched && !this.state.locations.length && this.props.userLocation ){
      const lat = this.props.userLocation.geometry.location.lat();
      const lng = this.props.userLocation.geometry.location.lng();

      let locations;
      const locationsPromise = Location.search("", lat, lng).
        then(locations => this.setState({ locations }));
    }
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

  onPlacesChanged = ( place ) => {
    this.setState({ place });
  }

  render(){
    const { searchResults, locations, place } = this.state;
    const { userLocation, defaultLatLng } = this.props;

    let lat, lng;
    if( place ){
      lat = place.geometry.location.lat();
      lng = place.geometry.location.lng();
    }else if( userLocation ){
      lat = userLocation.geometry.location.lat();
      lng = userLocation.geometry.location.lng();
    }

    const locationsToMap = searchResults.length ? searchResults : locations;
    const showMap = locationsToMap && !!locationsToMap.length;
    const mapHTML = showMap && <GoogleMaps locations={locationsToMap} lat={lat || 0} lng={lng || 0} zoom={15}/>;


    return <Container>
      <h1 className={styles.brand}>CafeTako</h1>
      <SearchBar
        place={place || userLocation}
        onPlacesChanged={this.onPlacesChanged}
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
    userLocation: state.googleMaps.userLocation,
  }
}

export default connect(
  mapStateToProps,
  null
)(WelcomePage);
