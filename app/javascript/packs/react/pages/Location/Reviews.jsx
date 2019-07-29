import React from "react";

import DataPoint from "./DataPoint";

import { scoreOptions, seatingOptions, bathroomOptions, getOptionFromValue } from '../../utilities/selectOptions';

export default (props) => {
  if( !props.reviews || !props.reviews.length ){
    return null;
  }


  return props.reviews.map(review => {
    const seatOption = getOptionFromValue("seatingOptions", review.seating_count);
    const bathroomOption = getOptionFromValue("bathroomOptions", review.bathroom_count);
    const noiseOption = getOptionFromValue("noiseOptions", review.noise_level);
    const wifiOption = getOptionFromValue("wifiOptions", review.wifi_speed);

    const seatValue = seatOption.text && `${seatOption.text} (${seatOption.value})`;
    const playsMusic = typeof review.music === "boolean" ? review.music ? "Yes" : "No" : "";

    return <div key={review.id}>
      <h5>{review.title}</h5>
      <DataPoint title={"Score"} value={review.score} />
      <DataPoint title={"Review"} value={review.review} />
      <DataPoint title={"Seat Count"} value={seatValue} />
      <DataPoint title={"Bathroom Count"} value={bathroomOption.text} units={["", "stall", "stalls"]} />
      <DataPoint title={"Plays Music"} value={playsMusic} />
      <DataPoint title={"Noise Level"} value={noiseOption.text} />
      <DataPoint title={"Wifi Speed"} value={wifiOption.text} />
    </div>
  })
}
