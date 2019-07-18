import React from 'react';
import { Link } from 'react-router-dom';

export default (props) => {
  return <div>
    <div>
      <Link to="/">CafeTako</Link><span> </span>
      <Link to="/locations/new">New Location</Link>
    </div>

  </div>
}
