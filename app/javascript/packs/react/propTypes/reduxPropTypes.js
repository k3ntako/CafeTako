import PropTypes from 'prop-types';
import User from '../models/User';

export default {
  currentUser: {
    currentUser: PropTypes.instanceOf(User),
    setCurrentUser: PropTypes.func,
  },
}
