import React, { Component } from "react";
import { Link, withRouter } from 'react-router-dom';

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
      <div>
        <Link to={ "/locations/" + location.id }>
          {location.name}
        </Link>
      </div>
      <div>{location.address}</div>
    </>
  }

  render(){
    return <div>
      {this.renderLocation()}
    </div>
  }
}

export default withRouter(LocationPage);
