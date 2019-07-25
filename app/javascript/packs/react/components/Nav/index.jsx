import React from 'react';
import { Link } from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar'
import NavDropdown from 'react-bootstrap/NavDropdown'

import styles from './index.module.css'

export default (props) => {
  return <Navbar id={styles.navBar} expand="sm">
    <Navbar.Brand className={styles.navLinks} href="/">CafeTako</Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="mr-auto">
        <Nav.Link href="/locations/new">Add Location</Nav.Link>
      </Nav>
    </Navbar.Collapse>
  </Navbar>
}
