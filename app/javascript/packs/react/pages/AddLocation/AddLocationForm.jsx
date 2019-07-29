import React, { Component } from 'react';

import AddChainForm from './AddChainForm';

import Chain from '../../../../models/Chain';
import Location from '../../../../models/Location';

export default class AddLocationForm extends Component {
  constructor(props){
    super(props);
    this.state = {
      name: "",
      address: "",
      chain: "new",
      newChainName: "",
    };
    this.onNameChange = this.onChange.bind(this, "name");
    this.onAddressChange = this.onChange.bind(this, "address");
    this.onChainChange = this.onChange.bind(this, "chain");
    this.onChainNameChange = this.onChange.bind(this, "newChainName");
  }

  onChange(stateField, e){
    this.setState({
      [stateField]: e.target.value
    })
  }

  createChain = async (name) => {
    return await Chain.create(name);
  }

  submit = async () => {
    try{
      let chainId = this.state.chain;
      if( this.state.chain === "new" && this.state.newChainName.trim() ){
        const newChain = await this.createChain({ name: this.state.newChainName });
        chainId = newChain.id;
      }

      Location.create({
        name: this.state.name,
        address: this.state.address,
        businessHours: {},
        chain: chainId
      })
    }catch(err){
      console.error(err);
    }
  }

  render(){
    const { name, address, chain, newChainName } = this.state;

    return <div>
      <div>
        <label>Location Name</label>
        <input value={name} onChange={this.onNameChange} />
      </div>
      <div>
        <label>Location Address</label>
        <input value={address} onChange={this.onAddressChange} />
      </div>
      <AddChainForm
        chain={chain}
        newChainName={newChainName}
        onChainChange={this.onChainChange}
        onChainNameChange={this.onChainNameChange} />
      <div>
        <button onClick={this.submit}>Submit</button>
      </div>
    </div>
  }
}
