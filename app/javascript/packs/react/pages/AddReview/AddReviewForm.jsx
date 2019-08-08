import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import pT from '../../propTypes';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import TimePicker from './TimePicker';
import Rating from './Rating';
import ArrivalDepartureTimes from './ArrivalDepartureTimes';
import FormRadios from './FormRadios';

import Review from '../../models/Review';

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
    Review.create(params.chainId, params.id, props).then(url => {
      this.props.history.push(url);
    });
  }

  render(){
    const reviewProps = this.state.reviewProps;

    return <Form>
      <Form.Group>
        <Form.Label>Title</Form.Label>
        <Form.Control type="text" onChange={(e) => this.updateReview("title", e.target.value)}/>
      </Form.Group>

      <Rating onChange={(val) => this.updateReview("score", val)}/>

      <ArrivalDepartureTimes
        startTime={reviewProps.startTime}
        onStartTimeChange={(time) => this.updateReview("startTime", time)}
        endTime={reviewProps.endTime}
        onEndTimeChange={(time) => this.updateReview("endTime", time)}
        />

      <FormRadios reviewProps={this.state.reviewProps} updateReview={this.updateReview}/>

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

let AddReviewFormPT = pT.withRouter;

AddReviewFormPT.match.params = PropTypes.shape({
  id: PropTypes.string.isRequired,
  chainId: PropTypes.string.isRequired,
});

AddReviewForm.propTypes = AddReviewFormPT;

export default withRouter(AddReviewForm);
