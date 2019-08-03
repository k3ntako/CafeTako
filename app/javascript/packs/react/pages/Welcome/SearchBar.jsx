import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

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
    if( this.state.search.trim() ){
      Location.search( this.state.search )
        .then(results => this.props.updateSearchResults(results));
    }
  }

  render(){
    return <div className={styles.searchBar}>
      <InputGroup size="lg">
        <Form.Control
          type="search"
          placeholder="Find your cafe!"
          onChange={(e) => this.setState({ search: e.target.value })}
          onKeyPress={this.handleKeyPress}/>
        <InputGroup.Append onClick={this.submit}>
          <InputGroup.Text>
            <i className="fas fa-search-location"></i>
          </InputGroup.Text>
        </InputGroup.Append>
      </InputGroup>
    </div>
  }
}
