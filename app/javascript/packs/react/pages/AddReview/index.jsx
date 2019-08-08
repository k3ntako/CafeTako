import React, { Component } from "react";
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import sessionReducer from '../../../redux/reducers/sessionReducer';
import PropTypes from 'prop-types';
import pT from '../../propTypes';
import reduxPT from '../../propTypes/reduxPropTypes';
import Container from 'react-bootstrap/Container';

import AddReviewForm from './AddReviewForm';
import Location from '../../models/Location';

class AddReview extends Component{
  constructor(props){
    super(props);

    this.state = {
      location: null
    }
  }

  componentDidMount(){
    if( !this.props.currentUser ){
      return this.props.history.push("/");
    }

    const params = this.props.match.params;
    Location.get( params.chainId, params.id ).
      then(location => this.setState({
        location
      }));
  }

  render(){
    const { location } = this.state;

    if( !location ){
      return null;
    }

    const name = <Link to={location.locationURL}>{location.fullName}</Link>

    return <Container>
      <h3>Add a Review for {name}</h3>
      <AddReviewForm />
    </Container>
  }
}

let AddReviewPT = pT.withRouter;
AddReviewPT = Object.assign(AddReviewPT, reduxPT.currentUser);

AddReviewPT.match.params = PropTypes.shape({
  id: PropTypes.string.isRequired,
  chainId: PropTypes.string.isRequired,
});

AddReview.propTypes = AddReviewPT;


const mapStateToProps = (state) => {
  return {
    currentUser: state.session.currentUser,
  }
}

export default withRouter(connect(
  mapStateToProps,
  null
)(AddReview));
