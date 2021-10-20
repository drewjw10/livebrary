import React, { Fragment } from "react";
import VoteBlock from "./VoteBlock";

export default PerformanceEntry = (props) => {
  const performance = props.data;
  const { i } = props;
  const { performanceVotes, setPerformanceVotes } = props.stateManagers;
  return (
    <Fragment>
      <div className="perf-list-wrapper">
        <h1 className="perf-list-wrapper__num">{i + 1}. </h1>
        <div className="perf-list-item">
          <div className="perf-list-left">
            <div className="perf-list-img__wrapper">
              <img src={performance.thumbnail} className="perf-list-img"></img>
            </div>
            <div className="top-perf-table-body">
              <p>
                <a
                  key={performance.venue + i}
                  href={performance.link}
                  target="_new"
                  className="list-item-link"
                >
                  {performance.artist} - {performance.song}
                </a>
              </p>

              <p>Venue: @ {performance.venue}</p>
            </div>
            <div className="top-perf-table-votes">
              <VoteBlock
                performance={performance}
                index={i}
                performanceVotes={performanceVotes}
                setPerformanceVotes={setPerformanceVotes}
              />
            </div>
          </div>
          <div className="perf-list-right">
            <h4>Submitted by: {performance.user} </h4>
            <p>{performance.description}</p>
          </div>
        </div>
      </div>
    </Fragment>
  );
};
