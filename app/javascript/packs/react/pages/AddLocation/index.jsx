import React, { Component } from "react";
import Container from 'react-bootstrap/Container';

import AddLocationForm from './AddLocationForm';

export default class WelcomePage extends Component{
  constructor(props){
    super(props);
  }

  render(){
    return <Container>
      <h3>Add New Cafe</h3>
      <AddLocationForm />
    </Container>
  }
}
