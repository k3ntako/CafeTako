import React, { Component } from 'react';
import { createPortal } from 'react-dom'
import Button from 'react-bootstrap/Button';
import { MAP } from 'react-google-maps/lib/constants'
import PropTypes from 'prop-types';

import styles from './ToggleButtons.module.css';

const controlDiv = document.createElement('div');

export default class ToggleButtons extends Component {
  constructor(props){
    super(props);
    this.state = {
      map: null,
      divIndex: null,
    }
  }

  static contextTypes = { [MAP]: PropTypes.object }

  componentDidMount(){
    const map = this.context[MAP];
    map.controls[google.maps.ControlPosition.TOP_CENTER].push(controlDiv);
    const divIndex = map.controls[google.maps.ControlPosition.TOP_CENTER].length - 1;

    this.setState({ map, divIndex });
  }

  componentWillUnmount() {
    this.state.map.controls[google.maps.ControlPosition.TOP_CENTER].removeAt(this.state.divIndex);
  }

  renderButtons = () => {
    const bicycleClassName = this.props.showBicycle ? styles.active : "";
    const transitClassName = this.props.showTransit ? styles.active : "";

    return <div>
      <Button className={`${styles.button} ${bicycleClassName}`} onClick={this.props.toggleBicycle}>
        <i className="fas fa-biking"></i>
      </Button>
      <Button className={`${styles.button} ${transitClassName}`} onClick={this.props.toggleTransit}>
        <i className="fas fa-subway"></i>
      </Button>
    </div>
  }

  render(){
    if( !this.state.map ) return <></>;

    return createPortal(this.renderButtons(), controlDiv)
  }
}
