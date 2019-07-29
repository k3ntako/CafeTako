import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import TimePicker from './TimePicker';
import FormRadio from './FormRadio';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Rating from './Rating';
import ArrivalDepartureTimes from './ArrivalDepartureTimes';

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
      <Form.Group>
        <Form.Label>Title</Form.Label>
        <Form.Control type="text" />
      </Form.Group>

      <Rating onChange={(val) => this.updateReview("score", val)}/>

      <ArrivalDepartureTimes
        onStartTimeChange={(time) => this.updateReview("startTime", time)}
        onEndTimeChange={(time) => this.updateReview("endTime", time)}
        reviewProps={reviewProps}
        />

      <FormRadio
        selected={reviewProps.seatingCount}
        onChange={(val) => this.updateReview("seatingCount", val)}
        options={seatingOptions}
        label="Seating" />

      <FormRadio
        selected={reviewProps.bathroomCount}
        onChange={(val) => this.updateReview("bathroomCount", val)}
        options={bathroomOptions}
        label="Bathroom Stall Count" />

      <FormRadio
        selected={reviewProps.music}
        onChange={(val) => this.updateReview("music", val)}
        options={musicOptions}
        label="Do they play music?" />

      <FormRadio
        selected={reviewProps.noiseLevel}
        onChange={(val) => this.updateReview("noiseLevel", val)}
        options={noiseOptions}
        label="Noise Level" />

      <FormRadio
        selected={reviewProps.wifiSpeed}
        onChange={(val) => this.updateReview("wifiSpeed", val)}
        options={wifiOptions}
        label="Wifi" />

      <Form.Group>
        <Form.Label>Notes/Review</Form.Label><br />
        <Form.Control as="textarea" value={reviewProps.review} onChange={(e) => this.updateReview("review", e.target.value)} />
      </Form.Group>
      <Form.Group>
        <Button onClick={this.submit}>Submit</Button>
      </Form.Group>
    </Form>
  }
}

export default withRouter(AddReviewForm);
