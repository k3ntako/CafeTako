import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import SearchBox from '../../components/GoogleMapsForm/SearchBox';

import Location from '../../models/Location';
import styles from './index.module.css';

export default class SearchBar extends Component{
  constructor(props){
    super(props);
    this.state = {
      search: "",
      place: null,
    }
  }

  handleKeyPress = (target) => {
    if( target.key === "Enter" ){
      this.submit();
    }
  }

  submit = () => {
    const place = this.state.place;
    const lat = place && place.geometry && place.geometry.location && place.geometry.location.lat();
    const lng = (lat === 0 || typeof lat === "number") && place.geometry.location.lng();

    if( lat && lng && this.state.search.trim() ){
      Location.search( this.state.search, lat, lng )
        .then(results => this.props.updateSearchResults(results));
    }
  }

  onPlacesChanged = (place) => {
    this.setState({ place })
  }

  render(){
    return <div className={styles.searchBar}>
      <InputGroup size="lg">

        <InputGroup.Prepend onClick={this.submit}>
          <InputGroup.Text>
            <i className="fas fa-coffee"></i>
          </InputGroup.Text>
        </InputGroup.Prepend>
        <Form.Control
          type="search"
          placeholder="Find your cafe!"
          onChange={(e) => this.setState({ search: e.target.value })}
          onKeyPress={this.handleKeyPress}/>

        <InputGroup.Prepend onClick={this.submit}>
          <InputGroup.Text>
            <i className="fas fa-map-marker-alt"></i>
          </InputGroup.Text>
        </InputGroup.Prepend>
        <SearchBox onPlacesChanged={this.onPlacesChanged} placeholder="Location"/>
      </InputGroup>
    </div>
  }
}
