import React, { Component } from 'react';
import { createPortal } from 'react-dom'
import Button from 'react-bootstrap/Button';
import { MAP } from 'react-google-maps/lib/constants'
import PropTypes from 'prop-types';

import styles from './ToggleButtons.module.css';

export default class ToggleButtons extends Component {
  constructor(props){
    super(props);
    this.state = {

    }
  }

  static contextTypes = { [MAP]: PropTypes.object }

  componentDidMount(){
    this.map = this.context[MAP];
    this.controlDiv = document.createElement('div');
    this.map.controls[google.maps.ControlPosition.TOP_CENTER].push(this.controlDiv);
    this.forceUpdate();
  }

  componentWillUnmount() {
    this.map.controls[this.props.position].removeAt(this.divIndex)
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
    if( !this.map ) return <></>;

    return createPortal(this.renderButtons(), this.controlDiv)
  }
}
