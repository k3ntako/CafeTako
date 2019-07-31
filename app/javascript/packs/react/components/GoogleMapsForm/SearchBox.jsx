import React from 'react';
import { withScriptjs } from 'react-google-maps';
import StandaloneSearchBox from 'react-google-maps/lib/components/places/StandaloneSearchBox';
import Form from 'react-bootstrap/Form';

const SearchBox = (props) => {
  return <StandaloneSearchBox
    ref={props.onSearchBoxMounted}
    onPlacesChanged={props.onPlacesChanged}>
      <Form.Control type="text" placeholder=""/>
    </StandaloneSearchBox>
}

export default withScriptjs(SearchBox);
