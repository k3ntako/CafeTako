import React, { Component } from "react";
import { Link, withRouter } from 'react-router-dom';

import AddReviewForm from './AddReviewForm';
import Reviews from './Reviews';
import Location from '../../../../models/Location';

class LocationPage extends Component{
  constructor(props){
    super(props);

    this.state = {
      location: null
    }
  }

  componentDidMount(){
    const params = this.props.match.params;
    Location.get( params.chainId, params.id ).
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
    const { location } = this.state;
    return <div className="page">
      {this.renderLocation()}
      <h3>Add a Review</h3>
      <AddReviewForm />
      <h3>Reviews</h3>
      <Reviews reviews={location && location.reviews} />
    </div>
  }
}

export default withRouter(LocationPage);
