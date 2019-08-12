import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import sessionReducer from '../../../redux/reducers/sessionReducer';
import PropTypes from 'prop-types';
import pT from '../../propTypes';
import reduxPT from '../../propTypes/reduxPropTypes';
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

  logout = () => {
    User.logout().then(response => this.props.setCurrentUser(null));
  }

  render(){
    return <Navbar id={styles.navBar} expand="sm">
      <Navbar.Brand className={styles.brand}>
        <Link to="/">CafeTako</Link>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      {this.props.currentUser && <Navbar.Collapse id="basic-navbar-nav">
        <Nav.Link
          className="mr-auto"
          onClick={() => this.props.history.push("/locations/new")}>
          Add Location
        </Nav.Link>
      </Navbar.Collapse>}
      <Navbar.Collapse className="justify-content-end">
        { !this.props.currentUser && <>
            <Nav.Link onClick={() => this.setState({ showLoginModal: true })}>
            Login
          </Nav.Link>
          <Nav.Link onClick={() => this.setState({ showSignUpModal: true })}>
            Sign Up
          </Nav.Link>
        </> }
        { this.props.currentUser && <Nav.Link onClick={ this.logout }>
          Logout
        </Nav.Link> }
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

let NavBarPT = pT.withRouter;
NavBarPT = Object.assign(NavBarPT, reduxPT.currentUser);

NavBar.propTypes = NavBarPT;


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

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(NavBar))
