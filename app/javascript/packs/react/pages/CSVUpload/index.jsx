import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import AddChainForm from '../AddLocation/AddChainForm';

import pT from '../../propTypes';
import Location from '../../models/Location';

class CSVUpload extends Component {
  constructor(props){
    super(props);
    this.state = {
      csv: "",
      chain: "new",
      newChainName: "",
      dayOfWeek: "Monday",
    };
    this.onCSVChange = this.onChange.bind(this, "csv");
    this.onChainChange = this.onChange.bind(this, "chain");
    this.onChainNameChange = this.onChange.bind(this, "newChainName");
  }

  onChange(stateField, e){
    this.setState({
      [stateField]: e.target.value
    })
  }

  submit = () => {
    const { csv, chain, newChainName } = this.state;
    Location.uploadCSV( csv.trim(), chain, newChainName.trim() );
  }

  render(){
    const { csv, chain, newChainName } = this.state;
    return <Container>
      <h3>Location CSV Upload</h3>
      <Form>
        <Form.Group>
          <Form.Label>Paste CSV file with location data</Form.Label>
          <Form.Control as="textarea" rows="20" onChange={this.onCSVChange} value={csv}/>
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
    </Container>
  }
}

CSVUpload.propTypes = pT.withRouter;

export default withRouter(CSVUpload);
