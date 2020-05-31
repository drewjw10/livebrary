import React, { Fragment } from "react";

const PerformanceTable = (performances) => {
  console.log(performances.performances);
  return (
    <Fragment>
      <div className='perf-list'>
        {performances &&
          performances.performances.map((performance, i) => {
            return (
              <div className='perf-list-item'>
                <img src={performance.thumbnail} />
                <a
                  key={performance.venue + i}
                  href={performance.link}
                  target='_new'
                  className='list-item-link'
                >
                  <p>{performance.venue}</p>
                </a>
              </div>
            );
          })}
      </div>
    </Fragment>
  );
};

export default PerformanceTable;
