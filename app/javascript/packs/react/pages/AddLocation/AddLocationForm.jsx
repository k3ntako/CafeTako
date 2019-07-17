import React, { Component } from 'react';

import CustomDate from '../../../../models/CustomDate';
import Location from '../../../../models/Location';

export default class AddLocationForm extends Component {
  constructor(props){
    super(props);
    this.state = {
      name: "",
      address: "",
    };
  }

  nameOnChange = (e) => {
    this.setState({
      name: e.target.value
    });
  }

  addressOnChange = (e) => {
    this.setState({
      address: e.target.value
    });
  }

  submit = () => {
    Location.create({
      name: this.state.name,
      address: this.state.address,
      hours: {},
    })
  }

  render(){
    return <div>
      <div>
        <label>Location Name</label>
        <input value={this.state.name} onChange={this.nameOnChange} />
      </div>
      <div>
        <label>Location Address</label>
        <input value={this.state.address} onChange={this.addressOnChange} />
      </div>
      <div>
        <button onClick={this.submit}>Submit</button>
      </div>
    </div>
  }
}
