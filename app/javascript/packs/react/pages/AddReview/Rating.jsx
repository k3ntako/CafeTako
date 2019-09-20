import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';
import styles from './Rating.module.css';

const FA_ICONS = ["fa-angry", "fa-frown", "fa-meh", "fa-smile", "fa-grin-hearts"]

const Rating = (props) => {
  const [score, setScore] = useState(null);
  const [mouseOverScore, setMouseOverScore] = useState(null);

  const activeScore = mouseOverScore || score; //prioritizes mouseOverScore

  let icon = "fa-meh";
  if( typeof activeScore === "number" ){
    icon = FA_ICONS[activeScore - 1];
  }

  const onMouseOverHandler = (newScore) => {
    setMouseOverScore(newScore);
    props.onChange(newScore);
  }

  const smileys = [1,2,3,4,5].map(idx => {
    const type = idx <= activeScore ? "fas" : "far";
    return <div
      key={`${activeScore} ${idx}`}
      className={styles.faceIcon}
      onClick={ () => setScore(idx) }
      onMouseOver={ () => onMouseOverHandler(idx) }>
      <i className={`fa-3x ${type} ${icon}`}></i>
    </div>

  })

  return <Form.Group>
    <Form.Label>Score</Form.Label>
    <div>
      <div
        className={styles.iconWrapper}
        onMouseLeave={ () => setMouseOverScore(null) }>
        { smileys }
      </div>
    </div>
  </Form.Group>
}

Rating.propTypes = {
  onChange: PropTypes.func,
}

export default Rating;
