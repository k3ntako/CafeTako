import React from 'react';
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';

const FormRadio = (props) => {

  const deselectIfSelected = (optionVal, event) => {
    optionVal === event.target.value && props.onChange(null);
  }

  const options = props.options.map(option => {
    if( !option.text.trim() ){
      return null
    }

    const isChecked = option.value === props.selected;
    const active = isChecked ? " active" : "";

    return <label key={option.value} className={ "btn btn-secondary" + active }>
      <input
        type="radio"
        name={option.value}
        value={option.value}
        autoComplete="off"
        checked={isChecked}
        onChange={(e) => props.onChange(e.target.value)}
        onClick={(e) => deselectIfSelected(option.value, e)} />
      { option.text }
    </label>
  })

  const label = props.label.trim() && <Form.Label>{props.label}</Form.Label>;

  return <Form.Group>
    { label }<br />
    <div className="btn-group btn-group-toggle" data-toggle="buttons">
      { options }
    </div>
  </Form.Group>
}

FormRadio.propTypes = {
  onChange: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string,
      label: PropTypes.string,
    }).isRequired
  ),
  selected: PropTypes.string,
  label: PropTypes.string.isRequired,
}

export default FormRadio;
