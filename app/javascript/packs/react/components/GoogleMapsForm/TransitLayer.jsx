import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { MAP } from 'react-google-maps/lib/constants';


export default class ToggleButtons extends Component {
  static contextTypes = { [MAP]: PropTypes.object };

  constructor(props){
    super(props);
    this.state = {}

    this.map = null;
  }

  componentDidMount(){
    this.map = this.context[MAP];
    this.transitLayer = new google.maps.TransitLayer(); //"google" is a global variable
  }

  render(){
    if( this.map && this.props.showTransit ){
      this.transitLayer.setMap( this.map );
    }else if( this.map && !this.props.showTransit ){
      this.transitLayer.setMap( null );
    }

    return <></>;
  }
}
