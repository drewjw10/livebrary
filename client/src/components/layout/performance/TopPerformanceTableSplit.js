import React, { Fragment, useState } from "react";
import smiley from "./smiley.png";
import frowny from "./frowny.png";
import VoteBlock from "./VoteBlock";

const TopPerformanceTableSplit = (props) => {
  const { performanceList } = props;

  const [performanceVotes, setPerformanceVotes] = useState(
    performanceList.map((performance) => performance.votesCount)
  );

  console.log(performanceList);
  return (
    <Fragment>
      {performanceList &&
        performanceList.map((performance, i) => {
          return (
            <div className='perf-list-item'>
              <div className='perf-list-left'>
                <h1>{i + 1}. </h1>
                <img
                  src={performance.thumbnail}
                  className='perf-list-thumbnail'
                />

                <div className='top-perf-table-body'>
                  <p>
                    <a
                      key={performance.venue + i}
                      href={performance.link}
                      target='_new'
                      className='list-item-link'
                    >
                      {performance.artist} - {performance.song}
                    </a>
                  </p>

                  <p>Venue: @ {performance.venue}</p>
                </div>
                <div className='top-perf-table-votes'>
                  <VoteBlock
                    performance={performance}
                    index={i}
                    performanceVotes={performanceVotes}
                    setPerformanceVotes={setPerformanceVotes}
                  />
                </div>
              </div>
              <div className='perf-list-right'>
                <h4>Submitted by: {performance.user} </h4>
                <p>{performance.description}</p>
              </div>
            </div>
          );
        })}
    </Fragment>
  );
};

export default TopPerformanceTableSplit;
