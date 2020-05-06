import React from "react";

const PerformanceCard = (props) => {
  return (
    <div className='perf-box'>
      <h2>{`${props.artist} - ${props.song} @ ${props.venue}`}</h2>
      <p>{props.img_url}</p>
    </div>
  );
};

export default PerformanceCard;
