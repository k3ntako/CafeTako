import React, { Component } from 'react';
import { connect } from 'react-redux';
import sessionReducer from '../../../redux/reducers/sessionReducer';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Modal from '../Modal';
import User from '../../models/User';

import styles from './index.module.css';

class Login extends Component {
  constructor(props){
    super(props);
    this.state = {
      email: "",
      password: "",
    }
  }

  login = () => {
    User.login(this.state.email, this.state.password).then(user => {
      if( user ){
        this.props.setCurrentUser( user );
        this.props.handleClose();
      }
    });
  }

  render(){
    return <Modal
      title="Login"
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
          <Button onClick={ this.login }>Login</Button>
        </Form.Group>
      </Form>
    </Modal>

  }
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.session.currentUser,
  }
}

const mapDispatchToProps = function(dispatch){
  return {
    setCurrentUser: sessionReducer.Methods.setCurrentUser(dispatch)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login)
