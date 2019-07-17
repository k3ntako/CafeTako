import React from 'react';
import { Link } from 'react-router-dom';

export default (props) => {
  return <div>
    <div>
      <Link to={ "/locations/" + props.location.id }>
        {props.location.name}
      </Link>
    </div>
    <div>{props.location.address}</div>
  </div>
}
