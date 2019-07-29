import React from 'react';
import Form from 'react-bootstrap/Form';
import TimePicker from 'react-time-picker';

export default (props) => {
  const label = props.label.trim() && <label>{props.label}</label>;

  return <Form.Group>
    <Form.Label>{label}</Form.Label>
    <TimePicker
      disableClock
      onChange={ props.onChange }
      value={props.time} />
  </Form.Group>
}
