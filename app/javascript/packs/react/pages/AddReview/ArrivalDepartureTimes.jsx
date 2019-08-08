import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import TimePicker from './TimePicker';


class ArrivalDepartureTimes extends Component {
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
            time={this.props.startTime}
            label="Arrival Time" />
        </Col>

        <Col xs={12} sm={6} lg={4}>
          <TimePicker
            onChange={this.props.onEndTimeChange}
            time={this.props.endTime}
            label="Departure Time" />
        </Col>
      </Row>
    </div>
  }
}

ArrivalDepartureTimes.propTypes = {
  onStartTimeChange: PropTypes.func.isRequired,
  startTime: PropTypes.number,
  onEndTimeChange: PropTypes.func.isRequired,
  endTime: PropTypes.number,
}

export default ArrivalDepartureTimes;
