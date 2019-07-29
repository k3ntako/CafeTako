import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';

const FA_ICONS = ["fa-angry", "fa-frown", "fa-meh", "fa-smile", "fa-grin-hearts"]

export default (props) => {
  const [score, setScore] = useState(null);
  const [mouseOverScore, setMouseOverScore] = useState(null);

  const activeScore = mouseOverScore || score; //prioritizes mouseOverScore

  let icon = "fa-meh";
  if( typeof activeScore === "number" ){
    icon = FA_ICONS[activeScore - 1];
  }

  const onClickHandler = (e) => {
    const newScore = Number(e.target.attributes.value.value);
    setMouseOverScore(newScore);
    props.onChange(newScore);
  }

  const smileys = [1,2,3,4,5].map(idx => {
    const type = idx <= activeScore ? "fas" : "far";
    return <i
      key={idx}
      className={`fa-3x ${type} ${icon}`}
      value={String(idx)}
      onClick={ (e) => setScore(Number(e.target.attributes.value.value)) }
      onMouseOver={ onClickHandler }
      onMouseOut={ () => setMouseOverScore(null) }>
    </i>
  })

  return <Form.Group>
    <Form.Label>Score</Form.Label>
    <div>
      { smileys }
    </div>
  </Form.Group>
}
