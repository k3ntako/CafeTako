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
    }
  }

  static getDerivedStateFromProps( props, state ){
    if( props.userLocation && (state.lat === null || state.lng === null) ){
      return {
        lat: props.userLocation.geometry.location.lat(),
        lng: props.userLocation.geometry.location.lng(),
      }
    }

    return null;
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
    this.setState({ selectedLocation: id });
  }

  render(){
    const { searched, searchResults, locations, place, selectedLocation, lat, lng, bounds } = this.state;
    const { userLocation, defaultLatLng } = this.props;

    const locationsToMap = searchResults.length ? searchResults : locations;
    const showMap = locationsToMap && !!locationsToMap.length;
    const mapHTML = showMap && <GoogleMaps lat={lat} lng={lng} defaultZoom={13} bounds={bounds}>
      <Markers
        locations={locationsToMap}
        selectedLocation={selectedLocation}
        onSelectedLocationChange={this.onSelectedLocationChange} />
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
  }
}

export default connect(
  mapStateToProps,
  null
)(WelcomePage);
