import React from 'react';
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

export default (props) => {
  const reviewProps = props.reviewProps;

  return RADIO_OPTIONS.map(radio => {
    return <FormRadio
      key={radio.key}
      selected={reviewProps[radio.key]}
      onChange={(val) => this.prop.updateReview(radio.key, val)}
      options={reviewOptions[radio.key]}
      label={radio.label} />
  })
}
