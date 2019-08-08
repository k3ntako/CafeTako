import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';

import Location from '../../models/Location';
import Chain from '../../models/Chain';

class AddChainForm extends Component {
  constructor(props){
    super(props);
    this.state = {
      chains: []
    }
  }

  componentDidMount(){
    Chain.getAll().then( chains => {
      this.setState({ chains });
    })
  }

  renderChainOptions(){
    return this.state.chains.map( chain => {
      return <option key={chain.id} value={chain.id}>{chain.name}</option>;
    })
  }

  renderNewChainInput(){
    if( this.props.chain !== "new" ) return null;

    return <Form.Group>
      <Form.Label>New Chain Name</Form.Label>
      <Form.Control type="text" value={this.props.newChainName} onChange={this.props.onChainNameChange} />
    </Form.Group>
  }

  render(){
    return <>
      <Form.Group>
        <Form.Label>Chain</Form.Label>
        <Form.Control
          as="select"
          value={this.props.chain}
          onChange={this.props.onChainChange}>
          <option value="new">Add New Chain</option>
          <option disabled> ---- </option>
          { this.renderChainOptions() }
        </Form.Control>
      </Form.Group>
      { this.renderNewChainInput() }
    </>
  }
}

AddChainForm.propTypes = {
  chain: PropTypes.string,
  newChainName: PropTypes.string,
  onChainNameChange: PropTypes.func,
}

export default AddChainForm;
