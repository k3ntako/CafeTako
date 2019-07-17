import React, { Component } from "react";

import AddLocationForm from './AddLocationForm';

export default class WelcomePage extends Component{
  constructor(props){
    super(props);
  }

  render(){
    return <div>
      <AddLocationForm />
    </div>
  }
}
