import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Modal from '../Modal';

import styles from './index.module.css';

export default class Login extends Component {
  constructor(props){
    super(props);
    this.state = {
      email: "",
      password: "",
    }
  }

  login(){

  }

  render(){
    return <Modal
      handleClose={this.props.handleClose}
      show={this.props.show}>
      <Form>
        <Form.Group>
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" onChange={ (e) => this.setState({ email: e.target.value }) }/>
        </Form.Group>

        <Form.Group>
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" onChange={ (e) => this.setState({ password: e.target.value }) }/>
        </Form.Group>

        <Form.Group>
          <Button onClick={ this.login } />
        </Form.Group>
      </Form>
    </Modal>

  }
}
