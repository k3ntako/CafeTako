import React from 'react';
import { Link } from 'react-router-dom';

export default (props) => {
  return <div>
    <div>
      <Link to={ `/chains/${props.location.chainId}/locations/${props.location.id}` }>
        {props.location.name}
      </Link>
    </div>
    <div>{props.location.address}</div>
  </div>
}
