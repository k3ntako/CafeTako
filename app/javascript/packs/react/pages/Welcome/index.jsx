import React, { Component } from "react";
import { connect } from 'react-redux';
import sessionReducer from '../../../redux/reducers/sessionReducer';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import GoogleMaps from '../../components/GoogleMaps';
import Markers from '../../components/GoogleMaps/Markers';
import Location from '../../models/Location';
import LocationCards from './LocationCards';
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
      selectedLocation: null,
      lat: null,
      lng: null,
      bounds: null,
      locationChanged: false,
    }
  }

  static getDerivedStateFromProps( props, state ){
    if( props.userLocation && (state.lat === null || state.lng === null) ){
      return {
        lat: props.userLocation.geometry.location.lat(),
        lng: props.userLocation.geometry.location.lng(),
        locationChanged: true,
      }
    }

    return null;
  }

  componentDidMount(){
    this.fetchLocationsForUserLocation();
  }

  componentDidUpdate(){
    if( this.state.locationChanged ){
      this.setState({
        locationChanged: false
      }, this.fetchLocationsForUserLocation);
    }
  }

  fetchLocationsForUserLocation(){
    if( !this.state.searched && !this.state.locations.length && this.props.userLocation ){
      const lat = this.props.userLocation.geometry.location.lat();
      const lng = this.props.userLocation.geometry.location.lng();

      let locations;
      const locationsPromise = Location.search("", lat, lng).
        then(response => this.setState({
          locations: response.locations,
          bounds: response.bounds,
        }));
    }
  }

  updateSearchResults = ( results ) => {
    this.setState({
      searchResults: results.locations,
      bounds: results.bounds,
      searched: true,
    });
  }

  onPlacesChanged = ( place ) => {
    const lat = place.geometry.location.lat();
    const lng = place.geometry.location.lng();
    this.setState({ place, lat, lng });
  }

  onSelectedLocationChange = ( id ) => {
    if( id !== this.state.selectedLocation ){
      this.setState({ selectedLocation: id });
    }
  }

  render(){
    if( !google || !google.maps ){
      console.warn("Google Maps hasn't loaded");
      return null;
    }

    const { searched, searchResults, locations, place, selectedLocation, lat, lng, bounds } = this.state;
    const { userLocation, defaultLatLng } = this.props;
    const defaultLocation = this.props.defaultPlace.geometry.location;

    const locationsToMap = searchResults.length ? searchResults : locations;
    const markers = locationsToMap && !!locationsToMap.length && <Markers
      locations={locationsToMap}
      selectedLocation={selectedLocation}
      onSelectedLocationChange={this.onSelectedLocationChange} />;
    const mapHTML = <GoogleMaps lat={lat || defaultLocation.lat()} lng={lng || defaultLocation.lng()} defaultZoom={13} bounds={bounds}>
      { markers }
    </GoogleMaps>;

    return <Container>
      <h1 className={styles.brand}>CafeTako</h1>
      <SearchBar
        place={place || userLocation}
        onPlacesChanged={this.onPlacesChanged}
        updateSearchResults={this.updateSearchResults} />
      <Row>
        <Col>
          <LocationCards
            searched={searched}
            searchResults={searchResults}
            locations={locations}
            selectedLocation={selectedLocation}
            onSelectedLocationChange={this.onSelectedLocationChange} />
        </Col>
        <Col>
          <div className={styles.googleMaps}>
            { mapHTML }
          </div>
        </Col>
      </Row>
    </Container>
  }
}

const mapStateToProps = (state) => {
  return {
    userLocation: state.googleMaps.userLocation,
    defaultPlace: state.googleMaps.defaultPlace,
  }
}

export default connect(
  mapStateToProps,
  null
)(WelcomePage);
