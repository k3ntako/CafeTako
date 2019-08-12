import React, { Component } from 'react';
import { connect } from 'react-redux';
import sessionReducer from '../../../redux/reducers/sessionReducer';
import PropTypes from 'prop-types';
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

  isValid = () => {
    const { email, password, firstName, lastName } = this.state;
    return email.match(User.emailRegex()) && password.length > 5;
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
          <Button onClick={ this.login } disabled={ !this.isValid() }>Login</Button>
        </Form.Group>
      </Form>
    </Modal>

  }
}

Login.propTypes = {
  setCurrentUser: PropTypes.func,
  handleClose: PropTypes.func,
  show: PropTypes.bool,
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
