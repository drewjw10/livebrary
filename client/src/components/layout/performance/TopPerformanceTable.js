import React, { Fragment, useState } from "react";
import smiley from "./smiley.png";
import frowny from "./frowny.png";
import VoteBlock from "./VoteBlock";

const TopPerformanceTable = (props) => {
  const { performanceList } = props;

  const [performanceVotes, setPerformanceVotes] = useState(
    performanceList.map((performance) => performance.votesCount)
  );

  console.log(performanceList);
  return (
    <Fragment>
      <div className='perf-list'>
        {performanceList &&
          performanceList.map((performance, i) => {
            return (
              <div className='perf-list-item'>
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

                  <p>@ {performance.venue}</p>
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
            );
          })}
      </div>
    </Fragment>
  );
};

export default TopPerformanceTable;
