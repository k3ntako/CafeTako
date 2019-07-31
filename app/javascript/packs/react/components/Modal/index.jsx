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

  componentDidUpdate(prevProps, prevState){
    if( this.props.show && !prevProps.show ){
      document.addEventListener("click", this.handleOutsideClick);
    }else if( !this.props.show && prevProps.show ){
      document.removeEventListener("click", this.handleOutsideClick);
    }
  }

  handleOutsideClick = (event) => {
    const modal = document.getElementById(styles.modal);

    if( !modal.contains(event.target) ){
      this.props.handleClose();
    }
  }

  render(){
    if( !this.props.show ) return null;

    return <Container id={styles.modal}>
      { this.props.children }
    </Container>

  }
}
