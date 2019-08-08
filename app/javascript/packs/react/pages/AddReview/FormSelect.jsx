import React from 'react';
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';

const FormSelect = (props) => {

  const options = props.options.map((option, idx) => {
    let disabled = props.disableFirst && idx === 0;

    return <option key={option.value} value={option.value} disabled={disabled}>
      {option.text}
    </option>
  })

  const label = props.label.trim() && <Form.Label>{props.label}</Form.Label>;

  return <Form.Group>
    {label}
    <Form.Control
      as="select"
      onChange={ (e) => props.onChange(removeNotSelected(e.target.value)) }
      value={props.defaultValue}>
      { options }
    </Form.Control>
  </Form.Group>
}

const removeNotSelected = (val) => {
  return val === "not_selected" ? null : val;
}

FormSelect.propTypes = {
  options: PropTypes.arrayOf(
    shape({
      value: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
    })
  ),
  disableFirst: PropTypes.bool.isRequired,
  label: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  defaultValue: PropTypes.string.isRequired,
}

FormSelect.defaultProps = {
  disableFirst: false,
  defaultValue: "not_selected",
};

export default FormSelect;
