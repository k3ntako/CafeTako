import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import sessionReducer from '../../../redux/reducers/sessionReducer'
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

import Login from '../Login';
import SignUp from '../SignUp';

import User from '../../models/User';
import styles from './index.module.css';


class NavBar extends Component {
  constructor(props){
    super(props);

    this.state = {
      showLoginModal: false,
      showSignUpModal: false,
    }
  }

  render(){
    return <Navbar id={styles.navBar} expand="sm">
      <Navbar.Brand>
        <Link className={styles.navLinks} to="/">CafeTako</Link>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Link className={styles.navLinks} to="/locations/new">Add Location</Link>
        </Nav>
      </Navbar.Collapse>
      <Navbar.Collapse className="justify-content-end">
        <Navbar.Text onClick={() => this.setState({ showLoginModal: true })}>
          Login
        </Navbar.Text>
        <Navbar.Text onClick={() => this.setState({ showSignUpModal: true })}>
          Sign Up
        </Navbar.Text>
        <Navbar.Text onClick={ User.logout }>
          Logout
        </Navbar.Text>
      </Navbar.Collapse>
      <SignUp
        show={this.state.showSignUpModal}
        handleClose={() => this.setState({ showSignUpModal: false })} />
      <Login
        show={this.state.showLoginModal}
        handleClose={() => this.setState({ showLoginModal: false })} />
    </Navbar>
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
)(NavBar)
