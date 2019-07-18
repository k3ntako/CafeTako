import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import TimePicker from './TimePicker';
import FormSelect from './FormSelect';
import CustomDate from '../../../../models/CustomDate';
import Review from '../../../../models/Review';

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
        noiseLevel: null,
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
          defaultValue={reviewProps.score || "not-selected"}
          onChange={(e) => this.updateReview("score", e.target.value)}
          options={scoreOptions}
          disableFirst />
      </div>
      <TimePicker onChange={this.startTimeOnChange} date={reviewProps.startTime} label="Arrival Time"/>
      <TimePicker onChange={this.endTimeOnChange} date={reviewProps.endTime} label="Departure Time"/>
      <div>
        <label>Seating</label>
        <FormSelect
          defaultValue={reviewProps.seatingCount || "not-selected"}
          onChange={(e) => this.updateReview("seatingCount", e.target.value)}
          options={seatingOptions}
          disableFirst />
      </div>
      <div>
        <label>Bathroom Stall Count</label>
        <FormSelect
          defaultValue={reviewProps.bathroomCount || "not-selected"}
          onChange={(e) => this.updateReview("bathroomCount", e.target.value)}
          options={bathroomOptions}
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


const scoreOptions = [
  { value: "not-selected", text: "-- Score --" },
  { value: "1", text: "1" },
  { value: "2", text: "2" },
  { value: "3", text: "3" },
  { value: "4", text: "4" },
  { value: "5", text: "5" },
];

const seatingOptions = [
  { value: "not-selected", text: "-- Seating --" },
  { value: "seating_none", text: "None" },
  { value: "seating_very_small-small", text: "1 to 10" },
  { value: "seating_small", text: "11 to 20" },
  { value: "seating_medium", text: "21 to 30" },
  { value: "seating_large", text: "31 to 40" },
  { value: "seating_very_large", text: "41+" },
];

const bathroomOptions = [
  { value: "not-selected", text: "-- Stall Count --" },
  { value: "bathroom_none", text: "None" },
  { value: "bathroom_one", text: "1" },
  { value: "bathroom_two", text: "2" },
  { value: "bathroom_three", text: "3" },
  { value: "bathroom_four", text: "4" },
  { value: "bathroom_five_seven", text: "5-7" },
  { value: "bathroom_eight_ten", text: "8-10" },
  { value: "bathroom_elevent_fifteen", text: "11-15" },
  { value: "bathroom_sixteen_twenty", text: "16-20" },
  { value: "bathroom_twenty_one_plus", text: "21+" },
];
