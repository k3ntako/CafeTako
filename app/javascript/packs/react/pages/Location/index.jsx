import React, { Component } from "react";
import { Link, withRouter } from 'react-router-dom';

import AddReviewForm from './AddReviewForm';
import Location from '../../../../models/Location';

class LocationPage extends Component{
  constructor(props){
    super(props);

    this.state = {
      location: null
    }
  }

  componentDidMount(){
    Location.get( this.props.match.params.id ).
      then(location => this.setState({
        location
      }));
  }

  renderLocation(){
    const location = this.state.location;
    if( !location ){
      return null
    }

    return <>
      <h3>{location.name}</h3>
      <div>{location.address}</div>
    </>
  }

  render(){
    return <div>
      {this.renderLocation()}
      <h3>Add a Review</h3>
      <AddReviewForm />
    </div>
  }
}

export default withRouter(LocationPage);
