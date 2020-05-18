import React, { Fragment } from "react";

const PerformanceTable = (performances) => {
  return (
    <Fragment>
      <div className='performance-list'>
        {console.log(performances)}
        {performances.performances &&
          performances.performances.map((performance) => (
            <a href={performance.link} target='_blank'>
              <div
                key={performances.performances.indexOf(performance)}
                className='list-item'
              >
                <div className='performance-list-song'>
                  {performances.performances.indexOf(performance) + 1}.{" "}
                  {performance.song}@ {performance.performance}
                </div>
                <div className='performance-list-artist'>
                  {performance.artist}
                </div>
                <div className='performance-list-votes'>
                  {performance.votesCount}
                </div>
              </div>
            </a>
          ))}
      </div>
    </Fragment>
  );
};

export default PerformanceTable;
