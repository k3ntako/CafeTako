import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import TimePicker from './TimePicker';
import FormSelect from './FormSelect';
import Form from 'react-bootstrap/Form';

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
        startTime: null,
        endTime: null,
        review: "",
      }
    };
  }

  updateReview = ( field, val ) => {
    let reviewProps = Object.assign({}, this.state.reviewProps);
    reviewProps[field] = val;

    this.setState({ reviewProps });
  }

  submit = () => {
    let props = Object.assign({}, this.state.reviewProps);

    const params = this.props.match.params;
    Review.create(params.chainId, params.id, props);
  }

  render(){
    const reviewProps = this.state.reviewProps;

    return <Form>
      <Form.Group controlId="formReviewTitle">
        <Form.Label>Title</Form.Label>
        <Form.Control type="text" />
      </Form.Group>
      <Form.Group>
        <Form.Label>Score</Form.Label>
        <FormSelect
          defaultValue={reviewProps.score || "not_selected"}
          onChange={(e) => this.updateReview("score", e.target.value)}
          options={scoreOptions}
          disableFirst />
      </Form.Group>
      <TimePicker
        onChange={(time) => this.updateReview("startTime", time)}
        time={reviewProps.startTime}
        label="Arrival Time" />
      <TimePicker
        onChange={(time) => this.updateReview("endTime", time)}
        time={reviewProps.endTime}
        label="Departure Time" />
      <Form.Group>
        <Form.Label>Seating</Form.Label>
        <FormSelect
          defaultValue={reviewProps.seatingCount || "not_selected"}
          onChange={(e) => this.updateReview("seatingCount", e.target.value)}
          options={seatingOptions}
          disableFirst />
      </Form.Group>
      <Form.Group>
        <Form.Label>Bathroom Stall Count</Form.Label>
        <FormSelect
          defaultValue={reviewProps.bathroomCount || "not_selected"}
          onChange={(e) => this.updateReview("bathroomCount", e.target.value)}
          options={bathroomOptions}
          disableFirst />
      </Form.Group>
      <Form.Group>
        <Form.Label>Do they play music?</Form.Label>
        <FormSelect
          defaultValue={reviewProps.music || "not_selected"}
          onChange={(e) => this.updateReview("music", e.target.value)}
          options={musicOptions}
          disableFirst />
      </Form.Group>
      <Form.Group>
        <Form.Label>Noise Level</Form.Label>
        <FormSelect
          defaultValue={reviewProps.noiseLevel || "not_selected"}
          onChange={(e) => this.updateReview("noiseLevel", e.target.value)}
          options={noiseOptions}
          disableFirst />
      </Form.Group>
      <Form.Group>
        <Form.Label>Wifi</Form.Label>
        <FormSelect
          defaultValue={reviewProps.wifiSpeed || "not_selected"}
          onChange={(e) => this.updateReview("wifiSpeed", e.target.value)}
          options={wifiOptions}
          disableFirst />
      </Form.Group>
      <Form.Group>
        <Form.Label>Notes/Review</Form.Label><br />
        <Form.Control as="textarea" value={reviewProps.review} onChange={(e) => this.updateReview("review", e.target.value)}/>
      </Form.Group>
      <Form.Group>
        <button onClick={this.submit}>Submit</button>
      </Form.Group>
    </Form>
  }
}

export default withRouter(AddReviewForm);
