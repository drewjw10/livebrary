import React from "react";
import { url } from "gravatar";

const PerformanceCard = (props) => {
  console.log(props);
  return (
    <div className='perf-box'>
      <div className='thumbnail-container'>
        <a href={props.link} target='_new'>
          <img src={props.thumbnail} className='perf-thumbnail'></img>
        </a>
      </div>

      <div className='perf-box-body'>
        <div className='perf-box-header'>
          <h4>{`${props.artist} - ${props.song}`}</h4>
          <h4>@ {props.venue}</h4>
        </div>
      </div>
    </div>
  );
};

export default PerformanceCard;
