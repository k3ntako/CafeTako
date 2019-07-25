import React from 'react';
import { Link } from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar'
import NavDropdown from 'react-bootstrap/NavDropdown'

import styles from './index.module.css'

export default (props) => {
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
  </Navbar>
}
