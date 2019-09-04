import React, { Component } from "react";
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import sessionReducer from '../../../redux/reducers/sessionReducer';
import PropTypes from 'prop-types';
import pT from '../../propTypes';
import reduxPT from '../../propTypes/reduxPropTypes';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import User from '../../models/User';
import { Marker } from 'react-google-maps';

import BusinessHours from './BusinessHours';
import GoogleMaps from '../../components/GoogleMaps';
import Reviews from './Reviews';
import Location from '../../models/Location';
import styles from './index.module.css';

class LocationPage extends Component{
  constructor(props){
    super(props);

    this.state = {
      location: null
    }
  }

  componentDidMount(){
    const params = this.props.match.params;
    Location.get( params.chainId, params.id ).
      then(location => this.setState({
        location
      }));
  }

  renderLocation(){
    const location = this.state.location;
    if( !location ){
      return null
    }

    return <>
      <h3>{location.name}</h3>
      <div>{location.fullAddress}</div>
    </>
  }

  render(){
    const params = this.props.match.params;
    const { location } = this.state;

    if( !location ){
      return null;
    }

    const lat = location.lat;
    const lng = location.lng;

    const reivewsHTML = location.reviews && !!location.reviews.length && <>
      <h3>Reviews</h3>
      <Reviews reviews={location.reviews} />
    </>

    return <Container>
      {this.renderLocation()}
      {this.props.currentUser && <h3>
        <Link to={`${location.locationURL}/review`}>Add a Review</Link>
      </h3>}
      <Row>
        <Col md={12} lg={8}>
          <div className={styles.googleMaps}>
            <GoogleMaps lat={lat} lng={lng}>
              <Marker position={{ lat, lng }} />
            </GoogleMaps>
          </div>
        </Col>
        <Col md={12} lg={4}>
          <BusinessHours businessHours={location.businessHours}/>
        </Col>
      </Row>
      { reivewsHTML }
    </Container>
  }
}

let LocationPagePT = pT.withRouter;
LocationPagePT = Object.assign(LocationPagePT, reduxPT.currentUser);

LocationPagePT.match.params = PropTypes.shape({
  id: PropTypes.string.isRequired,
  chainId: PropTypes.string.isRequired,
});

LocationPage.propTypes = LocationPagePT;


const mapStateToProps = (state) => {
  return {
    currentUser: state.session.currentUser,
  }
}

export default withRouter(connect(
  mapStateToProps,
  null
)(LocationPage));
