import React, { Component } from 'react';
import { createPortal } from 'react-dom'
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import { MAP } from 'react-google-maps/lib/constants'

import styles from './ToggleButtons.module.css';

const controlDiv = document.createElement('div');

class RefreshButton extends Component {
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
    map.controls[google.maps.ControlPosition.TOP_LEFT].push(controlDiv);
    const divIndex = map.controls[google.maps.ControlPosition.TOP_CENTER].length - 1;

    this.setState({ map, divIndex });
  }

  componentWillUnmount() {
    this.state.map.controls[google.maps.ControlPosition.TOP_CENTER].removeAt(this.state.divIndex);
  }

  renderButton = () => {
    const bicycleClassName = this.props.disabled ? styles.disabled : "";

    return <Button className={`${styles.button} ${bicycleClassName}`} onClick={this.props.refreshHandler}>
        <i className="fas fa-redo"></i>
      </Button>

  }

  render(){
    if( !this.state.map ) return <></>;

    return createPortal(this.renderButton(), controlDiv);
  }
}

RefreshButton.propTypes = {
  disabled: PropTypes.bool,
  refreshHandler: PropTypes.func,
}

export default RefreshButton;
