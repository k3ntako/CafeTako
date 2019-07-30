import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import AddChainForm from './AddChainForm';

import Chain from '../../../../models/Chain';
import Location from '../../../../models/Location';

class AddLocationForm extends Component {
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
      }).then(location => {
        this.props.history.push(location.locationURL);
      });
    }catch(err){
      console.error(err);
    }
  }

  render(){
    const { name, address, chain, newChainName } = this.state;

    return <Form>
      <Form.Group>
        <Form.Label>Location Name</Form.Label>
        <Form.Control type="text" value={name} onChange={this.onNameChange} />
      </Form.Group>
      <Form.Group>
        <Form.Label>Location Address</Form.Label>
        <Form.Control type="text" value={address} onChange={this.onAddressChange} />
      </Form.Group>
      <AddChainForm
        chain={chain}
        newChainName={newChainName}
        onChainChange={this.onChainChange}
        onChainNameChange={this.onChainNameChange} />
      <Form.Group>
        <Button onClick={this.submit}>Submit</Button>
      </Form.Group>
    </Form>
  }
}

export default withRouter(AddLocationForm);
