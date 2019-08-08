import React from 'react';
import PropTypes from 'prop-types';
import FormRadio from './FormRadio';

import reviewOptions from '../../utilities/selectOptions';

const RADIO_OPTIONS = [
  {
    key: "seatingCount",
    label: "Seating",
  },{
    key: "bathroomCount",
    label: "Bathroom Stall Count",
  },{
    key: "music",
    label: "Do they play music?",
  },{
    key: "noiseLevel",
    label: "Noise Level",
  },{
    key: "wifiSpeed",
    label: "Wifi",
  },
];

const FormRadios = (props) => {
  const reviewProps = props.reviewProps;

  return RADIO_OPTIONS.map(radio => {
    return <FormRadio
      key={radio.key}
      selected={reviewProps[radio.key]}
      onChange={(val) => props.updateReview(radio.key, val)}
      options={reviewOptions[radio.key]}
      label={radio.label} />
  })
}

FormRadios.propTypes = {
  reviewProps: PropTypes.shape({
    seatingCount: PropTypes.string,
    bathroomCount: PropTypes.string,
    music: PropTypes.string,
    noiseLevel: PropTypes.string,
    wifiSpeed: PropTypes.string,
  }),
  updateReview: PropTypes.func,
}

export default FormRadios;
