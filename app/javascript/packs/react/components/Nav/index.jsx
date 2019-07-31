import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Login from '../Login';


import styles from './index.module.css'

export default class NavBar extends Component {
  constructor(props){
    super(props);

    this.state = {
      showModal: false,
      isMounted: false
    }
  }

  componentDidMount(){
    this.setState({ isMounted: true })
  }

  render(){
    if( !this.state.isMounted ) return null;

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
        <Navbar.Text onClick={() => this.setState({ showModal: true })}>
          Sign In
        </Navbar.Text>
      </Navbar.Collapse>
      <Login
        show={this.state.showModal}
        handleClose={() => this.setState({ showModal: false })} />
    </Navbar>
  }
}
