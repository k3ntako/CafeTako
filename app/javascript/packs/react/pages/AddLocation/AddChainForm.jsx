import React, { Component } from 'react';

import Location from '../../../../models/Location';
import Chain from '../../../../models/Chain';

export default class AddChainForm extends Component {
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

    return <div>
      <label>New Chain Name</label>
      <input value={this.props.newChainName} onChange={this.props.onChainNameChange} />
    </div>
  }

  render(){
    return <div>
      <div>
        <label>Chain</label>
        <select value={this.props.chain} onChange={this.props.onChainChange}>
          <option value="new">Add New Chain</option>
          <option disabled> ---- </option>
          { this.renderChainOptions() }
        </select>
      </div>
      { this.renderNewChainInput() }
    </div>
  }
}
