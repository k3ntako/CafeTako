import React, { Component } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import TimePicker from './TimePicker';


export default class ArrivalDepartureTimes extends Component {
  constructor(props){
    super(props);
    this.state = {
    };
  }

  render(){
    return <div>
      <Row>
        <Col xs={12} sm={6} lg={4}>
          <TimePicker
            onChange={this.props.onStartTimeChange}
            time={this.props.reviewProps.startTime}
            label="Arrival Time" />
        </Col>

        <Col xs={12} sm={6} lg={4}>
          <TimePicker
            onChange={this.props.onEndTimeChange}
            time={this.props.reviewProps.endTime}
            label="Departure Time" />
        </Col>
      </Row>
    </div>
  }
}
