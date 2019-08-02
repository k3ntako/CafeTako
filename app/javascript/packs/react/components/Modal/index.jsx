import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';

import styles from './index.module.css';

export default class Modal extends Component {
  constructor(props){
    super(props);
    this.state = {
    }
  }

  onClick = (e) => {
    if( e.target.id === styles.modalWrapper){
      this.props.handleClose();
    }
  }

  render(){
    if( !this.props.show ) return null;

    return <div id={styles.modalWrapper} onClick={this.onClick}>
      <div className={styles.modal}>
        <div className={styles.title}>
          <h3>{this.props.title}</h3>
        </div>
        <div className={styles.body}>
          { this.props.children }
        </div>
      </div>
    </div>
  }
}
