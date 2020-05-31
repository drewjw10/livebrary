import React, { Fragment } from "react";
import smiley from "./smiley.png";
import frowny from "./frowny.png";

const TopPerformanceTable = (performances) => {
  console.log(performances.performances);
  return (
    <Fragment>
      <div className='perf-list'>
        {performances &&
          performances.performances.map((performance, i) => {
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
                  <img src={smiley} />
                  <p> {performance.votesCount} Votes</p>
                  <img src={frowny} />
                </div>
              </div>
            );
          })}
      </div>
    </Fragment>
  );
};

export default TopPerformanceTable;
