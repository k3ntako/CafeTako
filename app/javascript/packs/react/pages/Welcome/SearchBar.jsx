import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';

import SearchBox from '../../components/GoogleMapsForm/SearchBox';
import Location from '../../models/Location';
import styles from './index.module.css';

export default class SearchBar extends Component{
  constructor(props){
    super(props);
    this.state = {
      search: "",
    }
  }

  handleKeyPress = (target) => {
    if( target.key === "Enter" ){
      this.submit();
    }
  }

  submit = () => {
    if( this.isValid() ){
      const { search } = this.state;
      const { place } = this.props;

      const lat = place.geometry.location.lat();
      const lng = place.geometry.location.lng();

      Location.search( search, lat, lng )
        .then(results => this.props.updateSearchResults(results));
    }
  }

  isValid(){
    const { search } = this.state;
    const { place } = this.props;

    return search && !!place;
  }

  onPlaceChanged = (place) => {
    const lat = place && place.geometry && place.geometry.location && place.geometry.location.lat();
    const lng = typeof lat === "number" && (lat || lat === 0) && place.geometry.location.lng();

    if( (lat || lat === 0) && (lng || lng === 0) ){
      this.props.onPlaceChanged( place );
    }else{
      console.error("Unable to save coordinates.");
    }
  }

  render(){
    return <div className={styles.searchBar}>
      <InputGroup size="lg">
        <InputGroup.Prepend>
          <InputGroup.Text>
            <i className="fas fa-coffee"></i>
          </InputGroup.Text>
        </InputGroup.Prepend>
        <Form.Control
          type="search"
          placeholder="Find your cafe!"
          onChange={(e) => this.setState({ search: e.target.value })}
          onKeyPress={this.handleKeyPress}/>

        <InputGroup.Prepend>
          <InputGroup.Text>
            <i className="fas fa-map-marker-alt"></i>
          </InputGroup.Text>
        </InputGroup.Prepend>
        <SearchBox onPlaceChanged={this.onPlaceChanged} placeholder="Location"/>
        <InputGroup.Append
          onClick={this.submit}
          className={this.isValid() ? styles.valid : ""}>
          <InputGroup.Text>
            <i className="fas fa-search"></i>
          </InputGroup.Text>
        </InputGroup.Append>
      </InputGroup>
    </div>
  }
}
