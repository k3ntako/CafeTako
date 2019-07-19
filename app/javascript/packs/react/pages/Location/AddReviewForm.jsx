import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import TimePicker from './TimePicker';
import FormSelect from './FormSelect';
import CustomDate from '../../../../models/CustomDate';
import Review from '../../../../models/Review';
import { scoreOptions, seatingOptions, bathroomOptions, noiseOptions, wifiOptions, musicOptions } from '../../utilities/selectOptions';

class AddReviewForm extends Component {
  constructor(props){
    super(props);
    this.state = {
      reviewProps: {
        title: "",
        score: null,
        music: null,
        seatingCount: null,
        bathroomCount: null,
        music: null,
        noiseLevel: null,
        wifiSpeed: null,
        startTime: new CustomDate({ hour: 12, minute: 0, amPM: "pm" }),
        endTime: new CustomDate({ hour: 12, minute: 30, amPM: "pm" }),
        review: "",
      }
    };
  }

  updateReview = ( field, val ) => {
    let reviewProps = Object.assign({}, this.state.reviewProps);
    reviewProps[field] = val;

    this.setState({ reviewProps });
  }

  startTimeOnChange = ( dateObject ) => {
    this.state.reviewProps.startTime.setCustomDate(dateObject);
    this.forceUpdate();
  }

  endTimeOnChange = ( dateObject ) => {
    this.state.reviewProps.endTime.setCustomDate(dateObject);
    this.forceUpdate();
  }

  submit = () => {
    let props = Object.assign({}, this.state.reviewProps);
    props.startTime = props.startTime.getTimeInMinutes();
    props.endTime = props.endTime.getTimeInMinutes();
    Review.create(this.props.match.params.id, props);
  }

  render(){
    const reviewProps = this.state.reviewProps;

    return <div>
      <div>
        <label>Review Title</label>
        <input value={reviewProps.title} onChange={(e) => this.updateReview("title", e.target.value)} />
      </div>
      <div>
        <label>Review Score</label>
        <FormSelect
          defaultValue={reviewProps.score || "not_selected"}
          onChange={(e) => this.updateReview("score", e.target.value)}
          options={scoreOptions}
          disableFirst />
      </div>
      <TimePicker onChange={this.startTimeOnChange} date={reviewProps.startTime} label="Arrival Time"/>
      <TimePicker onChange={this.endTimeOnChange} date={reviewProps.endTime} label="Departure Time"/>
      <div>
        <label>Seating</label>
        <FormSelect
          defaultValue={reviewProps.seatingCount || "not_selected"}
          onChange={(e) => this.updateReview("seatingCount", e.target.value)}
          options={seatingOptions}
          disableFirst />
      </div>
      <div>
        <label>Bathroom Stall Count</label>
        <FormSelect
          defaultValue={reviewProps.bathroomCount || "not_selected"}
          onChange={(e) => this.updateReview("bathroomCount", e.target.value)}
          options={bathroomOptions}
          disableFirst />
      </div>
      <div>
        <label>Do they play music?</label>
        <FormSelect
          defaultValue={reviewProps.music || "not_selected"}
          onChange={(e) => this.updateReview("music", e.target.value)}
          options={musicOptions}
          disableFirst />
      </div>
      <div>
        <label>Noise Level</label>
        <FormSelect
          defaultValue={reviewProps.noiseLevel || "not_selected"}
          onChange={(e) => this.updateReview("noiseLevel", e.target.value)}
          options={noiseOptions}
          disableFirst />
      </div>
      <div>
        <label>Wifi</label>
        <FormSelect
          defaultValue={reviewProps.wifiSpeed || "not_selected"}
          onChange={(e) => this.updateReview("wifiSpeed", e.target.value)}
          options={wifiOptions}
          disableFirst />
      </div>
      <div>
        <label>Notes/Review</label><br />
        <textarea value={reviewProps.review} onChange={(e) => this.updateReview("review", e.target.value)}/>
      </div>
      <div>
        <button onClick={this.submit}>Submit</button>
      </div>
    </div>
  }
}

export default withRouter(AddReviewForm);
