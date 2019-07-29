import React from 'react';
import Form from 'react-bootstrap/Form';

export default (props) => {

  const options = props.options.map((option, idx) => {
    let disabled = props.disableFirst && idx === 0;

    return <option key={option.value} value={option.value} disabled={disabled}>
      {option.text}
    </option>
  })

  return <Form.Control as="select" value={props.defaultValue} onChange={props.onChange}>
    { options }
  </Form.Control>
}
