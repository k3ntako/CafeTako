import React from "react";

export default (props) => {
  if( !props.reviews || !props.reviews.length ){
    return null;
  }

  return props.reviews.map(review => {
    return <div key={review.id}>
      <h3>{review.title}</h3>
      <div>Score: {review.score}</div>
      <p>Review: {review.review}</p>
    </div>
  })
}
